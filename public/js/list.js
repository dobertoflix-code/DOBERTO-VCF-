let currentPage = 1;
let totalPages = 1;

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
  const body = document.getElementById('listBody');
  body.innerHTML = '';
  data.list.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.country_name || '—')}</td>`;
    body.appendChild(tr);
  });
  totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  currentPage = page;
  document.getElementById('pageInfo').textContent = `Paj ${currentPage}/${totalPages} · ${data.total} moun`;
  document.getElementById('prevBtn').disabled = currentPage <= 1;
  document.getElementById('nextBtn').disabled = currentPage >= totalPages;
}

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

document.getElementById('prevBtn').addEventListener('click', () => { if (currentPage > 1) loadList(currentPage - 1); });
document.getElementById('nextBtn').addEventListener('click', () => { if (currentPage < totalPages) loadList(currentPage + 1); });

loadList(1);

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
  dlBtn.textContent = 'Ap verifye...';

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
      dlMsg.textContent = 'Verifikasyon reyisi! Download ap kòmanse...';
      dlMsg.className = 'msg show ok';
      window.location.href = `/api/download-vcf?token=${encodeURIComponent(data.downloadToken)}`;
    }
  } catch (err) {
    dlMsg.textContent = 'Pa gen koneksyon ak sèvè a.';
    dlMsg.className = 'msg show err';
  } finally {
    dlBtn.disabled = false;
    dlBtn.textContent = 'Verifye & Download';
  }
});
