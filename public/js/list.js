let currentPage = 1;
let totalPages = 1;
let lastListData = null;
let lastStats = null;

const dlDial = document.getElementById('dlDial');
COUNTRIES.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.dial;
  opt.textContent = `${c.name} (+${c.dial})`;
  dlDial.appendChild(opt);
});
dlDial.value = '509';

async function loadList(page) {
  const res = await fetch(`/api/public-list?page=${page}`);
  const data = await res.json();
  lastListData = data;
  currentPage = page;
  totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  renderList();
}

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function renderList() {
  if (!lastListData) return;
  const body = document.getElementById('listBody');
  body.innerHTML = '';
  lastListData.list.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div class="name-cell"><span class="avatar">${initials(row.name)}</span>${escapeHtml(row.name)}</div></td><td>${escapeHtml(row.country_name || '—')}</td>`;
    body.appendChild(tr);
  });
  document.getElementById('pageInfo').textContent = t('page_info', { page: currentPage, total: totalPages, count: lastListData.total });
  document.getElementById('prevBtn').disabled = currentPage <= 1;
  document.getElementById('nextBtn').disabled = currentPage >= totalPages;
}

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

document.getElementById('prevBtn').addEventListener('click', () => { if (currentPage > 1) loadList(currentPage - 1); });
document.getElementById('nextBtn').addEventListener('click', () => { if (currentPage < totalPages) loadList(currentPage + 1); });

loadList(1);

async function loadStatsForDesc() {
  try {
    const res = await fetch('/api/stats');
    lastStats = await res.json();
    renderDlDesc();
  } catch (e) { /* silans */ }
}
loadStatsForDesc();

function renderDlDesc() {
  const el = document.getElementById('dlDescText');
  if (!el) return;
  const min = lastStats ? lastStats.minRequired : 500;
  const max = lastStats ? lastStats.maxInFile : 50000;
  el.textContent = t('dl_desc', { min, max });
}

function onLangChange() {
  renderList();
  renderDlDesc();
}

// ---------- Download verification ----------
const dlForm = document.getElementById('dlForm');
const dlMsg = document.getElementById('dlMsg');
const dlBtn = document.getElementById('dlBtn');

dlForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  dlMsg.className = 'msg';
  const name = document.getElementById('dlName').value.trim();
  const dialCode = dlDial.value;
  const phone = document.getElementById('dlPhone').value.replace(/\D/g, '');

  dlBtn.disabled = true;
  dlBtn.textContent = t('btn_verifying');

  try {
    const res = await fetch('/api/verify-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, dialCode, phone })
    });
    const data = await res.json();
    if (!res.ok) {
      dlMsg.textContent = data.error || 'Verifikasyon echwe.';
      dlMsg.className = 'msg show err';
    } else {
      dlMsg.textContent = 'OK';
      dlMsg.className = 'msg show ok';
      window.location.href = `/api/download-vcf?token=${encodeURIComponent(data.downloadToken)}`;
    }
  } catch (err) {
    dlMsg.textContent = 'Pa gen koneksyon ak sèvè a.';
    dlMsg.className = 'msg show err';
  } finally {
    dlBtn.disabled = false;
    dlBtn.textContent = t('btn_verify');
  }
});
