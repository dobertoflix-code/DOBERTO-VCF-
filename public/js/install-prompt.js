// DOBERTO VCF — Popup "Enstale Aplikasyon an"
// Aparèt apre animasyon antre paj la fin jwe, konekte ak vrè evènman
// "beforeinstallprompt" (Android/Chrome). Sou iOS ak lòt navigatè ki pa
// sipòte evènman sa a, bouton an montre enstriksyon manyèl olye l kraze.

(function () {
  const SHOW_DELAY_MS = 1800;          // tan pou animasyon paj la fini
  const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 3; // 3 jou si moun di "Pita"
  const LS_DISMISSED = 'dv_install_dismissed_until';
  const LS_INSTALLED = 'dv_installed';

  let deferredPrompt = null;

  // 1) Anrejistre service worker la (obligatwa pou Chrome konsidere sit la "enstalab")
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  function alreadyHandled() {
    if (isStandalone() || localStorage.getItem(LS_INSTALLED) === '1') return true;
    const until = parseInt(localStorage.getItem(LS_DISMISSED) || '0', 10);
    return Date.now() < until;
  }

  // 2) Kaptire evènman reyèl Chrome/Android voye a
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    localStorage.setItem(LS_INSTALLED, '1');
    hideOverlay();
  });

  const overlay = document.getElementById('installOverlay');
  if (!overlay) return;

  const btnInstall = document.getElementById('installActionBtn');
  const btnLater = document.getElementById('installLater');
  const btnClose = document.getElementById('installClose');
  const descEl = overlay.querySelector('.install-desc');

  function showOverlay() {
    if (alreadyHandled()) return;
    overlay.hidden = false;
    // requestAnimationFrame pou transition CSS la deklannche byen
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

  async function handleInstallClick() {
    // Kaz 1: Chrome/Android — deklannche vrè popup sistèm lan
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice.catch(() => null);
      deferredPrompt = null;
      if (choice && choice.outcome === 'accepted') {
        localStorage.setItem(LS_INSTALLED, '1');
      } else {
        localStorage.setItem(LS_DISMISSED, String(Date.now() + DISMISS_COOLDOWN_MS));
      }
      hideOverlay();
      return;
    }

    // Kaz 2: iOS Safari — pa gen prompt otomatik, montre enstriksyon
    if (isIOS()) {
      if (descEl) {
        descEl.textContent = 'Sou iPhone: peze bouton "Pataje" ⬆️ anba a, epi chwazi "Ajoute sou ekran akèy".';
      }
      return;
    }

    // Kaz 3: Navigatè ki pa sipòte enstalasyon (desktop Firefox, elatriye)
    if (descEl) {
      descEl.textContent = 'Louvri meni navigatè a (⋮ oswa ⋯) epi chwazi "Enstale app" oswa "Add to Home Screen".';
    }
  }

  btnInstall.addEventListener('click', handleInstallClick);
  btnLater.addEventListener('click', dismiss);
  btnClose.addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss();
  });

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(showOverlay, SHOW_DELAY_MS);
  });
  // Si script la chaje apre DOMContentLoaded deja pase
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(showOverlay, SHOW_DELAY_MS);
  }
})();
