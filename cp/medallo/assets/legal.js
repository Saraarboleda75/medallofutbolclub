// Inyectar botón de descarga en cada tarjeta
document.querySelectorAll('.doc-card').forEach(card => {
  const num = card.id.replace('doc-', '').padStart(2, '0');
  const header = card.querySelector('.doc-card-header');
  if (!header) return;
  const a = document.createElement('a');
  a.href = `./docs/doc-${num}.pdf`;
  a.download = '';
  a.className = 'doc-download-btn';
  a.title = 'Descargar PDF';
  a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>PDF';
  header.appendChild(a);
});

// Envolver tablas sin contenedor scroll en un .table-scroll
document.querySelectorAll('.doc-card-body table').forEach(table => {
  const parent = table.parentElement;
  const parentStyle = (parent.getAttribute('style') || '').replace(/\s/g, '');
  const alreadyWrapped = parentStyle.includes('overflow-x') || parent.classList.contains('table-scroll');
  if (!alreadyWrapped) {
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    parent.insertBefore(wrap, table);
    wrap.appendChild(table);
  }
});

// Highlight activo en sidebar al hacer scroll
const sections = document.querySelectorAll('[id^="doc-"]');
const links = document.querySelectorAll('.doc-list a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.doc-list a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// Sidebar toggle en móvil
const sidebarToggle = document.getElementById('sidebar-toggle');
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebarToggle.classList.toggle('open');
    document.querySelector('.doc-list').classList.toggle('open');
  });
  document.querySelectorAll('.doc-list a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebarToggle.classList.remove('open');
        document.querySelector('.doc-list').classList.remove('open');
      }
    });
  });
}
