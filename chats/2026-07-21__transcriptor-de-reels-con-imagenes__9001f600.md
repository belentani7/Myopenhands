# Transcriptor de Reels con Imágenes

- Chat ID: `9001f600-9e24-432a-b596-2a5484df98a1`
- Mensajes: 2
- Periodo: 2026-07-21 21:06 UTC → 2026-07-21 21:06 UTC
- Exportado por `09_chats_export.py` (consolidación belentani7)

## [USER] 2026-07-21 21:06

Necesito crear una herramienta que haga transcript de links de reels y tambien si posible pueda leer imagenes de ellos minimo coste. Instruccciones enteras

## [ASSISTANT] 2026-07-21 21:06 · Qwen3.7-Plus

Crear una herramienta de este tipo con **coste cero (o mínimo)** es totalmente posible utilizando herramientas de código abierto (Open Source). La estrategia será usar tu propio ordenador (o Google Colab gratis) para procesar los datos sin pagar APIs de pago.

Aquí tienes las **instrucciones enteras y paso a paso** para construir esta herramienta en Python.

---

### 🧠 Arquitectura de la Herramienta (Coste: 0€)
1. **Descarga del Reel:** `yt-dlp` (El mejor descargador de vídeo gratuito).
2. **Transcripción de Audio (Speech-to-Text):** `faster-whisper` (Versión optimizada del modelo IA de OpenAI, se ejecuta en local).
3. **Extracción de Imágenes:** `OpenCV` (Para sacar fotogramas clave del vídeo).
4. **Lectura de Texto en Imágenes (OCR):** `Tesseract` (Motor de OCR gratuito y open-source).

---

### PASO 1: Instalación de Dependencias del Sistema
Antes de tocar Python, necesitas instalar dos programas en tu ordenador (Windows/Mac/Linux):

1. **FFmpeg:** Necesario para que `yt-dlp` y `Whisper` procesen audio/vídeo.
   * *Windows:* Descarga los binarios, descomprímelos y añade la carpeta `bin` a las Variables de Entorno (PATH) de Windows.
   * *Mac:* `brew install ffmpeg`
   * *Linux:* `sudo apt install ffmpeg`
2. **Tesseract OCR:** Necesario para leer el texto de las imágenes.
   * *Windows:* Descarga el instalador desde [UB-Mannheim Tesseract](https://github.com/UB-Mannheim/tesseract/wiki). **Importante:** Recuerda la ruta de instalación (ej. `C:\Program Files\Tesseract-OCR`).
   * *Mac:* `brew install tesseract`
   * *Linux:* `sudo apt install tesseract-ocr`

---

### PASO 2: Configuración del Entorno Python
Abre tu terminal o consola y crea un entorno virtual (recomendado) e instala las librerías:

```bash
# Crear entorno virtual
python -m venv reel_tool_env
# Activarlo (Windows)
reel_tool_env\Scripts\activate
# Activarlo (Mac/Linux)
source reel_tool_env/bin/activate

# Instalar librerías
pip install yt-dlp faster-whisper opencv-python pytesseract Pillow
```

---

### PASO 3: El Código de la Herramienta (Python)
Crea un archivo llamado `reel_analyzer.py` y pega el siguiente código. He añadido comentarios para que entiendas cada parte.

```python
import os
import subprocess
import cv2
import pytesseract
from faster_whisper import WhisperModel
from PIL import Image
import time

# ⚠️ CONFIGURACIÓN IMPORTANTE
# Si usas Windows, pon la ruta exacta de Tesseract. Si usas Mac/Linux, déjalo como 'tesseract'
TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe" 
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def descargar_reel(url, output_path="reel_descargado.mp4"):
    """Descarga el vídeo usando yt-dlp"""
    print(f"📥 Descargando Reel desde: {url}")
    # Usamos subprocess para llamar a yt-dlp (es más estable que la API de Python)
    command = [
        "yt-dlp", 
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "-o", output_path, 
        url
    ]
    try:
        subprocess.run(command, check=True)
        print("✅ Descarga completada.")
        return output_path
    except subprocess.CalledProcessError as e:
        print("❌ Error al descargar. Instagram puede estar bloqueando la petición.")
        print("💡 Solución: Exporta tus cookies de tu navegador y usa el flag --cookies cookies.txt en yt-dlp")
        return None

def transcribir_audio(video_path):
    """Transcribe el audio usando Faster-Whisper (Modelo 'base' para equilibrio velocidad/precisión)"""
    print("🎙️ Transcribiendo audio (esto puede tardar unos segundos/minutos)...")
    # Usamos 'base' o 'small'. 'tiny' es rápido pero impreciso. 'medium' es lento.
    model = WhisperModel("base", device="cpu", compute_type="int8") 
    segments, info = model.transcribe(video_path, language="es") # Cambia a "es" para español
    
    transcripcion = ""
    for segment in segments:
        transcripcion += segment.text + " "
    
    print("✅ Transcripción de audio finalizada.")
    return transcripcion.strip()

def extraer_y_leer_imagenes(video_path, intervalo_segundos=3):
    """Extrae fotogramas cada X segundos y les aplica OCR"""
    print("🖼️ Extrayendo imágenes y leyendo texto (OCR)...")
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Calculamos cuántos frames saltar para cumplir el intervalo
    frames_a_saltar = int(fps * intervalo_segundos)
    
    textos_encontrados = set() # Usamos set para evitar textos duplicados
    frame_count = 0
    texto_final = ""

    while True:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count)
        ret, frame = cap.read()
        if not ret:
            break

        # Preprocesamiento para mejorar el OCR (Escala de grises y umbral)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Aplicar desenfoque y umbralizado para que Tesseract lea mejor el texto sobre vídeo
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Ejecutar OCR
        texto_imagen = pytesseract.image_to_string(thresh, lang='spa') # 'spa' para español
        
        # Limpiar texto y guardarlo si es relevante (más de 3 caracteres)
        texto_limpio = texto_imagen.strip()
        if len(texto_limpio) > 3 and texto_limpio not in textos_encontrados:
            textos_encontrados.add(texto_limpio)
            texto_final += texto_limpio + "\n"

        frame_count += frames_a_saltar

    cap.release()
    print("✅ Extracción de texto en imágenes finalizada.")
    return texto_final

def main():
    url = input("Introduce el link del Instagram Reel: ").strip()
    if not url:
        print("URL no válida.")
        return

    video_file = "temp_reel.mp4"
    
    # 1. Descargar
    if not descargar_reel(url, video_file):
        return

    # 2. Transcribir Audio
    texto_audio = transcribir_audio(video_file)

    # 3. Leer Imágenes (OCR)
    texto_imagenes = extraer_y_leer_imagenes(video_file, intervalo_segundos=2)

    # 4. Mostrar Resultados
    print("\n" + "="*50)
    print("📝 TRANSCRIPCIÓN DE AUDIO:")
    print("="*50)
    print(texto_audio if texto_audio else "(No se detectó audio o habla)")
    
    print("\n" + "="*50)
    print("🖼️ TEXTO LEÍDO EN IMÁGENES / PANTALLA:")
    print("="*50)
    print(texto_imagenes if texto_imagenes else "(No se detectó texto en pantalla)")
    print("="*50)

    # Limpieza final
    if os.path.exists(video_file):
        os.remove(video_file)

if __name__ == "__main__":
    main()
```

---

### PASO 4: Ejecutar la Herramienta
Simplemente corre el script en tu terminal:
```bash
python reel_analyzer.py
```
Pega el link del Reel y la herramienta hará todo el trabajo.

---

### ⚠️ El "Gran Problema" de Instagram y su Solución
Instagram tiene una protección anti-bots muy agresiva. Si usas `yt-dlp` muchas veces, te bloqueará la descarga (Error 403 o 401).

**La Solución (Coste 0€):**
Debes decirle a `yt-dlp` que use las "cookies" de tu navegador (como si fueras tú navegando normalmente).
1. En el código de Python, modifica la función `descargar_reel` añadiendo el parámetro de cookies de tu navegador. Si usas Chrome, cambia la línea del `command` así:

```python
    command = [
        "yt-dlp", 
        "--cookies-from-browser", "chrome", # <--- AÑADE ESTA LÍNEA
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "-o", output_path, 
        url
    ]
```
*(Asegúrate de tener la sesión de Instagram iniciada en tu navegador Chrome).*

---

### 💡 Alternativa: ¿Tu ordenador es lento? (Opción 100% Gratis en la Nube)
Ejecutar Whisper y Tesseract en local requiere un ordenador decente (mínimo 8GB RAM). Si tu PC es lento, puedes usar **Google Colab (Gratis)**.

1. Entra en [Google Colab](https://colab.research.google.com/).
2. Crea un "Nuevo Notebook".
3. En la primera celda, instala todo con:
   ```bash
   !apt-get install -y ffmpeg tesseract-ocr tesseract-ocr-spa
   !pip install yt-dlp faster-whisper opencv-python pytesseract Pillow
   ```
4. En la siguiente celda, pega el código Python de arriba (cambiando la ruta de Tesseract a solo `tesseract` porque en Linux/Colab ya está en el PATH).
5. Ejecútalo. Usarás los servidores de Google gratis.

---

### 🚀 Mejora "Pro" (Coste casi cero, pero infinitamente mejor)
Tesseract (OCR local) es bueno, pero **falla mucho** leyendo texto sobre fondos de vídeo complejos o con fuentes modernas de Instagram. 

Si quieres precisión del 99% leyendo imágenes, te recomiendo cambiar la parte del OCR por una API de **Visión por IA**.
* **Opción A (Gratis/Barata):** Usa la API de **Groq** con el modelo `llama-3.2-11b-vision-preview`. Groq tiene un tier gratuito muy generoso y es rapidísimo. Le pasas el fotograma y le pides: *"Extrae todo el texto escrito en esta imagen"*.
* **Opción B (Pago por uso ridículo):** **Google Cloud Vision API** o **AWS Textract**. Te dan 1000 lecturas gratis al mes. Después cuesta menos de 0.01€ por cada 1000 imágenes.

*Si quieres que te adapte el código para usar la API gratuita de Groq para la lectura de imágenes en lugar de Tesseract, dímelo y te paso el fragmento actualizado.*
