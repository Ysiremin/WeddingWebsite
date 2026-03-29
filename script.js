/* ============================================================
   WEDDING INVITATION – SCRIPT.JS
   ============================================================ */

/* ---- COUNTDOWN TIMER ---- */
(function () {
  // Wedding date: 12 June 2026, 19:00 (Istanbul UTC+3)
  const weddingDate = new Date('2026-06-12T19:00:00+03:00');

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      if (daysEl)    daysEl.textContent    = '00';
      if (hoursEl)   hoursEl.textContent   = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600) % 24;
    const d = Math.floor(totalSeconds / 86400);

    if (daysEl)    daysEl.textContent    = pad(d);
    if (hoursEl)   hoursEl.textContent   = pad(h);
    if (minutesEl) minutesEl.textContent = pad(m);
    if (secondsEl) secondsEl.textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const revealTargets = [
    '.countdown-section',
    '.events-section',
    '.event-card',
    '.scene-section',
    '.info-section',
    '.info-card',
    '.section-title',
    '.section-eyebrow',
  ];

  const allEls = document.querySelectorAll(revealTargets.join(', '));
  allEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  allEls.forEach(el => observer.observe(el));
})();

/* ---- FALLING PETALS ---- */
(function () {
  const container = document.getElementById('petals');
  if (!container) return;

  const petalColors = [
    'rgba(155,35,53,0.55)',
    'rgba(201,168,76,0.45)',
    'rgba(255,200,200,0.50)',
    'rgba(232,201,122,0.40)',
    'rgba(255,180,190,0.45)',
  ];

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size   = Math.random() * 14 + 8;        // 8–22px
    const left   = Math.random() * 100;            // 0–100 vw
    const delay  = Math.random() * 12;             // 0–12s delay
    const dur    = Math.random() * 10 + 10;        // 10–20s fall
    const color  = petalColors[Math.floor(Math.random() * petalColors.length)];
    const skew   = Math.random() * 30 - 15;        // slight horizontal drift

    Object.assign(petal.style, {
      width:                `${size}px`,
      height:               `${size * 0.65}px`,
      left:                 `${left}vw`,
      backgroundColor:      color,
      animationDuration:    `${dur}s`,
      animationDelay:       `${delay}s`,
      borderRadius:         '60% 0 60% 0',
      transform:            `rotate(${skew}deg)`,
    });

    container.appendChild(petal);

    // Remove after animation to avoid DOM bloat
    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
      createPetal(); // Spawn a new one continuously
    }, (delay + dur) * 1000 + 200);
  }

  // Initial batch
  for (let i = 0; i < 28; i++) createPetal();
})();

/* ---- SMOOTH ACTIVE NAV HIGHLIGHT (optional) ---- */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const scrolled = window.scrollY > 60;
  document.body.classList.toggle('scrolled', scrolled);
});
