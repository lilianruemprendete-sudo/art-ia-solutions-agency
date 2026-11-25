# ART IA Solutions Agency — Sitio web

Landing page oficial de ART IA Solutions Agency (Villa Carlos Paz, Córdoba, Argentina).
Se publica en Cloudflare Workers como Worker de archivos estáticos (Static Assets).

## Estructura

```
art-ia-solutions-agency/
├── public/
│   ├── index.html   ← página
│   ├── styles.css   ← estilos
│   └── script.js    ← interacciones
├── wrangler.jsonc   ← configuración de Cloudflare
└── README.md
```

Solo la carpeta `public/` se publica. `wrangler.jsonc` y `README.md` quedan fuera del sitio.

## Qué se corrigió

1. **Directorio de assets.** Antes era `"./"` (la raíz del repo). Eso publicaba también
   `wrangler.jsonc`, `README.md` y `README.txt`, y mezclaba configuración con contenido.
   Ahora es `"./public"`.
2. **Fecha de compatibilidad.** Antes era la fecha del día (`2026-11-25`). Si la versión de
   Wrangler del build no reconoce esa fecha, el despliegue falla y Cloudflare sigue sirviendo
   la versión anterior. Ahora es una fecha fija ya soportada: `2025-11-01`.
3. **`not_found_handling: "404-page"`** se quitó: no existía ningún `404.html`. Una ruta
   inexistente ahora devuelve un 404 normal, nunca HTML en lugar de CSS o JS.
4. **Rutas absolutas** (`/styles.css`, `/script.js`) en `index.html`.
5. **WhatsApp**: todos los botones apuntan a `https://wa.me/5493541568331`.

## Configuración en Cloudflare (Workers Builds)

En el dashboard: **Workers & Pages → art-ia-solutions-agency → Settings → Build**

| Campo            | Valor                 |
|------------------|-----------------------|
| Build command    | *(vacío)*             |
| Deploy command   | `npx wrangler deploy` |
| Root directory   | `/`                   |
| Production branch| `main`                |

El nombre `art-ia-solutions-agency` de `wrangler.jsonc` debe coincidir con el nombre del Worker.

## Cómo actualizar el repositorio desde GitHub (web)

1. Borrá de la raíz: `index.html`, `styles.css`, `script.js` y `README.txt`
   (abrí cada archivo → ícono de tres puntos → **Delete file** → **Commit changes**).
2. **Add file → Upload files** y arrastrá la carpeta `public` completa (con sus 3 archivos),
   más `wrangler.jsonc` y `README.md`. Aceptá reemplazar los existentes.
3. **Commit changes** en la rama `main`.
4. Cloudflare despliega solo. Revisá el resultado en **Deployments** del Worker: tiene que
   figurar como *Success*. Si falla, abrí el log del build para ver el error.

## Verificación

- `https://art-ia-solutions-agency.lilianruemprendete.workers.dev/` → página nueva.
- `.../styles.css` → empieza con `/* ART IA Solutions Agency — estilos`.
- `.../script.js` → empieza con `/* ART IA Solutions Agency — interacciones */`.
- `.../wrangler.jsonc` → 404 (ya no se publica).

Si ves el diseño viejo, forzá recarga (Ctrl + Shift + R en PC; en el celular, abrí el sitio
en una pestaña de incógnito).

## Probar en local (opcional)

```
npx wrangler dev
```

Abre el sitio en `http://localhost:8787`.
