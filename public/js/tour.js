// DOBERTO VCF — Ti gid pou nouvo vizitè (spotlight tour)
// Montre objektif sit la etap pa etap, ak non chak zòn ekran an.

const TOUR_STEPS = [
  { target: '[data-tour="hero"]',      titleKey: 'tour1_title', descKey: 'tour1_desc' },
  { target: '[data-tour="capacity"]',  titleKey: 'tour2_title', descKey: 'tour2_desc' },
  { target: '[data-tour="form"]',      titleKey: 'tour3_title', descKey: 'tour3_desc' },
  { target: '[data-tour="unlock"]',    titleKey: 'tour4_title', descKey: 'tour4_desc' },
  { target: '[data-tour="list-link"]', titleKey: 'tour5_title', descKey: 'tour5_desc' }
];

const TOUR_SEEN_KEY = 'doberto_tour_seen';

let tourEls = null;
let tourIndex = 0;
let tourSteps = [];

function buildTourDom() {
  if (tourEls) return tourEls;

  const scrim = document.createElement('div');
  scrim.className = 'tour-scrim';

  const spotlight = document.createElement('div');
  spotlight.className = 'tour-spotlight';

  const tooltip = document.createElement('div');
  tooltip.className = 'tour-tooltip';
  tooltip.innerHTML = `
    <span class="tour-step-badge" id="tourBadge"></span>
    <h4 id="tourTitle"></h4>
    <p id="tourDesc"></p>
    <div class="tour-footer">
      <div class="tour-dots" id="tourDots"></div>
      <div class="tour-actions">
        <button type="button" class="tour-skip" id="tourSkip"></button>
        <button type="button" class="tour-next" id="tourNext"></button>
      </div>
    </div>
  `;

  document.body.appendChild(scrim);
  document.body.appendChild(spotlight);
  document.body.appendChild(tooltip);

  tourEls = { scrim, spotlight, tooltip };
  return tourEls;
}

function positionOn(el, els) {
  const r = el.getBoundingClientRect();
  const pad = 8;
  els.spotlight.style.top = (r.top - pad) + 'px';
  els.spotlight.style.left = (r.left - pad) + 'px';
  els.spotlight.style.width = (r.width + pad * 2) + 'px';
  els.spotlight.style.height = (r.height + pad * 2) + 'px';

  const tooltip = els.tooltip;
  const spaceBelow = window.innerHeight - r.bottom;
  const placeBelow = spaceBelow > 180 || r.top < 180;
  const top = placeBelow ? r.bottom + 16 : Math.max(16, r.top - 16 - tooltip.offsetHeight);
  let left = r.left;
  const maxLeft = window.innerWidth - tooltip.offsetWidth - 16;
  left = Math.min(Math.max(16, left), Math.max(16, maxLeft));

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';
}

function renderTourStep() {
  const els = buildTourDom();
  const step = tourSteps[tourIndex];
  const el = document.querySelector(step.target);
  if (!el || el.offsetParent === null) {
    // Zòn nan pa vizib (egz. bar debloke a poko afiche) — pase sou pwochen an
    if (tourIndex < tourSteps.length - 1) {
      tourIndex++;
      renderTourStep();
    } else {
      endTour();
    }
    return;
  }

  el.scrollIntoView({ block: 'center', behavior: 'smooth' });

  document.getElementById('tourBadge').textContent =
    t('tour_step_of', { n: tourIndex + 1, total: tourSteps.length });
  document.getElementById('tourTitle').textContent = t(step.titleKey);
  document.getElementById('tourDesc').textContent = t(step.descKey);
  document.getElementById('tourSkip').textContent = t('tour_skip');
  document.getElementById('tourNext').textContent =
    tourIndex === tourSteps.length - 1 ? t('tour_done') : t('tour_next');

  const dots = document.getElementById('tourDots');
  dots.innerHTML = '';
  tourSteps.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'tour-dot' + (i === tourIndex ? ' active' : '');
    dots.appendChild(d);
  });

  setTimeout(() => positionOn(el, els), 20);
}

function startTour(force) {
  if (!force && localStorage.getItem(TOUR_SEEN_KEY)) return;

  tourSteps = TOUR_STEPS.filter(s => document.querySelector(s.target));
  if (!tourSteps.length) return;

  tourIndex = 0;
  const els = buildTourDom();
  els.scrim.classList.add('show');
  els.spotlight.style.display = 'block';
  els.tooltip.style.display = 'block';
  renderTourStep();

  window.addEventListener('resize', onTourResize);
}

function onTourResize() {
  if (!tourEls || !tourEls.scrim.classList.contains('show')) return;
  const step = tourSteps[tourIndex];
  const el = step && document.querySelector(step.target);
  if (el) positionOn(el, tourEls);
}

function nextTourStep() {
  if (tourIndex < tourSteps.length - 1) {
    tourIndex++;
    renderTourStep();
  } else {
    endTour();
  }
}

function endTour() {
  localStorage.setItem(TOUR_SEEN_KEY, '1');
  if (!tourEls) return;
  tourEls.scrim.classList.remove('show');
  tourEls.spotlight.style.display = 'none';
  tourEls.tooltip.style.display = 'none';
  window.removeEventListener('resize', onTourResize);
}

document.addEventListener('DOMContentLoaded', () => {
  const replayBtn = document.getElementById('tourReplayBtn');
  if (replayBtn) replayBtn.addEventListener('click', () => startTour(true));

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'tourNext') nextTourStep();
    if (e.target && e.target.id === 'tourSkip') endTour();
  });

  // Kite ti tan pou stats/lang chaje anvan gid la parèt pou premye fwa a
  setTimeout(() => startTour(false), 900);
});
