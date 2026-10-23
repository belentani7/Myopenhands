# Myopenhands — Manos Abiertas, interfaz educativa local

El código actual implementa una aplicación web educativa de **Manos Abiertas** con
15 nodos formativos, CV, progreso y citas locales. Está construida con React,
TypeScript y Vite; `server.ts` sirve la aplicación. El nombre del repositorio
se conserva. **No se ha verificado ninguna conexión funcional con un agente
OpenHands**, por lo que no debe anunciarse como un frontend de ese agente.

## Desarrollo

```bash
npm install
npm run dev
npm run lint
npm run build
```

La suite de regresión del respaldo local requiere Node.js 22+:

```bash
npm test
```

## Respaldo y privacidad

La pantalla de recuperación permite descargar un **respaldo JSON local**
de progreso, CV, citas y recursos guardados. Los valores se conservan tal
como están, incluso si un registro está corrupto. El archivo **contiene datos
personales**: guárdalo en un lugar privado; no lo subas a GitHub ni lo
compartas públicamente.

El botón de restablecimiento primero inicia la descarga del respaldo y
después solicita una segunda confirmación. **El navegador no garantiza que
una descarga iniciada haya terminado**: comprueba el archivo antes de
confirmar. Si el acceso al almacenamiento falla, se cancela el borrado.
El informe de error no sustituye a un respaldo de los datos.

Esta versión **no incluye importación/restauración automática del JSON**;
conserva el archivo para una recuperación posterior. No se declara que el
almacenamiento del navegador sea infalible.

## Límites de entrega

No afirmar que se han probado los 15 nodos, 39 idiomas, Web Speech, modo
offline o el despliegue público hasta ejecutar pruebas específicas.
La ejecución de `npm test` cubre el módulo de respaldo, no la interfaz
completa ni el build.

## Configuración y licencia

Las variables locales van en `.env` (plantilla `.env.example`). Nunca
versionar secretos ni CV de usuarios. Licencia MIT: ver `LICENSE`.
