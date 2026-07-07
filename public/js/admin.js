let adminToken = sessionStorage.getItem('doberto_admin_token') || null;
let aPage = 1, aTotalPages = 1, searchTerm = '';
let lastAdminData = null;

const loginPanel = document.getElementById('loginPanel');
const adminPanel = document.getElementById('adminPanel');

// ---------- Modal edit: konfigirasyon inisyal ----------
const editDial = document.getElementById('editDial');
COUNTRIES.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.dial;
  opt.textContent = `${c.name} (+${c.dial})`;
  editDial.appendChild(opt);
});
enhancePhoneSelect('editDial');
fillIconSelect(document.getElementById('editIcon'), '');

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
      msg.textContent = errT(data, 'err_admin_password_incorrect');
      msg.className = 'msg show err';
      return;
    }
    adminToken = data.token;
    sessionStorage.setItem('doberto_admin_token', adminToken);
    showAdminPanel();
  } catch (e) {
    msg.textContent = t('err_no_connection');
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
    tr.innerHTML = `<td><div class="name-cell"><span class="avatar">${initials(row.name)}</span>${escapeHtml(row.display_name || row.name)}${dobertoIconSvg(row.icon)}</div></td><td>${escapeHtml(row.email || '—')}</td><td>${escapeHtml(row.country_name || '—')}</td><td>+${row.full_number}</td><td><div class="row-actions"><button type="button" class="icon-btn edit-btn" data-edit="${row.id}" data-i18n="btn_edit">Modifye</button><button type="button" class="icon-btn delete-btn" data-delete="${row.id}" data-i18n="btn_delete">Suprime</button></div></td>`;
    body.appendChild(tr);
  });
  document.getElementById('aPageInfo').textContent = t('page_info', { page: aPage, total: aTotalPages, count: lastAdminData.total });
  document.getElementById('aPrev').disabled = aPage <= 1;
  document.getElementById('aNext').disabled = aPage >= aTotalPages;

  body.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.getAttribute('data-edit')));
  });
  body.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteRegistration(btn.getAttribute('data-delete')));
  });
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

// ---------- Modifye yon moun ----------
const editOverlay = document.getElementById('editOverlay');
const editForm = document.getElementById('editForm');
const editMsg = document.getElementById('editMsg');

function findRowById(id) {
  if (!lastAdminData) return null;
  return lastAdminData.list.find(r => String(r.id) === String(id)) || null;
}

function openEditModal(id) {
  const row = findRowById(id);
  if (!row) return;

  editMsg.className = 'msg';
  document.getElementById('editId').value = row.id;
  document.getElementById('editName').value = row.name;
  document.getElementById('editPhone').value = row.phone || '';
  editDial.value = row.dial_code || '509';
  editDial.dispatchEvent(new Event('change'));
  fillIconSelect(document.getElementById('editIcon'), row.icon || '');

  editOverlay.hidden = false;
}

function closeEditModal() {
  editOverlay.hidden = true;
}

document.getElementById('editCancelBtn').addEventListener('click', closeEditModal);
editOverlay.addEventListener('click', (e) => {
  if (e.target === editOverlay) closeEditModal();
});

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  editMsg.className = 'msg';

  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const dialCode = editDial.value;
  const phone = document.getElementById('editPhone').value.replace(/\D/g, '');
  const icon = document.getElementById('editIcon').value;

  const saveBtn = document.getElementById('editSaveBtn');
  saveBtn.disabled = true;
  saveBtn.textContent = t('btn_saving');

  try {
    const res = await fetch(`/api/admin/update/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ name, dialCode, phone, icon })
    });
    const data = await res.json();
    if (res.status === 401) {
      document.getElementById('logoutBtn').click();
      return;
    }
    if (!res.ok) {
      editMsg.textContent = errT(data);
      editMsg.className = 'msg show err';
      return;
    }
    closeEditModal();
    loadAdminList(aPage);
  } catch (err) {
    editMsg.textContent = t('err_no_connection');
    editMsg.className = 'msg show err';
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = t('btn_save');
  }
});

// ---------- Suprime yon moun ----------
async function deleteRegistration(id) {
  const row = findRowById(id);
  const name = row ? row.name : '';
  if (!confirm(t('confirm_delete', { name }))) return;

  try {
    const res = await fetch(`/api/admin/delete/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (res.status === 401) {
      document.getElementById('logoutBtn').click();
      return;
    }
    if (!res.ok) {
      const data = await res.json();
      alert(errT(data));
      return;
    }
    loadAdminList(aPage);
  } catch (err) {
    alert(t('err_no_connection'));
  }
}
