/* ============================================================
   ذكرياتنا — منطق التطبيق
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const HEART_EMOJIS = ['❤️', '💗', '💕', '🌹', '💖', '🌷', '💘', '✨'];

  /* ---------- عدّاد الأيام ---------- */
  function daysSince(dateStr) {
    const start = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    return Math.max(0, Math.floor((now - start) / 86400000));
  }

  function animateNumber(el, target) {
    if (!el) return;
    const dur = 1600, t0 = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ar-EG');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- القلوب المتطايرة ---------- */
  function spawnHeart(field) {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (0.9 + Math.random() * 1.4) + 'rem';
    h.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    h.style.animationDuration = (6 + Math.random() * 6) + 's';
    field.appendChild(h);
    setTimeout(() => h.remove(), 13000);
  }

  /* ---------- الخط الزمني ---------- */
  function renderTimeline() {
    const wrap = $('#timeline');
    // نعرض في الخط الزمني أبرز الذكريات (كل 3 صور تقريباً + الأولى والأخيرة)
    const featured = memories.filter((m, i) =>
      i === 0 || i === memories.length - 1 || i % 3 === 0
    );
    featured.forEach((m, i) => {
      const row = document.createElement('div');
      row.className = 'tl-row reveal';
      if (i % 2 === 0) row.classList.add('tl-right');
      row.style.transitionDelay = (i % 4) * 0.08 + 's';

      row.innerHTML = `
        <span class="tl-dot" aria-hidden="true"></span>
        <article class="tl-card">
          <div class="tl-photo">
            <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
            <span class="tl-tag">${m.date}</span>
          </div>
          <div class="tl-body">
            <div class="tl-date">💌 ${m.date}</div>
            <h3 class="tl-title">${m.title}</h3>
            <p class="tl-story">${m.story}</p>
            <div class="tl-place">${m.place}</div>
          </div>
        </article>`;
      const card = row.querySelector('.tl-photo');
      const idx = memories.findIndex(x => x.id === m.id);
      card.addEventListener('click', () => openLightbox(idx));
      wrap.appendChild(row);
    });
  }

  /* ---------- معرض الصور ---------- */
  let galleryIndex = -1;

  function renderGallery() {
    const wrap = $('#gallery');
    memories.forEach((m, i) => {
      const fig = document.createElement('figure');
      fig.className = 'polaroid reveal';
      const rot = (Math.random() * 6 - 3).toFixed(1);
      fig.style.transform = `rotate(${rot}deg)`;
      fig.style.transitionDelay = (i % 4) * 0.05 + 's';
      fig.innerHTML = `
        <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
        <figcaption>${m.title}
          <span class="polaroid-date">${m.date}</span>
        </figcaption>`;
      fig.addEventListener('click', () => openLightbox(i));
      wrap.appendChild(fig);
    });
  }

  /* ---------- عارض الصور ---------- */
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCaption = $('#lbCaption');
  const lbCounter = $('#lbCounter');

  function openLightbox(i) {
    galleryIndex = (i + memories.length) % memories.length;
    const m = memories[galleryIndex];
    lbImg.src = m.photo; // الصورة الأصلية بدقة كاملة
    lbImg.alt = m.title;
    lbCaption.textContent = `${m.title} — ${m.date}`;
    lbCounter.textContent = `${galleryIndex + 1} / ${memories.length}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function stepLightbox(dir) {
    openLightbox(galleryIndex + dir);
  }

  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
  $('#lbNext').addEventListener('click', () => stepLightbox(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') stepLightbox(1);
    if (e.key === 'ArrowLeft') stepLightbox(-1);
  });

  /* ---------- الرسالة ---------- */
  const envelope = $('#envelope');

  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    $('#envelopeHint').textContent = '💌 من القلب… وإلى القلب';
  }
  envelope.addEventListener('click', openLetter);
  $('#envSeal').addEventListener('click', (e) => { e.stopPropagation(); openLetter(); });

  /* ---------- الموسيقى ---------- */
  const audio = $('#musicPlayer');
  const musicBtn = $('#musicBtn');
  let musicStarted = false;

  function initMusic() {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.play().catch(() => {});
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<span class="eq"><i></i><i></i><i></i></span>';
      } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '🎵';
      }
    });
    audio.addEventListener('ended', () => {
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '🎵';
    });
  }

  /* ---------- الظهور عند التمرير ---------- */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* ---------- شاشة البداية ---------- */
  function initIntro() {
    const intro = $('#intro');
    const startBtn = $('#startBtn');
    const field = $('.hearts-field');

    // قلوب متطايرة
    for (let i = 0; i < 10; i++) setTimeout(() => spawnHeart(field), i * 250);
    setInterval(() => spawnHeart(field), 1600);

    // عدّاد الأيام
    const days = daysSince(APP_CONFIG.startDate);
    animateNumber($('#daysCount'), days);
    animateNumber($('#memoriesCount'), memories.length);

    // زر البدء
    startBtn.addEventListener('click', () => {
      intro.classList.add('hide');
      for (let i = 0; i < 16; i++) setTimeout(() => spawnHeart(field), i * 60);
      // تشغيل أغنيتكما بعد تفاعل المستخدم (المتصفحات تمنع التشغيل التلقائي)
      if (!musicStarted && audio) {
        audio.play().then(() => {
          musicStarted = true;
          musicBtn.classList.add('playing');
          musicBtn.innerHTML = '<span class="eq"><i></i><i></i><i></i></span>';
        }).catch(() => {});
      }
      setTimeout(() => {
        const tl = $('#timeline-section');
        tl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 850);
    });
  }

  /* ---------- إقلاع ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderGallery();
    initIntro();
    initReveal();
    initMusic();
  });
})();
