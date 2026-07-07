// DOBERTO VCF — Selektè peyi pwofesyonèl (drapo + rechèch), layer sou <select> orijinal la
// pou pa kraze lojik ki deja egziste nan app.js/list.js (dialSelect.value, textContent, event 'change').

function isoToFlagEmoji(iso) {
  if (!iso || iso.length !== 2) return '🏳️';
  const codePoints = [...iso.toUpperCase()].map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function enhancePhoneSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select || select.dataset.enhanced) return;
  select.dataset.enhanced = '1';
  select.style.display = 'none';

  const wrap = document.createElement('div');
  wrap.className = 'country-select';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'country-trigger';
  trigger.innerHTML =
    '<span class="flag"></span>' +
    '<span class="dial-code"></span>' +
    '<svg class="chev" width="10" height="6" viewBox="0 0 10 6" fill="none">' +
    '<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const panel = document.createElement('div');
  panel.className = 'country-panel';
  panel.hidden = true;
  panel.innerHTML =
    '<input type="text" class="country-search" />' +
    '<div class="country-list"></div>';

  wrap.appendChild(trigger);
  wrap.appendChild(panel);
  select.parentNode.insertBefore(wrap, select.nextSibling);

  const listEl = panel.querySelector('.country-list');
  const searchEl = panel.querySelector('.country-search');
  const flagEl = trigger.querySelector('.flag');
  const codeEl = trigger.querySelector('.dial-code');

  searchEl.placeholder = (typeof t === 'function') ? t('country_search_ph') : 'Search a country...';

  function renderList(filter) {
    const f = (filter || '').trim().toLowerCase();
    listEl.innerHTML = '';
    COUNTRIES.forEach((c, idx) => {
      if (f && !c.name.toLowerCase().includes(f) && !c.dial.includes(f)) return;
      const item = document.createElement('div');
      item.className = 'country-item';
      if (idx === select.selectedIndex) item.classList.add('active');
      item.innerHTML =
        `<span class="flag">${isoToFlagEmoji(c.iso)}</span>` +
        `<span class="c-name">${c.name}</span>` +
        `<span class="c-dial">+${c.dial}</span>`;
      item.addEventListener('click', () => {
        select.selectedIndex = idx;
        updateTrigger();
        select.dispatchEvent(new Event('change'));
        closePanel();
      });
      listEl.appendChild(item);
    });
  }

  function updateTrigger() {
    const c = COUNTRIES[select.selectedIndex] || COUNTRIES[0];
    flagEl.textContent = isoToFlagEmoji(c.iso);
    codeEl.textContent = '+' + c.dial;
  }

  function outsideClick(e) {
    if (!wrap.contains(e.target)) closePanel();
  }

  function openPanel() {
    panel.hidden = false;
    trigger.classList.add('open');
    searchEl.value = '';
    renderList('');
    setTimeout(() => searchEl.focus(), 0);
    document.addEventListener('click', outsideClick, true);
  }

  function closePanel() {
    panel.hidden = true;
    trigger.classList.remove('open');
    document.removeEventListener('click', outsideClick, true);
  }

  trigger.addEventListener('click', () => {
    if (panel.hidden) openPanel(); else closePanel();
  });
  searchEl.addEventListener('input', () => renderList(searchEl.value));
  searchEl.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) closePanel();
  });

  updateTrigger();
}
