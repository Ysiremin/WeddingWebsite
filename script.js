/* ============================================================
   WEDDING INVITATION – SCRIPT.JS
   ============================================================ */

/* ---- COUNTDOWN TIMER ---- */
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function makeCountdown(targetDate, ids) {
    const els = {
      d: document.getElementById(ids.days),
      h: document.getElementById(ids.hours),
      m: document.getElementById(ids.minutes),
      s: document.getElementById(ids.seconds),
    };

    function update() {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
        return;
      }
      const total = Math.floor(diff / 1000);
      if (els.d) els.d.textContent = pad(Math.floor(total / 86400));
      if (els.h) els.h.textContent = pad(Math.floor(total / 3600) % 24);
      if (els.m) els.m.textContent = pad(Math.floor(total / 60) % 60);
      if (els.s) els.s.textContent = pad(total % 60);
    }

    update();
    setInterval(update, 1000);
  }

  // Nikah: 7 Haziran 2026, 13:30 İstanbul (UTC+3)
  makeCountdown(new Date('2026-06-07T13:30:00+03:00'), {
    days: 'nikah-days', hours: 'nikah-hours',
    minutes: 'nikah-minutes', seconds: 'nikah-seconds'
  });

  // Düğün: 12 Haziran 2026, 19:00 İstanbul (UTC+3)
  makeCountdown(new Date('2026-06-12T19:00:00+03:00'), {
    days: 'dugun-days', hours: 'dugun-hours',
    minutes: 'dugun-minutes', seconds: 'dugun-seconds'
  });
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const revealTargets = [
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
