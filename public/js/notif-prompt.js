// DOBERTO VCF — Popup "Aktive Notifikasyon yo"
// Parèt apre popup enstalasyon an fèmen (oswa apre yon ti tan si popup
// enstalasyon an pa t menm parèt). Konekte ak OneSignal pou mande
// pèmisyon push nòmalman (pa gen fo bouton).

(function () {
  const CHAIN_DELAY_MS = 700;     // tan apre popup enstalasyon fèmen
  const FALLBACK_DELAY_MS = 4200; // si popup enstalasyon pa janm parèt
  const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 3; // 3 jou si "Pita"
  const LS_DISMISSED = 'dv_notif_dismissed_until';
  const LS_SUBSCRIBED = 'dv_notif_subscribed';

  const overlay = document.getElementById('notifOverlay');
  if (!overlay) return;

  const btnAction = document.getElementById('notifActionBtn');
  const btnLater = document.getElementById('notifLater');
  const btnClose = document.getElementById('notifClose');

  let alreadyTriggered = false;

  function alreadyHandled() {
    if (typeof Notification !== 'undefined' && Notification.permission !== 'default') return true;
    if (localStorage.getItem(LS_SUBSCRIBED) === '1') return true;
    const until = parseInt(localStorage.getItem(LS_DISMISSED) || '0', 10);
    return Date.now() < until;
  }

  function showOverlay() {
    if (alreadyTriggered || alreadyHandled()) return;
    alreadyTriggered = true;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function hideOverlay() {
    overlay.classList.remove('show');
    setTimeout(() => { overlay.hidden = true; }, 350);
  }

  function dismiss() {
    localStorage.setItem(LS_DISMISSED, String(Date.now() + DISMISS_COOLDOWN_MS));
    hideOverlay();
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((resolve) => setTimeout(() => resolve('timeout'), ms))
    ]);
  }

  async function handleActionClick() {
    btnAction.disabled = true;

    try {
      if (typeof Notification !== 'undefined' && Notification.requestPermission) {
        // API estanda navigatè a — toujou mache, pa depann de OneSignal
        await withTimeout(Notification.requestPermission(), 6000);
      }
    } catch (e) {
      console.error('Erè demann pèmisyon notifikasyon:', e);
    }

    // Konekte moun nan ak OneSignal an background — pa bloke UI a pou sa
    try {
      if (window.OneSignal && window.OneSignal.User && window.OneSignal.User.PushSubscription
        && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        window.OneSignal.User.PushSubscription.optIn().catch(() => {});
      }
    } catch (e) {
      console.error('Erè OneSignal optIn:', e);
    }

    localStorage.setItem(LS_SUBSCRIBED, '1');
    btnAction.disabled = false;
    hideOverlay();
  }

  btnAction.addEventListener('click', handleActionClick);
  btnLater.addEventListener('click', dismiss);
  btnClose.addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss();
  });

  let fallbackTimer = setTimeout(showOverlay, FALLBACK_DELAY_MS);

  window.addEventListener('dv:install-overlay-closed', () => {
    clearTimeout(fallbackTimer);
    setTimeout(showOverlay, CHAIN_DELAY_MS);
  });
})();
