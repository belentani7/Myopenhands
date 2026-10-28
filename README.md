# Myopenhands

Manos Abiertas — plataforma web de orientación para personas migrantes en España.

## Qué es

Una aplicación web en React con servidor Express que ofrece un ecosistema de
15 nodos de orientación: simulador DELE, constructor de CV (plantillas A4),
trámites de extranjería y pasaporte, empleo, vivienda, salud, finanzas,
comunidad, academia y más. Incluye un asistente conversacional con Gemini que
funciona en modo asistido local (respuestas de reserva) cuando no hay clave
configurada.

Nota: el nombre del repositorio alude a OpenHands, pero el código no contiene
ninguna integración con ese agente; es la plataforma Manos Abiertas descrita
aquí.

## Stack

- **Vite 6** — build y middleware de desarrollo
- **React 19 + TypeScript** — interfaz (i18n declarado para 35 idiomas)
- **Express** — servidor (`server.ts`): API `/api/health` y `/api/chat`
- **Tailwind CSS 4** — estilos
- **@google/genai** — cliente Gemini (clave por variable de entorno)

## Puesta en marcha

```bash
npm install          # o bun install / pnpm install
cp .env.example .env # configura GEMINI_API_KEY (opcional)
npm run dev          # servidor con Vite en http://localhost:3000
```

Otros scripts:

```bash
npm run build  # vite build + bundle del servidor con esbuild (dist/server.cjs)
npm run start  # node dist/server.cjs
npm run lint   # tsc --noEmit
```

## Configuración

Las variables van en `.env` (plantilla en `.env.example`): `GEMINI_API_KEY`
(chat IA; sin ella la app usa el modo asistido local) y `APP_URL`. Ningún
secreto se versiona.

## Licencia

MIT — ver `LICENSE`.

## Respaldo y restauración de datos locales

La interfaz permite descargar un JSON privado versionado de progreso, CV,
citas y recursos. Conserva los valores originales, incluso cuando alguno
contiene JSON corrupto. El archivo incluye datos personales: no compartirlo
ni subirlo a repositorios públicos.

La importación del formato `myopenhands-local-data` está implementada en
`src/App.tsx`. También se admite el formato de exportación anterior.
Antes de importar o restablecer se solicita descargar y comprobar un respaldo
privado. La descarga iniciada **no garantiza que el navegador haya guardado
el archivo**. Las escrituras comprueban el acceso previo y procuran revertir
cambios parciales si el almacenamiento falla; si la reversión falla, el archivo
privado descargado es la fuente de recuperación. No hay garantía de
transacción atómica de `localStorage` ni restauración automática desde un
almacenamiento remoto.

## Alcance de las verificaciones

`npm test` ejecuta regresiones Node de respaldo, almacenamiento y CI.
No sustituye pruebas de interfaz, navegador, accesibilidad, idiomas,
funcionamiento desconectado, instalación reproducible o despliegue real.
