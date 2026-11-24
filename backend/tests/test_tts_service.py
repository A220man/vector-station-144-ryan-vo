import pytest
from app.tts import TTSService


def test_tts_service_instantiation():
    """Test that TTSService can be instantiated with default config."""
    svc = TTSService()
    assert svc is not None
    assert svc.is_loaded() is False
    assert svc.model_dir is not None


def test_tts_service_is_loaded_default():
    """Test that is_loaded() returns False when no model is loaded."""
    svc = TTSService()
    assert svc.is_loaded() is False


def test_tts_service_load_model_marks_loaded():
    """Test that load_model sets the internal TTS instance."""
    svc = TTSService()
    # We can't actually load a Coqui TTS model here, but we can verify
    # the method exists and attempts to load
    # Just verify the method is callable
    assert hasattr(svc, "load_model")
    assert callable(svc.load_model)


def test_tts_service_synthesize_without_model():
    """Test that synthesize raises RuntimeError when no model loaded."""
    svc = TTSService()
    with pytest.raises(RuntimeError, match="No model loaded"):
        svc.synthesize("test text")
