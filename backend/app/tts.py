from pathlib import Path
from typing import Optional
import os
import tempfile

from TTS.api import TTS as CoquiTTS


class TTSService:
    def __init__(self, model_dir: Optional[str] = None):
        self.model_dir = Path(model_dir or os.environ.get("TTS_MODEL_DIR", "/models"))
        self._tts: Optional[CoquiTTS] = None
        self._model_name: Optional[str] = None

    def load_model(self, model_name: str = "tts_models/en/ljspeech/tacotron2-DDC") -> None:
        """Load a Coqui TTS model."""
        self._tts = CoquiTTS(model_name, progress_bar=False)
        self._model_name = model_name

    def is_loaded(self) -> bool:
        return self._tts is not None

    def synthesize(self, text: str, sample_rate: int = 22050) -> bytes:
        """Synthesize text to audio bytes (WAV format)."""
        if not self._tts:
            raise RuntimeError("No model loaded. Call load_model() first.")

        # Create a temporary file for the output
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp_path = tmp.name

        try:
            self._tts.tts_to_file(text=text, file_path=tmp_path)
            with open(tmp_path, "rb") as f:
                audio_bytes = f.read()
        finally:
            # Clean up temp file
            try:
                os.unlink(tmp_path)
            except OSError:
                pass

        return audio_bytes


# Global service instance
tts_service = TTSService()
