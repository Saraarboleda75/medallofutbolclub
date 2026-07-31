// ── CARGA CONTENIDO EDITABLE (data.json) ────────
fetch('/data.json')
  .then(r => r.json())
  .then(d => {
    const wa = d.contacto?.whatsapp;
    if (wa) {
      document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
        a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + wa);
      });
    }

    const p = d.precios;
    if (p) {
      const card = document.querySelector('.pr-card');
      const plan = p.plan_mayor;
      if (card && plan) {
        const lbl  = card.querySelector('.pr-label');
        const vals = card.querySelectorAll('.pr-valor');
        if (lbl)     lbl.textContent    = plan.label;
        if (vals[0]) vals[0].textContent = plan.matricula;
        if (vals[1]) vals[1].textContent = plan.mensualidad;
      }
      if (p.incluye) {
        const ul = document.querySelector('.pr-incl ul');
        if (ul) ul.innerHTML = p.incluye.map(t => `<li>${t}</li>`).join('');
      }
    }

    if (d.horarios) {
      const grid = document.querySelector('.hor-grid');
      if (grid) {
        const delays = ['d1', 'd2', 'd3', 'd4'];
        grid.innerHTML = d.horarios.map((s, i) => `
          <div class="hor-card fu ${delays[i] || ''}">
            <div class="hor-head">
              <div class="hor-sede">${s.sede}</div>
              <div class="hor-name">${s.nombre}</div>
            </div>
            <div class="hor-slots">
              ${s.slots.map(sl => `
                <div class="slot">
                  <span class="slot-d">${sl.dia}</span>
                  <span class="slot-h">${sl.hora}</span>
                </div>`).join('')}
            </div>
          </div>`).join('');
        grid.querySelectorAll('.fu').forEach(el => el.classList.add('on'));
      }
    }
  })
  .catch(() => {});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// Hamburger menu
const ham = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobile-menu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobMenu.classList.toggle('open');
  document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
});
mobMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Fade-up
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Counter
const cobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target, step = target / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => { cur += step; if (cur >= target) { el.textContent = target; clearInterval(t); } else { el.textContent = Math.floor(cur); } }, 16);
    cobs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-counter').forEach(el => cobs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Scroll progress bar
const spb = document.createElement('div');
spb.id = 'scroll-progress';
document.body.prepend(spb);
window.addEventListener('scroll', () => {
  spb.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
}, { passive: true });

// Cursor glow
const cg = document.createElement('div');
cg.className = 'cursor-glow';
document.body.appendChild(cg);
document.addEventListener('mousemove', e => {
  cg.style.left = e.clientX + 'px';
  cg.style.top  = e.clientY + 'px';
}, { passive: true });

// Hero parallax
const heroEl = document.getElementById('hero');
window.addEventListener('scroll', () => {
  if (scrollY < heroEl.offsetHeight * 1.5)
    heroEl.style.backgroundPositionY = `calc(top + ${scrollY * 0.35}px)`;
}, { passive: true });

// Floating particles (hero)
(function () {
  const cvs = document.createElement('canvas');
  cvs.id = 'hero-canvas';
  heroEl.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  let W, H, ptcls = [];

  const resize = () => {
    W = cvs.width  = heroEl.offsetWidth;
    H = cvs.height = heroEl.offsetHeight;
  };
  resize();
  new ResizeObserver(resize).observe(heroEl);

  const mkP = () => ({
    x: Math.random() * W, y: H + 10,
    r: Math.random() * 1.6 + .3,
    vx: (Math.random() - .5) * .45, vy: -(Math.random() * .9 + .25),
    a: Math.random() * .45 + .08, life: 0,
    maxLife: Math.random() * 200 + 80,
    gold: Math.random() > .6
  });

  for (let i = 0; i < 65; i++) { const p = mkP(); p.y = Math.random() * H; ptcls.push(p); }

  (function tick() {
    ctx.clearRect(0, 0, W, H);
    if (ptcls.length < 75) ptcls.push(mkP());
    ptcls = ptcls.filter(p => {
      p.x += p.vx; p.y += p.vy; p.life++;
      const fade = Math.min(p.life / 25, 1) * Math.min((p.maxLife - p.life) / 25, 1);
      ctx.save();
      ctx.globalAlpha = p.a * fade;
      ctx.fillStyle = p.gold ? '#C89B2A' : 'rgba(255,255,255,.85)';
      ctx.shadowBlur = p.gold ? 8 : 3;
      ctx.shadowColor = p.gold ? '#E0B84A' : '#fff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      return p.life < p.maxLife && p.y > -10;
    });
    requestAnimationFrame(tick);
  })();
})();

// 3D tilt on cards
document.querySelectorAll('.val-card, .pr-card, .cat-card').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px) scale(1.02)`;
    el.style.boxShadow = `${-x * 18}px ${-y * 18}px 36px rgba(200,155,42,.18)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.boxShadow = '';
  });
});

// Magnetic buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .28;
    const y = (e.clientY - r.top  - r.height / 2) * .28;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// Ripple on click
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2.2;
    const rpl = document.createElement('span');
    Object.assign(rpl.style, {
      position: 'absolute', width: d + 'px', height: d + 'px', borderRadius: '50%',
      background: 'rgba(255,255,255,.22)',
      left: (e.clientX - r.left - d / 2) + 'px', top: (e.clientY - r.top - d / 2) + 'px',
      transform: 'scale(0)', transition: 'transform .55s ease, opacity .55s ease',
      opacity: '1', pointerEvents: 'none'
    });
    btn.appendChild(rpl);
    requestAnimationFrame(() => { rpl.style.transform = 'scale(1)'; rpl.style.opacity = '0'; });
    setTimeout(() => rpl.remove(), 650);
  });
});

// Gallery zoom
document.querySelectorAll('.g-item').forEach(g => {
  g.addEventListener('mouseenter', () => g.style.backgroundSize = '115%');
  g.addEventListener('mouseleave', () => g.style.backgroundSize = '105%');
});

// ── LIGHTBOX ─────────────────────────────────────
const PHOTOS = [
  './assets/gallery-1.jpg','./assets/gallery-2.jpg','./assets/gallery-3.jpg',
  './assets/gallery-4.jpg','./assets/gallery-5.jpg','./assets/gallery-6.jpg',
  './assets/gallery-7.jpg','./assets/gallery-8.jpg','./assets/gallery-9.jpg',
  './assets/gallery-10.jpg','./assets/gallery-11.jpg','./assets/gallery-12.jpg',
  './assets/gallery-13.jpg','./assets/gallery-14.jpg','./assets/gallery-15.jpg',
  './assets/gallery-16.jpg','./assets/gallery-17.jpg'
];

let lbIdx = 0;
const lb     = document.getElementById('lightbox');
const lbImg  = document.getElementById('lb-img');
const lbCur  = document.getElementById('lb-cur');
const lbTot  = document.getElementById('lb-tot');
const lbTmbs = document.getElementById('lb-thumbs');

lbTot.textContent = PHOTOS.length;

PHOTOS.forEach((src, i) => {
  const t = document.createElement('div');
  t.className = 'lb-thumb';
  t.style.backgroundImage = `url('${src}')`;
  t.setAttribute('aria-label', `Foto ${i + 1}`);
  t.addEventListener('click', () => lbGo(i));
  lbTmbs.appendChild(t);
});

function lbOpen(idx) {
  lbIdx = idx ?? 0;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  lbRender(true);
}
function lbClose() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function lbGo(idx) {
  lbIdx = ((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
  lbRender();
}
function lbRender(instant) {
  lbImg.style.opacity = instant ? '1' : '0';
  lbImg.src = PHOTOS[lbIdx];
  lbImg.onload = () => { lbImg.style.opacity = '1'; };
  lbCur.textContent = lbIdx + 1;
  lbTmbs.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === lbIdx));
  const active = lbTmbs.children[lbIdx];
  if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

document.querySelector('.lb-close').addEventListener('click', lbClose);
document.querySelector('.lb-prev').addEventListener('click', () => lbGo(lbIdx - 1));
document.querySelector('.lb-next').addEventListener('click', () => lbGo(lbIdx + 1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose();
  if (e.key === 'ArrowLeft')  lbGo(lbIdx - 1);
  if (e.key === 'ArrowRight') lbGo(lbIdx + 1);
});

let tsX = 0;
lb.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tsX;
  if (Math.abs(dx) > 50) lbGo(dx < 0 ? lbIdx + 1 : lbIdx - 1);
});

document.querySelectorAll('.g-item').forEach((g, i) => {
  g.style.cursor = 'pointer';
  g.addEventListener('click', () => lbOpen(i));
});

document.querySelectorAll('.lb-open-all').forEach(btn =>
  btn.addEventListener('click', () => lbOpen(0))
);
