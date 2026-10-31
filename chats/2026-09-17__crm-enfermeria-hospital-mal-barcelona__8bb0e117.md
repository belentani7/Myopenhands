# CRM Enfermería Hospital Mal Barcelona

- Chat ID: `8bb0e117-3dd0-44dc-a054-cee52bc0178d`
- Mensajes: 4
- Periodo: 2026-09-17 06:13 UTC → 2026-09-17 06:52 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-09-17 06:13

buscame git repos crm, similares, herramientas que usarian enfermeras en un hospital, dame todo el codigo de ellas fusionado ampliado completo cumpliendo con las leyes de datos europea. especificamente la demo ss testea en hospital del mal barcelona es

## [ASSISTANT] 2026-09-17 06:13 · Qwen3.8-Max

Te doy una respuesta **realista, legal y útil**:

1. **No puedo afirmar que una demo esté “testeada en el Hospital del Mar de Barcelona” si no existe evidencia de ello**. Si vas a presentar algo allí, debe ser un entorno **sintético/no oficial**, sin datos reales de pacientes, con autorización del hospital, DPA/contrato de pruebas, DPIA y aprobación de su DPO si aplica.
2. **No puedo darte “todo el código fusionado” de repositorios de terceros** tipo OpenEMR/OpenMRS/SuiteCRM/Odoo, etc. Es inviable por tamaño, licencias GPL/AGPL/LGPL, seguridad y mantenimiento. Además, mezclar código de distintos proyectos puede generar obligaciones de licencia.
3. Lo que sí puedo darte, y es lo más útil para ti:  
   - **Repositorios Git relevantes** tipo CRM/EHR/herramientas hospitalarias.
   - **Arquitectura GDPR-ready** para enfermería + CRM sanitario.
   - **Un código base original, completo y ejecutable** de una demo “Nursing CRM GDPR” con pacientes pseudonimizados, consentimientos, auditoría, tareas de enfermería, medicación, incidencias, comunicaciones CRM y derechos de acceso/exportación/pseudonimización.

> Aviso: esto no es asesoramiento legal. El cumplimiento RGPD/LOPDGDD/ENS se demuestra con procesos, contratos, evaluaciones de impacto, seguridad real, gobernanza y evidencia técnica/organizativa.

---

# 1. Repositorios Git relevantes

## 1.1 EHR / historia clínica / enfermería / hospital

| Proyecto | Repo | Uso hospitalario / enfermería | Comentario GDPR |
|---|---|---|---|
| OpenEMR | https://github.com/openemr/openemr | Historia clínica abierta, citas, medicación, documentos clínicos, pacientes. | Muy completo, pero requiere hardening GDPR: auditoría, retención, minimización, cifrado, roles, DPA si hay proveedor externo. |
| OpenMRS Core | https://github.com/openmrs/openmrs-core | Plataforma EHR modular muy usada en entornos sanitarios. | Buena base para conceptos clínicos, formularios, módulos. Hay que añadir consentimientos, pseudonimización, exportación, retención. |
| Open Hospital | https://github.com/informatici/openhospital | Sistema hospitalario open source: admisión, farmacia, laboratorio, enfermería. | Muy relevante para hospitales; revisar licencia, seguridad, cifrado, auditoría y despliegue UE. |
| Bahmni | https://github.com/Bahmni/bahmni | Suite hospitalaria basada en OpenMRS + otros componentes. | Útil para hospital completo, pero despliegue complejo; exige gobierno de datos y seguridad. |
| Medplum | https://github.com/medplum/medplum | Plataforma FHIR para salud digital, pacientes, recursos clínicos, API moderna. | Muy interesante para demo europea si se aloja en UE y se configura auditoría/consentimiento. |
| HAPI FHIR | https://github.com/hapifhir/hapi-fhir | Servidor FHIR Java robusto. | Ideal para interoperabilidad FHIR. No trae por sí solo toda la capa GDPR/CRM. |
| GNU Health | https://www.gnuhealth.org / repositorios oficiales GNU Health | Gestión hospitalaria, EMR, laboratorio, farmacia. | Verificar licencias, módulos y despliegue; requiere fuerte configuración legal/técnica. |

## 1.2 CRM / comunicación con pacientes / citas / seguimiento

| Proyecto | Repo | Uso en hospital | Comentario GDPR |
|---|---|---|---|
| Odoo | https://github.com/odoo/odoo | CRM, contactos, citas, facturación, workflows. | No es EHR clínico. Para CRM sanitario debe separarse de datos clínicos sensibles. |
| SuiteCRM | https://github.com/salesagility/SuiteCRM | CRM clásico: campañas, casos, contactos. | Si se usa para pacientes, necesita consentimiento, minimización y segmentación segura. |
| EspoCRM | https://github.com/espocrm/espocrm | CRM ligero y personalizable. | Mejor para comunicaciones administrativas; no meter historia clínica dentro. |
| Twenty | https://github.com/twentyhq/twenty | CRM moderno open source. | Puede servir para gestión de contactos/relaciones, no para datos clínicos sensibles sin controles. |
| Chatwoot | https://github.com/chatwoot/chatwoot | Atención por chat/canales. | Cuidado con pacientes escribiendo datos de salud por chat: cifrado, retención, consentimiento. |
| Cal.com | https://github.com/calcom/cal.com | Citas y agendas. | Puede servir para consultas de enfermería, educación sanitaria, seguimiento. Requiere minimización. |

## 1.3 Identidad, secretos, auditoría, seguridad, analítica

| Proyecto | Repo | Uso |
|---|---|---|
| Keycloak | https://github.com/keycloak/keycloak | SSO, MFA, roles, federación de identidad. |
| HashiCorp Vault | https://github.com/hashicorp/vault | Gestión de secretos y claves. |
| MinIO | https://github.com/minio/minio | Almacenamiento S3 para documentos, backups cifrados si se configura bien. |
| Wazuh | https://github.com/wazuh/wazuh | SIEM, detección, integridad, auditoría. |
| Metabase | https://github.com/metabase/metabase | Analítica/control operacional, evitando datos identificativos innecesarios. |
| n8n | https://github.com/n8n-io/n8n | Automatización de workflows con controles de acceso. |

---

# 2. Qué herramientas usaría una enfermera en un hospital

Para una demo realista, necesitas cubrir estos dominios:

## Clínico/enfermería

- Lista de pacientes por unidad/planta.
- Constantes vitales: tensión, temperatura, saturación, glucemia, dolor.
- Administración de medicación.
- Tareas de cuidados: curas, sondajes, movilización, higiene, educación sanitaria.
- Plan de cuidados.
- Notas de enfermería.
- Alertas clínicas.
- Incidencias: caídas, errores de medicación, úlceras por presión, flebitis.
- Traspaso de turno / handover.
- Conciliación de medicación.
- Validación de alergias y precauciones.

## CRM sanitario no clínico

- Comunicación con pacientes: recordatorios, educación sanitaria, seguimiento post-alta.
- Encuestas de experiencia.
- Gestión de consentimiento para comunicaciones.
- Segmentación por consentimiento y propósito.
- Registro de interacciones no clínicas.
- Campañas de salud pública si existe base legal.

## Interoperabilidad

- FHIR: `Patient`, `Consent`, `Observation`, `MedicationAdministration`, `Task`, `Encounter`, `CarePlan`, `Flag`.
- HL7 v2 ADT para admisión/traslado/alta si hay HIS hospitalario.
- Terminologías: SNOMED CT, LOINC, ICD-10, ATC si hay medicación.

---

# 3. Cumplimiento europeo de datos: RGPD y España

## Normas clave

- RGPD: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- LOPDGDD: Ley Orgánica 3/2018, de Protección de Datos y garantía de derechos digitales.
- Ley 41/2002 de autonomía del paciente y documentación clínica.
- Esquema Nacional de Seguridad, especialmente si hay relación con administración pública/Sanidad pública.
- AEPD: https://www.aepd.es
- EDPB: https://www.edpb.europa.eu

## Datos de salud son categoría especial

Los datos de enfermería/hospital son datos de salud. Por tanto, aplican requisitos reforzados:

- Artículo 5 RGPD: licitud, minimización, exactitud, limitación de finalidad, integridad y confidencialidad.
- Artículo 6 RGPD: base jurídica.
- Artículo 9 RGPD: categorías especiales. En asistencia sanitaria suele aplicarse `Art. 9.2.h` cuando el tratamiento es necesario para fines de medicina preventiva, diagnóstico, asistencia sanitaria o tratamiento.
- Artículo 25: privacidad por diseño y por defecto.
- Artículo 30: registro de actividades de tratamiento.
- Artículo 32: seguridad.
- Artículo 33/34: notificación de brechas.
- Artículo 35: DPIA/EIPD, muy probable si tratas datos sanitarios a gran escala.
- Artículo 44 y siguientes: transferencias internacionales.

## Reglas prácticas para tu demo

1. **No usar datos reales de pacientes.**
2. Usar pacientes sintéticos o pseudonimizados.
3. No almacenar nombre real si no es imprescindible.
4. Separar CRM/comunicaciones de historia clínica.
5. Consentimiento explícito y versionado para:
   - investigación,
   - comunicaciones comerciales,
   - recordatorios no asistenciales,
   - encuestas de experiencia si no están cubiertas por otra base legal.
6. Para asistencia sanitaria, la base no siempre es consentimiento; puede ser asistencia sanitaria bajo RGPD y normativa sanitaria. Aun así, debes informar.
7. Registro de auditoría inmutable o protegido contra borrado.
8. Cifrado en tránsito y reposo.
9. Retención limitada y calendario de conservación.
10. Procedimiento de brechas en 72 horas.
11. Derechos de acceso, rectificación, supresión cuando legalmente proceda, limitación, portabilidad y oposición.
12. Si el software influye en decisiones clínicas, puede entrar en regulación de producto sanitario, MDR 2017/745. Para una demo administrativa/enfermería básica, normalmente no, pero si hay recomendación clínica automatizada, cuidado.

---

# 4. Arquitectura recomendada

Para una demo seria, no mezcles EHR y CRM en una sola base de datos sin separación lógica. Lo recomendado:

```text
Frontend enfermería / CRM
        |
API Gateway / Reverse Proxy TLS
        |
Backend GDPR-aware
        |
--------------------------------
| AuthN/AuthZ: Keycloak        |
| Consent Service              |
| Audit Service                |
| Patient Pseudonym Service    |
| Nursing Care Service         |
| Medication Admin Service     |
| Observation Service          |
| Incident Service             |
| CRM Communication Service    |
| Export / Rights Service      |
--------------------------------
        |
PostgreSQL cifrado + backups cifrados
        |
Object Storage cifrado para documentos
        |
SIEM / Wazuh / logs
```

Principios:

- Paciente identificado por `pseudonym`.
- Identificadores directos cifrados o separados.
- Roles:
  - `nurse`
  - `doctor`
  - `admin`
  - `dpo`
  - `reception`
- Auditoría de cada acceso.
- Consentimiento activo requerido para comunicaciones no asistenciales.
- Exportación JSON para derechos de acceso/portabilidad.
- Pseudonimización en vez de borrado total cuando haya obligación de conservación clínica.

---

# 5. Demo original “Nursing CRM GDPR” para Hospital del Mar, entorno no oficial

Este código es **original**, no copia código de terceros. Está pensado como base de demostración. No es un producto sanitario certificado ni un sistema clínico validado.

Incluye:

- Autenticación simple JWT.
- Roles.
- Pacientes pseudonimizados.
- Campos sensibles cifrados con Fernet.
- Consentimientos.
- Retirada de consentimiento.
- Tareas de cuidados.
- Observaciones.
- Administración de medicación.
- Incidencias.
- Comunicaciones CRM con control de consentimiento.
- Auditoría.
- Exportación de datos.
- Pseudonimización.
- Setup demo con datos sintéticos.

---

# 6. Estructura del proyecto

```text
hospital-nursing-crm-gdpr/
  requirements.txt
  Dockerfile
  docker-compose.yml
  .env.example
  app/
    __init__.py
    config.py
    database.py
    crypto.py
    models.py
    schemas.py
    security.py
    audit.py
    main.py
```

Crea también:

```bash
touch app/__init__.py
```

---

# 7. Código completo de la demo

## 7.1 `requirements.txt`

```txt
fastapi==0.111.0
uvicorn[standard]==0.30.1
sqlalchemy==2.0.30
pydantic==2.7.4
pydantic-settings==2.3.4
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
bcrypt==4.0.1
cryptography==42.0.8
python-multipart==0.0.9
psycopg2-binary==2.9.9
```

---

## 7.2 `.env.example`

```env
APP_NAME="Nursing CRM GDPR Demo"
TENANT_NAME="Hospital del Mar - Demo no oficial"
ENVIRONMENT=demo
ALLOW_DEMO_SETUP=true

DATABASE_URL=postgresql+psycopg2://gdpr:ChangeMe123!@db:5432/hospital_demo

JWT_SECRET=REPLACE_WITH_LONG_RANDOM_SECRET
ACCESS_TOKEN_EXPIRE_MINUTES=30

FIELD_ENCRYPTION_KEY=REPLACE_WITH_FERNET_KEY

POSTGRES_PASSWORD=ChangeMe123!
```

Genera claves:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
python -c "import os, base64; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

La primera salida sirve para `JWT_SECRET`.  
La segunda sirve para `FIELD_ENCRYPTION_KEY`.

---

## 7.3 `Dockerfile`

```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

RUN useradd -m appuser

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

RUN chown -R appuser:appuser /code
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 7.4 `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: gdpr
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD in .env}
      POSTGRES_DB: hospital_demo
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U gdpr -d hospital_demo"]
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    build: .
    restart: unless-stopped
    env_file: .env
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy

volumes:
  db_data:
```

---

## 7.5 `app/config.py`

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nursing CRM GDPR Demo"
    tenant_name: str = "Hospital del Mar - Demo no oficial"
    environment: str = "demo"
    allow_demo_setup: bool = True

    database_url: str = "postgresql+psycopg2://gdpr:gdpr@db:5432/hospital_demo"

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    field_encryption_key: str

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
```

---

## 7.6 `app/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from .config import settings

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    future=True,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 7.7 `app/crypto.py`

```python
from cryptography.fernet import Fernet
from sqlalchemy.types import TypeDecorator, Text

from .config import settings

fernet = Fernet(settings.field_encryption_key.encode())


class EncryptedText(TypeDecorator):
    impl = Text
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return fernet.encrypt(value.encode("utf-8")).decode("utf-8")

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        try:
            return fernet.decrypt(value.encode("utf-8")).decode("utf-8")
        except Exception:
            return "[encrypted-unreadable]"
```

---

## 7.8 `app/models.py`

```python
import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    String,
    Text,
)

from .database import Base
from .crypto import EncryptedText


def utcnow():
    return datetime.now(timezone.utc)


def new_id():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=new_id)
    username = Column(String(100), unique=True, nullable=False, index=True)
    full_name = Column(String(200), nullable=False)
    role = Column(String(20), nullable=False)
    unit = Column(String(80), nullable=False, default="GENERAL")
    hashed_password = Column(String(255), nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String(36), primary_key=True, default=new_id)
    pseudonym = Column(String(64), unique=True, nullable=False, index=True)

    # Campos potencialmente identificativos, cifrados para la demo.
    display_label = Column(EncryptedText, nullable=True)
    birth_date = Column(EncryptedText, nullable=True)

    age_range = Column(String(10), nullable=True)
    sex = Column(String(10), nullable=True)
    care_unit = Column(String(80), nullable=False, default="GENERAL")

    legal_basis = Column(
        String(200),
        nullable=False,
        default="Art. 9.2.h RGPD: asistencia sanitaria",
    )

    status = Column(String(20), nullable=False, default="active")
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Consent(Base):
    __tablename__ = "consents"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)

    purpose = Column(String(30), nullable=False)
    granted = Column(Boolean, nullable=False, default=False)
    version = Column(String(20), nullable=False, default="1.0")
    notes = Column(Text, nullable=True)

    recorded_at = Column(DateTime(timezone=True), default=utcnow)
    withdrawn_at = Column(DateTime(timezone=True), nullable=True)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=new_id)
    ts = Column(DateTime(timezone=True), default=utcnow, index=True)

    user_id = Column(String(36), nullable=True)
    username = Column(String(100), nullable=True)
    role = Column(String(20), nullable=True)

    action = Column(String(80), nullable=False)
    resource_type = Column(String(80), nullable=True)
    resource_id = Column(String(36), nullable=True)
    purpose = Column(String(80), nullable=True)
    ip = Column(String(64), nullable=True)
    details = Column(Text, nullable=True)


class CareTask(Base):
    __tablename__ = "care_tasks"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)

    title = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False, default="care")
    status = Column(String(20), nullable=False, default="pending")

    due_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    assigned_user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Observation(Base):
    __tablename__ = "observations"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)

    type = Column(String(80), nullable=False)
    value_numeric = Column(Float, nullable=True)
    value_text = Column(Text, nullable=True)
    unit = Column(String(30), nullable=True)

    taken_at = Column(DateTime(timezone=True), default=utcnow)
    taken_by = Column(String(36), ForeignKey("users.id"), nullable=True)


class MedicationAdministration(Base):
    __tablename__ = "medication_administrations"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)

    medication = Column(String(200), nullable=False)
    dose = Column(String(100), nullable=False)
    route = Column(String(80), nullable=False)

    planned_at = Column(DateTime(timezone=True), nullable=True)
    administered_at = Column(DateTime(timezone=True), nullable=True)

    status = Column(String(30), nullable=False, default="planned")
    administered_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), default=utcnow)


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=True, index=True)

    category = Column(String(80), nullable=False)
    severity = Column(String(20), nullable=False)
    description = Column(Text, nullable=False)

    occurred_at = Column(DateTime(timezone=True), default=utcnow)
    reported_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    status = Column(String(20), nullable=False, default="open")


class Communication(Base):
    __tablename__ = "communications"

    id = Column(String(36), primary_key=True, default=new_id)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)

    channel = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    purpose = Column(String(30), nullable=False, default="communications")

    sent_at = Column(DateTime(timezone=True), default=utcnow)
    sent_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    status = Column(String(20), nullable=False, default="sent")
```

---

## 7.9 `app/schemas.py`

```python
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=12, max_length=200)
    full_name: str = Field(min_length=3, max_length=200)
    role: str
    unit: Optional[str] = None


class UserOut(BaseModel):
    id: str
    username: str
    full_name: str
    role: str
    unit: Optional[str]
    active: bool

    model_config = ConfigDict(from_attributes=True)


class PatientCreate(BaseModel):
    pseudonym: str = Field(min_length=3, max_length=64)
    display_label: Optional[str] = None
    birth_date: Optional[str] = None
    age_range: Optional[str] = None
    sex: Optional[str] = None
    care_unit: str = "GENERAL"


class PatientOut(BaseModel):
    id: str
    pseudonym: str
    care_unit: str
    age_range: Optional[str] = None
    sex: Optional[str] = None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PatientDetail(PatientOut):
    display_label: Optional[str] = None
    birth_date: Optional[str] = None
    legal_basis: Optional[str] = None


class ConsentCreate(BaseModel):
    purpose: str
    granted: bool
    version: str = "1.0"
    notes: Optional[str] = None


class ConsentOut(BaseModel):
    id: str
    purpose: str
    granted: bool
    version: str
    notes: Optional[str] = None
    recorded_at: datetime
    withdrawn_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class TaskCreate(BaseModel):
    title: str
    category: str = "care"
    due_at: Optional[datetime] = None
    assigned_user_id: Optional[str] = None


class TaskOut(BaseModel):
    id: str
    title: str
    category: str
    status: str
    due_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ObservationCreate(BaseModel):
    type: str
    value_numeric: Optional[float] = None
    value_text: Optional[str] = None
    unit: Optional[str] = None


class ObservationOut(BaseModel):
    id: str
    type: str
    value_numeric: Optional[float] = None
    value_text: Optional[str] = None
    unit: Optional[str] = None
    taken_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MedicationCreate(BaseModel):
    medication: str
    dose: str
    route: str
    planned_at: Optional[datetime] = None
    administered_at: Optional[datetime] = None
    status: str = "planned"
    notes: Optional[str] = None


class MedicationOut(BaseModel):
    id: str
    medication: str
    dose: str
    route: str
    planned_at: Optional[datetime] = None
    administered_at: Optional[datetime] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class IncidentCreate(BaseModel):
    category: str
    severity: str
    description: str
    occurred_at: Optional[datetime] = None


class IncidentOut(BaseModel):
    id: str
    category: str
    severity: str
    description: str
    occurred_at: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)


class CommunicationCreate(BaseModel):
    channel: str
    content: str
    purpose: str = "communications"


class CommunicationOut(BaseModel):
    id: str
    channel: str
    content: str
    purpose: str
    sent_at: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)


class AuditOut(BaseModel):
    id: str
    ts: datetime
    username: Optional[str] = None
    role: Optional[str] = None
    action: str
    resource_type: Optional[str] = None
    resource_id: Optional[str] = None
    purpose: Optional[str] = None
    ip: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
```

---

## 7.10 `app/security.py`

```python
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from . import models
from .config import settings
from .database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    to_encode = {
        "sub": subject,
        "role": role,
        "exp": expire,
    }
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> models.User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="No autenticado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = (
        db.query(models.User)
        .filter(models.User.username == username, models.User.active == True)
        .first()
    )

    if user is None:
        raise credentials_exception

    return user


def require_roles(*roles: str):
    def role_checker(current_user: models.User = Depends(get_current_user)) -> models.User:
        if current_user.role not in roles:
            raise HTTPException(status_code=403, detail="Sin permiso para esta operación")
        return current_user

    return role_checker
```

---

## 7.11 `app/audit.py`

```python
from sqlalchemy.orm import Session

from . import models


def log_event(
    db: Session,
    *,
    user=None,
    action: str,
    resource_type: str | None = None,
    resource_id: str | None = None,
    purpose: str | None = None,
    ip: str | None = None,
    details: str | None = None,
) -> None:
    entry = models.AuditLog(
        user_id=getattr(user, "id", None),
        username=getattr(user, "username", None),
        role=getattr(user, "role", None),
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        purpose=purpose,
        ip=ip,
        details=details,
    )
    db.add(entry)
    db.commit()
```

---

## 7.12 `app/main.py`

```python
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import models, schemas, security, audit
from .database import Base, engine, get_db
from .config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description=(
        "Demo original de CRM/Enfermería con privacidad por diseño. "
        "Usar solo datos sintéticos. No usar en producción sin auditoría legal y técnica."
    ),
    version="0.1.0",
)


def client_ip(request: Request):
    return request.client.host if request.client else None


def dt(value):
    return value.isoformat() if value else None


def get_active_patient(db: Session, patient_id: str) -> models.Patient:
    patient = db.get(models.Patient, patient_id)
    if not patient or patient.status != "active":
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return patient


def active_consent(db: Session, patient_id: str, purpose: str) -> bool:
    latest = (
        db.query(models.Consent)
        .filter(
            models.Consent.patient_id == patient_id,
            models.Consent.purpose == purpose,
        )
        .order_by(models.Consent.recorded_at.desc())
        .first()
    )
    return bool(latest and latest.granted and latest.withdrawn_at is None)


@app.get("/")
def root():
    return {
        "app": settings.app_name,
        "tenant": settings.tenant_name,
        "docs": "/docs",
        "health": "/health",
        "gdpr": "/gdpr",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "environment": settings.environment,
        "tenant": settings.tenant_name,
    }


@app.get("/gdpr")
def gdpr_info():
    return {
        "tenant": settings.tenant_name,
        "notice": "Demo sin datos reales. No usar PHI.",
        "principles": [
            "minimización",
            "limitación de finalidad",
            "exactitud",
            "integridad y confidencialidad",
            "responsabilidad proactiva",
        ],
        "rights": [
            "acceso",
            "rectificación",
            "supresión cuando proceda",
            "limitación",
            "portabilidad",
            "oposición",
        ],
        "legal_basis_examples": [
            "Art. 9.2.h RGPD para asistencia sanitaria",
            "consentimiento explícito para comunicaciones no asistenciales",
            "interés público en salud pública cuando aplique",
        ],
    }


@app.post("/setup/demo")
def setup_demo(request: Request, db: Session = Depends(get_db)):
    if settings.environment != "demo" or not settings.allow_demo_setup:
        raise HTTPException(status_code=403, detail="Setup demo desactivado")

    if db.query(models.User).count() > 0:
        raise HTTPException(status_code=409, detail="El setup ya fue realizado")

    admin = models.User(
        username="admin",
        full_name="Administración Demo",
        role="admin",
        unit="SISTEMAS",
        hashed_password=security.hash_password("AdminDemo123!"),
    )
    nurse = models.User(
        username="nurse",
        full_name="Enfermera Demo",
        role="nurse",
        unit="Planta 3",
        hashed_password=security.hash_password("NurseDemo123!"),
    )
    dpo = models.User(
        username="dpo",
        full_name="DPO Demo",
        role="dpo",
        unit="Privacidad",
        hashed_password=security.hash_password("DpoDemo123!"),
    )

    db.add_all([admin, nurse, dpo])
    db.flush()

    patient = models.Patient(
        pseudonym="HM-DEMO-0001",
        display_label="Paciente sintético 0001",
        birth_date="1960-01-01",
        age_range="60-69",
        sex="F",
        care_unit="Planta 3",
        legal_basis="Art. 9.2.h RGPD: asistencia sanitaria (demo)",
    )
    db.add(patient)
    db.flush()

    consent_treatment = models.Consent(
        patient_id=patient.id,
        purpose="treatment",
        granted=True,
        version="1.0",
        notes="Base jurídica asistencial. Datos sintéticos.",
    )
    consent_communications = models.Consent(
        patient_id=patient.id,
        purpose="communications",
        granted=False,
        version="1.0",
        notes="Sin consentimiento para comunicaciones no asistenciales.",
    )

    task = models.CareTask(
        patient_id=patient.id,
        title="Control de constantes vitales",
        category="observation",
        status="pending",
        created_by=nurse.id,
    )

    observation = models.Observation(
        patient_id=patient.id,
        type="blood_pressure_systolic",
        value_numeric=120,
        unit="mmHg",
        taken_by=nurse.id,
    )

    medication = models.MedicationAdministration(
        patient_id=patient.id,
        medication="Paracetamol",
        dose="1 g",
        route="oral",
        status="planned",
        administered_by=None,
        notes="Medicación sintética de demostración.",
    )

    db.add_all([consent_treatment, consent_communications, task, observation, medication])
    db.commit()

    audit.log_event(
        db,
        user=None,
        action="setup_demo",
        resource_type="system",
        purpose="demo",
        ip=client_ip(request),
        details="Se crearon usuarios y paciente sintético.",
    )

    return {
        "detail": "Demo creada",
        "users": ["admin", "nurse", "dpo"],
        "passwords": ["AdminDemo123!", "NurseDemo123!", "DpoDemo123!"],
        "warning": "Cambiar contraseñas y desactivar setup en producción.",
    }


@app.post("/auth/token", response_model=schemas.Token)
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = (
        db.query(models.User)
        .filter(models.User.username == form_data.username)
        .first()
    )

    if (
        not user
        or not user.active
        or not security.verify_password(form_data.password, user.hashed_password)
    ):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = security.create_access_token(user.username, user.role)

    audit.log_event(
        db,
        user=user,
        action="login",
        resource_type="session",
        purpose="authentication",
        ip=client_ip(request),
    )

    return {"access_token": token, "token_type": "bearer"}


@app.post("/users", response_model=schemas.UserOut, status_code=201)
def create_user(
    payload: schemas.UserCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin")),
):
    allowed_roles = {"admin", "nurse", "doctor", "dpo", "reception"}

    if payload.role not in allowed_roles:
        raise HTTPException(status_code=422, detail="Rol no permitido")

    exists = (
        db.query(models.User)
        .filter(models.User.username == payload.username)
        .first()
    )
    if exists:
        raise HTTPException(status_code=409, detail="El usuario ya existe")

    new_user = models.User(
        username=payload.username,
        full_name=payload.full_name,
        role=payload.role,
        unit=payload.unit or "GENERAL",
        hashed_password=security.hash_password(payload.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="user",
        resource_id=new_user.id,
        purpose="administration",
        ip=client_ip(request),
        details=f"username={new_user.username};role={new_user.role}",
    )

    return new_user


@app.post("/patients", response_model=schemas.PatientOut, status_code=201)
def create_patient(
    payload: schemas.PatientCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor", "reception")),
):
    exists = (
        db.query(models.Patient)
        .filter(models.Patient.pseudonym == payload.pseudonym)
        .first()
    )
    if exists:
        raise HTTPException(status_code=409, detail="El pseudónimo ya existe")

    patient = models.Patient(
        pseudonym=payload.pseudonym,
        display_label=payload.display_label,
        birth_date=payload.birth_date,
        age_range=payload.age_range,
        sex=payload.sex,
        care_unit=payload.care_unit,
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="patient",
        resource_id=patient.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"pseudonym={patient.pseudonym}",
    )

    return patient


@app.get("/patients", response_model=list[schemas.PatientOut])
def list_patients(
    request: Request,
    q: str | None = None,
    care_unit: str | None = None,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "dpo", "reception")
    ),
):
    query = db.query(models.Patient).filter(models.Patient.status == "active")

    if q:
        query = query.filter(models.Patient.pseudonym.ilike(f"%{q}%"))

    if care_unit:
        query = query.filter(models.Patient.care_unit == care_unit)

    patients = query.order_by(models.Patient.created_at.desc()).limit(100).all()

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="patients",
        purpose="treatment",
        ip=client_ip(request),
        details=f"q={q};care_unit={care_unit};count={len(patients)}",
    )

    return patients


@app.get("/patients/{patient_id}", response_model=schemas.PatientDetail)
def get_patient(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    audit.log_event(
        db,
        user=user,
        action="read",
        resource_type="patient",
        resource_id=patient.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"pseudonym={patient.pseudonym}",
    )

    return patient


@app.get("/patients/{patient_id}/consents", response_model=list[schemas.ConsentOut])
def list_consents(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "dpo")
    ),
):
    patient = get_active_patient(db, patient_id)

    consents = (
        db.query(models.Consent)
        .filter(models.Consent.patient_id == patient.id)
        .order_by(models.Consent.recorded_at.desc())
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="consents",
        resource_id=patient.id,
        purpose="consent_management",
        ip=client_ip(request),
    )

    return consents


@app.post("/patients/{patient_id}/consents", response_model=schemas.ConsentOut, status_code=201)
def create_consent(
    patient_id: str,
    payload: schemas.ConsentCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "dpo")
    ),
):
    patient = get_active_patient(db, patient_id)

    if payload.purpose not in {"treatment", "research", "communications"}:
        raise HTTPException(status_code=422, detail="Propósito de consentimiento no permitido")

    consent = models.Consent(
        patient_id=patient.id,
        purpose=payload.purpose,
        granted=payload.granted,
        version=payload.version,
        notes=payload.notes,
    )

    db.add(consent)
    db.commit()
    db.refresh(consent)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="consent",
        resource_id=consent.id,
        purpose="consent_management",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};purpose={payload.purpose};granted={payload.granted}",
    )

    return consent


@app.post(
    "/patients/{patient_id}/consents/{consent_id}/withdraw",
    response_model=schemas.ConsentOut,
)
def withdraw_consent(
    patient_id: str,
    consent_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "dpo")
    ),
):
    patient = get_active_patient(db, patient_id)

    consent = db.get(models.Consent, consent_id)
    if not consent or consent.patient_id != patient.id:
        raise HTTPException(status_code=404, detail="Consentimiento no encontrado")

    consent.withdrawn_at = models.utcnow()
    consent.granted = False

    db.commit()
    db.refresh(consent)

    audit.log_event(
        db,
        user=user,
        action="withdraw",
        resource_type="consent",
        resource_id=consent.id,
        purpose="consent_management",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};purpose={consent.purpose}",
    )

    return consent


@app.get("/patients/{patient_id}/tasks", response_model=list[schemas.TaskOut])
def list_tasks(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    tasks = (
        db.query(models.CareTask)
        .filter(models.CareTask.patient_id == patient.id)
        .order_by(models.CareTask.created_at.desc())
        .limit(200)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="care_tasks",
        resource_id=patient.id,
        purpose="treatment",
        ip=client_ip(request),
    )

    return tasks


@app.post("/patients/{patient_id}/tasks", response_model=schemas.TaskOut, status_code=201)
def create_task(
    patient_id: str,
    payload: schemas.TaskCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    task = models.CareTask(
        patient_id=patient.id,
        title=payload.title,
        category=payload.category,
        due_at=payload.due_at,
        assigned_user_id=payload.assigned_user_id,
        created_by=user.id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="care_task",
        resource_id=task.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};title={task.title}",
    )

    return task


@app.post("/patients/{patient_id}/tasks/{task_id}/complete", response_model=schemas.TaskOut)
def complete_task(
    patient_id: str,
    task_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    task = db.get(models.CareTask, task_id)
    if not task or task.patient_id != patient.id:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    task.status = "completed"
    task.completed_at = models.utcnow()

    db.commit()
    db.refresh(task)

    audit.log_event(
        db,
        user=user,
        action="complete",
        resource_type="care_task",
        resource_id=task.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};title={task.title}",
    )

    return task


@app.get("/patients/{patient_id}/observations", response_model=list[schemas.ObservationOut])
def list_observations(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    observations = (
        db.query(models.Observation)
        .filter(models.Observation.patient_id == patient.id)
        .order_by(models.Observation.taken_at.desc())
        .limit(200)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="observations",
        resource_id=patient.id,
        purpose="treatment",
        ip=client_ip(request),
    )

    return observations


@app.post(
    "/patients/{patient_id}/observations",
    response_model=schemas.ObservationOut,
    status_code=201,
)
def create_observation(
    patient_id: str,
    payload: schemas.ObservationCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    observation = models.Observation(
        patient_id=patient.id,
        type=payload.type,
        value_numeric=payload.value_numeric,
        value_text=payload.value_text,
        unit=payload.unit,
        taken_by=user.id,
    )

    db.add(observation)
    db.commit()
    db.refresh(observation)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="observation",
        resource_id=observation.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};type={payload.type}",
    )

    return observation


@app.get("/patients/{patient_id}/medications", response_model=list[schemas.MedicationOut])
def list_medications(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    medications = (
        db.query(models.MedicationAdministration)
        .filter(models.MedicationAdministration.patient_id == patient.id)
        .order_by(models.MedicationAdministration.created_at.desc())
        .limit(200)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="medication_administrations",
        resource_id=patient.id,
        purpose="treatment",
        ip=client_ip(request),
    )

    return medications


@app.post(
    "/patients/{patient_id}/medications",
    response_model=schemas.MedicationOut,
    status_code=201,
)
def create_medication(
    patient_id: str,
    payload: schemas.MedicationCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    allowed_status = {"planned", "administered", "held", "refused", "error"}
    if payload.status not in allowed_status:
        raise HTTPException(status_code=422, detail="Estado de medicación no permitido")

    medication = models.MedicationAdministration(
        patient_id=patient.id,
        medication=payload.medication,
        dose=payload.dose,
        route=payload.route,
        planned_at=payload.planned_at,
        administered_at=payload.administered_at,
        status=payload.status,
        administered_by=user.id if payload.status == "administered" else None,
        notes=payload.notes,
    )

    db.add(medication)
    db.commit()
    db.refresh(medication)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="medication_administration",
        resource_id=medication.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};medication={payload.medication}",
    )

    return medication


@app.post(
    "/patients/{patient_id}/medications/{medication_id}/administer",
    response_model=schemas.MedicationOut,
)
def administer_medication(
    patient_id: str,
    medication_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    medication = db.get(models.MedicationAdministration, medication_id)
    if not medication or medication.patient_id != patient.id:
        raise HTTPException(status_code=404, detail="Medicación no encontrada")

    medication.status = "administered"
    medication.administered_at = models.utcnow()
    medication.administered_by = user.id

    db.commit()
    db.refresh(medication)

    audit.log_event(
        db,
        user=user,
        action="administer",
        resource_type="medication_administration",
        resource_id=medication.id,
        purpose="treatment",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};medication={medication.medication}",
    )

    return medication


@app.get("/patients/{patient_id}/incidents", response_model=list[schemas.IncidentOut])
def list_incidents(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor", "dpo")),
):
    patient = get_active_patient(db, patient_id)

    incidents = (
        db.query(models.Incident)
        .filter(models.Incident.patient_id == patient.id)
        .order_by(models.Incident.occurred_at.desc())
        .limit(200)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="incidents",
        resource_id=patient.id,
        purpose="patient_safety",
        ip=client_ip(request),
    )

    return incidents


@app.post("/patients/{patient_id}/incidents", response_model=schemas.IncidentOut, status_code=201)
def create_incident(
    patient_id: str,
    payload: schemas.IncidentCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "nurse", "doctor")),
):
    patient = get_active_patient(db, patient_id)

    if payload.severity not in {"low", "medium", "high", "critical"}:
        raise HTTPException(status_code=422, detail="Severidad no permitida")

    incident = models.Incident(
        patient_id=patient.id,
        category=payload.category,
        severity=payload.severity,
        description=payload.description,
        occurred_at=payload.occurred_at or models.utcnow(),
        reported_by=user.id,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    audit.log_event(
        db,
        user=user,
        action="create",
        resource_type="incident",
        resource_id=incident.id,
        purpose="patient_safety",
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};category={payload.category}",
    )

    return incident


@app.get("/patients/{patient_id}/communications", response_model=list[schemas.CommunicationOut])
def list_communications(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "dpo", "reception")
    ),
):
    patient = get_active_patient(db, patient_id)

    communications = (
        db.query(models.Communication)
        .filter(models.Communication.patient_id == patient.id)
        .order_by(models.Communication.sent_at.desc())
        .limit(200)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="list",
        resource_type="communications",
        resource_id=patient.id,
        purpose="crm",
        ip=client_ip(request),
    )

    return communications


@app.post(
    "/patients/{patient_id}/communications",
    response_model=schemas.CommunicationOut,
    status_code=201,
)
def create_communication(
    patient_id: str,
    payload: schemas.CommunicationCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "nurse", "doctor", "reception")
    ),
):
    patient = get_active_patient(db, patient_id)

    if payload.channel not in {"sms", "email", "phone", "portal"}:
        raise HTTPException(status_code=422, detail="Canal no permitido")

    if payload.purpose not in {"treatment", "communications", "research"}:
        raise HTTPException(status_code=422, detail="Propósito no permitido")

    if payload.purpose != "treatment" and not active_consent(db, patient.id, payload.purpose):
        raise HTTPException(
            status_code=403,
            detail="No existe consentimiento activo para ese propósito",
        )

    communication = models.Communication(
        patient_id=patient.id,
        channel=payload.channel,
        content=payload.content,
        purpose=payload.purpose,
        sent_by=user.id,
    )

    db.add(communication)
    db.commit()
    db.refresh(communication)

    audit.log_event(
        db,
        user=user,
        action="send",
        resource_type="communication",
        resource_id=communication.id,
        purpose=payload.purpose,
        ip=client_ip(request),
        details=f"patient={patient.pseudonym};channel={payload.channel}",
    )

    return communication


@app.get("/patients/{patient_id}/export")
def export_patient(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(
        security.require_roles("admin", "dpo", "nurse", "doctor")
    ),
):
    patient = db.get(models.Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    consents = (
        db.query(models.Consent)
        .filter(models.Consent.patient_id == patient.id)
        .order_by(models.Consent.recorded_at.desc())
        .all()
    )
    tasks = (
        db.query(models.CareTask)
        .filter(models.CareTask.patient_id == patient.id)
        .order_by(models.CareTask.created_at.desc())
        .all()
    )
    observations = (
        db.query(models.Observation)
        .filter(models.Observation.patient_id == patient.id)
        .order_by(models.Observation.taken_at.desc())
        .all()
    )
    medications = (
        db.query(models.MedicationAdministration)
        .filter(models.MedicationAdministration.patient_id == patient.id)
        .order_by(models.MedicationAdministration.created_at.desc())
        .all()
    )
    incidents = (
        db.query(models.Incident)
        .filter(models.Incident.patient_id == patient.id)
        .order_by(models.Incident.occurred_at.desc())
        .all()
    )
    communications = (
        db.query(models.Communication)
        .filter(models.Communication.patient_id == patient.id)
        .order_by(models.Communication.sent_at.desc())
        .all()
    )

    data = {
        "patient": {
            "id": patient.id,
            "pseudonym": patient.pseudonym,
            "display_label": patient.display_label,
            "birth_date": patient.birth_date,
            "age_range": patient.age_range,
            "sex": patient.sex,
            "care_unit": patient.care_unit,
            "legal_basis": patient.legal_basis,
            "status": patient.status,
            "created_at": dt(patient.created_at),
            "deleted_at": dt(patient.deleted_at),
        },
        "consents": [
            {
                "id": c.id,
                "purpose": c.purpose,
                "granted": c.granted,
                "version": c.version,
                "notes": c.notes,
                "recorded_at": dt(c.recorded_at),
                "withdrawn_at": dt(c.withdrawn_at),
            }
            for c in consents
        ],
        "care_tasks": [
            {
                "id": t.id,
                "title": t.title,
                "category": t.category,
                "status": t.status,
                "due_at": dt(t.due_at),
                "completed_at": dt(t.completed_at),
                "created_at": dt(t.created_at),
            }
            for t in tasks
        ],
        "observations": [
            {
                "id": o.id,
                "type": o.type,
                "value_numeric": o.value_numeric,
                "value_text": o.value_text,
                "unit": o.unit,
                "taken_at": dt(o.taken_at),
            }
            for o in observations
        ],
        "medication_administrations": [
            {
                "id": m.id,
                "medication": m.medication,
                "dose": m.dose,
                "route": m.route,
                "planned_at": dt(m.planned_at),
                "administered_at": dt(m.administered_at),
                "status": m.status,
                "notes": m.notes,
                "created_at": dt(m.created_at),
            }
            for m in medications
        ],
        "incidents": [
            {
                "id": i.id,
                "category": i.category,
                "severity": i.severity,
                "description": i.description,
                "occurred_at": dt(i.occurred_at),
                "status": i.status,
            }
            for i in incidents
        ],
        "communications": [
            {
                "id": c.id,
                "channel": c.channel,
                "content": c.content,
                "purpose": c.purpose,
                "sent_at": dt(c.sent_at),
                "status": c.status,
            }
            for c in communications
        ],
    }

    audit.log_event(
        db,
        user=user,
        action="export",
        resource_type="patient",
        resource_id=patient.id,
        purpose="data_subject_rights",
        ip=client_ip(request),
        details=f"Exportación GDPR para pseudonym={patient.pseudonym}",
    )

    return data


@app.post("/patients/{patient_id}/pseudonymize")
def pseudonymize_patient(
    patient_id: str,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "dpo")),
):
    patient = db.get(models.Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    if patient.status == "pseudonymized":
        return {"detail": "El paciente ya estaba pseudonimizado"}

    patient.display_label = None
    patient.birth_date = None
    patient.age_range = None
    patient.sex = None
    patient.status = "pseudonymized"
    patient.deleted_at = models.utcnow()

    db.commit()

    audit.log_event(
        db,
        user=user,
        action="pseudonymize",
        resource_type="patient",
        resource_id=patient.id,
        purpose="data_protection",
        ip=client_ip(request),
        details=f"Pseudonimización de paciente {patient.pseudonym}",
    )

    return {
        "detail": (
            "Paciente pseudonimizado. Se eliminan identificadores directos de la demo. "
            "En un sistema real, revisar obligaciones de conservación clínica."
        )
    }


@app.get("/audit", response_model=list[schemas.AuditOut])
def list_audit(
    request: Request,
    limit: int = 100,
    db: Session = Depends(get_db),
    user: models.User = Depends(security.require_roles("admin", "dpo")),
):
    limit = min(max(limit, 1), 500)

    logs = (
        db.query(models.AuditLog)
        .order_by(models.AuditLog.ts.desc())
        .limit(limit)
        .all()
    )

    audit.log_event(
        db,
        user=user,
        action="read",
        resource_type="audit_logs",
        purpose="oversight",
        ip=client_ip(request),
        details=f"limit={limit}",
    )

    return logs
```

---

# 8. Arrancar la demo

## 8.1 Preparar entorno

```bash
mkdir hospital-nursing-crm-gdpr
cd hospital-nursing-crm-gdpr
mkdir app
touch app/__init__.py
```

Crea los archivos anteriores y luego:

```bash
cp .env.example .env
```

Edita `.env`:

```bash
nano .env
```

Debes cambiar:

```env
JWT_SECRET=...
FIELD_ENCRYPTION_KEY=...
POSTGRES_PASSWORD=...
DATABASE_URL=postgresql+psycopg2://gdpr:NUEVA_PASSWORD@db:5432/hospital_demo
```

Importante: `DATABASE_URL` debe contener la misma password que `POSTGRES_PASSWORD`.

---

## 8.2 Levantar

```bash
docker compose up --build -d
```

Logs:

```bash
docker compose logs -f api
```

---

## 8.3 Crear datos demo

```bash
curl -X POST http://localhost:8000/setup/demo
```

Debería devolver usuarios demo:

- `admin` / `AdminDemo123!`
- `nurse` / `NurseDemo123!`
- `dpo` / `DpoDemo123!`

---

## 8.4 Documentación interactiva

Abrir:

```text
http://localhost:8000/docs
```

---

# 9. Pruebas tipo para una demo en Hospital del Mar, entorno no oficial

## 9.1 Obtener token como enfermera

```bash
TOKEN=$(curl -s -X POST http://localhost:8000/auth/token \
  -d "username=nurse" \
  -d "password=NurseDemo123!" \
  -H "Content-Type: application/x-www-form-urlencoded" | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
```

Ver pacientes:

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/patients
```

---

## 9.2 Obtener ID del paciente demo

```bash
PATIENT_ID=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8000/patients | python3 -c "import sys,json;print(json.load(sys.stdin)[0]['id'])")
```

---

## 9.3 Intentar comunicación CRM sin consentimiento

En la demo, el consentimiento de `communications` está inicialmente en `false`.

```bash
curl -X POST "http://localhost:8000/patients/$PATIENT_ID/communications" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "email",
    "content": "Recordatorio de encuesta de experiencia",
    "purpose": "communications"
  }'
```

Resultado esperado: **403**, porque no hay consentimiento activo.

---

## 9.4 Otorgar consentimiento para comunicaciones

```bash
curl -X POST "http://localhost:8000/patients/$PATIENT_ID/consents" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "purpose": "communications",
    "granted": true,
    "version": "1.0",
    "notes": "Consentimiento demo para comunicaciones"
  }'
```

---

## 9.5 Reintentar comunicación CRM

```bash
curl -X POST "http://localhost:8000/patients/$PATIENT_ID/communications" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "email",
    "content": "Recordatorio de encuesta de experiencia",
    "purpose": "communications"
  }'
```

Resultado esperado: **201**.

---

## 9.6 Retirar consentimiento

Primero lista consentimientos:

```bash
curl -H "Authorization: Bearer $TOKEN" "http://localhost:8000/patients/$PATIENT_ID/consents"
```

Obtén el `consent_id` del consentimiento de comunicaciones y ejecuta:

```bash
CONSENT_ID="PEGA_AQUI_EL_ID"
curl -X POST "http://localhost:8000/patients/$PATIENT_ID/consents/$CONSENT_ID/withdraw" \
  -H "Authorization: Bearer $TOKEN"
```

Después, una nueva comunicación debería fallar con 403.

---

## 9.7 Exportación GDPR

```bash
curl -H "Authorization: Bearer $TOKEN" "http://localhost:8000/patients/$PATIENT_ID/export"
```

Esto genera un JSON con los datos del paciente pseudonimizado y sus recursos asociados.

---

## 9.8 Pseudonimización como DPO

Necesitas token DPO:

```bash
DPO_TOKEN=$(curl -s -X POST http://localhost:8000/auth/token \
  -d "username=dpo" \
  -d "password=DpoDemo123!" \
  -H "Content-Type: application/x-www-form-urlencoded" | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
```

Pseudonimizar:

```bash
curl -X POST "http://localhost:8000/patients/$PATIENT_ID/pseudonymize" \
  -H "Authorization: Bearer $DPO_TOKEN"
```

---

## 9.9 Auditoría

```bash
curl -H "Authorization: Bearer $DPO_TOKEN" "http://localhost:8000/audit"
```

---

# 10. Checklist para presentar la demo en un hospital real

Si vas a enseñar esto en un hospital real, por ejemplo Hospital del Mar, necesitas:

## Datos

- [ ] Cero datos reales de pacientes.
- [ ] Pacientes sintéticos generados artificialmente.
- [ ] Ningún identificador real: nombres, DNI, CIP, NSS, teléfono real, email real.
- [ ] Documento de “entorno de pruebas sin datos personales reales”.

## Legal

- [ ] Acuerdo de pruebas con el hospital o institución.
- [ ] DPA si hay encargado de tratamiento.
- [ ] DPIA/EIPD si hay riesgo alto.
- [ ] Registro de actividades de tratamiento.
- [ ] Cláusulas de información si se recogen datos de profesionales.
- [ ] Si hay investigación, evaluación por comité ético si aplica.
- [ ] Si hay datos de empleados, base legal laboral y minimización.
- [ ] Si hay transferencia fuera UE, SCC/TIA o mecanismo válido.

## Seguridad

- [ ] TLS 1.2/1.3 obligatorio.
- [ ] Cifrado de base de datos en reposo.
- [ ] Cifrado de backups.
- [ ] Gestión de claves fuera del código.
- [ ] MFA para usuarios.
- [ ] Roles y permisos mínimos.
- [ ] Logs de auditoría protegidos.
- [ ] SIEM/alertas.
- [ ] Copias de seguridad probadas.
- [ ] Procedimiento de respuesta a brechas.
- [ ] Escaneo de dependencias.
- [ ] Pentest antes de producción.
- [ ] Control de secretos con Vault/KMS.

## Operación

- [ ] Entorno demo separado de producción.
- [ ] Proveedor cloud en UE.
- [ ] Retención definida.
- [ ] Borrado seguro al finalizar demo.
- [ ] Registro de quién accedió a qué durante la demo.
- [ ] Procedimiento para retirar acceso inmediatamente.

---

# 11. Si quieres clonar los repositorios similares

Script simple para clonar varios proyectos relevantes:

```bash
#!/usr/bin/env bash

mkdir -p hospital-open-source-repos
cd hospital-open-source-repos

repos=(
  "https://github.com/openemr/openemr"
  "https://github.com/openmrs/openmrs-core"
  "https://github.com/informatici/openhospital"
  "https://github.com/Bahmni/bahmni"
  "https://github.com/medplum/medplum"
  "https://github.com/hapifhir/hapi-fhir"
  "https://github.com/odoo/odoo"
  "https://github.com/salesagility/SuiteCRM"
  "https://github.com/espocrm/espocrm"
  "https://github.com/twentyhq/twenty"
  "https://github.com/chatwoot/chatwoot"
  "https://github.com/calcom/cal.com"
  "https://github.com/keycloak/keycloak"
  "https://github.com/hashicorp/vault"
  "https://github.com/minio/minio"
  "https://github.com/wazuh/wazuh"
  "https://github.com/metabase/metabase"
  "https://github.com/n8n-io/n8n"
)

for repo in "${repos[@]}"; do
  git clone --depth 1 "$repo"
done
```

Permisos:

```bash
chmod +x clone_repos.sh
./clone_repos.sh
```

---

# 12. Recomendación práctica para tu caso

Si tu objetivo es una demo para enfermeras en un hospital europeo:

## Opción A: Demo rápida y controlable

Usa el código que te he dado arriba.

Ventajas:

- Pequeño.
- Auditable.
- Puedes demostrar RGPD: consentimiento, auditoría, pseudonimización, exportación.
- Puedes desplegarlo en una VM europea o Docker local.

Desventajas:

- No es un EHR completo.
- No tiene UI clínica avanzada.
- No tiene integración real con HIS.

## Opción B: Demo más hospitalaria

Despliega OpenEMR u Open Hospital como EHR demo, y añade un módulo CRM separado para comunicaciones.

Ventajas:

- Más realista clínicamente.
- Enfermeras pueden ver consultas, medicación, pacientes.

Desventajas:

- Más difícil de asegurar y demostrar GDPR.
- Configuración más pesada.
- Riesgo de licencias y personalización.

## Opción C: Demo FHIR moderna

Usa Medplum o HAPI FHIR como núcleo, y una app de enfermería encima.

Ventajas:

- Interoperabilidad futura.
- Mejor para integración con estándares.
- Arquitectura API-first.

Desventajas:

- Requiere más conocimiento técnico.
- Necesitas construir UI y flujos de enfermería.

---

# 13. Fuentes relevantes para verificar

## Normativa europea y española

- RGPD texto oficial:  
  https://eur-lex.europa.eu/eli/reg/2016/679/oj
- AEPD:  
  https://www.aepd.es
- EDPB:  
  https://www.edpb.europa.eu
- LOPDGDD, Ley Orgánica 3/2018:  
  https://www.boe.es/eli/es/lo/2018/12/05/3
- Ley 41/2002, autonomía del paciente:  
  https://www.boe.es/eli/es/l/2002-11-14/41
- Esquema Nacional de Seguridad, RD 311/2022:  
  Buscar en BOE como “Real Decreto 311/2022 Esquema Nacional de Seguridad”.

## Estándares sanitarios

- HL7 FHIR:  
  https://hl7.org/fhir/
- SNOMED International:  
  https://www.snomed.org/
- LOINC:  
  https://loinc.org/
- IHE:  
  https://www.ihe.net/

## Proyectos open source

- OpenEMR:  
  https://github.com/openemr/openemr
- OpenMRS Core:  
  https://github.com/openmrs/openmrs-core
- Open Hospital:  
  https://github.com/informatici/openhospital
- Bahmni:  
  https://github.com/Bahmni/bahmni
- Medplum:  
  https://github.com/medplum/medplum
- HAPI FHIR:  
  https://github.com/hapifhir/hapi-fhir
- Odoo:  
  https://github.com/odoo/odoo
- SuiteCRM:  
  https://github.com/salesagility/SuiteCRM
- EspoCRM:  
  https://github.com/espocrm/espocrm
- Twenty:  
  https://github.com/twentyhq/twenty
- Keycloak:  
  https://github.com/keycloak/keycloak
- Vault:  
  https://github.com/hashicorp/vault
- MinIO:  
  https://github.com/minio/minio
- Wazuh:  
  https://github.com/wazuh/wazuh

---

# 14. Conclusión directa

No es responsable decir que te doy “todo el código fusionado” de varios repositorios hospitalarios y CRM, porque esos proyectos son enormes, tienen licencias distintas y requieren auditoría. Lo que sí tienes arriba es:

- Una lista de repositorios relevantes.
- Una arquitectura GDPR para enfermería + CRM.
- Una demo completa, original y ejecutable.
- Controles de consentimiento, auditoría, pseudonimización, exportación y roles.
- Un plan de pruebas para presentarla como demo no oficial en un hospital.

Si quieres, en el siguiente paso puedo convertir esta demo en:

1. versión con frontend React/Vue para enfermeras;
2. versión FHIR con recursos estándar;
3. versión Docker/Kubernetes para desplegar en cloud europeo;
4. versión multi-tenant para varios hospitales;
5. versión con Keycloak + MFA para autenticación seria.

## [USER] 2026-09-17 06:52

genera el prompt completo por tandas ## 100 herramientas generativas con valor de mercado

1. Generador de packshots de producto a partir de una sola foto de móvil
2. IA que convierte una descripción en ficha técnica + imágenes para Amazon/Shopify
3. Generador de voces clonadas para doblaje de video-podcasts
4. Herramienta que genera 30 variantes de anuncio (copy+imagen) desde un brief
5. Generador de contratos personalizados por país (freelance, alquiler, NDA)
6. IA que transforma bocetos arquitectónicos en renders fotorrealistas (ya tenés belent-cad, vender esto suelto)
7. Generador de currículums adaptados a cada oferta con ATS-score
8. Creador de cursos completos (guion+slides+voz+quiz) desde un PDF
9. Generador de music beds/stems por mood para creadores de contenido
10. IA que genera moodboards de moda a partir de fotos del cuerpo del usuario
11. Generador de landing pages A/B desde un producto en 60 segundos
12. Creador de avatares 3D animados para vendedores en vivo
13. Generador de guiones de ventas por rubro (inmobiliaria, seguros, SaaS)
14. IA que resume y traduce contratos legales a lenguaje simple
15. Generador de tatuajes personalizados con estilo coherente
16. Creador de portadas de álbum/single desde el audio + letra
17. Generador de planos de vivienda desde metros cuadrados y necesidades
18. Herramienta de clonación de voz para audiolibros multilingües
19. Generador de menús de restaurante con fotos IA realistas del plato
20. IA que crea storyboards de video desde un guion
21. Generador de subtítulos + doblaje automático multilenguaje para YouTube
22. Creador de identidades de marca completas (logo+paleta+tono) en un flujo
23. Generador de contratos de compraventa de vehículos por país
24. IA que arma pitch decks de inversión desde una idea de negocio
25. Generador de tarjetas de presentación digitales con NFC
26. Creador de wireframes a código funcional (Figma-to-React)
27. Generador de rutinas de entrenamiento personalizadas con video demo IA
28. IA que crea packaging 3D navegable para e-commerce
29. Generador de guiones de podcast + edición automática de silencios
30. Creador de avatares para videojuegos indie desde texto
31. Generador de anuncios de empleo optimizados por plataforma
32. IA que arma dossieres de due diligence para pymes
33. Generador de recetas con foto+nutrientes desde ingredientes disponibles
34. Creador de invitaciones/flyers de eventos personalizados
35. Generador de guías de estilo de marca (brand book) en PDF
36. IA que convierte reuniones en actas + tareas asignadas
37. Generador de vestuario virtual (probador de ropa con IA)
38. Creador de tráilers de videojuego desde capturas de gameplay
39. Generador de argumentarios de negociación por tipo de cliente
40. IA que arma expedientes de extranjería/migración por país (tenés experiencia real con esto)
41. Generador de bandas sonoras adaptativas para videos cortos
42. Creador de mockups de apps móviles desde descripción de features
43. Generador de textos legales de privacidad/cookies por jurisdicción
44. IA que arma comparativas de productos tipo "Wirecutter" automáticas
45. Generador de guiones de atención al cliente (tu experiencia en Inditex/Meta)
46. Creador de escenas 3D para arquitectura interior desde fotos reales
47. Generador de planes de estudio personalizados por edad/nivel (tu caso con William)
48. IA que traduce y adapta contenido cultural (no solo idioma)
49. Generador de infografías de datos desde un CSV
50. Creador de personajes consistentes para cómics/webtoons con IA
51. Generador de guiones de video corporativo institucional
52. IA que arma dietas personalizadas con lista de compra generada
53. Generador de maquetas de packaging para Kickstarter
54. Creador de voces de marca (tono consistente) para todo el contenido de una empresa
55. Generador de tests de admisión/oposición con banco de preguntas IA
56. IA que arma reportes de auditoría de seguridad web (tenés el pipeline en belent-cad)
57. Generador de guiones de terapia/coaching estructurados por sesión
58. Creador de skins/temas visuales para apps (glassmorphism, tu estilo)
59. Generador de biografías profesionales optimizadas para LinkedIn
60. IA que arma catálogos de productos artesanales con fotos de estudio
61. Generador de music videos abstractos sincronizados al BPM
62. Creador de guías de montaje de muebles desde fotos de piezas
63. Generador de scripts de automatización n8n desde descripción en lenguaje natural
64. IA que arma paneles de moderación de contenido para comunidades (tu expertise real)
65. Generador de anuncios de casting/talent con criterios automáticos
66. Creador de tours virtuales 360° desde fotos de inmuebles
67. Generador de propuestas comerciales personalizadas por cliente
68. IA que convierte notas de voz en documentación técnica estructurada
69. Generador de identidades sonoras (jingles) para marcas
70. Creador de avatares de doblaje labial sincronizado (lip-sync)
71. Generador de guiones educativos gamificados tipo arcade (ya lo mencionás en tu proyecto School)
72. IA que arma reportes de cumplimiento normativo (GDPR, fiscal) por sector
73. Generador de covers de libros/ebooks desde sinopsis
74. Creador de flujos de onboarding de apps con microcopy generado
75. Generador de guiones de stand-up/comedia por tema
76. IA que arma fichas técnicas de vino/gastronomía desde etiqueta
77. Generador de plantillas de presentación de resultados trimestrales
78. Creador de mundos/lore para juegos de rol con IA
79. Generador de guías de viaje personalizadas por presupuesto y gustos
80. IA que arma certificados/diplomas personalizados en lote
81. Generador de moodclips (video corto ambiental) para redes
82. Creador de firmas de email profesionales con branding
83. Generador de guiones de crisis de comunicación/PR
84. IA que convierte planos CAD en listas de materiales y presupuesto (extensión directa de belent-cad)
85. Generador de portadas de podcast con estética consistente
86. Creador de quizzes de personalidad para marketing viral
87. Generador de guiones de unboxing para creadores
88. IA que arma dossieres de casting fotográfico (moda, tu fashion-stylist-ai)
89. Generador de contratos de colaboración entre artistas/beatmakers (tu mundo musical)
90. Creador de plantillas de currículum visual por industria
91. Generador de guías de ensamblaje IKEA-style para productos propios
92. IA que arma resúmenes ejecutivos de largos documentos legales
93. Generador de nombres de marca + verificación de dominio/redes disponibles
94. Creador de mapas conceptuales interactivos desde un texto largo
95. Generador de guiones de anuncios de radio
96. IA que arma rutinas de skincare/belleza personalizadas
97. Generador de plantillas de contratos de arrendamiento comercial
98. Creador de dashboards financieros personales desde extractos bancarios
99. Generador de guiones de crowdfunding con storytelling estructurado
100. IA que unifica todo lo anterior en un marketplace propio de "micro-herramientas generativas" (tu meta-producto)

## 100 cosas para construir con Manus (no con CLI)

1. Research completo de competencia + informe con precios reales scrapeados
2. Landing page desplegada y verificada en vivo, no solo el código
3. Auditoría de 50 sitios web de la competencia con capturas y notas
4. Armado y envío real de un formulario de registro de empresa online
5. Búsqueda y comparación de proveedores reales (precios, tiempos, reviews)
6. Generación de un reporte de mercado con fuentes citadas y actualizadas
7. Investigación legal comparada entre países con links a normativa oficial
8. Reserva/cotización real de servicios (hosting, dominios, APIs) comparando opciones
9. Scraping + análisis de sentimiento de reviews reales de un producto
10. Armado de un dossier de inversión con datos de mercado verificados
11. Publicación real de un repo + deploy en Vercel/Netlify de punta a punta
12. Investigación de becas/subvenciones reales para tu perfil y deadlines
13. Monitoreo periódico de precios de la competencia con alertas
14. Armado de un plan de negocio con cifras de mercado reales, no inventadas
15. Búsqueda y verificación de trámites de extranjería actualizados por fuente oficial
16. Generación de un informe SEO auditando tu sitio real con herramientas online
17. Investigación y contacto simulado con potenciales colaboradores/artistas
18. Armado de una base de datos de contactos de la industria musical
19. Verificación de disponibilidad de marca/dominio en múltiples registradores
20. Reporte comparativo de plataformas de distribución musical (Spotify, DistroKid, etc.)
21. Investigación de festivales/labels reales para enviar tu música
22. Armado de un calendario editorial con investigación de tendencias reales
23. Análisis competitivo de apps similares con capturas de sus flujos reales
24. Investigación de la normativa de moderación de contenido por plataforma
25. Reporte de accesibilidad real (WCAG) auditando tu sitio en vivo
26. Búsqueda de casos de éxito reales de startups similares a la tuya
27. Armado de un directorio de herramientas open source de CAD/BIM
28. Investigación de precios reales de arquitectos/freelance en tu zona
29. Reporte de viabilidad legal para vender una app en distintos países
30. Búsqueda de convocatorias/aceleradoras activas para AI SaaS
31. Deploy y prueba end-to-end de un producto en un dominio real
32. Investigación de APIs de pago disponibles según país y sus fees reales
33. Armado de un benchmark de modelos de IA (precio/latencia) actualizado
34. Reporte de cumplimiento GDPR real para tu stack (Supabase, n8n, etc.)
35. Búsqueda de programas de visado/residencia por perfil técnico
36. Investigación de escuelas/plataformas educativas competidoras de tu proyecto School
37. Armado de un mapa de stakeholders reales del sector CAD open source
38. Reporte de tendencias de moda con fuentes de pasarelas actuales
39. Búsqueda y comparación real de servicios de doblaje/voz IA
40. Auditoría de seguridad real de un sitio en producción (headers, SSL, CVEs)
41. Investigación de traductores/plataformas de idiomas competidoras de LinguaForge
42. Armado de un pitch real enviado por formulario a una aceleradora
43. Reporte de salarios/mercado laboral real para freelance técnico
44. Búsqueda de eventos/meetups tech reales en Barcelona para networking
45. Investigación de licencias musicales (sync, mecánicas) por país
46. Armado de un informe de riesgo reputacional buscando menciones reales de tu marca
47. Verificación real de trademarks antes de lanzar un nombre
48. Reporte comparativo de hosting para apps con IA (costo real por uso)
49. Búsqueda de partners de distribución para una app CAD
50. Investigación de plataformas de crowdfunding y sus tasas reales
51. Armado de un análisis de viabilidad fiscal como autónomo en España
52. Reporte de accesibilidad legal de contenido educativo por normativa
53. Búsqueda real de talento (artistas, developers) en plataformas freelance
54. Investigación de la competencia directa de fashion-stylist-ai con capturas
55. Armado de un dossier de proveedores de impresión 3D/merch reales
56. Reporte de uso real de tu marca en redes (menciones, hashtags)
57. Búsqueda de fondos/grants específicos para IA generativa en España/UE
58. Investigación de normativa de protección de menores para tu plataforma educativa
59. Armado de un plan de expansión a Brasil con datos reales de mercado
60. Reporte de comparación real entre n8n, Zapier y Make para tu caso
61. Búsqueda de casos legales reales sobre IA generativa y derechos de autor
62. Investigación de plataformas de venta de assets/UI kits y sus términos
63. Armado de un informe de accesibilidad de tu librería de componentes
64. Reporte real de costos de infraestructura (Ollama vs OpenRouter vs APIs)
65. Búsqueda de comunidades reales de desarrolladores CAD open source
66. Investigación de aranceles/impuestos para vender software en Latinoamérica
67. Armado de un dossier de referencias reales para un caso legal
68. Reporte de tendencias reales de contratación en moderación de contenido
69. Búsqueda de plataformas educativas con becas para refuerzo escolar
70. Investigación real de competidores de "Judas experience" en música inmersiva
71. Armado de un plan de medios con precios reales de publicidad
72. Reporte de disponibilidad de dominios .es/.com/.ai para tus marcas
73. Búsqueda de casos de uso reales de glassmorphism en productos exitosos
74. Investigación legal sobre uso de imagen/voz clonada por IA
75. Armado de un informe de UX comparando 10 apps reales del sector
76. Reporte de sueldos/tarifas reales de moderadores de contenido en Europa
77. Búsqueda de plataformas de venta de música con mejores regalías reales
78. Investigación de requisitos reales para publicar en App Store/Google Play
79. Armado de un dossier de partners potenciales para BELENTANI CORP
80. Reporte real de uso de Three.js/WebGL en proyectos similares al tuyo
81. Búsqueda de subvenciones catalanas/españolas para startups tech
82. Investigación de la reputación online real de proveedores antes de contratarlos
83. Armado de un plan de contenidos con research real de qué funciona hoy
84. Reporte de comparación de frameworks de agentes IA (LangGraph, CrewAI, etc.)
85. Búsqueda de eventos de música electrónica/urbana para lanzar Judas
86. Investigación real de la ley de extranjería actualizada (como hiciste con Jorge)
87. Armado de un informe de benchmarking de precios de SaaS similares
88. Reporte de disponibilidad de APIs de generación de voz/imagen y sus límites reales
89. Búsqueda de escuelas de arquitectura interesadas en herramientas open source
90. Investigación de normativa de accesibilidad educativa (para tu plataforma School)
91. Armado de un dossier de riesgo antes de firmar un contrato real
92. Reporte real de tráfico/SEO de tus dominios ya publicados
93. Búsqueda de casos de fraude/estafa conocidos en el sector migratorio
94. Investigación de plataformas de e-learning con IA tutora ya existentes
95. Armado de un plan de salida a mercado con datos demográficos reales
96. Reporte de comparación real de plataformas de hosting de video/audio
97. Búsqueda de referencias reales de contratos entre artistas y productores
98. Investigación de la huella digital pública de tu marca (auditoría OSINT básica)
99. Armado de un dossier completo de due diligence antes de una inversión externa
100. Deploy, prueba real y verificación pública de tu "Centro de Mando Belentani" ya funcionando en un dominio propio

## [ASSISTANT] 2026-09-17 06:52 · Qwen3.8-Max

Aquí tienes el **prompt completo por tandas**, listo para copiar y pegar. Está diseñado para ejecutarlo en un agente tipo **Manus**, **sin CLI**, con controles de evidencia, legal, privacidad y bloqueo cuando algo no sea verificable.

**Uso recomendado:**

1. Pega primero el **PROMPT MAESTRO**.
2. Luego pega **TANDA 1/10**.
3. Espera la respuesta.
4. Continúa con **TANDA 2/10**, etc.
5. Si se corta, usa el prompt de recuperación del final.

---

## PROMPT MAESTRO

```text
Actúa como un agente senior de producto, investigación, growth, legal ops, UX, investigación de mercado y deployment web usando Manus.

OBJETIVO GLOBAL
Vas a ejecutar y documentar por tandas dos listas de 100 ítems cada una:

A) 100 herramientas generativas con valor de mercado.
B) 100 cosas para construir/investigar con Manus, sin usar CLI.

El objetivo final es convertir cada ítem en un entregable verificable, priorizado y listo para probar como microproducto, evidencia de mercado, demo pública o dossier estratégico para BELENTANI CORP.

REGLAS DURAS
1. NO usar CLI. Todo debe resolverse mediante navegador, interfaces web, paneles, formularios, herramientas no-code, APIs con interfaz visual, exportaciones, drag & drop o servicios web.
2. Si una tarea requiere técnicamente CLI, debes marcarla como BLOQUEADA y proponer una alternativa web/no-code.
3. No inventes datos. Si un precio, ley, URL, disponibilidad, review, métrica, subvención, deadline o proveedor no puede verificarse, márcalo como "no verificado" e indica la fuente pendiente.
4. Respeta términos de servicio, robots.txt, privacidad, derechos de autor, RGPD/LOPDGDD, consentimiento para voz/imagen, y no envíes formularios reales sin autorización explícita del usuario.
5. No confirmes pagos, reservas, compras, envíos, publicaciones definitivas ni registros legales sin autorización explícita.
6. Si una tarea requiere credenciales, pide que el usuario las introduzca manualmente. No almacenes ni solicites contraseñas sensibles si no es imprescindible y autorizado.
7. Para voz clonada, imagen de personas, lip-sync o avatares humanos: exigir consentimiento explícito, prohibir suplantación y etiquetar el contenido como sintético.
8. Para contratos, extranjería, fiscalidad, privacidad, cookies, compraventa, arrendamiento o due diligence: entregar plantillas/informes informativos, no asesoramiento legal definitivo. Incluir disclaimer y fuentes oficiales.
9. Para salud, dietas, skincare, terapia/coaching, entrenamiento o menores: no dar diagnóstico médico ni consejos clínicos. Incluir disclaimer y limitar el alcance a bienestar/educación.
10. Para seguridad web: solo auditoría pasiva/autorizada de superficie pública. No explotar vulnerabilidades, no atacar, no escanear agresivamente sin permiso explícito.
11. Para scraping/research: solo datos públicos, respetando ToS y privacidad. No extraer datos personales sensibles.
12. Para anuncios/casting/empleo: no generar criterios discriminatorios. Cumplir políticas de plataformas.
13. Para publicidad: no claims falsos, no promesas de resultados garantizados.
14. Para finanzas/inversión/fiscal: contenido educativo, no recomendación financiera profesional.
15. Para menores: privacidad reforzada, sin perfiles comerciales ni datos innecesarios.
16. Cada ítem debe tener un estado:
   - HECHO
   - PARCIAL
   - BLOQUEADO
   - PENDIENTE

FORMATO DE SALIDA PARA CADA HERRAMIENTA GENERATIVA
Para cada ítem de la lista A, entrega una ficha con:

1. ID y título.
2. Problema que resuelve.
3. Cliente objetivo.
4. Output principal generado.
5. Prompt núcleo: input mínimo y output esperado.
6. MVP mínimo en 72 horas, sin CLI.
7. Stack sugerido usando servicios web/APIs con UI.
8. Modelo de monetización.
9. Riesgo legal/ético y mitigación.
10. KPI de validación de mercado.
11. Demo rápida: pasos para generar una prueba visible.
12. Prioridad: Alta/Media/Baja, con justificación.

FORMATO DE SALIDA PARA CADA TAREA MANUS
Para cada ítem de la lista B, entrega una ficha con:

1. ID y título.
2. Objetivo verificable.
3. Pasos realizados en navegador.
4. Fuentes/URLs utilizadas.
5. Evidencia: captura, enlace, PDF, tabla, deploy público, export o checklist.
6. Resultado obtenido.
7. Limitaciones.
8. Próxima acción.

ENTREGA POR TANDA
Al final de cada tanda debes entregar:

1. Tabla resumen con los 20 ítems de la tanda.
2. Fichas completas de cada ítem.
3. Evidencias o capturas cuando sea posible.
4. Lista de bloqueos.
5. Top 3 oportunidades de mercado detectadas.
6. Top 3 riesgos legales/operativos detectados.
7. Pregunta final: "¿Continúo con la siguiente tanda?"

No empieces ninguna tanda hasta que te indique cuál ejecutar.
```

---

## TANDA 1/10

```text
Ejecuta la TANDA 1/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 1-10:
A1. Generador de packshots de producto a partir de una sola foto de móvil.
A2. IA que convierte una descripción en ficha técnica + imágenes para Amazon/Shopify.
A3. Generador de voces clonadas para doblaje de video-podcasts.
A4. Herramienta que genera 30 variantes de anuncio (copy + imagen) desde un brief.
A5. Generador de contratos personalizados por país (freelance, alquiler, NDA).
A6. IA que transforma bocetos arquitectónicos en renders fotorrealistas.
A7. Generador de currículums adaptados a cada oferta con ATS-score.
A8. Creador de cursos completos (guion + slides + voz + quiz) desde un PDF.
A9. Generador de music beds/stems por mood para creadores de contenido.
A10. IA que genera moodboards de moda a partir de fotos del cuerpo del usuario.

TAREAS MANUS 1-10:
B1. Research completo de competencia + informe con precios reales scrapeados.
B2. Landing page desplegada y verificada en vivo, no solo el código.
B3. Auditoría de 50 sitios web de la competencia con capturas y notas.
B4. Armado y envío real de un formulario de registro de empresa online, solo con autorización y datos verídicos.
B5. Búsqueda y comparación de proveedores reales (precios, tiempos, reviews).
B6. Generación de un reporte de mercado con fuentes citadas y actualizadas.
B7. Investigación legal comparada entre países con links a normativa oficial.
B8. Reserva/cotización real de servicios (hosting, dominios, APIs) comparando opciones, sin pagar sin autorización.
B9. Scraping + análisis de sentimiento de reviews reales de un producto, respetando ToS.
B10. Armado de un dossier de inversión con datos de mercado verificados.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: consentimiento en voz clonada, contratos como plantillas informativas, scraping legal y no envío de formularios sin autorización.
```

---

## TANDA 2/10

```text
Ejecuta la TANDA 2/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 11-20:
A11. Generador de landing pages A/B desde un producto en 60 segundos.
A12. Creador de avatares 3D animados para vendedores en vivo.
A13. Generador de guiones de ventas por rubro (inmobiliaria, seguros, SaaS).
A14. IA que resume y traduce contratos legales a lenguaje simple.
A15. Generador de tatuajes personalizados con estilo coherente.
A16. Creador de portadas de álbum/single desde el audio + letra.
A17. Generador de planos de vivienda desde metros cuadrados y necesidades.
A18. Herramienta de clonación de voz para audiolibros multilingües.
A19. Generador de menús de restaurante con fotos IA realistas del plato.
A20. IA que crea storyboards de video desde un guion.

TAREAS MANUS 11-20:
B11. Publicación real de un repo + deploy en Vercel/Netlify de punta a punta, usando interfaz web.
B12. Investigación de becas/subvenciones reales para el perfil y deadlines.
B13. Monitoreo periódico de precios de la competencia con alertas.
B14. Armado de un plan de negocio con cifras de mercado reales, no inventadas.
B15. Búsqueda y verificación de trámites de extranjería actualizados por fuente oficial.
B16. Generación de un informe SEO auditando un sitio real con herramientas online.
B17. Investigación y contacto simulado con potenciales colaboradores/artistas, sin spam ni envío no autorizado.
B18. Armado de una base de datos de contactos públicos de la industria musical.
B19. Verificación de disponibilidad de marca/dominio en múltiples registradores.
B20. Reporte comparativo de plataformas de distribución musical (Spotify, DistroKid, etc.).

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: voz clonada con consentimiento, resúmenes legales sin asesoramiento definitivo y planos de vivienda como concepto no visado.
```

---

## TANDA 3/10

```text
Ejecuta la TANDA 3/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 21-30:
A21. Generador de subtítulos + doblaje automático multilenguaje para YouTube.
A22. Creador de identidades de marca completas (logo + paleta + tono) en un flujo.
A23. Generador de contratos de compraventa de vehículos por país.
A24. IA que arma pitch decks de inversión desde una idea de negocio.
A25. Generador de tarjetas de presentación digitales con NFC.
A26. Creador de wireframes a código funcional (Figma-to-React).
A27. Generador de rutinas de entrenamiento personalizadas con video demo IA.
A28. IA que crea packaging 3D navegable para e-commerce.
A29. Generador de guiones de podcast + edición automática de silencios.
A30. Creador de avatares para videojuegos indie desde texto.

TAREAS MANUS 21-30:
B21. Investigación de festivales/labels reales para enviar música.
B22. Armado de un calendario editorial con investigación de tendencias reales.
B23. Análisis competitivo de apps similares con capturas de sus flujos reales.
B24. Investigación de la normativa de moderación de contenido por plataforma.
B25. Reporte de accesibilidad real (WCAG) auditando un sitio en vivo.
B26. Búsqueda de casos de éxito reales de startups similares.
B27. Armado de un directorio de herramientas open source de CAD/BIM.
B28. Investigación de precios reales de arquitectos/freelance en una zona concreta.
B29. Reporte de viabilidad legal para vender una app en distintos países.
B30. Búsqueda de convocatorias/aceleradoras activas para AI SaaS.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: contratos de vehículos como plantilla, rutinas de entrenamiento sin claims médicos y análisis competitivo sin violar ToS.
```

---

## TANDA 4/10

```text
Ejecuta la TANDA 4/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 31-40:
A31. Generador de anuncios de empleo optimizados por plataforma.
A32. IA que arma dossieres de due diligence para pymes.
A33. Generador de recetas con foto + nutrientes desde ingredientes disponibles.
A34. Creador de invitaciones/flyers de eventos personalizados.
A35. Generador de guías de estilo de marca (brand book) en PDF.
A36. IA que convierte reuniones en actas + tareas asignadas.
A37. Generador de vestuario virtual (probador de ropa con IA).
A38. Creador de tráilers de videojuego desde capturas de gameplay.
A39. Generador de argumentarios de negociación por tipo de cliente.
A40. IA que arma expedientes de extranjería/migración por país, como guía informativa con fuentes oficiales.

TAREAS MANUS 31-40:
B31. Deploy y prueba end-to-end de un producto en un dominio real, vía interfaz web.
B32. Investigación de APIs de pago disponibles según país y sus fees reales.
B33. Armado de un benchmark de modelos de IA (precio/latencia) actualizado.
B34. Reporte de cumplimiento GDPR real para un stack tipo Supabase/n8n.
B35. Búsqueda de programas de visado/residencia por perfil técnico.
B36. Investigación de escuelas/plataformas educativas competidoras de un proyecto School.
B37. Armado de un mapa de stakeholders reales del sector CAD open source.
B38. Reporte de tendencias de moda con fuentes de pasarelas actuales.
B39. Búsqueda y comparación real de servicios de doblaje/voz IA.
B40. Auditoría de seguridad real de un sitio en producción (headers, SSL, CVEs), solo si hay autorización explícita.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: extranjería como información oficial no legal definitiva, due diligence con revisión profesional y auditoría de seguridad autorizada.
```

---

## TANDA 5/10

```text
Ejecuta la TANDA 5/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 41-50:
A41. Generador de bandas sonoras adaptativas para videos cortos.
A42. Creador de mockups de apps móviles desde descripción de features.
A43. Generador de textos legales de privacidad/cookies por jurisdicción.
A44. IA que arma comparativas de productos tipo "Wirecutter" automáticas.
A45. Generador de guiones de atención al cliente.
A46. Creador de escenas 3D para arquitectura interior desde fotos reales.
A47. Generador de planes de estudio personalizados por edad/nivel.
A48. IA que traduce y adapta contenido cultural, no solo idioma.
A49. Generador de infografías de datos desde un CSV.
A50. Creador de personajes consistentes para cómics/webtoons con IA.

TAREAS MANUS 41-50:
B41. Investigación de traductores/plataformas de idiomas competidoras de LinguaForge.
B42. Armado de un pitch real enviado por formulario a una aceleradora, solo con autorización.
B43. Reporte de salarios/mercado laboral real para freelance técnico.
B44. Búsqueda de eventos/meetups tech reales en Barcelona para networking.
B45. Investigación de licencias musicales (sync, mecánicas) por país.
B46. Armado de un informe de riesgo reputacional buscando menciones reales de una marca.
B47. Verificación real de trademarks antes de lanzar un nombre, usando bases oficiales.
B48. Reporte comparativo de hosting para apps con IA (costo real por uso).
B49. Búsqueda de partners de distribución para una app CAD.
B50. Investigación de plataformas de crowdfunding y sus tasas reales.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: textos legales informativos, privacidad/cookies por jurisdicción, licencias musicales y verificación de marcas sin garantía legal absoluta.
```

---

## TANDA 6/10

```text
Ejecuta la TANDA 6/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 51-60:
A51. Generador de guiones de video corporativo institucional.
A52. IA que arma dietas personalizadas con lista de compra generada, sin claims médicos.
A53. Generador de maquetas de packaging para Kickstarter.
A54. Creador de voces de marca (tono consistente) para todo el contenido de una empresa.
A55. Generador de tests de admisión/oposición con banco de preguntas IA.
A56. IA que arma reportes de auditoría de seguridad web, solo para activos autorizados.
A57. Generador de guiones de terapia/coaching estructurados por sesión, sin sustituir terapia clínica.
A58. Creador de skins/temas visuales para apps (glassmorphism).
A59. Generador de biografías profesionales optimizadas para LinkedIn.
A60. IA que arma catálogos de productos artesanales con fotos de estudio.

TAREAS MANUS 51-60:
B51. Armado de un análisis de viabilidad fiscal como autónomo en España, con fuentes oficiales y disclaimer.
B52. Reporte de accesibilidad legal de contenido educativo por normativa.
B53. Búsqueda real de talento (artistas, developers) en plataformas freelance.
B54. Investigación de la competencia directa de fashion-stylist-ai con capturas.
B55. Armado de un dossier de proveedores de impresión 3D/merch reales.
B56. Reporte de uso real de una marca en redes (menciones, hashtags).
B57. Búsqueda de fondos/grants específicos para IA generativa en España/UE.
B58. Investigación de normativa de protección de menores para plataforma educativa.
B59. Armado de un plan de expansión a Brasil con datos reales de mercado.
B60. Reporte de comparación real entre n8n, Zapier y Make para un caso concreto.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: dietas sin consejo médico, coaching sin terapia clínica, fiscalidad informativa y protección de menores.
```

---

## TANDA 7/10

```text
Ejecuta la TANDA 7/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 61-70:
A61. Generador de music videos abstractos sincronizados al BPM.
A62. Creador de guías de montaje de muebles desde fotos de piezas.
A63. Generador de scripts de automatización n8n desde descripción en lenguaje natural, usando interfaz visual.
A64. IA que arma paneles de moderación de contenido para comunidades.
A65. Generador de anuncios de casting/talent con criterios automáticos no discriminatorios.
A66. Creador de tours virtuales 360° desde fotos de inmuebles.
A67. Generador de propuestas comerciales personalizadas por cliente.
A68. IA que convierte notas de voz en documentación técnica estructurada.
A69. Generador de identidades sonoras (jingles) para marcas.
A70. Creador de avatares de doblaje labial sincronizado (lip-sync), con consentimiento.

TAREAS MANUS 61-70:
B61. Búsqueda de casos legales reales sobre IA generativa y derechos de autor.
B62. Investigación de plataformas de venta de assets/UI kits y sus términos.
B63. Armado de un informe de accesibilidad de una librería de componentes.
B64. Reporte real de costos de infraestructura (Ollama vs OpenRouter vs APIs).
B65. Búsqueda de comunidades reales de desarrolladores CAD open source.
B66. Investigación de aranceles/impuestos para vender software en Latinoamérica.
B67. Armado de un dossier de referencias reales para un caso legal, con revisión profesional.
B68. Reporte de tendencias reales de contratación en moderación de contenido.
B69. Búsqueda de plataformas educativas con becas para refuerzo escolar.
B70. Investigación real de competidores de "Judas experience" en música inmersiva.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: moderación de contenido, derechos de autor, impuestos internacionales y lip-sync con consentimiento explícito.
```

---

## TANDA 8/10

```text
Ejecuta la TANDA 8/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 71-80:
A71. Generador de guiones educativos gamificados tipo arcade.
A72. IA que arma reportes de cumplimiento normativo (GDPR, fiscal) por sector, como guía inicial.
A73. Generador de covers de libros/ebooks desde sinopsis.
A74. Creador de flujos de onboarding de apps con microcopy generado.
A75. Generador de guiones de stand-up/comedia por tema.
A76. IA que arma fichas técnicas de vino/gastronomía desde etiqueta.
A77. Generador de plantillas de presentación de resultados trimestrales.
A78. Creador de mundos/lore para juegos de rol con IA.
A79. Generador de guías de viaje personalizadas por presupuesto y gustos.
A80. IA que arma certificados/diplomas personalizados en lote.

TAREAS MANUS 71-80:
B71. Armado de un plan de medios con precios reales de publicidad.
B72. Reporte de disponibilidad de dominios .es/.com/.ai para marcas.
B73. Búsqueda de casos de uso reales de glassmorphism en productos exitosos.
B74. Investigación legal sobre uso de imagen/voz clonada por IA.
B75. Armado de un informe de UX comparando 10 apps reales del sector.
B76. Reporte de sueldos/tarifas reales de moderadores de contenido en Europa.
B77. Búsqueda de plataformas de venta de música con mejores regalías reales.
B78. Investigación de requisitos reales para publicar en App Store/Google Play.
B79. Armado de un dossier de partners potenciales para BELENTANI CORP.
B80. Reporte real de uso de Three.js/WebGL en proyectos similares.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: cumplimiento normativo informativo, voz/imagen clonada, publicación en stores y publicidad con precios verificables.
```

---

## TANDA 9/10

```text
Ejecuta la TANDA 9/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 81-90:
A81. Generador de moodclips (video corto ambiental) para redes.
A82. Creador de firmas de email profesionales con branding.
A83. Generador de guiones de crisis de comunicación/PR.
A84. IA que convierte planos CAD en listas de materiales y presupuesto, extensión directa de belent-cad.
A85. Generador de portadas de podcast con estética consistente.
A86. Creador de quizzes de personalidad para marketing viral, sin perfilado abusivo.
A87. Generador de guiones de unboxing para creadores.
A88. IA que arma dossieres de casting fotográfico (moda, fashion-stylist-ai).
A89. Generador de contratos de colaboración entre artistas/beatmakers, como plantilla informativa.
A90. Creador de plantillas de currículum visual por industria.

TAREAS MANUS 81-90:
B81. Búsqueda de subvenciones catalanas/españolas para startups tech.
B82. Investigación de la reputación online real de proveedores antes de contratarlos.
B83. Armado de un plan de contenidos con research real de qué funciona hoy.
B84. Reporte de comparación de frameworks de agentes IA (LangGraph, CrewAI, etc.).
B85. Búsqueda de eventos de música electrónica/urbana para lanzar Judas.
B86. Investigación de la ley de extranjería actualizada por fuentes oficiales.
B87. Armado de un informe de benchmarking de precios de SaaS similares.
B88. Reporte de disponibilidad de APIs de generación de voz/imagen y sus límites reales.
B89. Búsqueda de escuelas de arquitectura interesadas en herramientas open source.
B90. Investigación de normativa de accesibilidad educativa para plataforma School.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: contratos artísticos como plantilla, extranjería con fuentes oficiales, quizzes sin perfilado abusivo y subvenciones con deadlines verificables.
```

---

## TANDA 10/10

```text
Ejecuta la TANDA 10/10 según el PROMPT MAESTRO.

Procesa los siguientes 20 ítems.

HERRAMIENTAS GENERATIVAS 91-100:
A91. Generador de guías de ensamblaje IKEA-style para productos propios.
A92. IA que arma resúmenes ejecutivos de largos documentos legales.
A93. Generador de nombres de marca + verificación de dominio/redes disponibles.
A94. Creador de mapas conceptuales interactivos desde un texto largo.
A95. Generador de guiones de anuncios de radio.
A96. IA que arma rutinas de skincare/belleza personalizadas, sin claims médicos.
A97. Generador de plantillas de contratos de arrendamiento comercial, con revisión legal recomendada.
A98. Creador de dashboards financieros personales desde extractos bancarios, sin almacenar credenciales.
A99. Generador de guiones de crowdfunding con storytelling estructurado.
A100. IA que unifica todo lo anterior en un marketplace propio de "micro-herramientas generativas".

TAREAS MANUS 91-100:
B91. Armado de un dossier de riesgo antes de firmar un contrato real.
B92. Reporte real de tráfico/SEO de dominios ya publicados.
B93. Búsqueda de casos de fraude/estafa conocidos en el sector migratorio.
B94. Investigación de plataformas de e-learning con IA tutora ya existentes.
B95. Armado de un plan de salida a mercado con datos demográficos reales.
B96. Reporte de comparación real de plataformas de hosting de video/audio.
B97. Búsqueda de referencias reales de contratos entre artistas y productores.
B98. Investigación de la huella digital pública de una marca (auditoría OSINT básica, sin doxxing).
B99. Armado de un dossier completo de due diligence antes de una inversión externa.
B100. Deploy, prueba real y verificación pública del "Centro de Mando Belentani" funcionando en un dominio propio, usando interfaz web y autorización explícita.

Entrega la tanda completa según el formato del PROMPT MAESTRO.
Presta especial atención a: marketplace final, due diligence, OSINT ético, dashboards financieros sin credenciales y deploy público autorizado.
```

---

## PROMPT DE CIERRE / CONSOLIDACIÓN

```text
Con todas las tandas anteriores terminadas, ejecuta el PROMPT DE CONSOLIDACIÓN FINAL.

Objetivo:
Crear el "Centro de Mando Belentani" como panel estratégico y marketplace interno de micro-herramientas generativas.

Entrega:

1. Dashboard maestro con los 200 ítems:
   - ID.
   - Tipo: Herramienta generativa o Tarea Manus.
   - Estado.
   - Evidencia.
   - Riesgo.
   - Prioridad.
   - Próxima acción.

2. Top 20 oportunidades más monetizables:
   - Por qué.
   - Cliente.
   - Precio estimado.
   - Coste estimado.
   - Riesgo principal.
   - MVP en 7 días.

3. Top 20 tareas Manus más estratégicas:
   - Impacto.
   - Evidencia.
   - Bloqueos.
   - Cómo desbloquearlas.

4. Matriz de riesgo legal:
   - Voz/imagen.
   - Contratos.
   - Extranjería.
   - Menores.
   - Salud.
   - Finanzas.
   - Seguridad.
   - Copyright.
   - Publicidad.
   - Datos personales.

5. Roadmap 30/60/90 días:
   - Qué lanzar primero.
   - Qué validar.
   - Qué monetizar.
   - qué automatizar.
   - Qué delegar.

6. Marketplace de micro-herramientas:
   - Categoría.
   - Prompt núcleo.
   - Output.
   - Precio.
   - Nivel de riesgo.
   - Stack sugerido sin CLI.
   - Demo pública posible.

7. Plan de evidencia pública:
   - Capturas.
   - URLs.
   - PDFs.
   - Deployments.
   - Checklists de cumplimiento.

No uses CLI.
No inventes datos.
Marca como no verificado todo lo que no puedas confirmar con fuente real.
```

---

## PROMPT DE RECUPERACIÓN SI SE CORTA

```text
Continúa exactamente donde te quedaste en la tanda actual.

No repitas lo ya generado.
Mantén el formato del PROMPT MAESTRO.
Completa solo la parte pendiente de la tanda.
Si faltaban fichas, evidencias, tabla resumen, top oportunidades, riesgos o pregunta final, genéralas ahora.
```

---

## PROMPT OPCIONAL PARA SALIDA JSON

```text
Para la tanda actual, además del formato Markdown, entrega un JSON con esta estructura:

{
  "tanda": "X/10",
  "items": [
    {
      "id": "A1",
      "tipo": "herramienta_generativa",
      "titulo": "",
      "estado": "HECHO | PARCIAL | BLOQUEADO | PENDIENTE",
      "problema": "",
      "cliente_objetivo": "",
      "output_principal": "",
      "prompt_nucleo": "",
      "mvp_72h": "",
      "stack_sugerido": "",
      "monetizacion": "",
      "riesgo_legal": "",
      "kpi_validacion": "",
      "demo_rapida": "",
      "prioridad": "",
      "evidencia": "",
      "proxima_accion": ""
    },
    {
      "id": "B1",
      "tipo": "tarea_manus",
      "titulo": "",
      "estado": "HECHO | PARCIAL | BLOQUEADO | PENDIENTE",
      "objetivo": "",
      "pasos_navegador": "",
      "fuentes": [],
      "evidencia": "",
      "resultado": "",
      "limitaciones": "",
      "proxima_accion": ""
    }
  ],
  "bloqueos": [],
  "top_oportunidades": [],
  "top_riesgos": []
}

No inventes datos. Si un campo no puede verificarse, usa "no_verificado".
```
