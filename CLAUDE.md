# CLAUDE.md — Callbell Landing Pages

Landings de conversión para Callbell. HTML/CSS/JS plano. Cada campaña vive en su propia carpeta bajo `cp/`.

---

## Repositorio

- **GitHub:** https://github.com/Saraarboleda75/medallofutbolclub
- **Rama principal:** `main`

---

## Deploy

El deploy se hace **pusheando a GitHub** — Vercel está conectado al repo y despliega automáticamente desde `main`.

```bash
git add cp/...
git commit -m "mensaje"
git push origin main
```

No hay build step — HTML/CSS/JS plano. No usar `unsafe-inline` en scripts: todo el JS debe vivir en archivos externos bajo `assets/`.

---

## Vercel

- **Dominio producción:** https://www.medallofutbolclub.com/
- **Rewrites y headers:** configurados en `vercel.json` en la raíz del repo

---

## Campañas activas

| Carpeta | Estado | URL producción |
|---|---|---|
| `cp/medallo/` | Live | https://www.medallofutbolclub.com/ |

---

## Estructura de cp/medallo/

```
cp/medallo/
├── index.html          # Landing principal
├── sitemap.xml         # Sitemap para Google Search Console
├── data.json           # Contenido editable (precios, horarios, WhatsApp)
├── assets/
│   ├── main.js         # Todo el JS de la landing (externo, sin inline)
│   ├── legal.js        # JS de la subpágina legal (externo, sin inline)
│   ├── logo-dorado.png
│   ├── logo-morado.png
│   ├── hero.jpg
│   ├── equipo.jpg
│   ├── gallery-1.jpg … gallery-17.jpg
│   ├── cta-bg.jpg
│   └── medellin-aerea.jpg
└── legal/
    ├── index.html      # Subpágina de documentos legales
    └── docs/           # PDFs de cada documento (doc-01.pdf … doc-20.pdf)
```

---

## vercel.json — Rewrites

Todas las rutas públicas están mapeadas manualmente. Si se agrega una página nueva hay que agregar su rewrite aquí.

| Ruta pública | Archivo servido |
|---|---|
| `/` | `cp/medallo/index.html` |
| `/assets/:path*` | `cp/medallo/assets/:path*` |
| `/data.json` | `cp/medallo/data.json` |
| `/sitemap.xml` | `cp/medallo/sitemap.xml` |
| `/legal/` | `cp/medallo/legal/index.html` |
| `/legal/docs/:path*` | `cp/medallo/legal/docs/:path*` |
| `/admin/` | `admin/index.html` |
| `/api/:path*` | `api/:path*` |

---

## Security headers (vercel.json)

Aplicados a todas las rutas. **No agregar `unsafe-inline` al `script-src`** — todo el JS debe ser externo.

| Header | Valor clave |
|---|---|
| `Content-Security-Policy` | `script-src 'self'` — sin unsafe-inline |
| `Strict-Transport-Security` | HTTPS forzado por 2 años |
| `X-Frame-Options` | `DENY` — anti-clickjacking |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | cámara, micrófono y geolocalización deshabilitados |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-site` |

---

## SEO (cp/medallo/)

- Google Search Console verificado con meta tag en `index.html`
- Sitemap enviado: `https://www.medallofutbolclub.com/sitemap.xml`
- Open Graph, Twitter Card y JSON-LD (SportsClub) configurados
- Canonical: `https://www.medallofutbolclub.com/`

---

## Reglas importantes

1. **JS siempre externo** — nunca `<script>` inline en ninguna página. La CSP bloquea `unsafe-inline` en scripts.
2. **Rutas de assets absolutas** desde la raíz (`/assets/...`), no relativas desde la carpeta del script.
3. **Agregar rewrite en vercel.json** por cada ruta pública nueva.
4. **Editar `data.json`** para cambiar precios, horarios o número de WhatsApp sin tocar el HTML.

---

## Cómo agregar una campaña nueva

1. Crear carpeta `cp/<nombre-campaña>/`
2. Crear `cp/<nombre-campaña>/index.html`
3. Crear `cp/<nombre-campaña>/assets/main.js` con todo el JS
4. Agregar rewrites en `vercel.json` para `/` (o la ruta que corresponda) y `/assets/:path*`
5. Push a GitHub → Vercel despliega automáticamente
6. Registrar en la tabla "Campañas activas" de este archivo
