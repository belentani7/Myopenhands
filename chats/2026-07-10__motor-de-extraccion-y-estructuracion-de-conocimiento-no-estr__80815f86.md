# Motor de Extracción y Estructuración de Conocimiento No Estructurado

- Chat ID: `80815f86-d4c5-4da1-97b4-05092c007080`
- Mensajes: 4
- Periodo: 2026-07-07 07:00 UTC → 2026-07-10 19:22 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-07-07 07:00

Crea codigo producto genera codigo completo​8. Motor de Extracción y Estructuración de Conocimiento No Estructurado
Herramienta que ingiere historiales masivos de chat, correos o transcripciones largas (Grok, Gemini, Claude), extrayendo patrones técnicos, frameworks analíticos implícitos y terminología. Devuelve documentos formateados (Markdown/React artifacts) listos para casos de estudio, portfolios o manuales empresariales.

## [ASSISTANT] 2026-07-07 07:00 · Qwen3.7-Plus

# 🧠 Motor de Extracción y Estructuración de Conocimiento No Estructurado (KNEX)

Producto completo que ingiere historiales de chat, correos y transcripciones masivas, extrae patrones técnicos, frameworks analíticos implícitos y terminología, y genera documentos formateados listos para portfolios, casos de estudio o manuales empresariales.

---

## 📦 Estructura del proyecto

```
knex/
├── backend/
│   ├── main.py
│   ├── ingestor.py
│   ├── extractor.py
│   ├── structurer.py
│   ├── exporter.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
│   ├── src/App.jsx
│   ├── src/main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## 🔧 Backend

### `backend/requirements.txt`

```txt
fastapi==0.110.0
uvicorn[standard]==0.29.0
python-multipart==0.0.9
pydantic==2.6.4
openai==1.23.0
tiktoken==0.6.0
python-dotenv==1.0.1
httpx==0.27.0
chardet==5.2.0
beautifulsoup4==4.12.3
```

### `backend/models.py`

```python
from __future__ import annotations
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from enum import Enum

class SourceType(str, Enum):
    CHAT_EXPORT = "chat_export"
    EMAIL = "email"
    TRANSCRIPT = "transcript"
    RAW_TEXT = "raw_text"

class ExportFormat(str, Enum):
    MARKDOWN = "markdown"
    REACT_ARTIFACT = "react_artifact"
    JSON = "json"

class ExtractedPattern(BaseModel):
    name: str = Field(..., description="Nombre del patrón detectado")
    category: str = Field(..., description="Categoría: técnico, metodológico, comunicacional")
    description: str
    evidence: List[str] = Field(default_factory=list)
    frequency: int = 1
    relevance: float = Field(..., ge=0, le=1)

class ExtractedFramework(BaseModel):
    name: str
    structure: Dict[str, Any] = Field(default_factory=dict)
    steps: List[str] = Field(default_factory=list)
    inferred_from: List[str] = Field(default_factory=list)
    abstraction_level: str = Field(..., description="táctico | estratégico | conceptual")

class TerminologyEntry(BaseModel):
    term: str
    definition: str
    domain: str
    usage_examples: List[str] = Field(default_factory=list)
    is_jargon: bool = False

class KnowledgeGraph(BaseModel):
    title: str
    summary: str
    patterns: List[ExtractedPattern] = Field(default_factory=list)
    frameworks: List[ExtractedFramework] = Field(default_factory=list)
    terminology: List[TerminologyEntry] = Field(default_factory=list)
    key_insights: List[str] = Field(default_factory=list)
    audience_suggestion: str = ""
    use_case_tags: List[str] = Field(default_factory=list)

class ExtractionRequest(BaseModel):
    source_type: SourceType
    target_format: ExportFormat = ExportFormat.MARKDOWN
    language: str = "es"
    focus: Optional[str] = None  # "técnico", "gestión", "pedagógico"
    max_tokens_context: int = 16000

class ExtractionResponse(BaseModel):
    graph: KnowledgeGraph
    artifact: str  # Markdown o código React
    stats: Dict[str, Any]
```

### `backend/ingestor.py`

```python
"""
Ingestor: normaliza fuentes heterogéneas a una representación uniforme
de mensajes/turnos con metadatos.
"""
import re, json, csv, io, email
from dataclasses import dataclass, field
from typing import List, Optional
from bs4 import BeautifulSoup

@dataclass
class Message:
    role: str             # "user" | "assistant" | "system" | "human"
    content: str
    timestamp: Optional[str] = None
    author: Optional[str] = None
    meta: dict = field(default_factory=dict)

# --- Detectores de formato ----------------------------------------------------

_WHATSAPP_RE = re.compile(r"^\s*\[?(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}[,\s]+\d{1,2}:\d{2}(?::\d{2})?(?:\s?[APap][Mm])?)\]?\s*[-–]?\s*([^:]+):\s*(.*)$")
_SLACK_JSON_KEYS = {"user", "text", "ts"}
_CSV_CHAT_KEYS = {"role", "content", "message", "author"}

def detect_and_ingest(raw_text: str, filename: str = "") -> List[Message]:
    """Detecta el formato y devuelve mensajes normalizados."""
    text = raw_text.strip()
    if not text:
        return []

    # 1) JSON de Slack / export genérico
    if text.startswith("[") or text.startswith("{"):
        try:
            data = json.loads(text)
            return _ingest_json(data)
        except json.JSONDecodeError:
            pass

    # 2) CSV con columnas role/content
    if "\n" in text and ("," in text.splitlines()[0] or "\t" in text.splitlines()[0]):
        msgs = _try_csv(text)
        if msgs:
            return msgs

    # 3) Email RFC822
    if text.lower().startswith(("from:", "received:", "return-path:")) or "\nfrom:" in text.lower()[:500]:
        return _ingest_email(text)

    # 4) Export WhatsApp / Telegram estilo "fecha - autor: texto"
    wa = _ingest_whatsapp_style(text)
    if wa:
        return wa

    # 5) Transcript con "User:" / "Assistant:" / "Human:"
    turn = _ingest_turn_based(text)
    if turn:
        return turn

    # 6) Fallback: un solo bloque de texto
    return [Message(role="user", content=text, author="source")]


def _ingest_json(data) -> List[Message]:
    out: List[Message] = []
    items = data if isinstance(data, list) else data.get("messages", [data])
    for item in items:
        if not isinstance(item, dict):
            continue
        role = item.get("role") or item.get("speaker") or item.get("from") or "user"
        content = item.get("content") or item.get("text") or item.get("body") or ""
        if isinstance(content, list):  # OpenAI multimodal
            content = " ".join(
                p.get("text", "") if isinstance(p, dict) else str(p) for p in content
            )
        if not content:
            continue
        out.append(Message(
            role=str(role).lower(),
            content=str(content),
            timestamp=item.get("ts") or item.get("timestamp") or item.get("date"),
            author=item.get("user") or item.get("author") or item.get("name"),
        ))
    return out


def _try_csv(text: str) -> List[Message]:
    try:
        sample = text[:2048]
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
        reader = csv.DictReader(io.StringIO(text), dialect=dialect)
        if not reader.fieldnames:
            return []
        lower = {f.lower() for f in reader.fieldnames}
        if not (_CSV_CHAT_KEYS & lower):
            return []
        out = []
        for row in reader:
            r = {k.lower(): v for k, v in row.items() if v}
            content = r.get("content") or r.get("message") or r.get("text") or ""
            role = r.get("role") or r.get("speaker") or "user"
            if content:
                out.append(Message(role=str(role).lower(), content=content,
                                   author=r.get("author") or r.get("user")))
        return out
    except Exception:
        return []


def _ingest_email(text: str) -> List[Message]:
    try:
        msg = email.message_from_string(text)
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    payload = part.get_payload(decode=True)
                    if payload:
                        body = payload.decode(errors="ignore")
                        break
        else:
            body = msg.get_payload(decode=True).decode(errors="ignore") if msg.get_payload() else ""
        soup = BeautifulSoup(body, "html.parser")
        clean = soup.get_text(separator="\n", strip=True) or body
        return [Message(role="user", content=clean, author=msg.get("From"),
                        timestamp=msg.get("Date"), meta={"subject": msg.get("Subject")})]
    except Exception:
        return []


def _ingest_whatsapp_style(text: str) -> List[Message]:
    out = []
    for line in text.splitlines():
        m = _WHATSAPP_RE.match(line)
        if m:
            ts, author, content = m.groups()
            out.append(Message(role="user", content=content.strip(),
                               timestamp=ts.strip(), author=author.strip()))
    return out


def _ingest_turn_based(text: str) -> List[Message]:
    turn_re = re.compile(r"^(User|Assistant|Human|AI|System|Bot|Me)\s*:\s*(.*)$", re.IGNORECASE)
    out = []
    current_role, current_buf = None, []
    for line in text.splitlines():
        m = turn_re.match(line.strip())
        if m:
            if current_role is not None:
                out.append(Message(role=current_role, content="\n".join(current_buf).strip()))
            current_role = m.group(1).lower()
            if current_role in {"human", "me"}: current_role = "user"
            if current_role == "bot": current_role = "assistant"
            current_buf = [m.group(2)]
        else:
            if current_role is not None:
                current_buf.append(line)
    if current_role is not None and current_buf:
        out.append(Message(role=current_role, content="\n".join(current_buf).strip()))
    return out


def render_for_llm(messages: List[Message], max_tokens: int = 16000) -> str:
    """Renderiza los mensajes en un bloque compacto para el LLM."""
    import tiktoken
    enc = tiktoken.encoding_for_model("gpt-4o-mini")
    buf = []
    total = 0
    for m in messages:
        line = f"[{m.author or m.role}] {m.content}".strip()
        n = len(enc.encode(line))
        if total + n > max_tokens:
            buf.append(f"... (truncado, {len(messages)-len(buf)} mensajes restantes) ...")
            break
        buf.append(line)
        total += n
    return "\n\n".join(buf)
```

### `backend/extractor.py`

```python
"""
Extractor: utiliza un LLM compatible con OpenAI para identificar patrones,
frameworks implícitos y terminología a partir de texto no estructurado.
"""
import os, json
from typing import List
from openai import OpenAI
from models import (
    KnowledgeGraph, ExtractedPattern, ExtractedFramework,
    TerminologyEntry,
)

SYSTEM_PROMPT = """Eres un analista experto en ingeniería del conocimiento.
A partir de una conversación o texto no estructurado debes identificar:
1) PATRONES técnicos, metodológicos o comunicacionales recurrentes.
2) FRAMEWORKS analíticos IMPLÍCITOS: esquemas de razonamiento que el autor
   aplica sin nombrarlos (por ejemplo: "análisis costo-beneficio",
   "pirámide de abstracción", "diagnóstico → hipótesis → validación").
3) TERMINOLOGÍA específica del dominio, con definiciones precisas.
4) INSIGHTS clave reutilizables.

Debes ser CONCRETO, citar evidencia textual corta entre comillas, y evitar
inventar. Si no hay suficiente información para una categoría, devuelve [].

Responde SIEMPRE en JSON válido con esta forma:
{
 "title": "...",
 "summary": "...",
 "patterns": [{"name":"","category":"","description":"","evidence":[""],"frequency":1,"relevance":0.0}],
 "frameworks": [{"name":"","structure":{},"steps":[],"inferred_from":[""],"abstraction_level":""}],
 "terminology": [{"term":"","definition":"","domain":"","usage_examples":[],"is_jargon":false}],
 "key_insights": [],
 "audience_suggestion": "",
 "use_case_tags": []
}
"""

def _build_client() -> OpenAI:
    return OpenAI(
        api_key=os.getenv("OPENAI_API_KEY", "sk-placeholder"),
        base_url=os.getenv("OPENAI_BASE_URL"),  # permite Groq, OpenRouter, Ollama, vLLM, etc.
    )

def extract(text: str, focus: str | None, language: str = "es",
            model: str | None = None) -> KnowledgeGraph:
    client = _build_client()
    model = model or os.getenv("KNEX_MODEL", "gpt-4o-mini")

    focus_hint = f"\nFoco solicitado por el usuario: {focus}." if focus else ""
    user_msg = (
        f"Idioma de salida: {language}.{focus_hint}\n\n"
        f"=== TEXTO A ANALIZAR ===\n{text}\n=== FIN ==="
    )

    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_msg},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    raw = resp.choices[0].message.content or "{}"
    data = json.loads(raw)

    return KnowledgeGraph(
        title=data.get("title", "Sin título"),
        summary=data.get("summary", ""),
        patterns=[ExtractedPattern(**p) for p in data.get("patterns", [])],
        frameworks=[ExtractedFramework(**f) for f in data.get("frameworks", [])],
        terminology=[TerminologyEntry(**t) for t in data.get("terminology", [])],
        key_insights=data.get("key_insights", []),
        audience_suggestion=data.get("audience_suggestion", ""),
        use_case_tags=data.get("use_case_tags", []),
    )
```

### `backend/structurer.py`

```python
"""
Structurer: organiza el KnowledgeGraph en secciones narrativas
según el tipo de documento objetivo (caso de estudio, portfolio, manual).
"""
from models import KnowledgeGraph

def structure_for(graph: KnowledgeGraph, doc_type: str = "case_study") -> dict:
    """Devuelve un esqueleto con secciones ordenadas y contenido."""
    sections = []

    # 1) Resumen ejecutivo
    sections.append({
        "heading": "Resumen ejecutivo",
        "level": 1,
        "body": graph.summary,
    })

    # 2) Insights clave
    if graph.key_insights:
        sections.append({
            "heading": "Insights clave",
            "level": 2,
            "body": "\n".join(f"- {i}" for i in graph.key_insights),
        })

    # 3) Marcos analíticos implícitos
    if graph.frameworks:
        body = []
        for f in graph.frameworks:
            body.append(f"### {f.name} _(nivel: {f.abstraction_level})_")
            if f.steps:
                body.append("**Pasos:**")
                body.extend(f"{i+1}. {s}" for i, s in enumerate(f.steps))
            if f.structure:
                body.append(f"**Estructura:** `{f.structure}`")
            if f.inferred_from:
                body.append("**Evidencia:** " + "; ".join(f'"{e}"' for e in f.inferred_from))
            body.append("")
        sections.append({"heading": "Marcos analíticos implícitos", "level": 2,
                         "body": "\n".join(body)})

    # 4) Patrones
    if graph.patterns:
        body = []
        for p in sorted(graph.patterns, key=lambda x: -x.relevance):
            body.append(f"- **{p.name}** _({p.category})_ — {p.description}")
            if p.evidence:
                body.append("  - Evidencia: " + "; ".join(f'"{e}"' for e in p.evidence[:3]))
        sections.append({"heading": "Patrones detectados", "level": 2,
                         "body": "\n".join(body)})

    # 5) Glosario / terminología
    if graph.terminology:
        body = []
        for t in graph.terminology:
            tag = " `jerga`" if t.is_jargon else ""
            body.append(f"- **{t.term}**{tag} ({t.domain}): {t.definition}")
            if t.usage_examples:
                body.append(f"  - Uso: " + " | ".join(f'"{e}"' for e in t.usage_examples[:2]))
        sections.append({"heading": "Terminología y glosario", "level": 2,
                         "body": "\n".join(body)})

    # 6) Audiencia y tags
    sections.append({
        "heading": "Audiencia y aplicabilidad",
        "level": 2,
        "body": (
            f"**Audiencia sugerida:** {graph.audience_suggestion or 'no especificada'}\n\n"
            f"**Tags de caso de uso:** {', '.join(graph.use_case_tags) or '—'}"
        ),
    })

    return {"title": graph.title, "sections": sections}
```

### `backend/exporter.py`

```python
"""
Exporter: genera los artefactos finales (Markdown, React artifact, JSON).
"""
from models import KnowledgeGraph, ExportFormat
from structurer import structure_for

# ---------------------- Markdown ----------------------------------------------

def to_markdown(graph: KnowledgeGraph, doc_type: str = "case_study") -> str:
    s = structure_for(graph, doc_type)
    lines = [f"# {s['title']}", ""]
    for sec in s["sections"]:
        prefix = "#" * (sec["level"] + 1)
        lines.append(f"{prefix} {sec['heading']}")
        lines.append("")
        lines.append(sec["body"])
        lines.append("")
    lines.append("---")
    lines.append("_Generado por KNEX · Motor de Extracción de Conocimiento No Estructurado_")
    return "\n".join(lines)


# ---------------------- React Artifact ----------------------------------------

_REACT_TEMPLATE = """import React from "react";

const data = __DATA_JSON__;

const badge = (color) => ({
  display: "inline-block", padding: "2px 8px", borderRadius: 999,
  fontSize: 11, fontWeight: 600, background: color, color: "#0b1020",
  marginRight: 6,
});

const Card = ({title, children}) => (
  <div style={{
    border: "1px solid #e5e7eb", borderRadius: 12, padding: 16,
    marginBottom: 12, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.04)"
  }}>
    <h3 style={{margin:"0 0 8px 0", fontSize: 16}}>{title}</h3>
    {children}
  </div>
);

export default function KnowledgeArtifact() {
  return (
    <div style={{fontFamily:"ui-sans-serif,system-ui", color:"#0b1020",
                 maxWidth: 820, margin: "24px auto", padding: 20}}>
      <h1 style={{marginBottom: 4}}>{data.title}</h1>
      <p style={{color:"#475569"}}>{data.summary}</p>

      {data.key_insights?.length > 0 && (
        <Card title="Insights clave">
          <ul>{data.key_insights.map((k,i)=>(<li key={i}>{k}</li>))}</ul>
        </Card>
      )}

      {data.frameworks?.length > 0 && (
        <Card title="Marcos analíticos implícitos">
          {data.frameworks.map((f,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div>
                <strong>{f.name}</strong>{" "}
                <span style={badge("#e0e7ff")}>{f.abstraction_level}</span>
              </div>
              {f.steps?.length>0 && (
                <ol>{f.steps.map((s,j)=>(<li key={j}>{s}</li>))}</ol>
              )}
              {f.inferred_from?.length>0 && (
                <div style={{fontSize:12,color:"#64748b"}}>
                  Evidencia: {f.inferred_from.map(x=>`"${x}"`).join(" · ")}
                </div>
              )}
            </div>
          ))}
        </Card>
      )}

      {data.patterns?.length > 0 && (
        <Card title="Patrones">
          {data.patterns.map((p,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <div>
                <strong>{p.name}</strong>{" "}
                <span style={badge("#dcfce7")}>{p.category}</span>
                <span style={badge("#fef3c7")}>relevancia {Math.round(p.relevance*100)}%</span>
              </div>
              <div>{p.description}</div>
            </div>
          ))}
        </Card>
      )}

      {data.terminology?.length > 0 && (
        <Card title="Terminología">
          <dl>
            {data.terminology.map((t,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <dt><strong>{t.term}</strong> <em style={{color:"#64748b"}}>({t.domain})</em></dt>
                <dd style={{margin:"2px 0 0 0"}}>{t.definition}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      <footer style={{fontSize:12,color:"#94a3b8",marginTop:20}}>
        Audiencia: {data.audience_suggestion || "—"} · Tags: {(data.use_case_tags||[]).join(", ") || "—"}
      </footer>
    </div>
  );
}
"""

def to_react_artifact(graph: KnowledgeGraph) -> str:
    import json
    payload = json.dumps(graph.model_dump(), ensure_ascii=False, indent=2)
    return _REACT_TEMPLATE.replace("__DATA_JSON__", payload)


# ---------------------- Dispatcher --------------------------------------------

def export(graph: KnowledgeGraph, fmt: ExportFormat, doc_type: str = "case_study") -> str:
    if fmt == ExportFormat.MARKDOWN:
        return to_markdown(graph, doc_type)
    if fmt == ExportFormat.REACT_ARTIFACT:
        return to_react_artifact(graph)
    if fmt == ExportFormat.JSON:
        import json
        return json.dumps(graph.model_dump(), ensure_ascii=False, indent=2)
    raise ValueError(f"Formato no soportado: {fmt}")
```

### `backend/main.py`

```python
"""
KNEX API · Motor de Extracción y Estructuración de Conocimiento No Estructurado
"""
import os, time
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, JSONResponse
from dotenv import load_dotenv

from models import SourceType, ExportFormat, ExtractionResponse
from ingestor import detect_and_ingest, render_for_llm
from extractor import extract
from exporter import export

load_dotenv()

app = FastAPI(title="KNEX", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True, "model": os.getenv("KNEX_MODEL", "gpt-4o-mini")}


@app.post("/extract", response_model=ExtractionResponse)
async def extract_endpoint(
    file: UploadFile = File(...),
    source_type: SourceType = Form(SourceType.RAW_TEXT),
    target_format: ExportFormat = Form(ExportFormat.MARKDOWN),
    language: str = Form("es"),
    focus: str | None = Form(None),
    max_tokens_context: int = Form(16000),
):
    t0 = time.time()
    raw = await file.read()
    # Detectar encoding
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError:
        import chardet
        enc = chardet.detect(raw).get("encoding") or "latin-1"
        text = raw.decode(enc, errors="ignore")

    messages = detect_and_ingest(text, filename=file.filename or "")
    if not messages:
        raise HTTPException(400, "No se pudo interpretar el contenido del archivo.")

    context = render_for_llm(messages, max_tokens=max_tokens_context)
    graph = extract(context, focus=focus, language=language)
    artifact = export(graph, target_format)

    return ExtractionResponse(
        graph=graph,
        artifact=artifact,
        stats={
            "messages_parsed": len(messages),
            "chars_ingested": len(text),
            "chars_context": len(context),
            "patterns": len(graph.patterns),
            "frameworks": len(graph.frameworks),
            "terms": len(graph.terminology),
            "elapsed_seconds": round(time.time() - t0, 2),
        },
    )


@app.post("/preview")
async def preview_endpoint(file: UploadFile = File(...),
                            max_tokens_context: int = Form(4000)):
    """Devuelve los mensajes parseados (sin LLM) para validar ingestión."""
    raw = await file.read()
    try: text = raw.decode("utf-8")
    except UnicodeDecodeError: text = raw.decode("latin-1", errors="ignore")
    messages = detect_and_ingest(text, filename=file.filename or "")
    return {
        "messages_count": len(messages),
        "preview": [
            {"role": m.role, "author": m.author, "timestamp": m.timestamp,
             "snippet": m.content[:240]}
            for m in messages[:50]
        ],
        "context": render_for_llm(messages, max_tokens=max_tokens_context),
    }


@app.get("/export/{fmt}")
def export_sample(fmt: str):
    """Endpoint de demostración con un KnowledgeGraph de ejemplo."""
    from models import (KnowledgeGraph, ExtractedPattern, ExtractedFramework,
                        TerminologyEntry)
    sample = KnowledgeGraph(
        title="Demo: Revisión de arquitectura de pagos",
        summary="Conversación técnica donde se aplican principios de diseño evolutivo.",
        patterns=[
            ExtractedPattern(name="Strangler Fig", category="técnico",
                description="Reemplazo incremental de un sistema legado.",
                evidence=["'lo vamos a ir migrando por bordes'"], frequency=3, relevance=0.9),
        ],
        frameworks=[
            ExtractedFramework(name="Diagnóstico → Hipótesis → Validación",
                structure={"phases": 3}, steps=["Diagnosticar","Hipótesis","Validar"],
                inferred_from=["'antes de tocar nada midamos'"],
                abstraction_level="estratégico"),
        ],
        terminology=[
            TerminologyEntry(term="Bounded context", definition="Frontera semántica de un modelo.",
                domain="DDD", usage_examples=["'cada servicio es su propio BC'"], is_jargon=True),
        ],
        key_insights=["Migrar por bordes reduce riesgo sistémico."],
        audience_suggestion="Arquitectos de software y tech leads",
        use_case_tags=["caso_de_estudio", "portfolio", "arquitectura"],
    )
    artifact = export(sample, ExportFormat(fmt))
    if fmt == "json":
        return JSONResponse(content=__import__("json").loads(artifact))
    return PlainTextResponse(artifact)
```

### Arranque del backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# Configura tus claves en backend/.env:
#   OPENAI_API_KEY=...
#   OPENAI_BASE_URL=https://api.openai.com/v1   # o Groq / OpenRouter / Ollama
#   KNEX_MODEL=gpt-4o-mini
uvicorn main:app --reload --port 8000
```

---

## 🎨 Frontend (React + Vite)

### `frontend/package.json`

```json
{
  "name": "knex-ui",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-markdown": "^9.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.0"
  }
}
```

### `frontend/vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { "/api": "http://localhost:8000" } },
});
```

### `frontend/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>KNEX · Extracción de Conocimiento</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
```

### `frontend/src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### `frontend/src/App.jsx`

```jsx
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

const API = import.meta.env.VITE_API_URL || "/api";

const styles = {
  root: { fontFamily: "ui-sans-serif, system-ui", maxWidth: 1100, margin: "0 auto", padding: 24, color: "#0b1020" },
  h1: { fontSize: 26, marginBottom: 4 },
  sub: { color: "#64748b", marginBottom: 20 },
  row: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12 },
  input: { padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 },
  select: { padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 },
  btn: { padding: "10px 16px", borderRadius: 8, border: 0, background: "#2563eb", color: "white",
         fontWeight: 600, cursor: "pointer", fontSize: 14 },
  btnGhost: { padding: "10px 16px", borderRadius: 8, border: "1px solid #d1d5db",
              background: "white", cursor: "pointer", fontSize: 14 },
  card: { border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff",
          marginTop: 16, boxShadow: "0 1px 2px rgba(0,0,0,.04)" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 },
  stat: { padding: 10, background: "#f8fafc", borderRadius: 8, fontSize: 13 },
  pre: { background: "#0b1020", color: "#e2e8f0", padding: 14, borderRadius: 10,
         overflow: "auto", fontSize: 13, whiteSpace: "pre-wrap" },
  tabs: { display: "flex", gap: 4, borderBottom: "1px solid #e5e7eb", marginBottom: 12 },
  tab: (active) => ({ padding: "8px 14px", cursor: "pointer", borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
                      fontWeight: active ? 600 : 400, color: active ? "#2563eb" : "#334155" }),
};

export default function App() {
  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState("raw_text");
  const [targetFormat, setTargetFormat] = useState("markdown");
  const [language, setLanguage] = useState("es");
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("artifact");
  const fileRef = useRef();

  async function submit(e) {
    e.preventDefault();
    if (!file) return setError("Selecciona un archivo");
    setLoading(true); setError(null); setResult(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source_type", sourceType);
    fd.append("target_format", targetFormat);
    fd.append("language", language);
    if (focus) fd.append("focus", focus);
    try {
      const r = await fetch(`${API}/extract`, { method: "POST", body: fd });
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
      const data = await r.json();
      setResult(data); setTab("artifact");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  function download(ext, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `knex-output.${ext}`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={styles.root}>
      <h1 style={styles.h1}>🧠 KNEX</h1>
      <div style={styles.sub}>Motor de Extracción y Estructuración de Conocimiento No Estructurado</div>

      <form onSubmit={submit}>
        <div style={styles.row}>
          <input ref={fileRef} type="file"
            accept=".txt,.md,.json,.csv,.eml,.log"
            style={styles.input}
            onChange={(e) => setFile(e.target.files[0])} />
          <select style={styles.select} value={sourceType} onChange={(e)=>setSourceType(e.target.value)}>
            <option value="raw_text">Texto libre</option>
            <option value="chat_export">Export chat</option>
            <option value="email">Email</option>
            <option value="transcript">Transcripción</option>
          </select>
          <select style={styles.select} value={targetFormat} onChange={(e)=>setTargetFormat(e.target.value)}>
            <option value="markdown">Markdown</option>
            <option value="react_artifact">React Artifact</option>
            <option value="json">JSON</option>
          </select>
          <select style={styles.select} value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
          <input style={{...styles.input, flex: 1, minWidth: 200}}
                 placeholder="Foco (opcional): técnico, gestión, pedagógico..."
                 value={focus} onChange={(e)=>setFocus(e.target.value)} />
          <button type="submit" disabled={loading} style={{...styles.btn, opacity: loading?0.6:1}}>
            {loading ? "Procesando..." : "Extraer conocimiento"}
          </button>
        </div>
      </form>

      {error && <div style={{...styles.card, color:"#b91c1c"}}>⚠️ {error}</div>}

      {result && (
        <>
          <div style={styles.card}>
            <div style={styles.stats}>
              <Stat label="Mensajes parseados" value={result.stats.messages_parsed} />
              <Stat label="Caracteres" value={result.stats.chars_ingested} />
              <Stat label="Patrones" value={result.stats.patterns} />
              <Stat label="Frameworks" value={result.stats.frameworks} />
              <Stat label="Términos" value={result.stats.terms} />
              <Stat label="Tiempo (s)" value={result.stats.elapsed_seconds} />
            </div>
          </div>

          <div style={{...styles.card}}>
            <div style={styles.tabs}>
              <div style={styles.tab(tab==="artifact")} onClick={()=>setTab("artifact")}>Artefacto</div>
              <div style={styles.tab(tab==="graph")}    onClick={()=>setTab("graph")}>Grafo crudo</div>
              <div style={styles.tab(tab==="raw")}      onClick={()=>setTab("raw")}>Salida raw</div>
            </div>

            {tab === "artifact" && (
              <>
                {targetFormat === "markdown" && <ReactMarkdown>{result.artifact}</ReactMarkdown>}
                {targetFormat === "react_artifact" && <pre style={styles.pre}>{result.artifact}</pre>}
                {targetFormat === "json" && <pre style={styles.pre}>{result.artifact}</pre>}
                <div style={{...styles.row, marginTop: 12}}>
                  <button style={styles.btnGhost}
                    onClick={() => download(
                      targetFormat === "markdown" ? "md" :
                      targetFormat === "react_artifact" ? "jsx" : "json",
                      result.artifact
                    )}>⬇️ Descargar</button>
                  <button style={styles.btnGhost}
                    onClick={() => navigator.clipboard.writeText(result.artifact)}>📋 Copiar</button>
                </div>
              </>
            )}

            {tab === "graph" && <pre style={styles.pre}>{JSON.stringify(result.graph, null, 2)}</pre>}
            {tab === "raw" && <pre style={styles.pre}>{result.artifact}</pre>}
          </div>
        </>
      )}
    </div>
  );
}

function Stat({label, value}) {
  return (
    <div style={styles.stat}>
      <div style={{color:"#64748b", fontSize:12}}>{label}</div>
      <div style={{fontWeight:700, fontSize:18}}>{value}</div>
    </div>
  );
}
```

---

## 🐳 Docker Compose

### `docker-compose.yml`

```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    env_file: ./backend/.env
    ports: ["8000:8000"]
    volumes: ["./backend:/app"]
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    image: node:20-alpine
    working_dir: /app
    volumes: ["./frontend:/app"]
    ports: ["5173:5173"]
    environment:
      - VITE_API_URL=http://localhost:8000
    command: sh -c "npm install && npm run dev -- --host"
```

### `backend/Dockerfile`

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 📘 README.md

```markdown
# 🧠 KNEX — Motor de Extracción y Estructuración de Conocimiento No Estructurado

Herramienta que ingiere historiales masivos de chat, correos o transcripciones
largas (Grok, Gemini, Claude, WhatsApp, Slack, email) y extrae:

- **Patrones técnicos, metodológicos y comunicacionales** recurrentes.
- **Frameworks analíticos implícitos** (esquemas de razonamiento no declarados).
- **Terminología** específica del dominio, con definiciones y usos.
- **Insights** reutilizables.

Devuelve documentos formateados (Markdown / React artifacts / JSON) listos
para casos de estudio, portfolios o manuales empresariales.

## 🔧 Stack
- Backend: Python 3.11 + FastAPI + OpenAI-compatible client
- Frontend: React 18 + Vite + react-markdown
- LLM: cualquier proveedor compatible con OpenAI (OpenAI, Groq, OpenRouter,
  Ollama, vLLM, LMStudio).

## 🚀 Inicio rápido
```bash
cp backend/.env.example backend/.env   # configura OPENAI_API_KEY y KNEX_MODEL
docker compose up
# abre http://localhost:5173
```

## 📥 Formatos soportados de entrada
| Formato | Ejemplo |
|---|---|
| JSON Slack / genérico | `[{"user":"x","text":"...","ts":...}]` |
| CSV `role,content` | `role,content` · `user,hola` |
| Email RFC822 | archivo `.eml` |
| WhatsApp / Telegram | `12/03/24, 10:12 - Juan: hola` |
| Transcript | `User: ... \n Assistant: ...` |
| Texto libre | fallback |

## 🤝 Proveedores LLM compatibles
En `backend/.env`:
```
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1   # o https://api.groq.com/openai/v1
KNEX_MODEL=gpt-4o-mini
```

## 🔌 API
- `POST /extract` — subida y procesamiento completo.
- `POST /preview` — parseo sin LLM para validar ingestión.
- `GET  /export/{fmt}` — demo (markdown | react_artifact | json).
- `GET  /health`

## 🏗️ Arquitectura
```
[archivo] → Ingestor (detect+normalize) → Mensajes
        → render_for_llm (token-budget)
        → Extractor (LLM con JSON mode)
        → KnowledgeGraph
        → Structurer (secciones narrativas)
        → Exporter (MD / React / JSON)
```

## 📜 Licencia
MIT
```

---

## 🎯 Cómo usarlo

1. Exporta un chat de Claude/Gemini/Grok (o un `.eml`, `.csv` con conversaciones, transcripción de reunión).
2. Súbelo en la UI, elige formato y foco ("técnico", "gestión", etc.).
3. Descarga el **Markdown** para tu portfolio, o el **React Artifact** para incrustarlo en tu web.

El motor maneja automáticamente la detección de formato, respeta un presupuesto de tokens (configurable) y devuelve un documento estructurado y listo para publicar.

## [USER] 2026-07-10 19:22

buiild all

## [ASSISTANT] 2026-07-10 19:22 · Qwen3.7-Plus

Para compilar y desplegar **todo el proyecto KNEX** (Backend + Frontend + Infraestructura), te proporciono las instrucciones completas. 

Tienes dos opciones: **Opción A (Docker / Producción)** que levanta todo con un solo comando, y **Opción B (Local / Desarrollo)** para correrlo nativamente en tu máquina.

---

### 📂 1. Archivos de Configuración Previos

Antes de construir, asegúrate de tener estos archivos base en tu proyecto.

#### `backend/.env.example` (Renombra a `.env` y rellena)
```env
OPENAI_API_KEY=sk-tu-clave-aqui
OPENAI_BASE_URL=https://api.openai.com/v1
KNEX_MODEL=gpt-4o-mini
```

#### `frontend/nginx.conf` (Para el contenedor de producción)
```nginx
server {
    listen 80;
    server_name localhost;

    # Servir archivos estáticos de React
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy hacia el Backend
    location /api/ {
        proxy_pass http://backend:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### 🐳 OPCIÓN A: Build Completo con Docker (Recomendado)

Esta opción compila el backend en Python y el frontend en React (usando Nginx para servir los estáticos) y los conecta.

#### 1. Actualiza los `Dockerfile`s

**`backend/Dockerfile`**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
# Instalar dependencias del sistema si fueran necesarias
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**`frontend/Dockerfile`** (Multi-stage build para producción)
```dockerfile
# Etapa 1: Construir React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Asegurar que la API apunte a /api en producción
ENV VITE_API_URL=/api
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Actualiza `docker-compose.yml`
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: knex-backend
    ports:
      - "8000:8000"
    env_file: 
      - ./backend/.env
    restart: unless-stopped

  frontend:
    build: ./frontend
    container_name: knex-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

#### 3. ¡Construir y Levantar!
Ejecuta estos comandos en la raíz del proyecto:
```bash
# Copiar y configurar variables de entorno
cp backend/.env.example backend/.env
# (Edita backend/.env con tu API Key)

# Construir imágenes y levantar servicios en background
docker compose up --build -d

# Ver logs en tiempo real
docker compose logs -f
```
🎉 **Listo.** Abre tu navegador en `http://localhost`. Nginx servirá la UI y enrutarás las peticiones a `/api/extract` al backend automáticamente.

---

### 💻 OPCIÓN B: Build Nativo (Para Desarrollo Local)

Si prefieres no usar Docker y correrlo directamente en tu sistema operativo.

#### 1. Script Automatizado de Build (`build.sh` para Mac/Linux o `build.bat` para Windows)

Crea un archivo `build.sh` en la raíz del proyecto:

```bash
#!/bin/bash
echo "🚀 Iniciando build nativo de KNEX..."

# --- BACKEND ---
echo "📦 Configurando Backend..."
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..

# --- FRONTEND ---
echo "📦 Configurando Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completado. Para ejecutar en modo desarrollo:"
echo "   Backend: cd backend && source .venv/bin/activate && uvicorn main:app --reload"
echo "   Frontend: cd frontend && npm run dev"
```
*Nota: Si estás en Windows, usa este `build.bat`:*
```bat
@echo off
echo 🚀 Iniciando build nativo de KNEX...

echo 📦 Configurando Backend...
cd backend
python -m venv .venv
call .venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
cd ..

echo 📦 Configurando Frontend...
cd frontend
npm install
npm run build
cd ..

echo ✅ Build completado.
```

#### 2. Ejecutar en Modo Desarrollo (Hot-Reload)

Abre **dos terminales** distintas:

**Terminal 1 (Backend):**
```bash
cd backend
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
🎉 **Listo.** El frontend estará en `http://localhost:5173` y el proxy de Vite enviará las peticiones `/api` al backend en el puerto `8000`.

---

### 🧪 3. Verificación y Pruebas (Testing el Build)

Una vez que la aplicación esté corriendo (vía Docker o Local), verifica que todo esté integrado:

**1. Healthcheck del Backend:**
```bash
curl http://localhost:8000/health
# Debería devolver: {"ok":true,"model":"gpt-4o-mini"}
```

**2. Prueba de Ingestión (Preview sin LLM):**
Crea un archivo `test_chat.txt`:
```text
User: Necesitamos migrar la base de datos a un esquema de microservicios.
Assistant: Entiendo. Antes de tocar nada, ¿hemos medido el tráfico actual?
User: Sí, tenemos 10k req/s.
Assistant: Perfecto. Apliquemos el patrón Strangler Fig para migrar por bordes.
```

Ejecuta el preview:
```bash
curl -X POST http://localhost:8000/preview \
  -F "file=@test_chat.txt" \
  -F "max_tokens_context=4000"
```

**3. Extracción Completa (Generando el Artefacto):**
```bash
curl -X POST http://localhost:8000/extract \
  -F "file=@test_chat.txt" \
  -F "source_type=raw_text" \
  -F "target_format=markdown" \
  -F "language=es" \
  -F "focus=técnico"
```
*Esto devolverá el JSON con el `KnowledgeGraph` y el `artifact` en Markdown listo para copiar y pegar en tu portfolio o Notion.*

---

### 🛑 Comandos de Mantenimiento (Docker)

Si usaste la Opción A (Docker), aquí tienes los comandos para gestionar el build:

```bash
# Detener todo
docker compose down

# Reconstruir solo el frontend (si cambiaste código React)
docker compose up -d --build frontend

# Reconstruir solo el backend (si cambiaste código Python)
docker compose up -d --build backend

# Limpiar imágenes y volúmenes huérfanos
docker system prune -f
```
