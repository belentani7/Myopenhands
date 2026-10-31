# Análisis Forense-Conductual para Trust & Safety

- Chat ID: `c24119e0-8494-49a1-aa87-8635a68b07b8`
- Mensajes: 2
- Periodo: 2026-07-07 06:58 UTC → 2026-07-07 06:58 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-07-07 06:58

Genera producto, codigo completo4. API de Análisis Forense-Conductual para Trust & Safety
Herramienta de integración para plataformas sociales o de e-commerce. Ingiere transcripciones o chats masivos y detecta patrones manipulativos, estafas o anomalías cognitivas mediante LLMs instruidos con frameworks de evaluación psicológica. Se monetiza por volumen de tokens procesados

## [ASSISTANT] 2026-07-07 06:58 · Qwen3.7-Plus

# API de Análisis Forense-Conductual para Trust & Safety

A continuación te entrego el proyecto completo. Es una API en Python (FastAPI) que ingiere texto (chats, transcripciones, reseñas) y devuelve un dictamen forense-conductual con scoring de manipulación, estafa y anomalía cognitiva, con sistema de métricas de tokens para monetización.

```
forensic-api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── models.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── analysis.py
│   │   ├── batch.py
│   │   └── metrics.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── llm_client.py
│   │   ├── forensic_engine.py
│   │   ├── prompt_builder.py
│   │   └── token_meter.py
│   ├── frameworks/
│   │   ├── __init__.py
│   │   └── psychological_frameworks.py
│   └── utils/
│       ├── __init__.py
│       └── validators.py
├── tests/
│   ├── test_analysis.py
│   └── test_batch.py
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── .env.example
└── README.md
```

---

## `requirements.txt`

```txt
fastapi==0.115.0
uvicorn[standard]==0.30.6
pydantic==2.9.2
pydantic-settings==2.5.2
openai==1.51.0
tiktoken==0.7.0
httpx==0.27.2
python-dotenv==1.0.1
redis==5.1.1
sqlalchemy==2.0.35
aiosqlite==0.20.0
python-multipart==0.0.12
```

---

## `.env.example`

```env
APP_NAME=ForensicTrustAPI
ENV=development
API_KEY_HEADER=X-API-Key
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
DATABASE_URL=sqlite+aiosqlite:///./forensic.db
REDIS_URL=redis://localhost:6379/0
TOKEN_PRICE_PER_1K=0.0015
MAX_BATCH_SIZE=500
RATE_LIMIT_PER_MIN=60
```

---

## `app/config.py`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "ForensicTrustAPI"
    env: str = "development"
    api_key_header: str = "X-API-Key"
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    openai_base_url: str = "https://api.openai.com/v1"
    database_url: str = "sqlite+aiosqlite:///./forensic.db"
    redis_url: str = "redis://localhost:6379/0"
    token_price_per_1k: float = 0.0015
    max_batch_size: int = 500
    rate_limit_per_min: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## `app/models.py`

```python
from __future__ import annotations
from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# ---------- Requests ----------
class TextSample(BaseModel):
    id: Optional[str] = None
    text: str = Field(..., min_length=10, max_length=50_000)
    context: Optional[str] = Field(None, description="Contexto: chat, review, ticket, DM, etc.")
    author_role: Optional[str] = None
    target_role: Optional[str] = None

class AnalysisRequest(BaseModel):
    sample: TextSample
    frameworks: Optional[List[str]] = Field(
        None,
        description="Frameworks a aplicar. Si es null se aplican todos."
    )

class BatchRequest(BaseModel):
    samples: List[TextSample] = Field(..., max_length=500)
    frameworks: Optional[List[str]] = None

# ---------- Responses ----------
class IndicatorScore(BaseModel):
    indicator: str
    score: float = Field(ge=0, le=1)
    evidence: List[str] = Field(default_factory=list)

class FrameworkResult(BaseModel):
    framework: str
    overall_score: float = Field(ge=0, le=1)
    indicators: List[IndicatorScore]
    summary: str

class Verdict(BaseModel):
    manipulation_score: float
    scam_score: float
    cognitive_anomaly_score: float
    risk_level: str  # low | medium | high | critical
    recommended_action: str
    flags: List[str] = Field(default_factory=list)

class AnalysisResponse(BaseModel):
    sample_id: Optional[str]
    verdict: Verdict
    frameworks: List[FrameworkResult]
    metadata: Dict[str, Any] = Field(default_factory=dict)
    tokens_used: int
    cost_usd: float
    processed_at: datetime

class BatchResponse(BaseModel):
    job_id: str
    total_samples: int
    processed: int
    failed: int
    results: List[AnalysisResponse]
    aggregate_cost_usd: float
    aggregate_tokens: int

class MeterSnapshot(BaseModel):
    api_key: str
    period: str
    tokens_in: int
    tokens_out: int
    total_cost_usd: float
    requests: int
```

---

## `app/frameworks/psychological_frameworks.py`

```python
"""
Frameworks de evaluación psicológica usados como prompt-instrucciones
para el LLM. Cada framework define indicadores observables en texto.
"""

FRAMEWORKS = {
    "CIALDINI_INFLUENCE": {
        "name": "Principios de Influencia (Cialdini)",
        "indicators": [
            "reciprocity_abuse",       # Falsa reciprocidad / deuda inducida
            "commitment_escalation",   # Pie en la puerta, escalada de compromiso
            "social_proof_fabrication",# Testimonios falsos, urgencia de grupo
            "authority_impersonation", # Suplantación de autoridad
            "likeness_exploitation",   # Mirroring, falsa afinidad
            "scarcity_pressure"        # Escasez artificial, FOMO coercitivo
        ]
    },
    "DARK_TRIAD": {
        "name": "Triada Oscura (Paulhus & Williams)",
        "indicators": [
            "machiavellian_manipulation",
            "narcissistic_grandiosity",
            "psychopathic_callousness",
            "gaslighting_markers",
            "love_bombing_pattern",
            "intermittent_reinforcement"
        ]
    },
    "COGNITIVE_DISTORTIONS": {
        "name": "Distorsiones Cognitivas (Beck / Burns)",
        "indicators": [
            "catastrophizing",
            "black_and_white_thinking",
            "emotional_reasoning",
            "mind_reading_attribution",
            "should_statements_coercion",
            "personalization_blame"
        ]
    },
    "SCAM_TYPOLOGY": {
        "name": "Tipología de Estafas (FTC / IC3)",
        "indicators": [
            "advance_fee_request",
            "impersonation_pattern",
            "romance_scam_markers",
            "phishing_cues",
            "investment_fraud_signals",
            "lottery_prize_deception"
        ]
    },
    "COERCIVE_CONTROL": {
        "name": "Control Coercitivo (Stark / Bancroft)",
        "indicators": [
            "isolation_attempts",
            "financial_control",
            "threats_and_intimidation",
            "monitoring_and_surveillance",
            "degradation_and_humiliation",
            "rule_imposition"
        ]
    }
}

def get_framework_prompt(name: str) -> str:
    fw = FRAMEWORKS[name]
    indicators_md = "\n".join(f"- `{i}`" for i in fw["indicators"])
    return (
        f"## Framework: {fw['name']}\n\n"
        f"Evalúa el texto buscando los siguientes indicadores observables. "
        f"Para cada indicador asigna un score 0.0-1.0 y cita la evidencia textual exacta.\n\n"
        f"{indicators_md}\n"
    )
```

---

## `app/services/prompt_builder.py`

```python
from typing import List
from app.frameworks.psychological_frameworks import FRAMEWORKS, get_framework_prompt

SYSTEM_PROMPT = """Eres un analista forense-conductual especializado en Trust & Safety.
Tu tarea es analizar textos (chats, transcripciones, reseñas, tickets) para detectar:
- Patrones manipulativos (influencia coercitiva, persuasión oscura)
- Señales de estafa (fraude, suplantación, ingeniería social)
- Anomalías cognitivas (distorsiones, incoherencias, patrones patológicos)

Responde SIEMPRE en JSON válido con la estructura exacta que se te indica.
Sé conservador: solo marca evidencia cuando exista cita textual directa.
No inventes indicadores. Si no hay evidencia, score = 0.0.
"""

def build_analysis_prompt(text: str, context: str | None, frameworks: List[str]) -> str:
    selected = frameworks or list(FRAMEWORKS.keys())
    fw_blocks = "\n".join(get_framework_prompt(f) for f in selected if f in FRAMEWORKS)

    context_block = f"\nContexto de la muestra: {context}\n" if context else ""

    return f"""{fw_blocks}
{context_block}
---
TEXTO A ANALIZAR:
\"\"\"
{text}
\"\"\"
---

Devuelve un JSON con esta estructura exacta (sin markdown, sin comentarios):
{{
  "verdict": {{
    "manipulation_score": 0.0,
    "scam_score": 0.0,
    "cognitive_anomaly_score": 0.0,
    "risk_level": "low|medium|high|critical",
    "recommended_action": "...",
    "flags": ["..."]
  }},
  "frameworks": [
    {{
      "framework": "NOMBRE_FRAMEWORK",
      "overall_score": 0.0,
      "indicators": [
        {{ "indicator": "nombre", "score": 0.0, "evidence": ["cita textual"] }}
      ],
      "summary": "..."
    }}
  ]
}}
"""
```

---

## `app/services/token_meter.py`

```python
import tiktoken
from datetime import datetime, timezone
from app.config import settings

_encoder = None

def get_encoder():
    global _encoder
    if _encoder is None:
        _encoder = tiktoken.encoding_for_model(settings.openai_model)
    return _encoder

def count_tokens(text: str) -> int:
    return len(get_encoder().encode(text))

def compute_cost(tokens_in: int, tokens_out: int) -> float:
    total = tokens_in + tokens_out
    return (total / 1000) * settings.token_price_per_1k

class TokenMeter:
    """Acumula métricas por API key para facturación."""
    def __init__(self):
        self._ledger: dict = {}

    def record(self, api_key: str, tokens_in: int, tokens_out: int):
        period = datetime.now(timezone.utc).strftime("%Y-%m")
        key = f"{api_key}:{period}"
        entry = self._ledger.setdefault(key, {
            "api_key": api_key,
            "period": period,
            "tokens_in": 0,
            "tokens_out": 0,
            "requests": 0,
        })
        entry["tokens_in"] += tokens_in
        entry["tokens_out"] += tokens_out
        entry["requests"] += 1

    def snapshot(self, api_key: str, period: str | None = None) -> dict:
        period = period or datetime.now(timezone.utc).strftime("%Y-%m")
        key = f"{api_key}:{period}"
        entry = self._ledger.get(key, {
            "api_key": api_key, "period": period,
            "tokens_in": 0, "tokens_out": 0, "requests": 0,
        })
        cost = compute_cost(entry["tokens_in"], entry["tokens_out"])
        return {**entry, "total_cost_usd": cost}

meter = TokenMeter()
```

---

## `app/services/llm_client.py`

```python
import json
from openai import AsyncOpenAI
from app.config import settings
from app.services.token_meter import count_tokens

client = AsyncOpenAI(
    api_key=settings.openai_api_key,
    base_url=settings.openai_base_url,
)

async def call_llm(system: str, user: str) -> tuple[dict, int, int]:
    """Retorna (parsed_json, tokens_in, tokens_out)."""
    tokens_in = count_tokens(system) + count_tokens(user)

    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content
    tokens_out = count_tokens(content)

    try:
        parsed = json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"LLM devolvió JSON inválido: {e}")

    return parsed, tokens_in, tokens_out
```

---

## `app/services/forensic_engine.py`

```python
from datetime import datetime, timezone
from app.models import (
    TextSample, AnalysisResponse, Verdict, FrameworkResult, IndicatorScore
)
from app.services.llm_client import call_llm
from app.services.prompt_builder import SYSTEM_PROMPT, build_analysis_prompt
from app.services.token_meter import meter, compute_cost

def _build_frameworks(raw_frameworks: list) -> list[FrameworkResult]:
    results = []
    for fw in raw_frameworks:
        indicators = [
            IndicatorScore(**ind) for ind in fw.get("indicators", [])
        ]
        results.append(FrameworkResult(
            framework=fw["framework"],
            overall_score=float(fw.get("overall_score", 0)),
            indicators=indicators,
            summary=fw.get("summary", ""),
        ))
    return results

async def analyze_sample(
    sample: TextSample,
    frameworks: list[str] | None,
    api_key: str,
) -> AnalysisResponse:
    user_prompt = build_analysis_prompt(
        text=sample.text,
        context=sample.context,
        frameworks=frameworks or [],
    )

    parsed, tokens_in, tokens_out = await call_llm(SYSTEM_PROMPT, user_prompt)
    meter.record(api_key, tokens_in, tokens_out)

    verdict_raw = parsed.get("verdict", {})
    verdict = Verdict(
        manipulation_score=float(verdict_raw.get("manipulation_score", 0)),
        scam_score=float(verdict_raw.get("scam_score", 0)),
        cognitive_anomaly_score=float(verdict_raw.get("cognitive_anomaly_score", 0)),
        risk_level=verdict_raw.get("risk_level", "low"),
        recommended_action=verdict_raw.get("recommended_action", ""),
        flags=verdict_raw.get("flags", []),
    )

    frameworks_results = _build_frameworks(parsed.get("frameworks", []))

    cost = compute_cost(tokens_in, tokens_out)

    return AnalysisResponse(
        sample_id=sample.id,
        verdict=verdict,
        frameworks=frameworks_results,
        metadata={
            "author_role": sample.author_role,
            "target_role": sample.target_role,
            "model_used": "openai/" + __import__("app.config", fromlist=["settings"]).settings.openai_model,
        },
        tokens_used=tokens_in + tokens_out,
        cost_usd=cost,
        processed_at=datetime.now(timezone.utc),
    )
```

---

## `app/utils/validators.py`

```python
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from app.config import settings

api_key_header = APIKeyHeader(name=settings.api_key_header, auto_error=False)

# En producción esto debería validarse contra una base de datos.
# Aquí se acepta cualquier key con formato válido para demo.
VALID_KEYS = {"demo-key-001", "test-key-002"}

async def verify_api_key(key: str = Security(api_key_header)) -> str:
    if key is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="API key missing")
    if settings.env == "production" and key not in VALID_KEYS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid API key")
    return key
```

---

## `app/routers/analysis.py`

```python
from fastapi import APIRouter, Depends, HTTPException
from app.models import AnalysisRequest, AnalysisResponse
from app.utils.validators import verify_api_key
from app.services.forensic_engine import analyze_sample

router = APIRouter(prefix="/v1/analysis", tags=["analysis"])

@router.post("", response_model=AnalysisResponse)
async def analyze(
    req: AnalysisRequest,
    api_key: str = Depends(verify_api_key),
):
    try:
        result = await analyze_sample(req.sample, req.frameworks, api_key)
        return result
    except ValueError as e:
        raise HTTPException(status_code=502, detail=f"LLM error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
```

---

## `app/routers/batch.py`

```python
import uuid
from fastapi import APIRouter, Depends, HTTPException
from app.models import BatchRequest, BatchResponse, AnalysisResponse
from app.utils.validators import verify_api_key
from app.services.forensic_engine import analyze_sample
from app.config import settings

router = APIRouter(prefix="/v1/batch", tags=["batch"])

@router.post("", response_model=BatchResponse)
async def batch_analyze(
    req: BatchRequest,
    api_key: str = Depends(verify_api_key),
):
    if len(req.samples) > settings.max_batch_size:
        raise HTTPException(400, f"Batch excede max_batch_size={settings.max_batch_size}")

    job_id = str(uuid.uuid4())
    results: list[AnalysisResponse] = []
    failed = 0

    for sample in req.samples:
        try:
            r = await analyze_sample(sample, req.frameworks, api_key)
            results.append(r)
        except Exception:
            failed += 1

    agg_tokens = sum(r.tokens_used for r in results)
    agg_cost = sum(r.cost_usd for r in results)

    return BatchResponse(
        job_id=job_id,
        total_samples=len(req.samples),
        processed=len(results),
        failed=failed,
        results=results,
        aggregate_cost_usd=agg_cost,
        aggregate_tokens=agg_tokens,
    )
```

---

## `app/routers/metrics.py`

```python
from fastapi import APIRouter, Depends, Query
from app.models import MeterSnapshot
from app.services.token_meter import meter
from app.utils.validators import verify_api_key

router = APIRouter(prefix="/v1/metrics", tags=["metrics"])

@router.get("/usage", response_model=MeterSnapshot)
async def get_usage(
    period: str | None = Query(None, description="YYYY-MM"),
    api_key: str = Depends(verify_api_key),
):
    return meter.snapshot(api_key, period)
```

---

## `app/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import analysis, batch, metrics

app = FastAPI(
    title=settings.app_name,
    description=(
        "API de Análisis Forense-Conductual para Trust & Safety. "
        "Detecta patrones manipulativos, estafas y anomalías cognitivas "
        "en texto mediante LLMs instruidos con frameworks de evaluación psicológica."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router)
app.include_router(batch.router)
app.include_router(metrics.router)

@app.get("/health")
async def health():
    return {"status": "ok", "env": settings.env}
```

---

## `Dockerfile`

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## `docker-compose.yml`

```yaml
version: "3.9"
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

---

## `tests/test_analysis.py`

```python
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.config import settings

@pytest.mark.anyio
async def test_analysis_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "sample": {
                "text": "Hola María, soy del soporte técnico de tu banco. "
                        "Detectamos actividad sospechosa. Necesito que me des "
                        "tu clave y el código SMS AHORA o bloquearemos tu cuenta "
                        "en los próximos 10 minutos. No se lo digas a nadie.",
                "context": "chat_dm",
                "author_role": "unknown",
                "target_role": "victim"
            }
        }
        resp = await ac.post(
            "/v1/analysis",
            json=payload,
            headers={settings.api_key_header: "demo-key-001"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["verdict"]["risk_level"] in {"low", "medium", "high", "critical"}
        assert data["tokens_used"] > 0
        assert data["cost_usd"] >= 0
```

---

## `README.md`

````markdown
# ForensicTrust API

API de análisis forense-conductual para Trust & Safety.

## Características
- Análisis individual y por lotes (hasta 500 muestras)
- 5 frameworks psicológicos: Cialdini, Triada Oscura, Distorsiones Cognitivas, Tipología de Estafas, Control Coercitivo
- Scoring de manipulación, estafa y anomalía cognitiva
- Monetización automática por tokens procesados
- Métricas de uso por API key y periodo

## Ejecución rápida
```bash
cp .env.example .env
# editar .env con OPENAI_API_KEY
docker-compose up --build
```

## Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/v1/analysis` | Análisis individual |
| POST | `/v1/batch` | Análisis masivo |
| GET  | `/v1/metrics/usage` | Consumo de tokens y coste |
| GET  | `/health` | Estado del servicio |

## Ejemplo de uso
```bash
curl -X POST http://localhost:8000/v1/analysis \
  -H "X-API-Key: demo-key-001" \
  -H "Content-Type: application/json" \
  -d '{
    "sample": {
      "text": "Texto sospechoso a analizar...",
      "context": "chat"
    }
  }'
```

## Monetización
Precio por defecto: **$0.0015 / 1K tokens**.
Ajustable vía `TOKEN_PRICE_PER_1K` en `.env`.
````

---

## Resumen de arquitectura

- **Ingesta**: `POST /v1/analysis` (individual) o `/v1/batch` (hasta 500 muestras)
- **Motor forense**: `forensic_engine.py` orquesta el prompt, llama al LLM con `response_format=json_object`, parsea y tipa la respuesta
- **Frameworks**: definidos como datos en `psychological_frameworks.py`, inyectados como instrucciones al LLM
- **Monetización**: `token_meter.py` cuenta tokens con `tiktoken`, acumula por API key + mes, y expone `/v1/metrics/usage`
- **Seguridad**: API key por cabecera, validación en producción
- **Despliegue**: Docker + docker-compose con Redis para futuro rate-limiting distribuido

El proyecto es ejecutable tal cual con `docker-compose up --build` tras configurar `OPENAI_API_KEY` en `.env`.
