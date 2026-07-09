// DOBERTO VCF — Ti ikòn SVG ki ranplase emoji nan non moun yo
// Chak "kle" (star, crown, elatriye) koresponn ak yon ikòn ki anrejistre nan
// kolòn "icon" nan Supabase pou chak moun ki enskri.

const DOBERTO_ICONS = {
  star:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.6l-5.3 4.8L18.2 22 12 17.9 5.8 22l1.5-7.6L2 9.6l7.1-.7L12 2z"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.5l4.2 2.8L12 5l4.8 6.3L21 8.5l-1.8 10.5H4.8L3 8.5zM5.2 21h13.6v1.8H5.2V21z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  fire:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 2c.8 3-1.7 4.3-2 6.8-.2 1.6 1 2.7 2.3 2.2 1-.4 1-1.6 1.2-2.4 1.4 1.6 2.5 3.4 2.5 5.7 0 3.7-3 6.7-6.7 6.7S2.9 18 3 14.3c.1-3.6 2.3-5 4-7.6C8.4 4.7 10.3 3 12.5 2z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.1-4.4-9.6-8.6C.8 9 2.4 5.3 6 4.8c2.1-.3 3.6 1 4 2 .4-1 1.9-2.3 4-2 3.6.5 5.2 4.2 3.6 7.6C19.1 16.6 12 21 12 21z"/></svg>',
  ninja: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2c3.9 0 7 2.6 7 6.2v1.8c0 .8-.4 1.5-1 1.9v.4c0 3-2.7 5.3-6 5.3s-6-2.3-6-5.3v-.4c-.6-.4-1-1.1-1-1.9V9.4c0-3.6 3.1-6.2 7-6.2zM9.3 11.2a1 1 0 100 2 1 1 0 000-2zm5.4 0a1 1 0 100 2 1 1 0 000-2z"/></svg>',
  vip:   '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><text x="12" y="15.5" font-size="8" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">VIP</text></svg>',
  flag:  '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7.5" fill="#00209F" rx="1.5"/><rect x="3" y="11.5" width="18" height="8.5" fill="#D21034" rx="1.5"/></svg>'
};

// Lis etikèt ki afiche nan yon <select> pou admin chwazi yon ikòn
const DOBERTO_ICON_LABELS = [
  { value: '',      label: '— Okenn ikòn —' },
  { value: 'star',  label: '⭐ Zetwal' },
  { value: 'crown', label: '👑 Kouwòn' },
  { value: 'check', label: '✔️ Verifye' },
  { value: 'fire',  label: '🔥 Dife' },
  { value: 'heart', label: '❤️ Kè' },
  { value: 'ninja', label: '🥷 Ninja' },
  { value: 'vip',   label: '💎 VIP' },
  { value: 'flag',  label: '🇭🇹 Drapo Ayiti' }
];

// Retounen yon ti <span> ki gen ikòn SVG la (oswa "" si pa gen ikòn)
function dobertoIconSvg(key) {
  if (!key || !DOBERTO_ICONS[key]) return '';
  return `<span class="doberto-icon" title="${key}">${DOBERTO_ICONS[key]}</span>`;
}

// Ranpli yon <select> ak tout opsyon ikòn yo, epi chwazi youn si l pase
function fillIconSelect(selectEl, selectedValue) {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  DOBERTO_ICON_LABELS.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    if (opt.value === (selectedValue || '')) o.selected = true;
    selectEl.appendChild(o);
  });
}
