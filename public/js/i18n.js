// DOBERTO VCF — Sistèm 3 lang: Kreyòl Ayisyen (ht), English (en), Français (fr)

const I18N = {
  ht: {
    nav_register: "Anrejistre",
    nav_list: "Lis moun",
    nav_admin: "Admin",

    // index.html
    hero_title_1: "Antre nan rezo a,",
    hero_title_2: "fè yo wè status ou",
    hero_desc: "Anrejistre non ou ak nimewo WhatsApp ou pou plis moun ka gen kontak ou epi wè status ou. Ou kapab download tout lis la lè n rive nan objektif la.",
    label_name: "Non konplè",
    ph_name: "Egzanp: Jean Baptiste",
    label_email: "Email (opsyonèl)",
    ph_email: "egzanp@gmail.com",
    label_phone: "Nimewo WhatsApp",
    ph_phone: "Nimewo san kòd peyi",
    hint_choose_country: "Chwazi peyi ou anwo a.",
    hint_exact: "Nimewo sa a dwe gen egzakteman {n} chif (san kòd peyi a).",
    hint_generic: "Antre nimewo w la san kòd peyi a.",
    btn_register: "Anrejistre m",
    btn_sending: "Ap voye...",
    footer_note: "DOBERTO VCF — Fèt pa Doberto Mr Lit. Nimewo yo pa janm afiche piblikman.",
    stat_locked: "{total}/{min} moun enskri pou debloke download",
    stat_unlocked: "{total} moun enskri — download disponib!",

    // list.html
    list_title_1: "Moun ki",
    list_title_2: "deja enskri",
    list_desc: "Pou pwoteje vi prive tout moun, nimewo yo pa afiche isit la — sèlman non yo.",
    th_name: "Non",
    th_country: "Peyi",
    th_email: "Email",
    th_phone: "Nimewo",
    pager_prev: "← Anvan",
    pager_next: "Apre →",
    page_info: "Paj {page}/{total} · {count} moun",
    dl_title: "Download fichye VCF la",
    dl_desc: "Ou dwe te anrejistre deja (ak menm non ak nimewo a) pou w ka download. Fichye a disponib sèlman lè gen omwen {min} moun enskri, e li ka gen maksimòm {max} kontak.",
    label_dl_name: "Non ou te anrejistre a",
    label_dl_phone: "Nimewo ou te anrejistre a",
    btn_verify: "Verifye & Download",
    btn_verifying: "Ap verifye...",

    // admin.html
    admin_login_title: "Koneksyon Admin",
    label_password: "Modpas admin",
    btn_login: "Konekte",
    admin_list_title: "Tout moun ki enskri",
    btn_logout: "Dekonekte",
    search_placeholder: "Chèche pa non...",
    btn_export: "Ekspòte tout an CSV",
    footer_admin: "DOBERTO VCF — Zòn admin sèlman. Aksè restrenn."
  },

  en: {
    nav_register: "Register",
    nav_list: "Members",
    nav_admin: "Admin",

    hero_title_1: "Join the network,",
    hero_title_2: "get seen on status",
    hero_desc: "Register your name and WhatsApp number so more people can add you and see your status. You'll be able to download the full list once we hit the goal.",
    label_name: "Full name",
    ph_name: "e.g. Jean Baptiste",
    label_email: "Email (optional)",
    ph_email: "example@gmail.com",
    label_phone: "WhatsApp number",
    ph_phone: "Number without country code",
    hint_choose_country: "Choose your country above.",
    hint_exact: "This number must have exactly {n} digits (without the country code).",
    hint_generic: "Enter your number without the country code.",
    btn_register: "Register me",
    btn_sending: "Sending...",
    footer_note: "DOBERTO VCF — Built by Doberto Mr Lit. Numbers are never shown publicly.",
    stat_locked: "{total}/{min} people registered to unlock download",
    stat_unlocked: "{total} people registered — download available!",

    list_title_1: "People",
    list_title_2: "already registered",
    list_desc: "To protect everyone's privacy, numbers aren't shown here — only names.",
    th_name: "Name",
    th_country: "Country",
    th_email: "Email",
    th_phone: "Number",
    pager_prev: "← Previous",
    pager_next: "Next →",
    page_info: "Page {page}/{total} · {count} people",
    dl_title: "Download the VCF file",
    dl_desc: "You must already be registered (with the same name and number) to download. The file is only available once at least {min} people have registered, and it's capped at {max} contacts.",
    label_dl_name: "The name you registered with",
    label_dl_phone: "The number you registered with",
    btn_verify: "Verify & Download",
    btn_verifying: "Verifying...",

    admin_login_title: "Admin Login",
    label_password: "Admin password",
    btn_login: "Log in",
    admin_list_title: "All registered people",
    btn_logout: "Log out",
    search_placeholder: "Search by name...",
    btn_export: "Export all as CSV",
    footer_admin: "DOBERTO VCF — Admin area only. Restricted access."
  },

  fr: {
    nav_register: "S'inscrire",
    nav_list: "Membres",
    nav_admin: "Admin",

    hero_title_1: "Rejoins le réseau,",
    hero_title_2: "fais voir ton statut",
    hero_desc: "Enregistre ton nom et ton numéro WhatsApp pour que plus de personnes puissent t'ajouter et voir ton statut. Tu pourras télécharger la liste complète une fois l'objectif atteint.",
    label_name: "Nom complet",
    ph_name: "ex : Jean Baptiste",
    label_email: "Email (optionnel)",
    ph_email: "exemple@gmail.com",
    label_phone: "Numéro WhatsApp",
    ph_phone: "Numéro sans l'indicatif",
    hint_choose_country: "Choisis ton pays ci-dessus.",
    hint_exact: "Ce numéro doit contenir exactement {n} chiffres (sans l'indicatif).",
    hint_generic: "Entre ton numéro sans l'indicatif du pays.",
    btn_register: "M'inscrire",
    btn_sending: "Envoi...",
    footer_note: "DOBERTO VCF — Créé par Doberto Mr Lit. Les numéros ne sont jamais affichés publiquement.",
    stat_locked: "{total}/{min} personnes inscrites pour débloquer le téléchargement",
    stat_unlocked: "{total} personnes inscrites — téléchargement disponible !",

    list_title_1: "Personnes",
    list_title_2: "déjà inscrites",
    list_desc: "Pour protéger la vie privée de tous, les numéros ne sont pas affichés ici — seulement les noms.",
    th_name: "Nom",
    th_country: "Pays",
    th_email: "Email",
    th_phone: "Numéro",
    pager_prev: "← Précédent",
    pager_next: "Suivant →",
    page_info: "Page {page}/{total} · {count} personnes",
    dl_title: "Télécharger le fichier VCF",
    dl_desc: "Tu dois déjà être inscrit (avec le même nom et numéro) pour télécharger. Le fichier n'est disponible qu'à partir de {min} personnes inscrites, et il est limité à {max} contacts.",
    label_dl_name: "Le nom utilisé pour l'inscription",
    label_dl_phone: "Le numéro utilisé pour l'inscription",
    btn_verify: "Vérifier & Télécharger",
    btn_verifying: "Vérification...",

    admin_login_title: "Connexion Admin",
    label_password: "Mot de passe admin",
    btn_login: "Se connecter",
    admin_list_title: "Toutes les personnes inscrites",
    btn_logout: "Se déconnecter",
    search_placeholder: "Rechercher par nom...",
    btn_export: "Exporter tout en CSV",
    footer_admin: "DOBERTO VCF — Zone admin uniquement. Accès restreint."
  }
};

function t(key, vars) {
  const lang = window.currentLang || 'ht';
  let str = (I18N[lang] && I18N[lang][key]) || (I18N.ht[key]) || key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  }
  return str;
}

function applyLang(lang) {
  window.currentLang = lang;
  localStorage.setItem('doberto_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });

  const sel = document.getElementById('langSelect');
  if (sel) sel.value = lang;

  if (typeof onLangChange === 'function') onLangChange(lang);
}

function initLang() {
  const saved = localStorage.getItem('doberto_lang');
  const lang = saved && I18N[saved] ? saved : 'ht';
  applyLang(lang);
  const sel = document.getElementById('langSelect');
  if (sel) {
    sel.addEventListener('change', (e) => applyLang(e.target.value));
  }
}

document.addEventListener('DOMContentLoaded', initLang);
