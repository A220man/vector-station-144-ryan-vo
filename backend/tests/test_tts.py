import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_info():
    response = client.get("/api/v1/info")
    assert response.status_code == 200
    assert response.json() == {"name": "VoiceStudio", "version": "1.0.0"}


@patch("app.tts.tts_service")
def test_tts_endpoint_success(mock_tts):
    mock_tts.is_loaded.return_value = True
    mock_tts.synthesize.return_value = b"fake-wav-data"

    response = client.post(
        "/api/v1/tts",
        json={"text": "Hello world"}
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/wav"
    assert response.content == b"fake-wav-data"


@patch("app.tts.tts_service")
def test_tts_endpoint_model_not_found(mock_tts):
    mock_tts.is_loaded.return_value = False
    mock_tts.load_model.side_effect = FileNotFoundError("Model not found")

    response = client.post(
        "/api/v1/tts",
        json={"text": "Hello world", "model": "nonexistent"}
    )
    assert response.status_code == 404


@patch("app.tts.tts_service")
def test_tts_endpoint_error(mock_tts):
    mock_tts.is_loaded.return_value = True
    mock_tts.synthesize.side_effect = RuntimeError("TTS failed")

    response = client.post(
        "/api/v1/tts",
        json={"text": "Hello world"}
    )
    assert response.status_code == 500
