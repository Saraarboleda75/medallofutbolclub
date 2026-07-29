# CLAUDE.md — Callbell Landing Pages

Landings de conversión para Callbell. HTML/CSS/JS plano + funciones serverless Node. Cada campaña vive en su propia carpeta bajo `cp/`.

---

## Repositorio

- **GitHub:** (pendiente — crear repo y conectar a Vercel)
- **Rama principal:** `main`

---

## Deploy

El deploy se hace **pusheando a GitHub** — Vercel está conectado al repo y despliega automáticamente desde `main`.

```bash
git add cp/...
git commit -m "mensaje"
git push origin main
```

No hay build step — HTML/CSS/JS plano más funciones Node en `api/`.

---

## Vercel

- **Proyecto:** (pendiente — crear proyecto en Vercel)
- **Organización:** (pendiente)
- **Dominio producción:** (pendiente)

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| (pendiente según necesidades de cada campaña) | |

---

## Campañas activas

| Carpeta | Estado | URL producción |
|---|---|---|
| (pendiente) | | |

---

## Cómo agregar una campaña nueva

1. Crear carpeta `cp/<nombre-campaña>/`
2. Crear `cp/<nombre-campaña>/index.html` como base
3. Usar **rutas absolutas** para todos los assets: `/cp/<nombre>/assets/...`
4. Agregar variables de entorno necesarias en Vercel
5. Push a GitHub → Vercel despliega automáticamente
6. Registrar en la tabla "Campañas activas" de este archivo

---

## Completado

- [x] Estructura base del proyecto creada
