// Tests básicos (node:test) de los datos e integridad de Manos Abiertas.
// Ejecutar con: npm test  (node --test test/)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (...p) => readFileSync(path.join(ROOT, ...p), 'utf8');
const readJSON = (...p) => JSON.parse(read(...p));

// 39 idiomas objetivo (misma lista que scripts/i18n_auditor.py)
const IDIOMAS_39 = [
  'es', 'en', 'pt', 'ca', 'ar', 'fr', 'de', 'it', 'ru', 'zh', 'ja', 'ko',
  'hi', 'bn', 'ur', 'fa', 'tr', 'nl', 'pl', 'uk', 'ro', 'el', 'cs', 'sv',
  'da', 'fi', 'no', 'hu', 'bg', 'sk', 'sl', 'lt', 'lv', 'et', 'he', 'th',
  'vi', 'id', 'sw',
];

test('metadata.json declara nombre y descripción de la plataforma', () => {
  const meta = readJSON('metadata.json');
  assert.ok(meta.name.includes('Manos Abiertas'));
  assert.ok(meta.description.length > 20);
});

test('ai_curriculum_generated.json contiene 14 lecciones completas', () => {
  const lecciones = readJSON('src', 'data', 'generated', 'ai_curriculum_generated.json');
  assert.equal(lecciones.length, 14);
  for (const l of lecciones) {
    assert.match(l.id, /^ia-\d{2}$/);
    assert.ok(l.titulo.length > 0);
    assert.ok(l.nivel >= 1 && l.nivel <= 14);
    assert.ok(l.duracion_min > 0);
    assert.ok(Array.isArray(l.objetivos) && l.objetivos.length >= 3);
    assert.ok(Array.isArray(l.ejercicios) && l.ejercicios.length >= 3);
  }
});

test('office_modules_generated.json contiene 8 módulos con ids únicos', () => {
  const modulos = readJSON('src', 'data', 'generated', 'office_modules_generated.json');
  assert.equal(modulos.length, 8);
  assert.equal(new Set(modulos.map(m => m.id)).size, 8);
  for (const m of modulos) {
    assert.ok(m.titulo.length > 0);
    assert.ok(m.duracion_min > 0);
  }
});

test('curriculum_summary.json resume las 3 pistas formativas', () => {
  const resumen = readJSON('scripts', 'curriculum_summary.json');
  assert.deepEqual(Object.keys(resumen).sort(), [
    'track_ai_and_automation',
    'track_office_productivity',
    'track_os_and_sysadmin',
  ]);
});

test('i18n.ts implementa los 39 idiomas del ecosistema', () => {
  const src = read('src', 'data', 'i18n.ts');
  const encontrados = new Set(
    [...src.matchAll(/"([a-z]{2})"\s*:\s*\{/g)].map(m => m[1])
  );
  for (const codigo of IDIOMAS_39) {
    assert.ok(encontrados.has(codigo), `falta el idioma "${codigo}" en i18n.ts`);
  }
});

test('las 28 importaciones relativas de App.tsx apuntan a archivos existentes', () => {
  const app = read('src', 'App.tsx');
  const specs = [...app.matchAll(/from\s+'(\.[^']+)'/g)].map(m => m[1]);
  assert.ok(specs.length >= 20, `solo ${specs.length} imports relativos`);
  for (const spec of specs) {
    const base = path.join(ROOT, 'src', spec);
    const candidatos = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, 'index.ts'),
      path.join(base, 'index.tsx'),
    ];
    assert.ok(
      candidatos.some(existsSync),
      `import roto en App.tsx: ${spec}`
    );
  }
});
