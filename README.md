# ART IA Solutions Agency — sitio web inicial

## Archivos
- `index.html`: estructura y contenido.
- `styles.css`: identidad visual dark y diseño responsive.
- `script.js`: menú móvil, año automático y enlace de WhatsApp.

## Probar localmente
Abrí `index.html` en un navegador. Para editar, podés usar Visual Studio Code.

## Configurar WhatsApp
En `script.js`, reemplazá:
`const WHATSAPP_NUMBER = "549XXXXXXXXXX";`
por el número real, con código de país y área, sin `+`, espacios ni guiones.

Ejemplo de formato argentino: `5493511234567` (solo ejemplo, no es un número real).

## Publicar gratis en Cloudflare Pages
1. Creá una cuenta en Cloudflare.
2. Subí estos archivos a un repositorio de GitHub.
3. En Cloudflare, entrá a Workers & Pages > Create > Pages > Connect to Git.
4. Elegí el repositorio.
5. Framework preset: None. Build command: vacío. Build output directory: `/`.
6. Publicá. Cloudflare te asignará una dirección `*.pages.dev`.

El hosting estático no incluye por sí solo un backend para procesar formularios. En esta primera versión el contacto principal es WhatsApp; luego podemos conectar un formulario a n8n.
