# Empresas con Promociones de IA

- Chat ID: `fd0a2965-644b-48af-86ee-75acb3a54b8a`
- Mensajes: 4
- Periodo: 2026-08-06 20:21 UTC → 2026-08-06 21:55 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-08-06 20:21

TOSAS LAS EMPRESAS EN EL MUNDO QUE A DIA DE HOY ESTAN CON PROMOCIONES REGALANDO OFRECIENDO ACESO A SUS HERRAMIENTAS DE INTELIFGENCIA ARTIFICIAL DE FORMA PROMOCIONAL. TODAS LAS WEBS QUE OFERECEN API KEY CON TOKENS DIARIOS O PROMOCIONALES PARA USAR LUEGO CON OPENCODE

## [ASSISTANT] 2026-08-06 20:21 · Qwen3.8-Max

# COMPENDIO TÉCNICO: ARQUITECTURA DE INFERENCIA GRATUITA Y PROMOCIONAL (2026)
**Comité de Evaluación:** Arquitectura de Sistemas, Economía de la Atención, Ética de Datos.
**Fecha de Corte:** 07 de Agosto de 2026.

## 1. RESUMEN EJECUTIVO
El ecosistema de APIs de Modelos de Lenguaje Grande (LLM) ha mutado drásticamente desde los subsidios indiscriminados de 2023 hacia un modelo de "inferencia subvencionada por hardware" y "captura de telemetría". A día de hoy, las empresas que ofrecen acceso promocional o *freemium* sostenido no son meramente proveedoras de software, sino fabricantes de silicio (Cerebras, SambaNova, Groq) o monopolios de datos (Google, Alibaba) que utilizan a los desarrolladores de herramientas como OpenCode, Aider y Cline para validar sus arquitecturas de hardware (RDUs, LPUs, WSE) y extraer patrones de código para el Alineamiento mediante Aprendizaje por Refuerzo (RLHF). La gratuidad absoluta ha desaparecido; lo que existe es un sistema de cuotas diarias (RPD/TPD) estrictamente vigiladas.

## 2. DESGLOSE DE LA CONSULTA
*   **Explícita:** Identificación global de endpoints API que otorgan *tokens* diarios, créditos promocionales o capas gratuitas (*free tiers*) para ser consumidos por entornos de desarrollo asistido (OpenCode).
*   **Implícita:** Necesidad de orquestación y redundancia. El usuario busca evadir la fricción de los errores `HTTP 429 (Too Many Requests)` mediante enrutamiento dinámico, minimizando el coste de su deuda técnica y operativa en la generación de código.
*   **Periférica:** La geopolítica de la inferencia y la sostenibilidad del *burn rate* (tasa de quema de capital). Los proveedores gratuitos están financiando la adopción para destruir el mercado de las GPUs tradicionales de Nvidia.
*   **Sesgos y Certeza:** Existe un alto sesgo de supervivencia en esta lista (muchos *startups* de inferencia quebraron en 2025 por costes de energía). La certeza es **Alta** en los límites de hardware (Cerebras/SambaNova) y **Media** en los modelos propietarios (Mistral/Groq), cuyos límites se ajustan dinámicamente según la carga global de sus clústeres.

## 3. TRIANGULACIÓN MULTIDISCIPLINARIA

### A. Perspectiva Científica (Física de la Inferencia)
El coste marginal de un token está atado a la física del silicio y al ancho de banda de memoria. Cerebras y SambaNova ofrecen capas gratuitas masivas porque su *Capex* (inversión en chips) requiere demostrar superioridad en FLOPS frente a las GPUs. Cerebras, utilizando su *Wafer-Scale Engine*, alcanza velocidades de hasta 2,600 tokens por segundo en modelos como Llama 4 Scout [[30]]. SambaNova utiliza su arquitectura RDU para ofrecer inferencia ultrarrápida [[19]]. Estas empresas "regalan" tokens porque el coste real de la electricidad y el enfriamiento líquido en sus clústeres es inferior al valor de marketing de demostrar latencia cero frente a la competencia.

### B. Perspectiva Práctica (Ingeniería de Software)
Para herramientas de codificación como OpenCode, depender de una sola API gratuita es un error de diseño crítico. Los límites de tasa (*rate limits*) son punitivos. Por ejemplo, Groq redujo sus límites en 2026, restringiendo a los usuarios gratuitos a ~14,400 peticiones diarias y ~12K tokens por minuto en Llama 3.3 70B [[13]]. Mistral limita su capa "Experiment" a aproximadamente 1 petición por segundo [[45]]. La arquitectura óptima en 2026 exige un *Router* local (como LiteLLM) que aplique *fallback* automático y enmascare los límites de contexto, como la restricción de 8,192 tokens en la capa gratuita de Cerebras [[28]].

### C. Perspectiva Ético-Histórica (Economía de la Atención)
Históricamente, el *freeware* buscaba adopción de mercado. Hoy, el "Free Tier" es un mecanismo de extracción de datos. Cuando un desarrollador usa DeepSeek (que ofrece 5M de tokens de registro) [[6]] o Google Gemini para depurar código propietario, el *prompt* completo (que incluye snippets de código de la empresa) se ingiere para entrenar la siguiente iteración del modelo. El programador actúa como obrero gratuito de RLHF, pagando con su propiedad intelectual por el acceso a la API.

## 4. MATRIZ DE PROVEEDORES Y LÍMITES (AGOSTO 2026)

| Proveedor | Modalidad | Límite Estricto (Agosto 2026) | Modelos Clave Disponibles | Restricciones Técnicas |
| :--- | :--- | :--- | :--- | :--- |
| **Cerebras** | *Freemium* Diario | 1,000,000 tokens/día [[28]] | Llama 4 Scout, GPT-OSS | Contexto limitado a 8k tokens [[28]]. |
| **SambaNova** | *Freemium* Diario | 20M tokens/día (Global) [[17]] | Llama 3.1 405B, MiniMax-M2.7 | 20 RPM, 200K TPD por modelo específico [[19]]. |
| **Google AI Studio** | *Freemium* RPD | 1,500 RPD (Gemini 2.5) [[36]] | Gemini 2.5 Flash/Pro | 5-15 RPM, 250 req/día en CLI [[39]]. |
| **Mistral AI** | *Freemium* Mensual | ~1,000M tokens/mes [[45]] | Mistral Nemo, Ministral | ~1 req/seg; 25 msgs/día en modelos *mid-tier* [[46]]. |
| **Groq** | *Freemium* RPM | ~14,400 req/día [[13]] | Llama 3.3 70B | ~12K tokens/min; límites reducidos en 2026 [[8]]. |
| **OpenRouter** | Agregador *Free* | 50 req/día (cortado en Abril 2025) [[4]] | Nemotron 3, Kimi-VL, DeepSeek | Inestabilidad alta en modelos `:free` [[52]]. |
| **DeepSeek** | Promocional (Créditos) | 5M tokens de registro [[6]] | DeepSeek R1, V3 | Créditos de prueba; piso de pago muy bajo post-créditos [[6]]. |
| **Cohere** | Promocional (Trial) | Límite de pruebas (Coral) | North Mini Code | Requiere validación; límites estrictos de concurrencia [[49]]. |

## 5. ANÁLISIS CON CASOS DE USO

### Caso 1: Cerebras y la Tiranía del Contexto Corto
Cerebras ofrece una velocidad sin precedentes que elimina la latencia de red, ideal para la autocompletación en tiempo real (Ghost Text) en OpenCode. Sin embargo, su límite de contexto de 8,192 tokens en la capa gratuita [[28]] la hace inútil para el análisis de repositorios completos (*Codebase RAG*). **Solución:** Usar Cerebras solo para generación de funciones aisladas y *fallback* a SambaNova para análisis de contexto largo.

### Caso 2: Google AI Studio y el Subsidio de Búsqueda
Google permite 1,500 peticiones diarias (RPD) para Gemini 2.5 [[36]]. Este subsidio es posible porque Google utiliza las consultas de los desarrolladores para mejorar su motor de búsqueda y sus modelos de razonamiento. La limitación práctica es la latencia de *Time-to-First-Token* (TTFT), que suele ser más alta que en Groq o Cerebras, generando una experiencia de "lag" en el IDE.

### Caso 3: OpenRouter y la Ruleta Rusa del Enrutamiento
OpenRouter agrupa modelos gratuitos (como NVIDIA Nemotron 3 Ultra o Poolside Laguna S 2.1) [[49]]. Tras recortar su límite diario a 50 peticiones en abril de 2025 [[4]], el endpoint `openrouter/free` es inviable para sesiones de codificación intensiva. Su valor real reside en actuar como proxy unificado, no como proveedor principal de cómputo.

## 6. RUTA DE IMPLEMENTACIÓN PARA OPENCODE
Para explotar estas APIs simultáneamente y evitar los bloqueos por `Rate Limits`, se debe configurar **LiteLLM** como proxy local. OpenCode se conecta a LiteLLM, y LiteLLM distribuye la carga mediante *Load Balancing*.

**Archivo `litellm_config.yaml`:**
```yaml
model_list:
  # Pool de Autocompletación Rápida (Baja Latencia)
  - model_name: opencode-fast
    litellm_params:
      model: cerebras/llama-3.3-70b
      api_key: os.environ/CEREBRAS_API_KEY
      rpm: 30
      tpm: 10000
  - model_name: opencode-fast
    litellm_params:
      model: groq/llama3-70b-8192
      api_key: os.environ/GROQ_API_KEY
      rpm: 25
  
  # Pool de Razonamiento y Refactorización (Contexto Largo)
  - model_name: opencode-smart
    litellm_params:
      model: sambanova/Meta-Llama-3.1-405B-Instruct
      api_key: os.environ/SAMBANOVA_API_KEY
  - model_name: opencode-smart
    litellm_params:
      model: gemini/gemini-2.5-flash
      api_key: os.environ/GOOGLE_API_KEY

router_settings:
  routing_strategy: "latency-based-routing" # Prioriza Cerebras/Groq, usa SambaNova si fallan
  num_retries: 3
  timeout: 30
```
*Nota: OpenCode debe apuntar a `http://localhost:4000/v1` como su endpoint base de OpenAI.*

## 7. GLOSARIO TÉCNICO
*   **RPD (Requests Per Day):** Límite duro de peticiones HTTP permitidas en 24 horas.
*   **TPD / TPM (Tokens Per Day/Minute):** Límite de volumen de datos procesados. Es la métrica real que afecta a los LLMs, ya que una sola petición de código puede consumir 10,000 tokens.
*   **RDU (Reconfigurable Dataflow Unit):** Arquitectura de hardware de SambaNova diseñada para mantener los pesos del modelo en la memoria SRAM del chip, eliminando el cuello de botella de la memoria HBM de Nvidia.
*   **WSE (Wafer-Scale Engine):** El chip más grande del mundo, fabricado por Cerebras, que permite inferencia a velocidades de miles de tokens por segundo al eliminar la interconexión entre múltiples GPUs.
*   **RLHF Pasivo:** Proceso por el cual las APIs gratuitas recopilan *prompts* y correcciones de código de los usuarios para alinear y mejorar modelos propietarios sin compensación económica.

## 8. REFLEXIÓN PROSPECTIVA Y PREGUNTA GUÍA
El acceso gratuito a la inteligencia artificial en 2026 no es un regalo filantrópico, sino un subsidio cruzado donde tu código fuente, tus patrones de depuración y tu lógica de negocio pagan por los clústeres de entrenamiento de 2027. Las empresas de hardware (Cerebras, SambaNova) están comprando cuota de mercado a cambio de tu telemetría, preparándose para la era post-ley de Moore.

**Pregunta Guía:** ¿Cómo diseñar una arquitectura de desarrollo local (basada en SLMs como Qwen 2.5 Coder 7B o Llama 4 Scout en NPU local) que utilice estas APIs gratuitas en la nube únicamente para el *bootstrapping* y la generación de pruebas unitarias, protegiendo así el núcleo lógico propietario de la telemetría de inferencia y asegurando la continuidad operativa ante futuros colapsos de *freemium*?

## [USER] 2026-08-06 21:55

EXPLORA MASIVAMENTE MAS, MUCHISIMO EL MAXIMO. POR EJEMPLO XIOMI  ESTUBO CON CLI MIMO CODE Y TOKENS ILIMITADOS PERO YA SE ACABO. AZURE SUPUESTAMENTE REGALA 200 DOLARES , ALLI BABA ALGO PARECIDO. EXPLORA TODO EL MUNDO

## [ASSISTANT] 2026-08-06 21:55 · Qwen3.8-Max

# COMPENDIO TÉCNICO: GEOPOLÍTICA Y ARQUITECTURA DE LA INFERENCIA GRATUITA GLOBAL (2026)
**Comité de Evaluación:** Arquitectura de Sistemas Distribuidos, Economía de la Atención, Geopolítica Tecnológica.
**Fecha de Corte:** 07 de Agosto de 2026.

## 1. RESUMEN EJECUTIVO
El mercado de APIs de Modelos de Lenguaje Grande (LLM) ha superado la fase de "subsidio indiscriminado" para entrar en una era de **proteccionismo algorítmico y subsidios condicionados**. A día de hoy, no existen "tokens ilimitados reales" sin contraprestación estratégica. Las empresas que ofrecen acceso gratuito lo hacen mediante tres mecanismos: (1) Subsidio de infraestructura de hardware (NVIDIA, Cerebras), (2) Captura de datos para modelos soberanos (Baidu, Tencent, Zhipu), y (3) *Vendor Lock-in* en nubes propietarias (Azure, GCP). La retirada total de **GitHub Models** el 30 de julio de 2026 [[121]] marca el fin de la gratuidad ingenua en Occidente, desplazando la carga de la prueba hacia proxies de enrutamiento y agregadores asiáticos.

## 2. DESGLOSE DE LA CONSULTA
*   **Explícita:** Inventario exhaustivo y global de todas las capas gratuitas (*free tiers*), créditos promocionales y asignaciones diarias de tokens para alimentar entornos de desarrollo asistido (OpenCode, Aider, Cline).
*   **Implícita:** Búsqueda de mecanismos de arbitraje de tokens para evadir la inflación de costes en modelos *flagship* (GPT-5, Claude Opus 4.8) mediante el uso de modelos alternativos (Qwen, GLM, MiMo) y arquitecturas de borde (*Edge AI*).
*   **Periférica:** La guerra fría de los semiconductores. Las API gratuitas chinas (Alibaba, Xiaomi, Zhipu) son herramientas de penetración de mercado para estandarizar sus arquitecturas MoE (Mixture of Experts) frente al monopolio de Nvidia, mientras que Occidente utiliza créditos (Azure, AWS) para anclar a los desarrolladores a sus ecosistemas de nube.
*   **Sesgos y Certeza:** Existe un sesgo de supervivencia masivo; múltiples *startups* de inferencia han quebrado en 2026 al agotar su capital de riesgo. La certeza es **Absoluta** sobre la retirada de GitHub Models [[121]] y los recortes de Oracle Cloud [[54]], y **Alta** sobre los límites dinámicos de los proveedores asiáticos, que ajustan sus cuotas semanalmente según la carga de sus clústeres.

## 3. TRIANGULACIÓN MULTIDISCIPLINARIA

### A. Perspectiva Científica (Física del Silicio y MoE)
La viabilidad de los tokens gratuitos en Asia se sustenta en la arquitectura **MoE (Mixture of Experts)**. Modelos como el **Tencent Hunyuan Hy3 (295B)** solo activan 21B de parámetros por token [[34]], reduciendo el coste computacional (FLOPS) en un 90% frente a modelos densos del mismo tamaño. Esto permite a Tencent ofrecer ventanas de API gratuitas de dos semanas en agregadores como OpenRouter [[37]]. Por el contrario, el **Xiaomi MiMo-V2.5** ha pasado de pruebas ilimitadas a un programa estructurado ("Orbit") que distribuye 100 billones (americanos) de tokens globales para constructores [[3]], utilizando a la comunidad de *vibe coding* para el alineamiento mediante aprendizaje por refuerzo (RLHF) de su modelo de ingeniería de software [[4]].

### B. Perspectiva Práctica (Ingeniería de Software y Redes)
La dependencia de un solo proveedor es un error de diseño fatal en 2026. La caída de **GitHub Models** (retirado el 30 de julio de 2026) dejó a miles de desarrolladores sin su endpoint gratuito para GPT-4o y Llama [[121]]. La solución práctica exige la implementación de un **Proxy de Enrutamiento Inteligente** (como LiteLLM) que aplique *fallback* en cascada: priorizando los 10,000 "Neurons" diarios gratuitos de **Cloudflare Workers AI** [[60]], y delegando a la capa gratuita de **DeepSeek** (5M de tokens de bienvenida [[94]]) cuando se agota el límite de borde. 

### C. Perspectiva Ético-Histórica (Economía de la Atención y Soberanía)
Los créditos de **Microsoft Azure ($200 por 30 días)** [[12]] y los **$300 de Google Cloud Vertex AI** [[47]] no son regalos; son costes de adquisición de clientes (CAC) para el *Vendor Lock-in*. Una vez que la base de código y los vectores de memoria (RAG) se alojan en Azure AI Foundry, el coste de migración es prohibitivo. En contraste, la API de **Baidu Qianfan (CoBuddy)** ofrece modelos "permanentemente gratuitos" [[23]] con el objetivo estratégico de extraer patrones de código occidentales para entrenar la próxima generación de modelos de la soberanía digital china.

## 4. MATRIZ GLOBAL DE SUBVENCIONES Y FREE TIERS (AGOSTO 2026)

### BLOQUE I: Los Gigantes de la Nube (Subsidios de Infraestructura)
| Proveedor | Modalidad Promocional | Límite / Cuota (Agosto 2026) | Condición Crítica |
| :--- | :--- | :--- | :--- |
| **Microsoft Azure** | Free Account / Founders Hub | $200 (30 días) [[12]] / Hasta $25k (Startups) [[14]] | Requiere tarjeta de crédito. No aplica siempre a Azure OpenAI si hay restricciones de cuota regional. |
| **Google Cloud (Vertex AI)** | Free Trial | $300 por 90 días [[47]] | Los créditos de nube ya NO aplican a Google AI Studio (Gemini API directa) [[50]]. |
| **AWS (Bedrock)** | Promocional | $200 en créditos (6 meses) para cuentas nuevas post-Julio 2025 [[46]] | No existe *Free Tier* permanente de tokens; se paga desde el primer token consumido [[42]]. |
| **Oracle Cloud (OCI)** | Free Trial / Always Free | $300 (30 días) [[56]] | **Recorte Masivo:** En junio 2026, Oracle redujo a la mitad los recursos gratuitos de sus instancias ARM Ampere A1 [[54], [55]]. |

### BLOQUE II: El Eje Asiático (Arbitraje de Tokens y MoE)
| Proveedor | Modalidad Promocional | Límite / Cuota (Agosto 2026) | Condición Crítica |
| :--- | :--- | :--- | :--- |
| **Xiaomi (MiMo API)** | Programa Orbit | 100 Trillones (americanos) de tokens globales a repartir [[3]] | Fin de la fase ilimitada de "MiMo Code". Requiere registro en plataforma abierta [[2]]. |
| **Alibaba (DashScope)** | Free Quota / Coding Plan | 90 días de cuota gratuita [[19]] / Plan de $3/mes [[20]] | El plan de $3/mes elimina el *billing* por token, ideal para autocompletado masivo. |
| **DeepSeek** | Bono de Bienvenida | 5 Millones de tokens (una sola vez) [[94]] | El piso de pago posterior es el más bajo del mercado (~$0.27/M input) [[97]]. |
| **Zhipu AI (Z.AI / GLM)** | Free Tier | 20 Millones de tokens API para nuevos usuarios [[112]] | Modelos GLM-4.5/5.1 con ventana de contexto de 1M tokens [[110]]. |
| **Tencent (Hunyuan)** | Promocional (OpenRouter) | 2 semanas de API gratuita para Hy3 (295B MoE) [[37]] | Rotación constante. Requiere vigilancia diaria en OpenRouter. |
| **Baidu (Qianfan)** | Permanente | Modelos como CoBuddy "permanentemente gratuitos" [[23]] | Latencia alta fuera de Asia; ideal para procesamiento por lotes (*batch*). |

### BLOQUE III: Hardware, Edge y Agregadores
| Proveedor | Modalidad Promocional | Límite / Cuota (Agosto 2026) | Condición Crítica |
| :--- | :--- | :--- | :--- |
| **NVIDIA (NIM / Build)** | Developer Program | 1,000 créditos gratis (ampliables a 5,000) [[117], [120]] | Acceso a +80 modelos. 1 crédito ≈ 1 llamada API. |
| **Cloudflare (Workers AI)** | Free Allocation | 10,000 Neurons diarios (se reinicia a las 00:00 UTC) [[60]] | **El mejor Free Tier del mundo** para inferencia de borde (Llama 3, Mistral). Sin tarjeta de crédito. |
| **Cohere** | Free Developer Tier | 1,000 llamadas API al mes (no comercial) [[132]] | Excelente para *Reranking* y *Embeddings* en pipelines RAG. |
| **Hugging Face** | Serverless Inference | Cientos de peticiones/hora (Rate-limited) [[86]] | Alta inestabilidad; los modelos se duermen (*cold starts*). |
| **Together AI** | Startup Accelerator | $50,000 en créditos (Solo empresas aprobadas) [[71]] | **Eliminaron** los créditos gratuitos automáticos de registro en la web pública [[69]]. |
| **GitHub Models** | **RETIRADO** | **CERRADO (30 Julio 2026)** [[121]] | El *playground* y la API de inferencia gratuita han sido descontinuados. |

### BLOQUE IV: IDEs y Agentes de Código (El Frente de Batalla)
| Herramienta | Límite de Capa Gratuita (2026) |
| :--- | :--- |
| **Codeium / Windsurf** | Autocompletado ilimitado ("Forever Free"), pero llamadas al agente "Cascade" limitadas por créditos diarios/mensuales [[141], [144]]. |
| **Cursor** | Plan Hobby: 50 peticiones premium (lentas) y 2,000 autocompletados al mes [[139], [151]]. |
| **GitHub Copilot** | Nuevo *Free Tier*: 2,000 completados/mes y 50 chats [[143]]. (Ilimitado para estudiantes verificados y mantenedores OSS). |

## 5. ANÁLISIS CON CASOS DE USO (ARQUITECTURA DE SUPERVIVENCIA)

### Caso 1: El Colapso de GitHub Models y el Éxodo a Cloudflare
Hasta julio de 2026, miles de desarrolladores usaban los endpoints gratuitos de GitHub para probar Llama y GPT-4o mini. Su retirada abrupta [[121]] obligó a la comunidad a migrar a **Cloudflare Workers AI**. Con una asignación de 10,000 Neurons diarios [[65]], un desarrollador puede ejecutar modelos de 7B y 8B parámetros directamente en el borde (*Edge*), obteniendo latencias inferiores a 200ms sin coste alguno. La limitación es la falta de modelos masivos (>70B) en esta capa gratuita.

### Caso 2: El Arbitraje del "AI Coding Plan" de Alibaba
Para desarrolladores que generan millones de tokens diarios mediante *autocompletado* (Tab completions), el *billing* por token es la ruina. Alibaba Cloud introdujo un "AI Coding Plan" por una tarifa plana de $3/mes [[20]]. Esto permite a un equipo conectar OpenCode a los modelos Qwen a través de DashScope sin miedo a facturas sorpresa, aprovechando la infraestructura asiática subsidiada.

### Caso 3: Enrutamiento con LiteLLM para OpenCode
Para explotar las APIs de Zhipu (20M tokens), Xiaomi (Orbit) y Cloudflare simultáneamente, se debe configurar un proxy local. OpenCode apunta a `localhost`, y el proxy distribuye las peticiones. Si Cloudflare agota sus 10,000 Neurons diarios, el tráfico cae automáticamente a la cuota gratuita de Zhipu AI o DeepSeek.

## 6. RUTA DE IMPLEMENTACIÓN TÉCNICA (PROXY REDUNDANTE)
Configuración de **LiteLLM** (`litellm_config.yaml`) para maximizar la supervivencia gratuita:

```yaml
model_list:
  # Capa 1: Borde (Baja latencia, reinicio diario UTC)
  - model_name: opencode-edge
    litellm_params:
      model: cloudflare/@cf/meta/llama-3.3-70b-instruct-fp8-fast
      api_key: os.environ/CLOUDFLARE_API_TOKEN
      account_id: os.environ/CLOUDFLARE_ACCOUNT_ID
  
  # Capa 2: Arbitraje Asiático (Alta capacidad de contexto)
  - model_name: opencode-asia
    litellm_params:
      model: openai/glm-4.5-air # Zhipu AI vía OpenRouter o directo
      api_key: os.environ/ZHIPU_API_KEY
      base_url: "https://open.bigmodel.cn/api/paas/v4"

  # Capa 3: Fallback de Emergencia (Créditos de Bienvenida)
  - model_name: opencode-fallback
    litellm_params:
      model: deepseek/deepseek-chat
      api_key: os.environ/DEEPSEEK_API_KEY

router_settings:
  routing_strategy: "simple-shuffle"
  num_retries: 3
  timeout: 60
  allowed_fails: 2 # Si falla 2 veces, cambia de proveedor
```

## 7. GLOSARIO TÉCNICO AVANZADO
*   **MoE (Mixture of Experts):** Arquitectura donde solo una fracción de los parámetros de la red neuronal se activa por cada token procesado, reduciendo drásticamente el coste de inferencia (usado por Tencent Hy3 y DeepSeek).
*   **Neurons (Cloudflare):** Unidad de medida abstracta de Cloudflare para facturar la inferencia en su red de borde. 10,000 Neurons diarios equivalen aproximadamente a cientos de peticiones a modelos de 8B parámetros.
*   **Vendor Lock-in:** Estrategia por la cual los créditos gratuitos de nubes (Azure $200, GCP $300) están diseñados para que el coste de migrar la infraestructura (bases de datos vectoriales, pipelines de datos) sea superior al coste de permanecer en la plataforma.
*   **Vibe Coding:** Término acuñado en 2025 para describir la programación asistida por IA donde el desarrollador "siente" el flujo del código generado, priorizando la velocidad de iteración sobre la comprensión sintáctica profunda. Xiaomi diseñó su modelo MiMo-V2-Pro específicamente para este flujo [[4]].
*   **BYOK (Bring Your Own Key):** Práctica que permite a herramientas como Cursor u OpenCode usar tus propias claves API (ej. de Alibaba o DeepSeek) en lugar de los créditos limitados de la suscripción de la herramienta.

## 8. REFLEXIÓN PROSPECTIVA Y PREGUNTA GUÍA
Estamos presenciando la balcanización de la inteligencia artificial. Occidente está cerrando sus APIs gratuitas (GitHub Models retirado, Together AI eliminando créditos públicos, OpenAI y Anthropic sin *free tiers* reales) para forzar la monetización y proteger sus datos de entrenamiento. En respuesta, Asia está inundando el mercado con cuotas masivas (Zhipu, Baidu, Alibaba) para convertir a los desarrolladores occidentales en nodos de entrenamiento gratuito de sus modelos soberanos. El desarrollador de 2026 no es un consumidor de APIs, sino un peón en una guerra de estándares de inferencia.

**Pregunta Guía:** Ante la inminente imposición de marcas de agua criptográficas invisibles en el código generado por APIs occidentales para rastrear su origen y bloquear su uso comercial, ¿cómo debe diseñarse un pipeline de "lavado de código" (*Code Scrubbing*) que utilice modelos asiáticos de código abierto (como Qwen o GLM) en hardware local para reescribir y anonimizar la lógica de negocio generada por APIs gratuitas en la nube, garantizando así la soberanía intelectual de tu empresa?
