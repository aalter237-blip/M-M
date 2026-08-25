/* ============================================================
   ذكرياتنا — منطق التطبيق
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const HEART_EMOJIS = ['❤️', '💗', '💕', '🌹', '💖', '🌷', '💘', '✨'];

  /* أسماء تتساقط في الخلفية */
  const FALLING_NAMES = ['مزن', 'محمد', 'وتيني', 'نبضي'];

  /* إيموجيهات حب تتساقط مع الأسماء */
  const FALLING_EMOJIS = ['❤️', '💗', '💕', '💖', '💘', '💝', '💞', '🌹', '💌', '🥰', '😍', '🌷', '💓', '💞'];

  function spawnName(field, onDark) {
    const s = document.createElement('span');
    // نمزج بين الأسماء وإيموجيهات الحب المتساقطة
    const isEmoji = Math.random() < 0.45;
    s.className = isEmoji ? 'floating-name floating-emoji' : 'floating-name';
    s.textContent = isEmoji
      ? FALLING_EMOJIS[Math.floor(Math.random() * FALLING_EMOJIS.length)]
      : FALLING_NAMES[Math.floor(Math.random() * FALLING_NAMES.length)];
    s.style.left = (Math.random() * 96) + '%';
    s.style.fontSize = (1.1 + Math.random() * 2.1) + 'rem';
    // الإيموجيهات أكثر وضوحاً من الأسماء
    const op = isEmoji
      ? (onDark ? 0.55 + Math.random() * 0.3 : 0.30 + Math.random() * 0.22)
      : (onDark ? 0.16 + Math.random() * 0.14 : 0.09 + Math.random() * 0.10);
    s.style.setProperty('--name-op', op.toFixed(2));
    s.style.animationDuration = (10 + Math.random() * 10) + 's';
    s.style.animationDelay = (Math.random() * 5) + 's';
    field.appendChild(s);
    setTimeout(() => s.remove(), 26000);
  }

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

  const thumbOf = (id) => `photos/thumbs/memory-${String(id).padStart(2, '0')}.jpg`;

  /* ---------- الألبومات ---------- */
  function renderAlbums() {
    const wrap = $('#albums');
    albums.forEach((a, ai) => {
      const card = document.createElement('button');
      card.className = 'album-card reveal';
      card.style.transitionDelay = (ai % 3) * 0.08 + 's';
      const covers = a.photos.slice(0, 4);
      card.innerHTML = `
        <div class="album-cover">
          ${covers.map((id, ci) => `
            <img src="${thumbOf(id)}" alt="" loading="lazy" class="cov cov-${ci}">`).join('')}
          <span class="album-count">${a.photos.length} 💗</span>
          <span class="album-open-hint">افتح الألبوم ❤</span>
        </div>
        <div class="album-info">
          <h3>${a.emoji} ${a.name}</h3>
          <p>${a.desc}</p>
        </div>`;
      card.addEventListener('click', () => openAlbum(ai));
      wrap.appendChild(card);
    });
  }

  const albumView = $('#albumView');
  const avTitle = $('#avTitle');
  const avMeta = $('#avMeta');
  const avGrid = $('#avGrid');

  function openAlbum(ai) {
    const a = albums[ai];
    avTitle.textContent = `${a.emoji} ${a.name}`;
    avMeta.textContent = `${a.desc} — ${a.photos.length} صور`;
    avGrid.innerHTML = '';
    a.photos.forEach((id) => {
      const m = memories.find(x => x.id === id);
      if (!m) return;
      const item = document.createElement('figure');
      item.className = 'av-item';
      const rot = (Math.random() * 5 - 2.5).toFixed(1);
      item.style.transform = `rotate(${rot}deg)`;
      item.innerHTML = `
        <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
        <figcaption>${m.title}</figcaption>`;
      item.addEventListener('click', () => {
        const idx = memories.findIndex(x => x.id === id);
        openLightbox(idx);
      });
      avGrid.appendChild(item);
    });
    albumView.classList.add('open');
    albumView.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeAlbum() {
    albumView.classList.remove('open');
    albumView.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  $('#avClose').addEventListener('click', closeAlbum);
  albumView.addEventListener('click', (e) => { if (e.target === albumView) closeAlbum(); });

  /* ---------- عارض الصور ---------- */

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

  function setPlayingUI(on) {
    musicBtn.classList.toggle('playing', on);
    musicBtn.innerHTML = on
      ? '<span class="eq"><i></i><i></i><i></i></span>'
      : '🎵';
    musicBtn.setAttribute('aria-label', on ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى');
  }

  function initMusic() {
    // تشغيل تلقائي فور فتح التطبيق
    const tryAutoplay = () => {
      const p = audio.play();
      if (p && p.then) {
        p.then(() => setPlayingUI(true)).catch(() => {});
      }
    };
    tryAutoplay();

    // إذا منع المتصفح التشغيل التلقائي… نبدأ عند أول تفاعل في أي مكان
    const unlock = () => tryAutoplay();
    ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach((ev) => {
      document.addEventListener(ev, unlock, { once: true, passive: true });
    });

    // زر التحكم اليدوي
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.play().then(() => setPlayingUI(true)).catch(() => {});
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    });
    audio.addEventListener('pause', () => setPlayingUI(false));
    audio.addEventListener('play', () => setPlayingUI(true));
    audio.addEventListener('ended', () => setPlayingUI(false));
  }

  /* ---------- إيقاف الموسيقى عند الخروج من التطبيق ---------- */
  function initAppLifecycle() {
    const pauseAudio = () => {
      if (!audio.paused) {
        audio.pause();
        setPlayingUI(false);
      }
    };
    // عند إخفاء التطبيق أو الذهاب للخلفية (يشمل تطبيق أندرويد عبر Capacitor)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseAudio();
    });
    window.addEventListener('pagehide', pauseAudio);
    window.addEventListener('blur', pauseAudio);
  }

  /* ---------- وضع ملء الشاشة ---------- */
  function requestFullscreen() {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) {
        const p = el.requestFullscreen();
        if (p && p.catch) p.catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } catch (e) { /* تجاهل أي منع لوضع ملء الشاشة */ }
  }

  /* ---------- قلوب منبثقة عند النقر ---------- */
  function initClickHearts() {
    document.addEventListener('click', (e) => {
      // لا نمنع القلب عند أي نقرة — فقط نتجنب التكرار الزائد داخل النوافذ
      const h = document.createElement('span');
      h.className = 'burst-heart';
      h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      h.style.left = (e.clientX - 12) + 'px';
      h.style.top = (e.clientY - 12) + 'px';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1400);
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

    // أسماء متساقطة على شاشة البداية
    const introNames = $('.intro-names');
    for (let i = 0; i < 14; i++) setTimeout(() => spawnName(introNames, true), i * 350);
    setInterval(() => spawnName(introNames, true), 1900);

    // عدّاد الأيام
    const days = daysSince(APP_CONFIG.startDate);
    animateNumber($('#daysCount'), days);
    animateNumber($('#memoriesCount'), memories.length);

    // زر البدء
    startBtn.addEventListener('click', () => {
      intro.classList.add('hide');
      for (let i = 0; i < 16; i++) setTimeout(() => spawnHeart(field), i * 60);
      // تأكد من أن الموسيقى تعمل (كخطة بديلة للتشغيل التلقائي)
      audio.play().then(() => setPlayingUI(true)).catch(() => {});
      // الدخول في وضع ملء الشاشة (للمتصفحات التي تدعم ذلك)
      requestFullscreen();
      setTimeout(() => {
        const tl = $('#timeline-section');
        tl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 850);
    });
  }

  /* ---------- إقلاع ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderAlbums();
    renderGallery();
    initIntro();
    initReveal();
    initMusic();
    initAppLifecycle();
    initClickHearts();

    // أسماء متساقطة في خلفية كامل التطبيق
    const bgNames = $('#bgNames');
    for (let i = 0; i < 10; i++) setTimeout(() => spawnName(bgNames, false), i * 450);
    setInterval(() => spawnName(bgNames, false), 2400);
  });
})();
