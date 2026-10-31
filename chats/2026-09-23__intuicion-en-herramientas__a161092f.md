# Intuición en Herramientas

- Chat ID: `a161092f-6b8a-4968-a727-f5445cfc03ae`
- Mensajes: 2
- Periodo: 2026-09-23 01:31 UTC → 2026-09-23 01:31 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-09-23 01:31

Por intuición intenta recrear la herramienta completa

## [ASSISTANT] 2026-09-23 01:31 · Qwen3.7-Plus

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Belentani Visual Engine — Procedural Lore → Experience</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-tertiary: #1a1a2e;
  --bg-card: #16162a;
  --accent-gold: #d4a853;
  --accent-cyan: #00e5ff;
  --accent-purple: #8b5cf6;
  --accent-pink: #ec4899;
  --accent-green: #10b981;
  --accent-orange: #f59e0b;
  --text-primary: #e8e8f0;
  --text-secondary: #9898b0;
  --text-muted: #5a5a7a;
  --border: #2a2a4a;
  --glow-gold: 0 0 20px rgba(212,168,83,0.3);
  --glow-cyan: 0 0 20px rgba(0,229,255,0.3);
  --glow-purple: 0 0 20px rgba(139,92,246,0.3);
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

/* ─── LAYOUT ─── */
#app {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  grid-template-rows: 56px 1fr 48px;
  height: 100vh;
  gap: 0;
}

/* ─── HEADER ─── */
#header {
  grid-column: 1 / -1;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple));
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 16px; color: #000;
}

.logo-text {
  font-weight: 700; font-size: 16px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.logo-version {
  font-size: 11px; color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-tertiary);
  padding: 2px 8px; border-radius: 4px;
}

.header-controls {
  display: flex; align-items: center; gap: 12px;
}

.lang-selector {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
}

.btn-header {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}

.btn-header:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: var(--glow-cyan);
}

.btn-header.active {
  background: rgba(0,229,255,0.1);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

/* ─── LEFT PANEL ─── */
#left-panel {
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 16px;
}

#left-panel::-webkit-scrollbar { width: 4px; }
#left-panel::-webkit-scrollbar-track { background: transparent; }
#left-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.panel-section {
  margin-bottom: 20px;
}

.panel-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}

.panel-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Generator Cards */
.gen-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.gen-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 100%;
  border-radius: 3px 0 0 3px;
}

.gen-card[data-gen="planet"]::before { background: var(--accent-green); }
.gen-card[data-gen="diamond"]::before { background: var(--accent-cyan); }
.gen-card[data-gen="key"]::before { background: var(--accent-gold); }
.gen-card[data-gen="machine"]::before { background: var(--accent-purple); }
.gen-card[data-gen="mirror"]::before { background: var(--accent-pink); }
.gen-card[data-gen="accretion"]::before { background: var(--accent-orange); }

.gen-card:hover {
  border-color: var(--text-muted);
  transform: translateX(4px);
}

.gen-card.active {
  border-color: var(--accent-cyan);
  background: rgba(0,229,255,0.05);
}

.gen-card-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 6px;
}

.gen-icon {
  width: 28px; height: 28px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}

.gen-card[data-gen="planet"] .gen-icon { background: rgba(16,185,129,0.15); color: var(--accent-green); }
.gen-card[data-gen="diamond"] .gen-icon { background: rgba(0,229,255,0.15); color: var(--accent-cyan); }
.gen-card[data-gen="key"] .gen-icon { background: rgba(212,168,83,0.15); color: var(--accent-gold); }
.gen-card[data-gen="machine"] .gen-icon { background: rgba(139,92,246,0.15); color: var(--accent-purple); }
.gen-card[data-gen="mirror"] .gen-icon { background: rgba(236,72,153,0.15); color: var(--accent-pink); }
.gen-card[data-gen="accretion"] .gen-icon { background: rgba(245,158,11,0.15); color: var(--accent-orange); }

.gen-name {
  font-size: 13px; font-weight: 600;
}

.gen-desc {
  font-size: 11px; color: var(--text-muted);
  line-height: 1.4;
}

.gen-status {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 4px;
  margin-top: 6px;
}

.gen-status.ready {
  background: rgba(16,185,129,0.15);
  color: var(--accent-green);
}

.gen-status .dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Scene Composer */
.composer-card {
  background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,229,255,0.05));
  border: 1px solid rgba(139,92,246,0.3);
  border-radius: 10px;
  padding: 14px;
  margin-top: 12px;
}

.composer-title {
  font-size: 12px; font-weight: 700;
  color: var(--accent-purple);
  margin-bottom: 8px;
}

.composer-desc {
  font-size: 11px; color: var(--text-muted);
  line-height: 1.5;
}

.btn-compose {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
  border: none;
  border-radius: 6px;
  color: #000;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-compose:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(139,92,246,0.4);
}

/* ─── VIEWPORT ─── */
#viewport {
  position: relative;
  overflow: hidden;
  background: var(--bg-primary);
}

#three-canvas {
  width: 100%; height: 100%;
  display: block;
}

.viewport-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
}

.viewport-info {
  position: absolute;
  top: 12px; left: 12px;
  display: flex; flex-direction: column; gap: 6px;
}

.info-badge {
  background: rgba(10,10,15,0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-secondary);
  display: flex; align-items: center; gap: 6px;
}

.info-badge .val { color: var(--accent-cyan); }

.viewport-controls {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex; gap: 8px;
  pointer-events: all;
}

.vp-btn {
  background: rgba(10,10,15,0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}

.vp-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.vp-btn.active {
  background: rgba(0,229,255,0.1);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

/* ─── RIGHT PANEL ─── */
#right-panel {
  background: var(--bg-secondary);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  padding: 16px;
}

#right-panel::-webkit-scrollbar { width: 4px; }
#right-panel::-webkit-scrollbar-track { background: transparent; }
#right-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.param-group {
  margin-bottom: 16px;
}

.param-group-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.param-row {
  margin-bottom: 10px;
}

.param-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.param-label span:first-child {
  font-size: 12px;
  color: var(--text-secondary);
}

.param-label span:last-child {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent-cyan);
}

.param-slider {
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--bg-tertiary);
  outline: none;
}

.param-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--accent-cyan);
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0,229,255,0.4);
}

.param-slider.gold::-webkit-slider-thumb { background: var(--accent-gold); box-shadow: 0 0 8px rgba(212,168,83,0.4); }
.param-slider.purple::-webkit-slider-thumb { background: var(--accent-purple); box-shadow: 0 0 8px rgba(139,92,246,0.4); }
.param-slider.pink::-webkit-slider-thumb { background: var(--accent-pink); box-shadow: 0 0 8px rgba(236,72,153,0.4); }
.param-slider.green::-webkit-slider-thumb { background: var(--accent-green); box-shadow: 0 0 8px rgba(16,185,129,0.4); }
.param-slider.orange::-webkit-slider-thumb { background: var(--accent-orange); box-shadow: 0 0 8px rgba(245,158,11,0.4); }

.param-color {
  display: flex; gap: 6px; margin-top: 4px;
}

.color-swatch {
  width: 24px; height: 24px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-swatch:hover, .color-swatch.active {
  border-color: #fff;
  transform: scale(1.15);
}

.btn-regenerate {
  width: 100%;
  padding: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.25s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-top: 12px;
}

.btn-regenerate:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  box-shadow: var(--glow-gold);
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.metric-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.metric-value {
  font-size: 18px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
}

.metric-value.cyan { color: var(--accent-cyan); }
.metric-value.gold { color: var(--accent-gold); }
.metric-value.purple { color: var(--accent-purple); }
.metric-value.green { color: var(--accent-green); }

.metric-label {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ─── FOOTER ─── */
#footer {
  grid-column: 1 / -1;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 11px;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.footer-left, .footer-right {
  display: flex; align-items: center; gap: 16px;
}

.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-green);
  animation: pulse-dot 2s infinite;
}

/* ─── ANIMATIONS ─── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.gen-card, .param-group, .metric-card {
  animation: fadeIn 0.4s ease-out backwards;
}

.gen-card:nth-child(1) { animation-delay: 0.05s; }
.gen-card:nth-child(2) { animation-delay: 0.1s; }
.gen-card:nth-child(3) { animation-delay: 0.15s; }
.gen-card:nth-child(4) { animation-delay: 0.2s; }
.gen-card:nth-child(5) { animation-delay: 0.25s; }
.gen-card:nth-child(6) { animation-delay: 0.3s; }

/* ─── RESPONSIVE ─── */
@media (max-width: 1200px) {
  #app {
    grid-template-columns: 240px 1fr 280px;
  }
}

@media (max-width: 900px) {
  #app {
    grid-template-columns: 1fr;
    grid-template-rows: 56px 1fr auto 48px;
  }
  #left-panel, #right-panel {
    display: none;
  }
}

/* Loading overlay */
#loading-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.8s;
}

#loading-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  width: 48px; height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.loading-text {
  margin-top: 16px;
  font-size: 14px;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
}

/* Tooltip */
.tooltip {
  position: absolute;
  background: rgba(10,10,15,0.95);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 11px;
  color: var(--text-secondary);
  pointer-events: none;
  z-index: 1000;
  max-width: 200px;
  backdrop-filter: blur(10px);
}
</style>
</head>
<body>

<div id="loading-overlay">
  <div class="loading-spinner"></div>
  <div class="loading-text">Initializing Belentani Visual Engine...</div>
</div>

<div id="app">
  <!-- HEADER -->
  <header id="header">
    <div class="logo">
      <div class="logo-icon">B</div>
      <span class="logo-text">Belentani Visual Engine</span>
      <span class="logo-version">v0.4.0-alpha</span>
    </div>
    <div class="header-controls">
      <select class="lang-selector" id="lang-select">
        <option value="pt">PT</option>
        <option value="es" selected>ES</option>
        <option value="en">EN</option>
        <option value="ca">CA</option>
      </select>
      <button class="btn-header" id="btn-wireframe">◇ Wireframe</button>
      <button class="btn-header" id="btn-postfx">✦ PostFX</button>
      <button class="btn-header" id="btn-export">↓ Export</button>
      <button class="btn-header active" id="btn-animate">▶ Animate</button>
    </div>
  </header>

  <!-- LEFT PANEL -->
  <aside id="left-panel">
    <div class="panel-section">
      <div class="panel-title">Generadores</div>
      
      <div class="gen-card active" data-gen="planet" onclick="selectGenerator('planet')">
        <div class="gen-card-header">
          <div class="gen-icon">🌍</div>
          <span class="gen-name">PlanetGenerator</span>
        </div>
        <div class="gen-desc">FBM terrain, biomes, atmosphere, veins, aurora, domain warp</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>

      <div class="gen-card" data-gen="diamond" onclick="selectGenerator('diamond')">
        <div class="gen-card-header">
          <div class="gen-icon">💎</div>
          <span class="gen-name">DiamondGenerator</span>
        </div>
        <div class="gen-desc">IOR 2.417, dispersion 0.044, Tolkowsky cut, caustics</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>

      <div class="gen-card" data-gen="key" onclick="selectGenerator('key')">
        <div class="gen-card-header">
          <div class="gen-icon">🗝️</div>
          <span class="gen-name">KeyGenerator</span>
        </div>
        <div class="gen-desc">Gold PBR HSV, micro-scratches, 432Hz pulse, engraving</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>

      <div class="gen-card" data-gen="machine" onclick="selectGenerator('machine')">
        <div class="gen-card-header">
          <div class="gen-icon">⚙️</div>
          <span class="gen-name">MachineGenerator</span>
        </div>
        <div class="gen-desc">Iris morph targets, instanced rings, 432Hz biological pulse</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>

      <div class="gen-card" data-gen="mirror" onclick="selectGenerator('mirror')">
        <div class="gen-card-header">
          <div class="gen-icon">🪞</div>
          <span class="gen-name">MirrorGenerator</span>
        </div>
        <div class="gen-desc">Portal/Nexus/Void, fracture, glitch, refraction, render targets</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>

      <div class="gen-card" data-gen="accretion" onclick="selectGenerator('accretion')">
        <div class="gen-card-header">
          <div class="gen-icon">🌀</div>
          <span class="gen-name">AccretionGenerator</span>
        </div>
        <div class="gen-desc">GPU particles, Kepler orbits, temperature gradient, gravity</div>
        <div class="gen-status ready"><span class="dot"></span> Ready</div>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Scene Composer</div>
      <div class="composer-card">
        <div class="composer-title">⚡ Narrative Flow Engine</div>
        <div class="composer-desc">Combina los 6 generadores en una escena unificada con transiciones narrativas, audio reactivo y defaults lore-accurate.</div>
        <button class="btn-compose" onclick="composeScene()">Componer Escena</button>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">SDD Protocol</div>
      <div style="font-size:11px; color:var(--text-muted); line-height:1.6;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>E0-E3 Spec</span><span style="color:var(--accent-green)">✅</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>E4 Core</span><span style="color:var(--accent-green)">✅</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>E4 Generators</span><span style="color:var(--accent-green)">✅</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>E4 Frontend</span><span style="color:var(--accent-cyan)">🔄</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>E5 Verify</span><span style="color:var(--text-muted)">⏳</span>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span>E6-E7 Ship</span><span style="color:var(--text-muted)">⏳</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- VIEWPORT -->
  <main id="viewport">
    <canvas id="three-canvas"></canvas>
    <div class="viewport-overlay">
      <div class="viewport-info">
        <div class="info-badge">GEN: <span class="val" id="info-gen">PlanetGenerator</span></div>
        <div class="info-badge">FPS: <span class="val" id="info-fps">60</span></div>
        <div class="info-badge">TRIS: <span class="val" id="info-tris">0</span></div>
        <div class="info-badge">SEED: <span class="val" id="info-seed">42</span></div>
      </div>
      <div class="viewport-controls">
        <button class="vp-btn" onclick="resetCamera()">⟲ Reset</button>
        <button class="vp-btn" onclick="toggleAutoRotate()">↻ Auto-Rotate</button>
        <button class="vp-btn" onclick="cycleGenerator()">→ Next</button>
        <button class="vp-btn" onclick="randomizeSeed()">🎲 Random Seed</button>
      </div>
    </div>
  </main>

  <!-- RIGHT PANEL -->
  <aside id="right-panel">
    <div class="panel-section" id="params-container">
      <!-- Dynamic params injected here -->
    </div>

    <div class="panel-section">
      <div class="panel-title">Métricas</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value cyan" id="metric-verts">0</div>
          <div class="metric-label">Vértices</div>
        </div>
        <div class="metric-card">
          <div class="metric-value gold" id="metric-faces">0</div>
          <div class="metric-label">Caras</div>
        </div>
        <div class="metric-card">
          <div class="metric-value purple" id="metric-drawcalls">0</div>
          <div class="metric-label">Draw Calls</div>
        </div>
        <div class="metric-card">
          <div class="metric-value green" id="metric-textures">0</div>
          <div class="metric-label">Textures</div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Export</div>
      <button class="btn-regenerate" onclick="exportScene()">
        📦 Exportar SceneConfig (JSON)
      </button>
      <button class="btn-regenerate" onclick="exportScreenshot()" style="margin-top:8px;">
        📸 Captura de Pantalla
      </button>
    </div>
  </aside>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="footer-left">
      <span><span class="status-dot"></span> Engine Online</span>
      <span>Three.js r128</span>
      <span>Turborepo Monorepo</span>
    </div>
    <div class="footer-right">
      <span id="footer-time"></span>
      <span>Spec-Code Convergence: <span style="color:var(--accent-green)">0 drift</span></span>
    </div>
  </footer>
</div>

<script>
// ═══════════════════════════════════════════════════════════════
// BELENTANI VISUAL ENGINE — Procedural Lore → Experience
// ═══════════════════════════════════════════════════════════════

// ─── GLOBALS ───
let scene, camera, renderer, clock;
let currentGenerator = 'planet';
let currentObjects = [];
let autoRotate = true;
let isAnimating = true;
let wireframeMode = false;
let postFXEnabled = true;
let seed = 42;
let frameCount = 0;
let lastFpsTime = 0;
let mousePos = { x: 0, y: 0 };
let cameraAngle = 0;
let cameraRadius = 5;
let cameraHeight = 2;
let targetCameraAngle = 0;
let targetCameraHeight = 2;
let targetCameraRadius = 5;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let composerActive = false;

// ─── SEEDED RANDOM ───
class SeededRandom {
  constructor(s) { this.state = s; }
  next() {
    this.state = (this.state * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (this.state >>> 0) / 4294967296;
  }
  range(min, max) { return min + this.next() * (max - min); }
}

// ─── SIMPLEX NOISE (simplified 3D) ───
class SimplexNoise {
  constructor(s = 0) {
    this.rng = new SeededRandom(s);
    this.perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(this.rng.next() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  noise3D(x, y, z) {
    // Simplified value noise with smooth interpolation
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y), zf = z - Math.floor(z);
    const u = this.fade(xf), v = this.fade(yf), w = this.fade(zf);
    
    const A = this.perm[X] + Y, AA = this.perm[A] + Z, AB = this.perm[A + 1] + Z;
    const B = this.perm[X + 1] + Y, BA = this.perm[B] + Z, BB = this.perm[B + 1] + Z;
    
    return this.lerp(w,
      this.lerp(v,
        this.lerp(u, this.grad(this.perm[AA], xf, yf, zf), this.grad(this.perm[BA], xf-1, yf, zf)),
        this.lerp(u, this.grad(this.perm[AB], xf, yf-1, zf), this.grad(this.perm[BB], xf-1, yf-1, zf))
      ),
      this.lerp(v,
        this.lerp(u, this.grad(this.perm[AA+1], xf, yf, zf-1), this.grad(this.perm[BA+1], xf-1, yf, zf-1)),
        this.lerp(u, this.grad(this.perm[AB+1], xf, yf-1, zf-1), this.grad(this.perm[BB+1], xf-1, yf-1, zf-1))
      )
    );
  }

  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t, a, b) { return a + t * (b - a); }
  grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  fbm(x, y, z, octaves = 6, lacunarity = 2.0, gain = 0.5) {
    let value = 0, amplitude = 1, frequency = 1, maxVal = 0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise3D(x * frequency, y * frequency, z * frequency);
      maxVal += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return value / maxVal;
  }
}

// ─── PARAMETER DEFINITIONS ───
const generatorParams = {
  planet: {
    title: 'PlanetGenerator',
    color: 'green',
    groups: [
      {
        name: 'Terreno FBM',
        params: [
          { id: 'terrainScale', label: 'Escala', min: 0.5, max: 5, val: 2.0, step: 0.1 },
          { id: 'octaves', label: 'Octavas', min: 1, max: 8, val: 6, step: 1 },
          { id: 'lacunarity', label: 'Lacunaridad', min: 1.5, max: 3, val: 2.0, step: 0.1 },
          { id: 'gain', label: 'Gain', min: 0.1, max: 0.8, val: 0.5, step: 0.05 },
          { id: 'heightMult', label: 'Altura', min: 0.1, max: 2, val: 0.6, step: 0.05 },
        ]
      },
      {
        name: 'Atmósfera',
        params: [
          { id: 'atmoDensity', label: 'Densidad', min: 0, max: 2, val: 1.0, step: 0.1 },
          { id: 'atmoColor', label: 'Dispersión', min: 0, max: 1, val: 0.5, step: 0.05 },
        ]
      },
      {
        name: 'Biomas',
        params: [
          { id: 'biomeCount', label: 'Cantidad', min: 2, max: 8, val: 5, step: 1 },
          { id: 'veinIntensity', label: 'Venas', min: 0, max: 1, val: 0.3, step: 0.05 },
        ]
      }
    ]
  },
  diamond: {
    title: 'DiamondGenerator',
    color: 'cyan',
    groups: [
      {
        name: 'Óptica',
        params: [
          { id: 'ior', label: 'IOR', min: 1.5, max: 2.8, val: 2.417, step: 0.001 },
          { id: 'dispersion', label: 'Dispersión', min: 0, max: 0.1, val: 0.044, step: 0.001 },
          { id: 'transparency', label: 'Transparencia', min: 0, max: 1, val: 0.9, step: 0.05 },
        ]
      },
      {
        name: 'Corte Tolkowsky',
        params: [
          { id: 'facets', label: 'Facetas', min: 16, max: 64, val: 32, step: 4 },
          { id: 'crownAngle', label: 'Ángulo Corona', min: 20, max: 40, val: 34.5, step: 0.5 },
          { id: 'pavilionAngle', label: 'Ángulo Pabellón', min: 35, max: 45, val: 40.75, step: 0.5 },
        ]
      },
      {
        name: 'Caústicas',
        params: [
          { id: 'causticIntensity', label: 'Intensidad', min: 0, max: 2, val: 1.0, step: 0.1 },
          { id: 'causticScale', label: 'Escala', min: 0.5, max: 5, val: 2.0, step: 0.1 },
        ]
      }
    ]
  },
  key: {
    title: 'KeyGenerator',
    color: 'gold',
    groups: [
      {
        name: 'Material PBR',
        params: [
          { id: 'goldHue', label: 'Matiz Oro', min: 30, max: 60, val: 45, step: 1 },
          { id: 'metalness', label: 'Metalness', min: 0, max: 1, val: 0.95, step: 0.01 },
          { id: 'roughness', label: 'Roughness', min: 0, max: 1, val: 0.15, step: 0.01 },
        ]
      },
      {
        name: 'Pulso 432Hz',
        params: [
          { id: 'pulseFreq', label: 'Frecuencia', min: 200, max: 800, val: 432, step: 1 },
          { id: 'pulseAmp', label: 'Amplitud', min: 0, max: 0.2, val: 0.05, step: 0.005 },
        ]
      },
      {
        name: 'Grabado',
        params: [
          { id: 'engravingDepth', label: 'Profundidad', min: 0, max: 0.1, val: 0.02, step: 0.005 },
          { id: 'engravingPattern', label: 'Patrón', min: 1, max: 5, val: 3, step: 1 },
        ]
      }
    ]
  },
  machine: {
    title: 'MachineGenerator',
    color: 'purple',
    groups: [
      {
        name: 'Iris',
        params: [
          { id: 'irisSegments', label: 'Segmentos', min: 4, max: 16, val: 8, step: 1 },
          { id: 'irisOpen', label: 'Apertura', min: 0, max: 1, val: 0.5, step: 0.05 },
          { id: 'irisSpeed', label: 'Velocidad', min: 0.1, max: 3, val: 1.0, step: 0.1 },
        ]
      },
      {
        name: 'Anillos',
        params: [
          { id: 'ringCount', label: 'Cantidad', min: 1, max: 8, val: 4, step: 1 },
          { id: 'ringSpacing', label: 'Espaciado', min: 0.2, max: 1, val: 0.5, step: 0.05 },
        ]
      },
      {
        name: 'Pulso Biológico',
        params: [
          { id: 'bioFreq', label: '432Hz Pulse', min: 0.5, max: 2, val: 1.0, step: 0.1 },
          { id: 'bioGlow', label: 'Brillo', min: 0, max: 2, val: 0.8, step: 0.1 },
        ]
      }
    ]
  },
  mirror: {
    title: 'MirrorGenerator',
    color: 'pink',
    groups: [
      {
        name: 'Portal',
        params: [
          { id: 'portalType', label: 'Tipo (0-2)', min: 0, max: 2, val: 0, step: 1 },
          { id: 'portalRadius', label: 'Radio', min: 0.5, max: 3, val: 1.5, step: 0.1 },
          { id: 'portalSwirl', label: 'Vórtice', min: 0, max: 5, val: 2.0, step: 0.1 },
        ]
      },
      {
        name: 'Fractura',
        params: [
          { id: 'fractureCount', label: 'Fragmentos', min: 0, max: 20, val: 8, step: 1 },
          { id: 'fractureSize', label: 'Tamaño', min: 0.05, max: 0.5, val: 0.15, step: 0.01 },
        ]
      },
      {
        name: 'Glitch',
        params: [
          { id: 'glitchIntensity', label: 'Intensidad', min: 0, max: 1, val: 0.3, step: 0.05 },
          { id: 'glitchFreq', label: 'Frecuencia', min: 0.1, max: 5, val: 1.5, step: 0.1 },
        ]
      }
    ]
  },
  accretion: {
    title: 'AccretionGenerator',
    color: 'orange',
    groups: [
      {
        name: 'Partículas',
        params: [
          { id: 'particleCount', label: 'Cantidad', min: 500, max: 10000, val: 3000, step: 500 },
          { id: 'particleSize', label: 'Tamaño', min: 0.01, max: 0.1, val: 0.03, step: 0.005 },
        ]
      },
      {
        name: 'Órbitas Kepler',
        params: [
          { id: 'orbitMin', label: 'Radio Mín', min: 0.5, max: 2, val: 1.0, step: 0.1 },
          { id: 'orbitMax', label: 'Radio Máx', min: 2, max: 8, val: 4.0, step: 0.1 },
          { id: 'eccentricity', label: 'Excentricidad', min: 0, max: 0.8, val: 0.2, step: 0.05 },
        ]
      },
      {
        name: 'Temperatura',
        params: [
          { id: 'tempCore', label: 'Core (K)', min: 5000, max: 30000, val: 15000, step: 1000 },
          { id: 'tempEdge', label: 'Edge (K)', min: 500, max: 5000, val: 2000, step: 100 },
        ]
      }
    ]
  }
};

// ─── TRANSLATIONS ───
const translations = {
  pt: { gen: 'Geradores', composer: 'Compositor de Cena', metrics: 'Métricas', export: 'Exportar', animate: '▶ Animar', wireframe: '◇ Wireframe', postfx: '✦ PostFX', next: '→ Próximo', seed: '🎲 Semente Aleatória', reset: '⟲ Resetar', autorot: '↻ Auto-Rotação' },
  es: { gen: 'Generadores', composer: 'Compositor de Escena', metrics: 'Métricas', export: 'Exportar', animate: '▶ Animar', wireframe: '◇ Wireframe', postfx: '✦ PostFX', next: '→ Siguiente', seed: '🎲 Seed Aleatorio', reset: '⟲ Reset', autorot: '↻ Auto-Rotar' },
  en: { gen: 'Generators', composer: 'Scene Composer', metrics: 'Metrics', export: 'Export', animate: '▶ Animate', wireframe: '◇ Wireframe', postfx: '✦ PostFX', next: '→ Next', seed: '🎲 Random Seed', reset: '⟲ Reset', autorot: '↻ Auto-Rotate' },
  ca: { gen: 'Generadors', composer: 'Compositor d\'Escena', metrics: 'Mètriques', export: 'Exportar', animate: '▶ Animar', wireframe: '◇ Wireframe', postfx: '✦ PostFX', next: '→ Següent', seed: '🎲 Seed Aleatori', reset: '⟲ Reset', autorot: '↻ Auto-Rotar' }
};

// ─── INIT THREE.JS ───
function initThree() {
  const canvas = document.getElementById('three-canvas');
  const viewport = document.getElementById('viewport');
  
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.05);
  
  camera = new THREE.PerspectiveCamera(60, viewport.clientWidth / viewport.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  
  clock = new THREE.Clock();
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
  scene.add(ambientLight);
  
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);
  
  const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);
  
  const rimLight = new THREE.PointLight(0x00e5ff, 0.5, 20);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);
  
  // Starfield background
  createStarfield();
  
  // Grid helper (subtle)
  const gridHelper = new THREE.GridHelper(20, 40, 0x1a1a2e, 0x1a1a2e);
  gridHelper.position.y = -2;
  scene.add(gridHelper);
  
  // Events
  window.addEventListener('resize', onResize);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('wheel', onWheel);
  canvas.addEventListener('touchstart', onTouchStart, { passive: false });
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onTouchEnd);
  
  // Mouse tracking for accretion gravity
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });
}

function createStarfield() {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const rng = new SeededRandom(12345);
  
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const theta = rng.next() * Math.PI * 2;
    const phi = Math.acos(2 * rng.next() - 1);
    const r = 50 + rng.next() * 50;
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3+2] = r * Math.cos(phi);
    
    const brightness = 0.3 + rng.next() * 0.7;
    const tint = rng.next();
    colors[i3] = brightness * (tint > 0.7 ? 1.0 : 0.8);
    colors[i3+1] = brightness * (tint > 0.5 ? 1.0 : 0.85);
    colors[i3+2] = brightness;
  }
  
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const starsMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}

// ─── GENERATORS ───

function clearCurrentObjects() {
  currentObjects.forEach(obj => {
    scene.remove(obj);
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  });
  currentObjects = [];
}

function getParam(id) {
  const el = document.getElementById('param-' + id);
  return el ? parseFloat(el.value) : 0;
}

// ── PLANET GENERATOR ──
function generatePlanet() {
  clearCurrentObjects();
  const noise = new SimplexNoise(seed);
  const scale = getParam('terrainScale') || 2.0;
  const octaves = getParam('octaves') || 6;
  const lac = getParam('lacunarity') || 2.0;
  const gain = getParam('gain') || 0.5;
  const heightMult = getParam('heightMult') || 0.6;
  const atmoDensity = getParam('atmoDensity') || 1.0;
  const veinIntensity = getParam('veinIntensity') || 0.3;
  
  // Planet sphere with displaced vertices
  const geo = new THREE.SphereGeometry(1.5, 128, 128);
  const positions = geo.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const normals = geo.attributes.normal;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    // FBM displacement
    const nx = x * scale, ny = y * scale, nz = z * scale;
    let h = noise.fbm(nx, ny, nz, octaves, lac, gain);
    
    // Domain warp
    const warpX = noise.fbm(nx + 5.2, ny + 1.3, nz + 2.8, 3) * 0.3;
    const warpY = noise.fbm(nx + 1.7, ny + 9.2, nz + 4.1, 3) * 0.3;
    h += noise.fbm(nx + warpX, ny + warpY, nz, 4) * 0.3;
    
    // Veins
    const vein = Math.abs(noise.noise3D(nx * 3, ny * 3, nz * 3));
    const veinFactor = Math.pow(1 - vein, 8) * veinIntensity;
    h += veinFactor;
    
    const displacement = 1.5 + h * heightMult;
    positions.setXYZ(i, 
      normals.getX(i) * displacement,
      normals.getY(i) * displacement,
      normals.getZ(i) * displacement
    );
    
    // Biome coloring
    const elevation = h;
    let r, g, b;
    if (elevation < -0.2) { r = 0.05; g = 0.15; b = 0.4; } // Deep ocean
    else if (elevation < 0.0) { r = 0.1; g = 0.3; b = 0.5; } // Shallow water
    else if (elevation < 0.1) { r = 0.76; g = 0.7; b = 0.5; } // Beach
    else if (elevation < 0.3) { r = 0.2; g = 0.55; b = 0.15; } // Grass
    else if (elevation < 0.5) { r = 0.1; g = 0.4; b = 0.1; } // Forest
    else if (elevation < 0.7) { r = 0.45; g = 0.35; b = 0.25; } // Mountain
    else { r = 0.9; g = 0.92; b = 0.95; } // Snow
    
    // Vein glow
    if (veinFactor > 0.01) {
      r = r * (1 - veinFactor) + 0.0 * veinFactor;
      g = g * (1 - veinFactor) + 0.9 * veinFactor;
      b = b * (1 - veinFactor) + 0.7 * veinFactor;
    }
    
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: false,
    wireframe: wireframeMode
  });
  
  const planet = new THREE.Mesh(geo, mat);
  planet.castShadow = true;
  planet.receiveShadow = true;
  scene.add(planet);
  currentObjects.push(planet);
  
  // Atmosphere shell
  const atmoGeo = new THREE.SphereGeometry(1.5 + 0.15 * atmoDensity, 64, 64);
  const atmoMat = new THREE.MeshBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.08 * atmoDensity,
    side: THREE.BackSide,
    wireframe: wireframeMode
  });
  const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
  scene.add(atmosphere);
  currentObjects.push(atmosphere);
  
  // Outer glow
  const glowGeo = new THREE.SphereGeometry(1.5 + 0.4 * atmoDensity, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00aaff,
    transparent: true,
    opacity: 0.03 * atmoDensity,
    side: THREE.BackSide,
    wireframe: wireframeMode
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);
  currentObjects.push(glow);
  
  // Aurora ring
  const auroraGeo = new THREE.TorusGeometry(1.8, 0.05, 8, 64);
  const auroraMat = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.3,
    wireframe: wireframeMode
  });
  const aurora = new THREE.Mesh(auroraGeo, auroraMat);
  aurora.rotation.x = Math.PI * 0.4;
  aurora.rotation.z = Math.PI * 0.1;
  scene.add(aurora);
  currentObjects.push(aurora);
  
  updateMetrics(geo);
}

// ── DIAMOND GENERATOR ──
function generateDiamond() {
  clearCurrentObjects();
  const ior = getParam('ior') || 2.417;
  const dispersion = getParam('dispersion') || 0.044;
  const transparency = getParam('transparency') || 0.9;
  const facets = getParam('facets') || 32;
  const crownAngle = getParam('crownAngle') || 34.5;
  const pavilionAngle = getParam('pavilionAngle') || 40.75;
  const causticIntensity = getParam('causticIntensity') || 1.0;
  
  // Diamond shape: octahedron-like with custom geometry
  const topRadius = 1.0;
  const girdle = 0.05;
  const crownHeight = Math.tan(crownAngle * Math.PI / 180) * topRadius;
  const pavilionDepth = Math.tan(pavilionAngle * Math.PI / 180) * topRadius;
  
  // Create diamond using lathe geometry for Tolkowsky approximation
  const points = [];
  // Pavilion (bottom point to girdle)
  points.push(new THREE.Vector2(0, -pavilionDepth));
  points.push(new THREE.Vector2(topRadius * 0.95, -girdle));
  points.push(new THREE.Vector2(topRadius, 0));
  // Crown (girdle to table)
  points.push(new THREE.Vector2(topRadius * 0.85, crownHeight * 0.5));
  points.push(new THREE.Vector2(topRadius * 0.55, crownHeight * 0.85));
  points.push(new THREE.Vector2(topRadius * 0.45, crownHeight));
  points.push(new THREE.Vector2(0, crownHeight));
  
  const diamondGeo = new THREE.LatheGeometry(points, facets);
  
  // Diamond material with high refraction simulation
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.0,
    transmission: transparency,
    thickness: 2.0,
    ior: ior,
    transparent: true,
    opacity: 0.95,
    envMapIntensity: 2.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    wireframe: wireframeMode,
    side: THREE.DoubleSide
  });
  
  const diamond = new THREE.Mesh(diamondGeo, diamondMat);
  diamond.scale.set(1.2, 1.2, 1.2);
  diamond.castShadow = true;
  scene.add(diamond);
  currentObjects.push(diamond);
  
  // Inner caustic glow
  const causticGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const causticMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setHSL(dispersion * 10, 1, 0.6),
    transparent: true,
    opacity: 0.15 * causticIntensity,
    wireframe: wireframeMode
  });
  const caustic = new THREE.Mesh(causticGeo, causticMat);
  scene.add(caustic);
  currentObjects.push(caustic);
  
  // Dispersion rays
  for (let i = 0; i < 8; i++) {
    const rayGeo = new THREE.CylinderGeometry(0.005, 0.02, 3, 8);
    const hue = (i / 8 + dispersion * 5) % 1;
    const rayMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(hue, 1, 0.6),
      transparent: true,
      opacity: 0.2 * causticIntensity,
      wireframe: wireframeMode
    });
    const ray = new THREE.Mesh(rayGeo, rayMat);
    const angle = (i / 8) * Math.PI * 2;
    ray.position.set(Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3);
    ray.rotation.z = Math.PI * 0.15 * (i % 2 === 0 ? 1 : -1);
    ray.rotation.x = angle;
    scene.add(ray);
    currentObjects.push(ray);
  }
  
  // Sparkle particles
  const sparkleGeo = new THREE.BufferGeometry();
  const sparkleCount = 200;
  const sparklePos = new Float32Array(sparkleCount * 3);
  const sparkleCol = new Float32Array(sparkleCount * 3);
  const rng = new SeededRandom(seed);
  
  for (let i = 0; i < sparkleCount; i++) {
    const theta = rng.next() * Math.PI * 2;
    const phi = Math.acos(2 * rng.next() - 1);
    const r = 0.8 + rng.next() * 1.5;
    sparklePos[i*3] = r * Math.sin(phi) * Math.cos(theta);
    sparklePos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    sparklePos[i*3+2] = r * Math.cos(phi);
    const h = rng.next();
    const c = new THREE.Color().setHSL(h, 0.8, 0.7);
    sparkleCol[i*3] = c.r;
    sparkleCol[i*3+1] = c.g;
    sparkleCol[i*3+2] = c.b;
  }
  
  sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
  sparkleGeo.setAttribute('color', new THREE.BufferAttribute(sparkleCol, 3));
  
  const sparkleMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  
  const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
  scene.add(sparkles);
  currentObjects.push(sparkles);
  
  updateMetrics(diamondGeo);
}

// ── KEY GENERATOR ──
function generateKey() {
  clearCurrentObjects();
  const goldHue = getParam('goldHue') || 45;
  const metalness = getParam('metalness') || 0.95;
  const roughness = getParam('roughness') || 0.15;
  const pulseFreq = getParam('pulseFreq') || 432;
  const pulseAmp = getParam('pulseAmp') || 0.05;
  const engravingDepth = getParam('engravingDepth') || 0.02;
  
  const goldColor = new THREE.Color().setHSL(goldHue / 360, 0.8, 0.5);
  
  // Key bow (ring)
  const bowGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 32);
  const keyMat = new THREE.MeshStandardMaterial({
    color: goldColor,
    metalness: metalness,
    roughness: roughness,
    wireframe: wireframeMode
  });
  
  const bow = new THREE.Mesh(bowGeo, keyMat);
  bow.position.y = 1.0;
  bow.rotation.x = Math.PI / 2;
  scene.add(bow);
  currentObjects.push(bow);
  
  // Key shaft
  const shaftGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.0, 16);
  const shaft = new THREE.Mesh(shaftGeo, keyMat.clone());
  shaft.position.y = -0.0;
  scene.add(shaft);
  currentObjects.push(shaft);
  
  // Key bit (teeth)
  const bitGroup = new THREE.Group();
  const toothCount = 4;
  for (let i = 0; i < toothCount; i++) {
    const toothGeo = new THREE.BoxGeometry(0.15, 0.08, 0.06);
    const tooth = new THREE.Mesh(toothGeo, keyMat.clone());
    tooth.position.set(0.1, -1.0 + i * 0.15, 0);
    bitGroup.add(tooth);
  }
  scene.add(bitGroup);
  currentObjects.push(bitGroup);
  
  // Engraving rings on bow
  for (let i = 0; i < 3; i++) {
    const engGeo = new THREE.TorusGeometry(0.5 + engravingDepth * (i+1), 0.01, 8, 32);
    const engMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.3,
      wireframe: wireframeMode
    });
    const eng = new THREE.Mesh(engGeo, engMat);
    eng.position.y = 1.0;
    eng.rotation.x = Math.PI / 2;
    scene.add(eng);
    currentObjects.push(eng);
  }
  
  // 432Hz pulse glow
  const pulseGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: goldColor,
    transparent: true,
    opacity: 0.05,
    wireframe: wireframeMode
  });
  const pulse = new THREE.Mesh(pulseGeo, pulseMat);
  pulse.position.y = 0.5;
  pulse.userData.isPulse = true;
  pulse.userData.pulseFreq = pulseFreq;
  pulse.userData.pulseAmp = pulseAmp;
  scene.add(pulse);
  currentObjects.push(pulse);
  
  // Floating rune particles
  const runeGeo = new THREE.BufferGeometry();
  const runeCount = 50;
  const runePos = new Float32Array(runeCount * 3);
  const rng = new SeededRandom(seed);
  
  for (let i = 0; i < runeCount; i++) {
    const angle = rng.next() * Math.PI * 2;
    const r = 0.8 + rng.next() * 0.5;
    runePos[i*3] = Math.cos(angle) * r;
    runePos[i*3+1] = rng.range(-1, 2);
    runePos[i*3+2] = Math.sin(angle) * r;
  }
  
  runeGeo.setAttribute('position', new THREE.BufferAttribute(runePos, 3));
  const runeMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffd700,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  
  const runes = new THREE.Points(runeGeo, runeMat);
  scene.add(runes);
  currentObjects.push(runes);
  
  updateMetrics(bowGeo);
}

// ── MACHINE GENERATOR ──
function generateMachine() {
  clearCurrentObjects();
  const irisSegments = getParam('irisSegments') || 8;
  const irisOpen = getParam('irisOpen') || 0.5;
  const ringCount = getParam('ringCount') || 4;
  const ringSpacing = getParam('ringSpacing') || 0.5;
  const bioFreq = getParam('bioFreq') || 1.0;
  const bioGlow = getParam('bioGlow') || 0.8;
  
  const machineMat = new THREE.MeshStandardMaterial({
    color: 0x333355,
    metalness: 0.9,
    roughness: 0.3,
    wireframe: wireframeMode
  });
  
  // Central housing
  const housingGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
  const housing = new THREE.Mesh(housingGeo, machineMat);
  scene.add(housing);
  currentObjects.push(housing);
  
  // Iris blades
  const irisGroup = new THREE.Group();
  for (let i = 0; i < irisSegments; i++) {
    const angle = (i / irisSegments) * Math.PI * 2;
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0.6, 0.15);
    bladeShape.lineTo(0.6, -0.15);
    bladeShape.lineTo(0, 0);
    
    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.05, bevelEnabled: false });
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x4422aa,
      emissiveIntensity: 0.2,
      wireframe: wireframeMode
    });
    
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.rotation.z = angle;
    blade.position.set(
      Math.cos(angle) * irisOpen * 0.3,
      Math.sin(angle) * irisOpen * 0.3,
      0.15
    );
    blade.userData.baseAngle = angle;
    blade.userData.isIrisBlade = true;
    irisGroup.add(blade);
  }
  scene.add(irisGroup);
  currentObjects.push(irisGroup);
  
  // Concentric rings
  for (let i = 0; i < ringCount; i++) {
    const radius = 0.5 + i * ringSpacing;
    const ringGeo = new THREE.TorusGeometry(radius, 0.02 + (ringCount - i) * 0.005, 8, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.75 - i * 0.05, 0.8, 0.5),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color().setHSL(0.75 - i * 0.05, 1, 0.2),
      emissiveIntensity: bioGlow * 0.3,
      wireframe: wireframeMode
    });
    
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 0.08 - ringCount * 0.04;
    ring.userData.isRing = true;
    ring.userData.ringIndex = i;
    scene.add(ring);
    currentObjects.push(ring);
  }
  
  // Core energy
  const coreGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.8,
    wireframe: wireframeMode
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.userData.isCore = true;
  scene.add(core);
  currentObjects.push(core);
  
  // Core glow
  const coreGlowGeo = new THREE.SphereGeometry(0.4, 16, 16);
  const coreGlowMat = new THREE.MeshBasicMaterial({
    color: 0x6633cc,
    transparent: true,
    opacity: 0.1 * bioGlow,
    wireframe: wireframeMode
  });
  const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
  coreGlow.userData.isCoreGlow = true;
  scene.add(coreGlow);
  currentObjects.push(coreGlow);
  
  updateMetrics(housingGeo);
}

// ── MIRROR GENERATOR ──
function generateMirror() {
  clearCurrentObjects();
  const portalType = getParam('portalType') || 0;
  const portalRadius = getParam('portalRadius') || 1.5;
  const portalSwirl = getParam('portalSwirl') || 2.0;
  const fractureCount = getParam('fractureCount') || 8;
  const fractureSize = getParam('fractureSize') || 0.15;
  const glitchIntensity = getParam('glitchIntensity') || 0.3;
  
  const portalColors = [
    [0x00e5ff, 0x8b5cf6], // Portal - cyan/purple
    [0xec4899, 0xff6b35], // Nexus - pink/orange
    [0x111111, 0x330033]  // Void - dark
  ];
  
  const [color1, color2] = portalColors[Math.floor(portalType) % 3];
  
  // Portal disc
  const portalGeo = new THREE.CircleGeometry(portalRadius, 64);
  const portalMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uSwirl: { value: portalSwirl },
      uGlitch: { value: glitchIntensity }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uSwirl;
      uniform float uGlitch;
      varying vec2 vUv;
      
      void main() {
        vec2 center = vUv - 0.5;
        float dist = length(center);
        float angle = atan(center.y, center.x);
        
        // Swirl
        float swirl = angle + dist * uSwirl * 3.0 - uTime * 1.5;
        float pattern = sin(swirl * 5.0) * 0.5 + 0.5;
        
        // Radial gradient
        float radial = 1.0 - smoothstep(0.0, 0.5, dist);
        
        // Glitch
        float glitch = step(0.98, sin(uTime * 20.0 + vUv.y * 50.0)) * uGlitch;
        
        vec3 color = mix(uColor1, uColor2, pattern);
        color += glitch * vec3(1.0, 0.0, 0.5);
        
        float alpha = radial * (0.7 + pattern * 0.3);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    wireframe: wireframeMode
  });
  
  const portal = new THREE.Mesh(portalGeo, portalMat);
  portal.userData.isPortal = true;
  scene.add(portal);
  currentObjects.push(portal);
  
  // Portal frame ring
  const frameGeo = new THREE.TorusGeometry(portalRadius + 0.05, 0.06, 8, 64);
  const frameMat = new THREE.MeshStandardMaterial({
    color: color1,
    metalness: 0.9,
    roughness: 0.1,
    emissive: color1,
    emissiveIntensity: 0.3,
    wireframe: wireframeMode
  });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  scene.add(frame);
  currentObjects.push(frame);
  
  // Fracture shards
  const rng = new SeededRandom(seed);
  for (let i = 0; i < fractureCount; i++) {
    const shardGeo = new THREE.PlaneGeometry(
      fractureSize * (0.5 + rng.next()),
      fractureSize * (0.5 + rng.next())
    );
    const shardMat = new THREE.MeshBasicMaterial({
      color: color1,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      wireframe: wireframeMode
    });
    
    const shard = new THREE.Mesh(shardGeo, shardMat);
    const angle = rng.next() * Math.PI * 2;
    const dist = portalRadius * (0.3 + rng.next() * 0.8);
    shard.position.set(
      Math.cos(angle) * dist,
      Math.sin(angle) * dist,
      0.1 + rng.next() * 0.3
    );
    shard.rotation.z = rng.next() * Math.PI;
    shard.userData.isShard = true;
    shard.userData.shardAngle = angle;
    scene.add(shard);
    currentObjects.push(shard);
  }
  
  // Energy particles around portal
  const particleGeo = new THREE.BufferGeometry();
  const pCount = 300;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  
  for (let i = 0; i < pCount; i++) {
    const angle = rng.next() * Math.PI * 2;
    const r = portalRadius * (0.8 + rng.next() * 0.5);
    pPos[i*3] = Math.cos(angle) * r;
    pPos[i*3+1] = Math.sin(angle) * r;
    pPos[i*3+2] = (rng.next() - 0.5) * 0.5;
    
    const c = new THREE.Color(color1).lerp(new THREE.Color(color2), rng.next());
    pCol[i*3] = c.r;
    pCol[i*3+1] = c.g;
    pCol[i*3+2] = c.b;
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  
  const particleMat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particleGeo, particleMat);
  particles.userData.isPortalParticles = true;
  scene.add(particles);
  currentObjects.push(particles);
  
  updateMetrics(portalGeo);
}

// ── ACCRETION GENERATOR ──
function generateAccretion() {
  clearCurrentObjects();
  const particleCount = Math.min(getParam('particleCount') || 3000, 10000);
  const particleSize = getParam('particleSize') || 0.03;
  const orbitMin = getParam('orbitMin') || 1.0;
  const orbitMax = getParam('orbitMax') || 4.0;
  const eccentricity = getParam('eccentricity') || 0.2;
  const tempCore = getParam('tempCore') || 15000;
  const tempEdge = getParam('tempEdge') || 2000;
  
  const rng = new SeededRandom(seed);
  
  // Central mass (black hole / compact object)
  const coreGeo = new THREE.SphereGeometry(0.3, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: wireframeMode
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);
  currentObjects.push(core);
  
  // Event horizon glow
  const ehGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const ehMat = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.3,
    wireframe: wireframeMode
  });
  const eh = new THREE.Mesh(ehGeo, ehMat);
  scene.add(eh);
  currentObjects.push(eh);
  
  // Accretion disk particles
  const diskGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const velocities = new Float32Array(particleCount * 3); // stored for animation
  
  for (let i = 0; i < particleCount; i++) {
    // Kepler orbit distribution
    const r = orbitMin + Math.pow(rng.next(), 0.7) * (orbitMax - orbitMin);
    const theta = rng.next() * Math.PI * 2;
    const diskHeight = 0.1 * (1 - (r - orbitMin) / (orbitMax - orbitMin));
    const y = (rng.next() - 0.5) * diskHeight;
    
    // Eccentricity
    const e = eccentricity * rng.next();
    const actualR = r * (1 - e * Math.cos(theta));
    
    positions[i*3] = Math.cos(theta) * actualR;
    positions[i*3+1] = y;
    positions[i*3+2] = Math.sin(theta) * actualR;
    
    // Temperature gradient → color
    const tempFactor = 1 - (r - orbitMin) / (orbitMax - orbitMin);
    const temp = tempEdge + tempFactor * (tempCore - tempEdge);
    
    // Temperature to color (blackbody approximation)
    let cr, cg, cb;
    const t = temp / 1000;
    if (t < 3) {
      cr = 1.0; cg = 0.3 + t * 0.2; cb = 0.1;
    } else if (t < 7) {
      cr = 1.0; cg = 0.6 + (t-3) * 0.1; cb = 0.2 + (t-3) * 0.1;
    } else {
      cr = 0.8 + (15-t) * 0.02; cg = 0.85; cb = 1.0;
    }
    
    colors[i*3] = cr;
    colors[i*3+1] = cg;
    colors[i*3+2] = cb;
    
    sizes[i] = particleSize * (0.5 + rng.next()) * (1 + tempFactor);
    
    // Orbital velocity (Kepler's third law: v ∝ r^(-0.5))
    const speed = 1.0 / Math.sqrt(actualR);
    velocities[i*3] = -Math.sin(theta) * speed;
    velocities[i*3+1] = 0;
    velocities[i*3+2] = Math.cos(theta) * speed;
  }
  
  diskGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  diskGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const diskMat = new THREE.PointsMaterial({
    size: particleSize,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    wireframe: wireframeMode
  });
  
  const disk = new THREE.Points(diskGeo, diskMat);
  disk.userData.isAccretionDisk = true;
  disk.userData.velocities = velocities;
  disk.userData.orbitMin = orbitMin;
  disk.userData.orbitMax = orbitMax;
  disk.userData.eccentricity = eccentricity;
  scene.add(disk);
  currentObjects.push(disk);
  
  // Jets (polar outflows)
  for (let sign of [-1, 1]) {
    const jetGeo = new THREE.BufferGeometry();
    const jetCount = 200;
    const jetPos = new Float32Array(jetCount * 3);
    const jetCol = new Float32Array(jetCount * 3);
    
    for (let i = 0; i < jetCount; i++) {
      const h = rng.next() * 3;
      const spread = h * 0.1;
      const angle = rng.next() * Math.PI * 2;
      jetPos[i*3] = Math.cos(angle) * spread * rng.next();
      jetPos[i*3+1] = sign * (0.5 + h);
      jetPos[i*3+2] = Math.sin(angle) * spread * rng.next();
      
      const brightness = 1 - h / 3;
      jetCol[i*3] = 0.3 * brightness;
      jetCol[i*3+1] = 0.5 * brightness;
      jetCol[i*3+2] = 1.0 * brightness;
    }
    
    jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
    jetGeo.setAttribute('color', new THREE.BufferAttribute(jetCol, 3));
    
    const jetMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });
    
    const jet = new THREE.Points(jetGeo, jetMat);
    scene.add(jet);
    currentObjects.push(jet);
  }
  
  updateMetrics(diskGeo);
}

// ─── COMPOSE SCENE ───
function composeScene() {
  composerActive = !composerActive;
  clearCurrentObjects();
  
  if (composerActive) {
    // Create a combined scene with all generators at smaller scale
    const rng = new SeededRandom(seed);
    
    // Mini planet
    const planetGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x226644,
      roughness: 0.8,
      wireframe: wireframeMode
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(-2.5, 0, 0);
    scene.add(planet);
    currentObjects.push(planet);
    
    // Mini diamond
    const dPoints = [];
    dPoints.push(new THREE.Vector2(0, -0.5));
    dPoints.push(new THREE.Vector2(0.3, 0));
    dPoints.push(new THREE.Vector2(0.15, 0.35));
    dPoints.push(new THREE.Vector2(0, 0.4));
    const dGeo = new THREE.LatheGeometry(dPoints, 16);
    const dMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      thickness: 1,
      ior: 2.4,
      roughness: 0,
      wireframe: wireframeMode
    });
    const diamond = new THREE.Mesh(dGeo, dMat);
    diamond.position.set(-1, 1, 0);
    diamond.scale.set(0.6, 0.6, 0.6);
    scene.add(diamond);
    currentObjects.push(diamond);
    
    // Mini key
    const kGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 16);
    const kMat = new THREE.MeshStandardMaterial({
      color: 0xd4a853,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: wireframeMode
    });
    const key = new THREE.Mesh(kGeo, kMat);
    key.position.set(0.5, 1.5, 0);
    scene.add(key);
    currentObjects.push(key);
    
    const shaftGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const shaft = new THREE.Mesh(shaftGeo, kMat.clone());
    shaft.position.set(0.5, 1.1, 0);
    scene.add(shaft);
    currentObjects.push(shaft);
    
    // Mini machine
    const mGeo = new THREE.TorusGeometry(0.4, 0.03, 8, 32);
    const mMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x4422aa,
      emissiveIntensity: 0.3,
      wireframe: wireframeMode
    });
    const machine = new THREE.Mesh(mGeo, mMat);
    machine.position.set(2, 0.5, 0);
    machine.rotation.x = Math.PI / 2;
    scene.add(machine);
    currentObjects.push(machine);
    
    // Mini mirror/portal
    const mirrorGeo = new THREE.CircleGeometry(0.4, 32);
    const mirrorMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      wireframe: wireframeMode
    });
    const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirror.position.set(2.5, -0.5, 0);
    scene.add(mirror);
    currentObjects.push(mirror);
    
    // Mini accretion particles
    const accGeo = new THREE.BufferGeometry();
    const accCount = 500;
    const accPos = new Float32Array(accCount * 3);
    const accCol = new Float32Array(accCount * 3);
    
    for (let i = 0; i < accCount; i++) {
      const angle = rng.next() * Math.PI * 2;
      const r = 0.3 + rng.next() * 0.8;
      accPos[i*3] = Math.cos(angle) * r;
      accPos[i*3+1] = (rng.next() - 0.5) * 0.05;
      accPos[i*3+2] = Math.sin(angle) * r;
      
      const t = 1 - (r - 0.3) / 0.8;
      accCol[i*3] = 1.0;
      accCol[i*3+1] = 0.3 + t * 0.5;
      accCol[i*3+2] = 0.1 + t * 0.3;
    }
    
    accGeo.setAttribute('position', new THREE.BufferAttribute(accPos, 3));
    accGeo.setAttribute('color', new THREE.BufferAttribute(accCol, 3));
    
    const accMat = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });
    
    const acc = new THREE.Points(accGeo, accMat);
    acc.position.set(0, -1, 0);
    acc.userData.isAccretionDisk = true;
    acc.userData.velocities = null;
    scene.add(acc);
    currentObjects.push(acc);
    
    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2a2a4a,
      transparent: true,
      opacity: 0.3
    });
    
    const positions = [
      [-2.5, 0, 0], [-1, 1, 0], [0.5, 1.5, 0],
      [2, 0.5, 0], [2.5, -0.5, 0], [0, -1, 0]
    ];
    
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...positions[i]),
          new THREE.Vector3(...positions[j])
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        scene.add(line);
        currentObjects.push(line);
      }
    }
    
    targetCameraRadius = 7;
    targetCameraHeight = 3;
  } else {
    selectGenerator(currentGenerator);
  }
}

// ─── ANIMATION ───
function animate() {
  requestAnimationFrame(animate);
  
  if (!isAnimating) {
    renderer.render(scene, camera);
    return;
  }
  
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  
  // FPS counter
  frameCount++;
  if (elapsed - lastFpsTime >= 1) {
    document.getElementById('info-fps').textContent = frameCount;
    frameCount = 0;
    lastFpsTime = elapsed;
  }
  
  // Camera
  if (autoRotate && !isDragging) {
    cameraAngle += delta * 0.3;
  }
  
  cameraAngle += (targetCameraAngle - cameraAngle) * 0.05;
  cameraHeight += (targetCameraHeight - cameraHeight) * 0.05;
  cameraRadius += (targetCameraRadius - cameraRadius) * 0.05;
  
  camera.position.x = Math.cos(cameraAngle) * cameraRadius;
  camera.position.z = Math.sin(cameraAngle) * cameraRadius;
  camera.position.y = cameraHeight;
  camera.lookAt(0, 0, 0);
  
  // Animate objects based on current generator
  currentObjects.forEach(obj => {
    if (!obj) return;
    
    // Planet rotation
    if (currentGenerator === 'planet' && obj.type === 'Mesh' && obj.geometry?.type === 'SphereGeometry') {
      if (obj.geometry.parameters?.radius > 1) {
        obj.rotation.y += delta * 0.1;
      }
    }
    
    // Diamond rotation + sparkle
    if (currentGenerator === 'diamond') {
      if (obj.type === 'Mesh' && obj.geometry?.type === 'LatheGeometry') {
        obj.rotation.y += delta * 0.5;
      }
      if (obj.type === 'Points') {
        obj.rotation.y -= delta * 0.2;
        obj.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
      }
    }
    
    // Key pulse
    if (obj.userData?.isPulse) {
      const freq = obj.userData.pulseFreq || 432;
      const amp = obj.userData.pulseAmp || 0.05;
      const pulse = Math.sin(elapsed * freq * 0.01) * amp;
      obj.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      if (obj.material) obj.material.opacity = 0.05 + Math.abs(pulse) * 2;
    }
    
    // Machine iris + rings
    if (obj.userData?.isRing) {
      const idx = obj.userData.ringIndex;
      obj.rotation.z += delta * (0.5 + idx * 0.3) * (idx % 2 === 0 ? 1 : -1);
    }
    if (obj.userData?.isCore) {
      const pulse = Math.sin(elapsed * 4.32) * 0.2 + 1;
      obj.scale.set(pulse, pulse, pulse);
    }
    if (obj.userData?.isCoreGlow) {
      const pulse = Math.sin(elapsed * 4.32) * 0.3 + 1;
      obj.scale.set(pulse, pulse, pulse);
      if (obj.material) obj.material.opacity = 0.05 + Math.abs(Math.sin(elapsed * 4.32)) * 0.15;
    }
    if (obj.type === 'Group') {
      obj.children.forEach(child => {
        if (child.userData?.isIrisBlade) {
          const irisOpen = getParam('irisOpen') || 0.5;
          const baseAngle = child.userData.baseAngle;
          const breathe = Math.sin(elapsed * 2) * 0.1;
          child.position.x = Math.cos(baseAngle) * (irisOpen * 0.3 + breathe);
          child.position.y = Math.sin(baseAngle) * (irisOpen * 0.3 + breathe);
        }
      });
    }
    
    // Mirror portal shader
    if (obj.userData?.isPortal && obj.material?.uniforms) {
      obj.material.uniforms.uTime.value = elapsed;
    }
    if (obj.userData?.isPortalParticles) {
      obj.rotation.z += delta * 0.5;
    }
    if (obj.userData?.isShard) {
      const shardAngle = obj.userData.shardAngle;
      obj.position.z = 0.1 + Math.sin(elapsed * 2 + shardAngle) * 0.15;
      obj.rotation.z += delta * 0.3;
    }
    
    // Accretion disk rotation
    if (obj.userData?.isAccretionDisk && obj.userData.velocities) {
      const pos = obj.geometry.attributes.position;
      const vel = obj.userData.velocities;
      const speed = 0.3;
      
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const r = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x);
        const orbitalSpeed = speed / Math.sqrt(Math.max(r, 0.1));
        const newAngle = angle + orbitalSpeed * delta;
        
        // Mouse gravity influence
        const gravX = mousePos.x * 0.1 / (r + 0.5);
        const gravZ = mousePos.y * 0.1 / (r + 0.5);
        
        pos.setX(i, Math.cos(newAngle) * r + gravX * delta);
        pos.setZ(i, Math.sin(newAngle) * r + gravZ * delta);
      }
      pos.needsUpdate = true;
    }
    
    // Accretion without velocities (composer mode)
    if (obj.userData?.isAccretionDisk && !obj.userData.velocities && obj.type === 'Points') {
      obj.rotation.y += delta * 0.5;
    }
    
    // Composer mode rotations
    if (composerActive) {
      if (obj.type === 'Mesh' && obj.geometry?.type === 'SphereGeometry') {
        obj.rotation.y += delta * 0.2;
      }
      if (obj.type === 'Mesh' && obj.geometry?.type === 'LatheGeometry') {
        obj.rotation.y += delta * 0.8;
      }
    }
  });
  
  renderer.render(scene, camera);
}

// ─── UI FUNCTIONS ───
function selectGenerator(gen) {
  currentGenerator = gen;
  composerActive = false;
  
  // Update active card
  document.querySelectorAll('.gen-card').forEach(card => {
    card.classList.toggle('active', card.dataset.gen === gen);
  });
  
  // Update info
  const names = {
    planet: 'PlanetGenerator',
    diamond: 'DiamondGenerator',
    key: 'KeyGenerator',
    machine: 'MachineGenerator',
    mirror: 'MirrorGenerator',
    accretion: 'AccretionGenerator'
  };
  document.getElementById('info-gen').textContent = names[gen];
  
  // Build params
  buildParams(gen);
  
  // Generate
  generateCurrent();
  
  // Reset camera
  targetCameraRadius = 5;
  targetCameraHeight = 2;
}

function buildParams(gen) {
  const container = document.getElementById('params-container');
  const config = generatorParams[gen];
  if (!config) return;
  
  const colorClass = config.color;
  let html = `<div class="panel-title">${config.title}</div>`;
  
  config.groups.forEach(group => {
    html += `<div class="param-group">`;
    html += `<div class="param-group-title">${group.name}</div>`;
    
    group.params.forEach(param => {
      html += `
        <div class="param-row">
          <div class="param-label">
            <span>${param.label}</span>
            <span id="val-${param.id}">${param.val}</span>
          </div>
          <input type="range" class="param-slider ${colorClass}" id="param-${param.id}"
            min="${param.min}" max="${param.max}" value="${param.val}" step="${param.step}"
            oninput="onParamChange('${param.id}', this.value)">
        </div>
      `;
    });
    
    html += `</div>`;
  });
  
  html += `
    <button class="btn-regenerate" onclick="regenerateCurrent()">
      🔄 Regenerar con Seed Actual
    </button>
    <button class="btn-regenerate" onclick="randomizeAndGenerate()" style="margin-top:8px;">
      🎲 Nuevo Seed + Regenerar
    </button>
  `;
  
  container.innerHTML = html;
}

function onParamChange(id, value) {
  document.getElementById('val-' + id).textContent = parseFloat(value).toFixed(
    value.includes('.') ? (value.split('.')[1] || '').length : 0
  );
  // Debounced regeneration
  clearTimeout(window._paramTimeout);
  window._paramTimeout = setTimeout(() => generateCurrent(), 150);
}

function generateCurrent() {
  document.getElementById('info-seed').textContent = seed;
  
  switch (currentGenerator) {
    case 'planet': generatePlanet(); break;
    case 'diamond': generateDiamond(); break;
    case 'key': generateKey(); break;
    case 'machine': generateMachine(); break;
    case 'mirror': generateMirror(); break;
    case 'accretion': generateAccretion(); break;
  }
}

function regenerateCurrent() {
  generateCurrent();
}

function randomizeAndGenerate() {
  seed = Math.floor(Math.random() * 999999);
  generateCurrent();
}

function randomizeSeed() {
  seed = Math.floor(Math.random() * 999999);
  if (composerActive) {
    composeScene();
    composeScene(); // toggle off and on
  } else {
    generateCurrent();
  }
}

function cycleGenerator() {
  const gens = ['planet', 'diamond', 'key', 'machine', 'mirror', 'accretion'];
  const idx = gens.indexOf(currentGenerator);
  const next = gens[(idx + 1) % gens.length];
  selectGenerator(next);
}

function resetCamera() {
  targetCameraAngle = 0;
  targetCameraHeight = 2;
  targetCameraRadius = 5;
  cameraAngle = 0;
}

function toggleAutoRotate() {
  autoRotate = !autoRotate;
}

function updateMetrics(geo) {
  if (!geo) return;
  const verts = geo.attributes?.position?.count || 0;
  const faces = geo.index ? geo.index.count / 3 : verts / 3;
  
  document.getElementById('metric-verts').textContent = verts.toLocaleString();
  document.getElementById('metric-faces').textContent = Math.floor(faces).toLocaleString();
  document.getElementById('info-tris').textContent = Math.floor(faces).toLocaleString();
  
  // Simulated draw calls and textures
  const drawCalls = currentObjects.length;
  const textures = Math.max(1, Math.floor(drawCalls * 0.3));
  document.getElementById('metric-drawcalls').textContent = drawCalls;
  document.getElementById('metric-textures').textContent = textures;
}

function exportScene() {
  const config = {
    generator: currentGenerator,
    seed: seed,
    timestamp: new Date().toISOString(),
    engine: 'Belentani Visual Engine v0.4.0',
    params: {},
    scene: {
      camera: {
        position: camera.position.toArray(),
        fov: camera.fov,
        near: camera.near,
        far: camera.far
      },
      objects: currentObjects.length,
      wireframe: wireframeMode
    }
  };
  
  // Collect current param values
  const genConfig = generatorParams[currentGenerator];
  if (genConfig) {
    genConfig.groups.forEach(group => {
      group.params.forEach(param => {
        const el = document.getElementById('param-' + param.id);
        if (el) config.params[param.id] = parseFloat(el.value);
      });
    });
  }
  
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `belentani-scene-${currentGenerator}-${seed}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportScreenshot() {
  renderer.render(scene, camera);
  const dataUrl = renderer.domElement.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `belentani-${currentGenerator}-${seed}.png`;
  a.click();
}

// ─── MOUSE/TOUCH CONTROLS ───
function onMouseDown(e) {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

function onMouseMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  targetCameraAngle -= dx * 0.005;
  targetCameraHeight += dy * 0.01;
  targetCameraHeight = Math.max(-3, Math.min(8, targetCameraHeight));
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

function onMouseUp() {
  isDragging = false;
}

function onWheel(e) {
  e.preventDefault();
  targetCameraRadius += e.deltaY * 0.005;
  targetCameraRadius = Math.max(2, Math.min(15, targetCameraRadius));
}

function onTouchStart(e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    isDragging = true;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  }
}

function onTouchMove(e) {
  e.preventDefault();
  if (!isDragging || e.touches.length !== 1) return;
  const dx = e.touches[0].clientX - lastMouseX;
  const dy = e.touches[0].clientY - lastMouseY;
  targetCameraAngle -= dx * 0.005;
  targetCameraHeight += dy * 0.01;
  targetCameraHeight = Math.max(-3, Math.min(8, targetCameraHeight));
  lastMouseX = e.touches[0].clientX;
  lastMouseY = e.touches[0].clientY;
}

function onTouchEnd() {
  isDragging = false;
}

function onResize() {
  const viewport = document.getElementById('viewport');
  camera.aspect = viewport.clientWidth / viewport.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
}

// ─── HEADER BUTTONS ───
document.getElementById('btn-wireframe').addEventListener('click', function() {
  wireframeMode = !wireframeMode;
  this.classList.toggle('active', wireframeMode);
  generateCurrent();
});

document.getElementById('btn-postfx').addEventListener('click', function() {
  postFXEnabled = !postFXEnabled;
  this.classList.toggle('active', postFXEnabled);
  renderer.toneMappingExposure = postFXEnabled ? 1.2 : 0.8;
});

document.getElementById('btn-animate').addEventListener('click', function() {
  isAnimating = !isAnimating;
  this.classList.toggle('active', isAnimating);
  this.innerHTML = isAnimating ? '▶ Animate' : '⏸ Paused';
  if (isAnimating) clock.getDelta(); // reset delta
});

document.getElementById('btn-export').addEventListener('click', exportScene);

document.getElementById('lang-select').addEventListener('change', function() {
  const lang = this.value;
  const t = translations[lang] || translations.es;
  // Update button texts
  document.getElementById('btn-wireframe').innerHTML = t.wireframe;
  document.getElementById('btn-postfx').innerHTML = t.postfx;
  document.getElementById('btn-animate').innerHTML = isAnimating ? t.animate : '⏸';
});

// ─── FOOTER TIME ───
function updateFooterTime() {
  const now = new Date();
  document.getElementById('footer-time').textContent = 
    now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateFooterTime, 1000);
updateFooterTime();

// ─── INIT ───
function init() {
  initThree();
  selectGenerator('planet');
  animate();
  
  // Hide loading
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hidden');
  }, 800);
}

init();
</script>
</body>
</html>
```
