const dialSelect = document.getElementById('dial');
const phoneInput = document.getElementById('phone');
const phoneHint = document.getElementById('phoneHint');
const form = document.getElementById('regForm');
const msg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');

// Ranpli dropdown peyi yo (Ayiti premye)
COUNTRIES.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.dial;
  opt.textContent = `${c.name} (+${c.dial})`;
  dialSelect.appendChild(opt);
});
dialSelect.value = '509';

function updateHint() {
  const rule = getValidationRule(dialSelect.value);
  if (rule.exact) {
    phoneHint.textContent = `Nimewo sa a dwe gen egzakteman ${rule.exact} chif (san kòd peyi a).`;
  } else {
    phoneHint.textContent = `Antre nimewo w la san kòd peyi a.`;
  }
}
dialSelect.addEventListener('change', updateHint);
updateHint();

function showMsg(text, ok) {
  msg.textContent = text;
  msg.className = 'msg show ' + (ok ? 'ok' : 'err');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = 'msg';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const dialCode = dialSelect.value;
  const countryName = dialSelect.options[dialSelect.selectedIndex].textContent;
  const phone = phoneInput.value.replace(/\D/g, '');

  const rule = getValidationRule(dialCode);
  if (rule.exact && phone.length !== rule.exact) {
    showMsg(`Nimewo a dwe gen ${rule.exact} chif egzakteman.`, false);
    return;
  }
  if (!rule.exact && (phone.length < rule.min || phone.length > rule.max)) {
    showMsg('Nimewo a pa gen yon fòma valid.', false);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Ap voye...';

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, dialCode, countryName, phone })
    });
    const data = await res.json();
    if (!res.ok) {
      showMsg(data.error || 'Yon erè rive.', false);
    } else {
      showMsg(data.message || 'Enskripsyon reyisi!', true);
      form.reset();
      dialSelect.value = '509';
      updateHint();
      loadStats();
    }
  } catch (err) {
    showMsg('Pa gen koneksyon ak sèvè a. Eseye ankò.', false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Anrejistre m';
  }
});

async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    const bar = document.getElementById('statBar');
    const text = document.getElementById('statText');
    const fill = document.getElementById('statFill');
    bar.style.display = 'flex';
    const pct = Math.min(100, Math.round((data.total / data.minRequired) * 100));
    fill.style.width = pct + '%';
    text.textContent = data.unlocked
      ? `${data.total} moun enskri — download disponib!`
      : `${data.total}/${data.minRequired} moun enskri pou debloke download`;
  } catch (e) { /* silans */ }
}
loadStats();
