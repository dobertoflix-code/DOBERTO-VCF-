let adminToken = sessionStorage.getItem('doberto_admin_token') || null;
let aPage = 1, aTotalPages = 1, searchTerm = '';
let lastAdminData = null;

const loginPanel = document.getElementById('loginPanel');
const adminPanel = document.getElementById('adminPanel');

function showAdminPanel() {
  loginPanel.style.display = 'none';
  adminPanel.style.display = 'block';
  loadAdminList(1);
}

if (adminToken) showAdminPanel();

document.getElementById('loginBtn').addEventListener('click', async () => {
  const pw = document.getElementById('pw').value;
  const msg = document.getElementById('loginMsg');
  msg.className = 'msg';
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    const data = await res.json();
    if (!res.ok) {
      msg.textContent = data.error || 'Modpas pa kòrèk.';
      msg.className = 'msg show err';
      return;
    }
    adminToken = data.token;
    sessionStorage.setItem('doberto_admin_token', adminToken);
    showAdminPanel();
  } catch (e) {
    msg.textContent = 'Pa gen koneksyon ak sèvè a.';
    msg.className = 'msg show err';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('doberto_admin_token');
  adminToken = null;
  adminPanel.style.display = 'none';
  loginPanel.style.display = 'block';
});

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

async function loadAdminList(page) {
  const res = await fetch(`/api/admin/list?page=${page}&search=${encodeURIComponent(searchTerm)}`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  if (res.status === 401) {
    document.getElementById('logoutBtn').click();
    return;
  }
  const data = await res.json();
  lastAdminData = data;
  aTotalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  aPage = page;
  renderAdminList();
}

function renderAdminList() {
  if (!lastAdminData) return;
  const body = document.getElementById('adminBody');
  body.innerHTML = '';
  lastAdminData.list.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><div class="name-cell"><span class="avatar">${initials(row.name)}</span>${escapeHtml(row.name)}</div></td><td>${escapeHtml(row.email || '—')}</td><td>${escapeHtml(row.country_name || '—')}</td><td>+${row.full_number}</td>`;
    body.appendChild(tr);
  });
  document.getElementById('aPageInfo').textContent = t('page_info', { page: aPage, total: aTotalPages, count: lastAdminData.total });
  document.getElementById('aPrev').disabled = aPage <= 1;
  document.getElementById('aNext').disabled = aPage >= aTotalPages;
}

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

document.getElementById('aPrev').addEventListener('click', () => { if (aPage > 1) loadAdminList(aPage - 1); });
document.getElementById('aNext').addEventListener('click', () => { if (aPage < aTotalPages) loadAdminList(aPage + 1); });

let searchTimer;
document.getElementById('searchBox').addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchTerm = e.target.value.trim();
    loadAdminList(1);
  }, 300);
});

document.getElementById('exportBtn').addEventListener('click', () => {
  window.location.href = `/api/admin/export-csv?token=${encodeURIComponent(adminToken)}`;
});

function onLangChange() {
  renderAdminList();
}
