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
    sponsor_desc: "Ofri espesyal pou ou jodi a 👇",
    sponsor_btn: "🎁 Gade ofri a",

    // capacity banner
    capacity_label: "Objektif kolèkte",
    capacity_people: "moun",

    // tour gide
    tour_step_of: "Etap {n}/{total}",
    tour_next: "Kontinye",
    tour_done: "Konprann, ann kòmanse",
    tour_skip: "Sote gid la",
    tour1_title: "Byenveni sou DOBERTO VCF",
    tour1_desc: "Sit sa a fèt pou ranmase non ak nimewo WhatsApp moun ki enterese pou yo ka gen kontak ou epi wè status ou.",
    tour2_title: "Objektif kolèkte a",
    tour2_desc: "Ba sa a montre konbyen moun ki deja enskri parapò ak objektif final la — jiska 50 000 moun nan fichye VCF la.",
    tour3_title: "Zòn enskripsyon an",
    tour3_desc: "Ekri non w, chwazi peyi w, epi antre nimewo WhatsApp ou isit la pou w enskri.",
    tour4_title: "Zòn debloke download",
    tour4_desc: "Lè nou rive nan minimòm moun ki nesesè a, w ap ka telechaje tout lis kontak yo an fichye VCF.",
    tour5_title: "Gade lis moun yo",
    tour5_desc: "Klike isit la nenpòt lè pou wè non moun ki deja enskri sou sit la.",

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
    footer_admin: "DOBERTO VCF — Zòn admin sèlman. Aksè restrenn.",
    th_actions: "Aksyon",
    btn_edit: "Modifye",
    btn_delete: "Suprime",
    edit_modal_title: "Modifye moun sa a",
    label_icon: "Ikòn (ranplase emoji)",
    btn_cancel: "Anile",
    btn_save: "Sove chanjman",
    btn_saving: "Ap sove...",
    confirm_delete: "Ou sèten ou vle suprime {name}? Aksyon sa a pa ka anile.",
    msg_update_success: "Chanjman yo sove!",
    err_duplicate_number: "Yon lòt moun deja gen nimewo sa a.",
    err_not_found: "Nou pa jwenn moun sa a.",

    // peyi (country picker)
    country_search_ph: "Chèche yon peyi...",

    // mesaj siksè
    msg_register_success: "Enskripsyon ou reyisi!",
    msg_verified: "Verifye! W ap resevwa fichye a...",

    // erè (kòd sèvè yo tradwi la a, pou tout lang sinkronize)
    err_generic: "Yon erè rive.",
    err_no_connection: "Pa gen koneksyon ak sèvè a. Eseye ankò.",
    err_server_error: "Yon erè sèvè rive. Eseye ankò.",
    err_name_invalid: "Tanpri antre yon non valid.",
    err_country_required: "Chwazi peyi/kòd peyi a.",
    err_phone_required: "Tanpri antre nimewo a.",
    err_email_invalid: "Email lan pa valid.",
    err_ht_phone_length: "Nimewo Ayisyen an dwe gen egzakteman 8 chif (san 509).",
    err_phone_format: "Nimewo a pa gen yon fòma valid.",
    err_already_registered: "Nimewo sa a deja anrejistre.",
    err_download_locked: "Download lan bloke toujou. Fòk gen omwen {min} moun enskri ({count}/{min} kounye a).",
    err_no_match: "Nou pa jwenn okenn moun ki enskri ak non ak nimewo sa yo. Fòk ou te anrejistre deja pou w ka download.",
    err_missing_token: "Manke token download.",
    err_invalid_token: "Token download lan pa valid oswa li ekspire.",
    err_admin_password_incorrect: "Modpas admin lan pa kòrèk.",
    err_admin_login_required: "Ou dwe konekte kòm admin.",
    err_admin_session_expired: "Sesyon admin ekspire, konekte ankò.",

    // popup enstalasyon
    install_badge: "Rekòmande pou Android",
    install_title: "Enstale DOBERTO VCF",
    install_desc: "Ajoute app la sou ekran akèy ou — gratis, san Play Store, mizajou otomatik.",
    install_feat1_title: "Aksè enstantane",
    install_feat1_desc: "Louvri DOBERTO VCF dirèkteman soti nan ekran akèy ou.",
    install_feat2_title: "Plen ekran",
    install_feat2_desc: "Pa gen bar adrès — tankou yon vrè app.",
    install_feat3_title: "Pi rapid",
    install_feat3_desc: "Chaje pi vit chak fwa ou louvri l.",
    install_btn: "Enstale Aplikasyon an",
    install_later: "Pita"
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
    sponsor_desc: "Special offer for you today 👇",
    sponsor_btn: "🎁 See the offer",

    capacity_label: "Collection goal",
    capacity_people: "people",

    tour_step_of: "Step {n}/{total}",
    tour_next: "Next",
    tour_done: "Got it, let's start",
    tour_skip: "Skip tour",
    tour1_title: "Welcome to DOBERTO VCF",
    tour1_desc: "This site collects the names and WhatsApp numbers of people interested in connecting with you and viewing your status.",
    tour2_title: "The collection goal",
    tour2_desc: "This bar shows how many people are registered against the final goal — up to 50,000 people in the VCF file.",
    tour3_title: "Registration area",
    tour3_desc: "Enter your name, pick your country, and add your WhatsApp number here to register.",
    tour4_title: "Unlock area",
    tour4_desc: "Once we reach the minimum number of people needed, you'll be able to download the full contact list as a VCF file.",
    tour5_title: "See the people list",
    tour5_desc: "Click here anytime to see the names of people already registered.",

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
    footer_admin: "DOBERTO VCF — Admin area only. Restricted access.",
    th_actions: "Actions",
    btn_edit: "Edit",
    btn_delete: "Delete",
    edit_modal_title: "Edit this person",
    label_icon: "Icon (replaces emoji)",
    btn_cancel: "Cancel",
    btn_save: "Save changes",
    btn_saving: "Saving...",
    confirm_delete: "Are you sure you want to delete {name}? This action can't be undone.",
    msg_update_success: "Changes saved!",
    err_duplicate_number: "Another person already has this number.",
    err_not_found: "We couldn't find that person.",

    country_search_ph: "Search a country...",

    msg_register_success: "Your registration was successful!",
    msg_verified: "Verified! Downloading your file...",

    err_generic: "An error occurred.",
    err_no_connection: "No connection to the server. Try again.",
    err_server_error: "A server error occurred. Try again.",
    err_name_invalid: "Please enter a valid name.",
    err_country_required: "Choose your country/dial code.",
    err_phone_required: "Please enter your number.",
    err_email_invalid: "The email isn't valid.",
    err_ht_phone_length: "The Haitian number must have exactly 8 digits (without 509).",
    err_phone_format: "The number isn't in a valid format.",
    err_already_registered: "This number is already registered.",
    err_download_locked: "Download is still locked. At least {min} people must be registered ({count}/{min} right now).",
    err_no_match: "We couldn't find anyone registered with that name and number. You must already be registered to download.",
    err_missing_token: "Missing download token.",
    err_invalid_token: "The download token is invalid or expired.",
    err_admin_password_incorrect: "Incorrect admin password.",
    err_admin_login_required: "You must log in as admin.",
    err_admin_session_expired: "Admin session expired, log in again.",

    install_badge: "Recommended for Android",
    install_title: "Install DOBERTO VCF",
    install_desc: "Add the app to your home screen — free, no Play Store, auto-updates.",
    install_feat1_title: "Instant access",
    install_feat1_desc: "Open DOBERTO VCF straight from your home screen.",
    install_feat2_title: "Full screen",
    install_feat2_desc: "No address bar — feels like a real app.",
    install_feat3_title: "Faster",
    install_feat3_desc: "Loads quicker every time you open it.",
    install_btn: "Install App",
    install_later: "Later"
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
    sponsor_desc: "Offre spéciale pour toi aujourd'hui 👇",
    sponsor_btn: "🎁 Voir l'offre",

    capacity_label: "Objectif de collecte",
    capacity_people: "personnes",

    tour_step_of: "Étape {n}/{total}",
    tour_next: "Suivant",
    tour_done: "Compris, on commence",
    tour_skip: "Passer le guide",
    tour1_title: "Bienvenue sur DOBERTO VCF",
    tour1_desc: "Ce site collecte les noms et numéros WhatsApp des personnes intéressées pour te contacter et voir ton statut.",
    tour2_title: "L'objectif de collecte",
    tour2_desc: "Cette barre montre combien de personnes sont inscrites par rapport à l'objectif final — jusqu'à 50 000 personnes dans le fichier VCF.",
    tour3_title: "Zone d'inscription",
    tour3_desc: "Entre ton nom, choisis ton pays et ajoute ton numéro WhatsApp ici pour t'inscrire.",
    tour4_title: "Zone de déblocage",
    tour4_desc: "Une fois le minimum de personnes requis atteint, tu pourras télécharger la liste complète des contacts en fichier VCF.",
    tour5_title: "Voir la liste des personnes",
    tour5_desc: "Clique ici à tout moment pour voir les noms des personnes déjà inscrites.",

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
    footer_admin: "DOBERTO VCF — Zone admin uniquement. Accès restreint.",
    th_actions: "Actions",
    btn_edit: "Modifier",
    btn_delete: "Supprimer",
    edit_modal_title: "Modifier cette personne",
    label_icon: "Icône (remplace l'emoji)",
    btn_cancel: "Annuler",
    btn_save: "Enregistrer",
    btn_saving: "Enregistrement...",
    confirm_delete: "Es-tu sûr de vouloir supprimer {name} ? Cette action est irréversible.",
    msg_update_success: "Modifications enregistrées !",
    err_duplicate_number: "Une autre personne a déjà ce numéro.",
    err_not_found: "Nous n'avons pas trouvé cette personne.",

    country_search_ph: "Rechercher un pays...",

    msg_register_success: "Ton inscription a réussi !",
    msg_verified: "Vérifié ! Téléchargement en cours...",

    err_generic: "Une erreur est survenue.",
    err_no_connection: "Pas de connexion au serveur. Réessaie.",
    err_server_error: "Une erreur serveur est survenue. Réessaie.",
    err_name_invalid: "Merci d'entrer un nom valide.",
    err_country_required: "Choisis ton pays/indicatif.",
    err_phone_required: "Merci d'entrer ton numéro.",
    err_email_invalid: "L'email n'est pas valide.",
    err_ht_phone_length: "Le numéro haïtien doit contenir exactement 8 chiffres (sans le 509).",
    err_phone_format: "Le numéro n'a pas un format valide.",
    err_already_registered: "Ce numéro est déjà inscrit.",
    err_download_locked: "Le téléchargement est encore verrouillé. Il faut au moins {min} personnes inscrites ({count}/{min} actuellement).",
    err_no_match: "Nous n'avons trouvé personne inscrit avec ce nom et ce numéro. Tu dois déjà être inscrit pour télécharger.",
    err_missing_token: "Jeton de téléchargement manquant.",
    err_invalid_token: "Le jeton de téléchargement est invalide ou expiré.",
    err_admin_password_incorrect: "Mot de passe admin incorrect.",
    err_admin_login_required: "Tu dois te connecter en tant qu'admin.",
    err_admin_session_expired: "Session admin expirée, reconnecte-toi.",

    install_badge: "Recommandé pour Android",
    install_title: "Installez DOBERTO VCF",
    install_desc: "Ajoutez l'app à votre écran d'accueil — gratuit, sans Play Store, mise à jour automatique.",
    install_feat1_title: "Accès instantané",
    install_feat1_desc: "Lancez DOBERTO VCF directement depuis votre écran d'accueil.",
    install_feat2_title: "Plein écran",
    install_feat2_desc: "Sans barre d'adresse — comme une vraie app.",
    install_feat3_title: "Plus rapide",
    install_feat3_desc: "Chargement plus rapide à chaque ouverture.",
    install_btn: "Installer l'application",
    install_later: "Plus tard"
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

// Tradwi yon erè ki soti nan sèvè a (ki gen yon "code" + "vars" opsyonèl)
// nan lang aktyèl la, kèlkeswa lang moun nan chwazi.
function errT(data, fallbackKey) {
  if (data && data.code) {
    const key = 'err_' + String(data.code).toLowerCase();
    if (I18N.ht[key]) return t(key, data.vars);
  }
  return (data && data.error) || t(fallbackKey || 'err_generic');
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
