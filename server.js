require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ---------- Konfigirasyon ----------
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'chanje-sekre-sa-a';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chanje-modpas-la';
const MIN_TO_UNLOCK = parseInt(process.env.MIN_TO_UNLOCK || '500', 10); // minimòm moun pou download
const MAX_IN_FILE = parseInt(process.env.MAX_IN_FILE || '50000', 10);  // maksimòm nan fichye a
const NAME_PREFIX = (process.env.NAME_PREFIX || 'D.M.L').trim(); // prefiks devan chak non (egz: D.M.L)

// Lis ikòn SVG ki otorize (dwe menm jan ak public/js/icons.js)
const ALLOWED_ICONS = ['', 'star', 'crown', 'check', 'fire', 'heart', 'ninja', 'vip', 'flag'];

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // SERVICE ROLE — backend sèlman, pa janm expoze sa nan frontend
);

// ---------- Rate limiting (anpeche spam/abuse) ----------
const registerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const downloadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
const adminLoginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

// ---------- Itilitè ----------
function onlyDigits(str) {
  return (str || '').replace(/\D/g, '');
}

// Ajoute prefiks la (egz: "D.M.L") devan non moun nan
function withPrefix(name) {
  return NAME_PREFIX ? `${NAME_PREFIX} ${name}` : name;
}

function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const headerToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const token = headerToken || req.query.token || null; // query.token: pou download links (CSV export)
  if (!token) return res.status(401).json({ error: 'Ou dwe konekte kòm admin.' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Sesyon admin ekspire, konekte ankò.' });
  }
}

// ---------- POST /api/register ----------
app.post('/api/register', registerLimiter, async (req, res) => {
  try {
    let { name, email, dialCode, countryName, phone } = req.body;

    name = (name || '').trim();
    email = (email || '').trim();
    dialCode = onlyDigits(dialCode);
    phone = onlyDigits(phone);
    countryName = (countryName || '').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Tanpri antre yon non valid.' });
    }
    if (!dialCode) {
      return res.status(400).json({ error: 'Chwazi peyi/kòd peyi a.' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Tanpri antre nimewo a.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email lan pa valid.' });
    }

    // Règ espesyal pou Ayiti: 8 chif obligatwa
    if (dialCode === '509' && phone.length !== 8) {
      return res.status(400).json({ error: 'Nimewo Ayisyen an dwe gen egzakteman 8 chif (san 509).' });
    }
    // Validasyon jeneral pou lòt peyi (limit rezonab)
    if (dialCode !== '509' && (phone.length < 4 || phone.length > 14)) {
      return res.status(400).json({ error: 'Nimewo a pa gen yon fòma valid.' });
    }

    const fullNumber = dialCode + phone;

    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('full_number', fullNumber)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'Nimewo sa a deja anrejistre.' });
    }

    const { error } = await supabase.from('registrations').insert({
      name,
      email: email || null,
      dial_code: dialCode,
      country_name: countryName || null,
      phone,
      full_number: fullNumber
    });

    if (error) throw error;

    res.json({ ok: true, message: 'Enskripsyon ou reyisi!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Yon erè sèvè rive. Eseye ankò.' });
  }
});

// ---------- GET /api/stats ----------
app.get('/api/stats', async (req, res) => {
  const { count, error } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true });
  if (error) return res.status(500).json({ error: 'Erè sèvè.' });
  res.json({
    total: count,
    minRequired: MIN_TO_UNLOCK,
    maxInFile: MAX_IN_FILE,
    unlocked: count >= MIN_TO_UNLOCK,
    remaining: Math.max(0, MIN_TO_UNLOCK - count),
    namePrefix: NAME_PREFIX
  });
});

// ---------- GET /api/public-list ----------
// Lis piblik: SÈLMAN non yo (ak peyi), JANM nimewo yo.
app.get('/api/public-list', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const pageSize = 50;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('registrations')
    .select('name, country_name, icon, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) return res.status(500).json({ error: 'Erè sèvè.' });

  const list = (data || []).map(r => ({ ...r, display_name: withPrefix(r.name) }));
  res.json({ page, pageSize, total: count, list, namePrefix: NAME_PREFIX });
});

// ---------- POST /api/verify-download ----------
// Moun nan dwe konfime non + nimewo li te itilize pou l enskri anvan l ka download.
app.post('/api/verify-download', downloadLimiter, async (req, res) => {
  try {
    let { name, dialCode, phone } = req.body;
    name = (name || '').trim();
    dialCode = onlyDigits(dialCode);
    phone = onlyDigits(phone);
    const fullNumber = dialCode + phone;

    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    if (count < MIN_TO_UNLOCK) {
      return res.status(403).json({
        error: `Download lan bloke toujou. Fòk gen omwen ${MIN_TO_UNLOCK} moun enskri (${count}/${MIN_TO_UNLOCK} kounye a).`
      });
    }

    const { data: match } = await supabase
      .from('registrations')
      .select('id')
      .eq('full_number', fullNumber)
      .ilike('name', name)
      .maybeSingle();

    if (!match) {
      return res.status(403).json({
        error: 'Nou pa jwenn okenn moun ki enskri ak non ak nimewo sa yo. Fòk ou te anrejistre deja pou w ka download.'
      });
    }

    // Bay yon token kout-dire (5 minit) pou l ka rele /api/download-vcf
    const dlToken = jwt.sign({ purpose: 'download' }, JWT_SECRET, { expiresIn: '5m' });
    res.json({ ok: true, downloadToken: dlToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erè sèvè.' });
  }
});

// ---------- GET /api/download-vcf ----------
app.get('/api/download-vcf', downloadLimiter, async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(401).json({ error: 'Manke token download.' });
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (payload.purpose !== 'download') throw new Error('bad token');
    } catch {
      return res.status(401).json({ error: 'Token download lan pa valid oswa li ekspire.' });
    }

    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    if (count < MIN_TO_UNLOCK) {
      return res.status(403).json({ error: 'Download lan bloke toujou.' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .select('name, full_number')
      .order('created_at', { ascending: true })
      .limit(MAX_IN_FILE);

    if (error) throw error;

    let vcf = '';
    for (const row of data) {
      vcf += 'BEGIN:VCARD\r\n';
      vcf += 'VERSION:3.0\r\n';
      vcf += `FN:${withPrefix(row.name)}\r\n`;
      vcf += `TEL;TYPE=CELL:+${row.full_number}\r\n`;
      vcf += 'END:VCARD\r\n';
    }

    res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="DOBERTO-VCF.vcf"');
    res.send(vcf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erè sèvè.' });
  }
});

// ---------- POST /api/admin/login ----------
app.post('/api/admin/login', adminLoginLimiter, (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Modpas admin lan pa kòrèk.' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ ok: true, token });
});

// ---------- GET /api/admin/list ----------
// Admin sèlman: wè non + nimewo konplè.
app.get('/api/admin/list', verifyAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const pageSize = 100;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const search = (req.query.search || '').trim();

  let q = supabase
    .from('registrations')
    .select('id, name, email, dial_code, phone, country_name, full_number, icon, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (search) q = q.ilike('name', `%${search}%`);

  const { data, error, count } = await q;
  if (error) return res.status(500).json({ error: 'Erè sèvè.' });

  const list = (data || []).map(r => ({ ...r, display_name: withPrefix(r.name) }));
  res.json({ page, pageSize, total: count, list, namePrefix: NAME_PREFIX });
});

// ---------- PUT /api/admin/update/:id ----------
// Admin ka modifye non, nimewo, ak ikòn yon moun ki enskri.
app.put('/api/admin/update/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let { name, dialCode, phone, icon } = req.body;

    name = (name || '').trim();
    dialCode = onlyDigits(dialCode);
    phone = onlyDigits(phone);
    icon = (icon || '').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Tanpri antre yon non valid.' });
    }
    if (!dialCode) {
      return res.status(400).json({ error: 'Chwazi peyi/kòd peyi a.' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Tanpri antre nimewo a.' });
    }
    if (dialCode === '509' && phone.length !== 8) {
      return res.status(400).json({ error: 'Nimewo Ayisyen an dwe gen egzakteman 8 chif (san 509).' });
    }
    if (dialCode !== '509' && (phone.length < 4 || phone.length > 14)) {
      return res.status(400).json({ error: 'Nimewo a pa gen yon fòma valid.' });
    }
    if (!ALLOWED_ICONS.includes(icon)) icon = '';

    const fullNumber = dialCode + phone;

    // Verifye pou asire okenn LÒT moun pa deja gen menm nimewo a
    const { data: dupe } = await supabase
      .from('registrations')
      .select('id')
      .eq('full_number', fullNumber)
      .neq('id', id)
      .maybeSingle();

    if (dupe) {
      return res.status(409).json({ error: 'Yon lòt moun deja gen nimewo sa a.' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .update({
        name,
        dial_code: dialCode,
        phone,
        full_number: fullNumber,
        icon: icon || null
      })
      .eq('id', id)
      .select('id, name, email, dial_code, phone, country_name, full_number, icon, created_at')
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Nou pa jwenn moun sa a.' });

    res.json({ ok: true, row: { ...data, display_name: withPrefix(data.name) } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erè sèvè.' });
  }
});

// ---------- DELETE /api/admin/delete/:id ----------
app.delete('/api/admin/delete/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erè sèvè.' });
  }
});

// ---------- GET /api/admin/export-csv ----------
app.get('/api/admin/export-csv', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('name, email, country_name, full_number, icon, created_at')
    .order('created_at', { ascending: true })
    .limit(MAX_IN_FILE);

  if (error) return res.status(500).json({ error: 'Erè sèvè.' });

  let csv = 'Non,Non ak Prefiks,Email,Peyi,Nimewo,Ikòn,Dat\n';
  for (const r of data) {
    csv += `"${(r.name || '').replace(/"/g, '""')}","${withPrefix(r.name).replace(/"/g, '""')}","${r.email || ''}","${r.country_name || ''}","+${r.full_number}","${r.icon || ''}","${r.created_at}"\n`;
  }
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="doberto-vcf-admin-export.csv"');
  res.send(csv);
});

// Sou Vercel, api/index.js pran app la epi jere requests yo (pa gen app.listen).
// Lokalman (oswa sou Render), n ap kontinye lanse sèvè a nòmalman.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`DOBERTO VCF ap kouri sou pò ${PORT}`);
  });
}

module.exports = app;
