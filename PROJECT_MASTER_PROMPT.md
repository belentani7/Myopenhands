# Project master prompt — Myopenhands

## Fuente de verdad y producto
- Repositorio: `belentani7/Myopenhands` (mantener nombre y privacidad).
- Código real: `src/App.tsx`, `src/components/`, `src/utils/`, `server.ts`, `package.json`.
- Identidad observada: aplicación educativa Manos Abiertas (CV, progreso, citas, recursos, voz y accesibilidad), no integración OpenHands comprobada.
- No mezclar esta identidad con otros repositorios educativos, ni atribuir certificaciones o integraciones inexistentes.

## Visión de producto útil
Ayudar a estudiantes y migrantes a aprender, guardar avances y gestionar
documentos personales con accesibilidad y privacidad. Preservar datos
antes de cualquier reparación o restablecimiento, incluso con JSON local
corrupto. La experiencia debe ser comprensible en móvil y offline cuando
exista implementación verificable.

## Reglas de construcción
1. Recuperar archivos y tests reales antes de diseñar cambios.
2. No exponer CV, citas, originales, logs privados, claves ni respaldos
   en commits, telemetría, capturas o servicios externos.
3. Las operaciones de borrado deben ser explícitas, reversibles cuando
   sea posible, y precedidas por copia local verificable por el usuario.
4. Mantener el flujo React/Vite actual; no sustituirlo por una demo ni
   agregar modelos/APIs de pago.
5. Usar tests de regresión para casos normales, corruptos y
   almacenamiento bloqueado. No confundir pruebas unitarias con E2E.
6. Comprobar lint, build, pruebas de navegador, accesibilidad y CI
   antes de llamar a una entrega terminada.
7. No inventar métricas, identidad de personas, permisos de imagen ni
   integraciones. Publicar solo assets autorizados sin EXIF/GPS privado.

## Trabajo actual
`src/utils/localDataBackup.ts` conserva las cuatro claves locales
privadas en JSON versionado; el ErrorBoundary ofrece descarga separada
y doble confirmación antes del restablecimiento. `tests/localDataBackup.test.ts`
comprueba fidelidad, datos corruptos y fallos de almacenamiento.

## Próximos pasos comprobables
- Ejecutar `npm test`, `npm run lint` y `npm run build` en runner con dependencias.
- Probar descarga y cancelación del restablecimiento en navegador móvil.
- Incorporar restauración segura y validada del respaldo, sin
  sobrescribir datos existentes por defecto.
- Revisar `SafeStorage`: evitar sobrescribir registros corruptos
  automáticamente antes de preservar copia recuperable.
- Revisar privacidad de diagnósticos y eliminar afirmaciones de
  funcionalidad no verificadas.

## Prompt operativo
Inspecciona el HEAD y las PR existentes. Selecciona el fallo de mayor
impacto demostrable en el producto actual. Corrígelo en código real,
añade pruebas de regresión, ejecuta los gates disponibles, comprueba
diff y SHA, documenta límites de prueba y entrega una PR sin costes ni
efectos sobre datos reales. No declares terminado lo que no probaste.
