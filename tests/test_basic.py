"""Tests básicos de las utilidades Python de Manos Abiertas (scripts/).

Verifican funciones puras reales contra datos reales del repositorio:
- content_generator.generar_modulo_ia / generar_modulo_ofimatica
- data_validator.validar_archivo_ts
- i18n_auditor.extraer_idiomas_implementados / extraer_claves_traduccion
- i18n_auditor.verificar_unicidad_voces
"""

import sys
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

import content_generator  # noqa: E402
import data_validator  # noqa: E402
import i18n_auditor  # noqa: E402

I18N_FILE = PROJECT_ROOT / "src" / "data" / "i18n.ts"


def test_generar_modulo_ia_cubre_los_14_niveles():
    """La lección generada para cada nivel tiene id, duración y estructura correctas."""
    for nivel in range(1, 15):
        leccion = content_generator.generar_modulo_ia(nivel)
        assert leccion["id"] == f"ia-{nivel:02d}"
        assert leccion["nivel"] == nivel
        assert leccion["duracion_min"] == 30 + nivel * 5
        assert leccion["dificultad"] in ("básico", "intermedio", "avanzado", "proyecto")
        assert len(leccion["objetivos"]) == 3
        assert len(leccion["ejercicios"]) == 3


def test_generar_modulo_ofimatica_conoce_los_8_modulos():
    """Los 8 módulos ofimáticos generan contenido y los desconocidos fallan con KeyError."""
    nombres = ["word", "excel", "powerpoint", "gdocs", "gsheets", "gslides", "gmail", "clave"]
    for nombre in nombres:
        modulo = content_generator.generar_modulo_ofimatica(nombre)
        assert modulo["id"] == f"office-{nombre}"
        assert modulo["titulo"]
        assert modulo["duracion_min"] > 0
    excel = content_generator.generar_modulo_ofimatica("excel")
    assert "=SUMA()" in excel["formulas"]
    with pytest.raises(KeyError):
        content_generator.generar_modulo_ofimatica("modulo_inexistente")


def test_validador_de_datos_acepta_archivo_real_y_rechaza_inexistente():
    """validar_archivo_ts aprueba un archivo de datos real y detecta rutas rotas."""
    ok, errores = data_validator.validar_archivo_ts(
        PROJECT_ROOT / "src" / "data" / "nodesMetadata.ts"
    )
    assert ok is True
    assert errores == []

    ok_mal, errores_mal = data_validator.validar_archivo_ts(
        PROJECT_ROOT / "no" / "existe.ts"
    )
    assert ok_mal is False
    assert len(errores_mal) == 1


def test_i18n_implementa_los_39_idiomas():
    """i18n.ts cubre los 39 idiomas objetivo y las claves se extraen por idioma."""
    contenido = I18N_FILE.read_text(encoding="utf-8")
    implementados = i18n_auditor.extraer_idiomas_implementados(contenido)
    assert set(i18n_auditor.IDIOMAS_39) <= set(implementados)
    assert i18n_auditor.extraer_claves_traduccion(contenido, "es") > 0
    assert i18n_auditor.extraer_claves_traduccion(contenido, "zz") == 0


def test_voces_de_sintesis_unicas_por_idioma():
    """Ninguna voz de la Web Speech API se repite entre idiomas."""
    ok, duplicados = i18n_auditor.verificar_unicidad_voces()
    assert ok is True
    assert duplicados == []
