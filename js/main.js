/* ============================================================
   M❤️M — منطق التطبيق (تصميم جديد كليًا)
   ============================================================ */
(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ========= بيانات إضافية للتصميم الجديد ========= */

  // عبارات تتناوب في شاشة البداية (آلة كاتبة)
  const QUOTES = [
    'في كلّ نبضة… أنتِ ❤',
    'عالمي الصغير… هو أنتِ',
    'حكاية حبٍّ كُتبت في النجوم',
    'أنتِ الليلةُ والقمرُ والنجوم',
    'معكِ… كل ثانيةٍ عمرٌ ثانٍ'
  ];

  // أسباب أحبك (للبطاقات القلابة)
  const REASONS = [
    { icon: '😊', front: 'ضحكتك', back: 'ضحكتك وحدها كفيلةٌ بأن تُرمِّم ما تهدَّم في يومي، كفيلةٌ بأن تجعل الدنيا وردية.' },
    { icon: '👀', front: 'عيناك', back: 'في عينيك وطني… وفي اتساعهما أضيعُ كلما نظرتُ إليهما فأجد نفسي.' },
    { icon: '🤍', front: 'قلبك الطيب', back: 'قلبك الأبيض الذي لا يعرفُ للكراهية طريقاً، هو أجمل ما في هذا العالم.' },
    { icon: '🫂', front: 'حضنك', back: 'في حضنك أعودُ طفلاً، لا همَّ لي سوى أنني هنا… معك… بأمان.' },
    { icon: '💬', front: 'كلامك', back: 'صوتك فجرٌ لا يأتي صباحٌ بعده، وكلماتك موسيقى يعزفها قلبي قبل أذني.' },
    { icon: '🌸', front: 'رقتك', back: 'رقتك التي تجعلُ منّي رجلاً أقوى، وحنانك الذي يُلين صخور العالم.' },
    { icon: '😂', front: 'جنونك', back: 'أحبك في لحظات جنونك… في عفويتك… في كونكِ أنتِ بلا زيفٍ أو تمثيل.' },
    { icon: '🌙', front: 'صباحاتي معك', back: 'أول رسالةٍ منكِ في الصباح… كفيلةٌ بأن تجعل يومي كاملاً.' },
    { icon: '✨', front: 'تفاصيلك الصغيرة', back: 'تلك التفاصيل التي لا يلاحظها أحدٌ سواي… أحبها أكثر مما تتصورين.' },
    { icon: '🤝', front: 'أنك معي', back: 'أنك بجانبي… في حزني وفرحي… في تعبي وراحتي… هذا يكفيني.' },
    { icon: '💫', front: 'طموحك', back: 'أحبُّ كيف تحلمين… وكيف تسعين… وكيف تجعلين للحلم طعماً حقيقياً.' },
    { icon: '❤', front: 'كل شيء', back: 'وفي النهاية… أنا أحبك كلك… عيوبك قبل مميزاتك، ضعفك قبل قوتك.' }
  ];

  // الوعود
  const PROMISES = [
    'أعدكِ أن أكونَ سنداً لكِ في كل الأوقات',
    'أعدكِ أن أحبَّك كل يوم أكثر من اليوم السابق',
    'أعدكِ أن أبقى أوفى صديقٍ وأخلص حبيب',
    'أعدكِ أن أُذكِّرَكِ دائماً كم أنتِ جميلة',
    'أعدكِ أن أسمعك حين لا تجرؤين على الكلام',
    'أعدكِ أن أحتفي بأصغر انتصاراتكِ كأنها أعياد',
    'أعدكِ أن أجعلَ البيتَ الذي نحلمُ به حقيقةً',
    'أعدكِ ألا تنطفئَ ضحكتُك ما دمتُ أتنفس'
  ];

  // قلوب وإيموجي متطايرة
  const HEART_EMOJIS = ['❤️','💗','💕','💖','💘','💝','💞','🌹','💌','🥰','😍','💓','🌷','✨','💋'];

  // أسماء للخلفية
  const FALLING_NAMES = ['مزن','محمد','وتيني','نبضي','قلبي','روحي','حبيبتي','عمري'];

  const LETTER_TEXT = `من أول يوم دخلتِ فيه حياتي، وأنا أشعرُ أن العالم من حولي تغيّر.

أصبحتُ أرى الألوان أزهى، والأغاني أجمل، والوقت أسرع… حين تكونين بجانبي.

كلُّ ضحكةٍ منكِ تُنبتُ في صدري بستاناً من الورد، وكلُّ همسةٍ منكِ ترمِّمُ ما هدَّهُ العالم فيَّ.

لا أعرفُ كيف أصفكِ، لأن الكلمات جميعها أصغرُ من أن تسعَكِ. لكنني أعرفُ شيئاً واحداً: أنتِ كل ما احتجتُه طوال عمري… دون أن أعرف.

اليوم… وغداً… وبعد ألف عام: سأظلُّ أختارك، بكل نبضة، بكلِّ حلم، بكلِّ حب.

أنا لكِ… كما لم أكن لأحد. ❤`;

  /* ========= فهرس سريع للذكريات (id → index) =========
     بدل findIndex في كل حلقة (O(n²)) نبني الخريطة مرة واحدة */
  const idToIndex = new Map(memories.map((m, i) => [m.id, i]));

  /* ========= آلة كاتبة ========= */
  function typewriter(el, texts) {
    let txtIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let stopped = false;

    function tick() {
      if (stopped) return;
      // لا نضيّع المعالج والتذكّرات وهيئة الخلفية
      if (document.hidden) { setTimeout(tick, 1000); return; }
      const current = texts[txtIdx];
      if (!deleting) {
        el.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
      } else {
        el.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          txtIdx = (txtIdx + 1) % texts.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
    return { stop: () => { stopped = true; } };
  }

  /* ========= عدّاد الأيام ========= */
  function timeSince(dateStr) {
    const start = new Date(dateStr + 'T00:00:00').getTime();
    const now = Date.now();
    let diff = Math.max(0, now - start);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    return { days, hours, mins, secs };
  }

  function animateNumber(el, target, duration = 1200) {
    if (!el) return;
    const t0 = performance.now();
    const start = 0;
    function tick(t) {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased).toLocaleString('ar-EG');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  let liveTimer = null;
  function startLiveCounters() {
    const introBoxes = { d: $('#cDays'), h: $('#cHours'), m: $('#cMins'), s: $('#cSecs') };
    const heroBoxes  = { d: $('#bDays'), h: $('#bHours'), m: $('#bMins'), s: $('#bSecs') };

    function update() {
      if (document.hidden) return; // لا تحديث للعدّادات خلف الكواليس
      const t = timeSince(APP_CONFIG.startDate);
      // في العدّاد الكبير (البطل) نعرض التحديث الحي دائمًا
      if (heroBoxes.d) {
        heroBoxes.d.textContent = t.days.toLocaleString('ar-EG');
        heroBoxes.h.textContent = String(t.hours).padStart(2,'0');
        heroBoxes.m.textContent = String(t.mins).padStart(2,'0');
        heroBoxes.s.textContent = String(t.secs).padStart(2,'0');
      }
      // في شاشة البداية نعرضها أيضًا (بما أن العنصر موجود)
      if (introBoxes.d) {
        introBoxes.d.textContent = t.days.toLocaleString('ar-EG');
        introBoxes.h.textContent = String(t.hours).padStart(2,'0');
        introBoxes.m.textContent = String(t.mins).padStart(2,'0');
        introBoxes.s.textContent = String(t.secs).padStart(2,'0');
      }
    }
    update();
    liveTimer = setInterval(update, 1000);
  }

  /* ========= بتلات ورد متساقطة ========= */
  const MAX_PETALS = 14;
  function spawnPetal() {
    const field = $('#petals');
    if (!field || document.hidden) return;
    if (field.childElementCount >= MAX_PETALS) return; // حدّ أقصى لعدد الطبقات الحية
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = (Math.random() * 100) + '%';
    const size = 10 + Math.random() * 18;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.setProperty('--drift', ((Math.random() * 200) - 100) + 'px');
    const dur = 10 + Math.random() * 14;
    p.style.animationDuration = dur + 's';
    const hueShift = Math.random() * 30 - 15;
    p.style.filter = `hue-rotate(${hueShift}deg)`; // بدون drop-shadow: أخفّ بكثير على الرسوميات
    field.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 200);
  }

  /* ========= قلوب متطايرة في شاشة البداية ========= */
  function spawnFlyHeart(field) {
    const h = document.createElement('span');
    h.className = 'fly-heart';
    h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    h.style.left = (Math.random() * 100) + '%';
    h.style.fontSize = (1 + Math.random() * 1.6) + 'rem';
    h.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    h.style.animationDuration = (7 + Math.random() * 6) + 's';
    field.appendChild(h);
    setTimeout(() => h.remove(), 14000);
  }

  /* ========= أسماء متساقطة خلفية ========= */
  const MAX_BG_NAMES = 12;
  function spawnFloatingName() {
    const field = $('#bgNames');
    if (!field || document.hidden) return;
    if (field.childElementCount >= MAX_BG_NAMES) return;
    const s = document.createElement('span');
    const isEmoji = Math.random() < 0.35;
    if (isEmoji) {
      s.className = 'floating-name em';
      s.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    } else {
      s.className = 'floating-name';
      s.textContent = FALLING_NAMES[Math.floor(Math.random() * FALLING_NAMES.length)];
    }
    s.style.left = (Math.random() * 96) + '%';
    s.style.fontSize = (1 + Math.random() * 1.8) + 'rem';
    const op = isEmoji ? (0.4 + Math.random() * 0.3) : (0.08 + Math.random() * 0.12);
    s.style.setProperty('--op', op.toFixed(2));
    s.style.animationDuration = (12 + Math.random() * 12) + 's';
    field.appendChild(s);
    setTimeout(() => s.remove(), 25000);
  }

  /* ========= نجوم تومض - تُضاف يدويًا كطبقة إضافية ========= */
  function seedStars() {
    const layers = ['.stars-s','.stars-m','.stars-l'];
    layers.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      let positions = '';
      const count = sel === '.stars-s' ? 60 : sel === '.stars-m' ? 40 : 20;
      const size = sel === '.stars-l' ? Math.random() < .5 ? '2px' : '1.5px' : '1px';
      for (let i = 0; i < count; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const colors = ['#fff','var(--blush)','var(--gold)','var(--pink)'];
        const c = colors[Math.floor(Math.random() * colors.length)];
        positions += `radial-gradient(${size} ${size} at ${x}% ${y}%, ${c}, transparent),`;
      }
      positions = positions.slice(0, -1);
      el.style.backgroundImage = positions;
    });
  }

  /* ========= الخط الزمني ========= */
  function renderTimeline() {
    const wrap = $('#timeline');
    // نأخذ مجموعة مميزة من الذكريات (أولى، وسطى، أخيرة + كل 4)
    const featured = memories.filter((_, i) => i === 0 || i === memories.length - 1 || i % 4 === 0);
    const frag = document.createDocumentFragment(); // إدراج جماعي = إعادة تصفيف واحدة
    featured.forEach((m, i) => {
      const row = document.createElement('div');
      row.className = 'tl-row reveal';
      row.style.transitionDelay = (i % 4) * 0.08 + 's';
      const idx = idToIndex.get(m.id);
      row.innerHTML = `
        <span class="tl-heart" aria-hidden="true">
          <svg viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,10.5,11.4,16,21.2c5.2-9.5,16-12,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>
        </span>
        <article class="tl-card">
          <div class="tl-photo">
            <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
            <span class="tl-date-tag">${m.date}</span>
          </div>
          <div class="tl-body">
            <div class="tl-date">💌 ${m.date}</div>
            <h3 class="tl-title">${m.title}</h3>
            <p class="tl-story">${m.story}</p>
            ${m.place ? `<div class="tl-place">${m.place}</div>` : ''}
          </div>
        </article>`;
      row.querySelector('.tl-photo').addEventListener('click', () => openLightbox(idx));
      frag.appendChild(row);
    });
    wrap.appendChild(frag);
  }

  /* ========= الألبومات ========= */
  function renderAlbums() {
    const wrap = $('#albums');
    const frag = document.createDocumentFragment();
    albums.forEach((a, ai) => {
      const card = document.createElement('button');
      card.className = 'album-card reveal';
      card.style.transitionDelay = (ai % 3) * 0.08 + 's';
      const covers = a.photos.slice(0, 4)
        .map(id => { const i = idToIndex.get(id); return i === undefined ? undefined : memories[i]; })
        .filter(Boolean);
      card.innerHTML = `
        <div class="album-cover">
          ${covers.map((m, ci) => `
            <img src="${m.thumb}" alt="" loading="lazy" class="cov cov-${ci}">
          `).join('')}
          <span class="album-count">${a.photos.length} ❤</span>
        </div>
        <div class="album-info">
          <h3>${a.emoji} ${a.name}</h3>
          <p>${a.desc}</p>
        </div>`;
      card.addEventListener('click', () => openAlbum(ai));
      frag.appendChild(card);
    });
    wrap.appendChild(frag);
  }

  const albumView = $('#albumView');
  const avTitle = $('#avTitle');
  const avMeta = $('#avMeta');
  const avGrid = $('#avGrid');

  function openAlbum(ai) {
    const a = albums[ai];
    avTitle.textContent = `${a.emoji} ${a.name}`;
    avMeta.textContent = `${a.desc} — ${a.photos.length} صورة`;
    avGrid.innerHTML = '';
    const frag = document.createDocumentFragment();
    a.photos.forEach((id) => {
      const i = idToIndex.get(id);
      if (i === undefined) return;
      const m = memories[i];
      const item = document.createElement('figure');
      item.className = 'av-item';
      const rot = (Math.random() * 8 - 4).toFixed(1);
      item.style.transform = `rotate(${rot}deg)`;
      item.innerHTML = `
        <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
        <figcaption>${m.title}</figcaption>`;
      item.addEventListener('click', () => openLightbox(i));
      frag.appendChild(item);
    });
    avGrid.appendChild(frag);
    albumView.classList.add('open');
    albumView.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeAlbum() {
    albumView.classList.remove('open');
    albumView.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  $('#avClose').addEventListener('click', closeAlbum);
  albumView.addEventListener('click', (e) => { if (e.target === albumView) closeAlbum(); });

  /* ========= معرض الصور ========= */
  function renderGallery() {
    const wrap = $('#gallery');
    const frag = document.createDocumentFragment();
    memories.forEach((m, i) => {
      const fig = document.createElement('figure');
      fig.className = 'polaroid reveal';
      const rot = (Math.random() * 8 - 4).toFixed(1);
      fig.style.transform = `rotate(${rot}deg)`;
      fig.style.transitionDelay = (i % 5) * 0.05 + 's';
      fig.innerHTML = `
        <img src="${m.thumb}" data-full="${m.photo}" alt="${m.title}" loading="lazy">
        <figcaption>${m.title}
          <span class="pol-date">${m.date}</span>
        </figcaption>`;
      fig.addEventListener('click', () => openLightbox(i));
      frag.appendChild(fig);
    });
    wrap.appendChild(frag);
  }

  /* ========= Lightbox ========= */
  let galleryIndex = -1;
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCaption = $('#lbCaption');
  const lbCounter = $('#lbCounter');
  const lbHearts = $('#lbHearts');

  function openLightbox(i) {
    galleryIndex = (i + memories.length) % memories.length;
    const m = memories[galleryIndex];
    lbImg.src = m.photo;
    lbImg.alt = m.title;
    lbCaption.textContent = `${m.title} — ${m.date}`;
    lbCounter.textContent = `${galleryIndex + 1} / ${memories.length}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    spawnLbHearts();
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function stepLightbox(dir) { openLightbox(galleryIndex + dir); }

  function spawnLbHearts() {
    if (!lbHearts) return;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'fly-heart';
        h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
        h.style.left = (10 + Math.random() * 80) + '%';
        h.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
        h.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
        h.style.animationDuration = (6 + Math.random() * 5) + 's';
        lbHearts.appendChild(h);
        setTimeout(() => h.remove(), 11000);
      }, i * 250);
    }
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

  /* ========= بطاقات أسباب أحبك ========= */
  function renderReasons() {
    const wrap = $('#reasonsGrid');
    const frag = document.createDocumentFragment();
    REASONS.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'reason-card reveal';
      card.style.transitionDelay = (i % 4) * 0.06 + 's';
      card.innerHTML = `
        <div class="reason-face reason-front">
          <span class="rf-icon">${r.icon}</span>
          <h3>${r.front}</h3>
          <span class="rf-tap">اضغطي لتري السرّ ✨</span>
        </div>
        <div class="reason-face reason-back">
          <p>${r.back}</p>
        </div>`;
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        // إطلاق قلوب
        for (let j = 0; j < 6; j++) {
          setTimeout(() => spawnClickHeart(
            card.getBoundingClientRect().left + Math.random() * card.offsetWidth,
            card.getBoundingClientRect().top + 30
          ), j * 70);
        }
      });
      frag.appendChild(card);
    });
    wrap.appendChild(frag);
  }

  /* ========= الوعود ========= */
  function renderPromises() {
    const wrap = $('#promises');
    const frag = document.createDocumentFragment();
    PROMISES.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = 'promise reveal';
      li.style.transitionDelay = (i % 4) * 0.05 + 's';
      li.innerHTML = `
        <span class="promise-check">♡</span>
        <span class="promise-text">${p}</span>`;
      li.addEventListener('click', () => {
        li.classList.toggle('active');
        const check = li.querySelector('.promise-check');
        check.textContent = li.classList.contains('active') ? '❤' : '♡';
        if (li.classList.contains('active')) {
          const r = li.getBoundingClientRect();
          for (let j = 0; j < 8; j++) {
            setTimeout(() => spawnClickHeart(
              r.left + Math.random() * r.width,
              r.top + r.height/2
            ), j * 80);
          }
        }
      });
      frag.appendChild(li);
    });
    wrap.appendChild(frag);
  }

  /* ========= الرسالة ========= */
  const envelope = $('#envelope');
  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    const hint = $('#envelopeHint');
    if (hint) hint.textContent = '💌 من القلب… وإلى القلب';
    // قلوب
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const r = envelope.getBoundingClientRect();
        spawnClickHeart(r.left + r.width/2 + (Math.random() * 100 - 50), r.top + 20);
      }, i * 150);
    }
  }
  envelope.addEventListener('click', openLetter);
  $('#envSeal').addEventListener('click', (e) => { e.stopPropagation(); openLetter(); });

  // إدراج نص الرسالة
  $('#letterBody').textContent = LETTER_TEXT;

  /* ========= زر القبلة ========= */
  let kissCount = parseInt(localStorage.getItem('mm-kiss-count') || '0', 10);
  const kissBtn = $('#kissBtn');
  const kissCountEl = $('#kissCount');
  function updateKissUI() { if (kissCountEl) kissCountEl.textContent = kissCount.toLocaleString('ar-EG'); }
  updateKissUI();

  kissBtn.addEventListener('click', () => {
    kissCount++;
    localStorage.setItem('mm-kiss-count', String(kissCount));
    updateKissUI();
    // انفجار قبلات
    const r = kissBtn.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top + r.height/2;
    for (let i = 0; i < 16; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'kiss-heart';
        h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
        h.style.left = (cx - 14) + 'px';
        h.style.top = (cy - 14) + 'px';
        const kx = (Math.random() * 260 - 130);
        const kr = (Math.random() * 60 - 30);
        h.style.setProperty('--kx', kx + 'px');
        h.style.setProperty('--kr', kr + 'deg');
        h.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2400);
      }, i * 50);
    }
    // نبضة
    kissBtn.style.transform = 'scale(.92)';
    setTimeout(() => { kissBtn.style.transform = ''; }, 180);
  });

  /* ========= الموسيقى ========= */
  const audio = $('#musicPlayer');
  const musicBtn = $('#musicBtn');

  function setMusicUI(on) {
    musicBtn.classList.toggle('playing', on);
    document.body.classList.toggle('music-on', on);
    musicBtn.setAttribute('aria-label', on ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى');
  }

  function initMusic() {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        audio.volume = 0.6;
        audio.play().then(() => setMusicUI(true)).catch(() => {});
      } else {
        audio.pause();
        setMusicUI(false);
      }
    });
    audio.addEventListener('pause', () => setMusicUI(false));
    audio.addEventListener('play', () => setMusicUI(true));
    audio.addEventListener('ended', () => setMusicUI(false));

    // تشغيل تلقائي بعد أول تفاعل (كما كان)
    const tryPlay = () => {
      if (audio.paused) {
        audio.volume = 0.6;
        audio.play().then(() => setMusicUI(true)).catch(() => {});
      }
    };
    ['pointerdown','touchstart','keydown','scroll'].forEach(ev => {
      document.addEventListener(ev, tryPlay, { once: true, passive: true });
    });
  }

  /* ========= إيقاف الموسيقى عند مغادرة التبويب ========= */
  function initLifecycle() {
    const pause = () => { if (!audio.paused) { audio.pause(); setMusicUI(false); } };
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    window.addEventListener('pagehide', pause);
    window.addEventListener('blur', pause);
  }

  /* ========= قلوب عند النقر ========= */
  function spawnClickHeart(x, y) {
    const emojis = HEART_EMOJIS;
    const h = document.createElement('span');
    h.className = 'burst-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = (x - 12) + 'px';
    h.style.top = (y - 12) + 'px';
    h.style.fontSize = (1 + Math.random() * 1) + 'rem';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }
  function initClickHearts() {
    // لا نُخرج قلوب عند النقر على أزرار وروابط (كي لا نزعج)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, input, textarea, select, .av-close, .lb-close, .lb-nav, .env-seal, .kiss-btn, .music-disc');
      if (target) return;
      spawnClickHeart(e.clientX, e.clientY);
    });
  }

  /* ========= ظهور العناصر عند التمرير ========= */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* ========= شاشة البداية ========= */
  function initIntro() {
    const intro = $('#intro');
    const startBtn = $('#startBtn');

    // آلة كاتبة (نوقفها بعد بدء القصة)
    const tw = typewriter($('#typewriter'), QUOTES);

    // قلوب متطايرة (نوقف مولّدها بعد إخفاء المقدمة)
    const heartField = $('#introHearts');
    for (let i = 0; i < 8; i++) setTimeout(() => spawnFlyHeart(heartField), i * 400);
    const heartTimer = setInterval(() => spawnFlyHeart(heartField), 1400);

    // زر ابدأ
    startBtn.addEventListener('click', () => {
      // اندفاع قلوب عند النقر
      for (let i = 0; i < 24; i++) {
        setTimeout(() => spawnFlyHeart(heartField), i * 50);
      }
      // إيقاف مولّدات المقدمة (لم تعد مطلوبة)
      clearInterval(heartTimer);
      tw.stop();
      // تشغيل الموسيقى
      audio.volume = 0.6;
      audio.play().then(() => setMusicUI(true)).catch(() => {});
      // طلب fullscreen (للمتصفحات التي تسمح)
      try {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch (_) {}
      // إخفاء المقدمة
      intro.classList.add('hide');
      setTimeout(() => {
        const hero = $('#hero-section');
        if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 900);
    });
  }

  /* ========= التشغيل ========= */
  document.addEventListener('DOMContentLoaded', () => {
    seedStars();
    renderTimeline();
    renderAlbums();
    renderGallery();
    renderReasons();
    renderPromises();
    initIntro();
    initReveal();
    initMusic();
    initLifecycle();
    initClickHearts();
    startLiveCounters();

    // بتلات ورد مستمرة (كل 1.2 ثانية)
    for (let i = 0; i < 6; i++) setTimeout(() => spawnPetal(), i * 500);
    setInterval(spawnPetal, 1200);

    // أسماء متساقطة مستمرة
    const bgNames = $('#bgNames');
    for (let i = 0; i < 8; i++) setTimeout(() => spawnFloatingName(), i * 800);
    setInterval(spawnFloatingName, 2200);
  });

})();
