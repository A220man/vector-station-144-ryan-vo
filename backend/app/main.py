from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel

from app.tts import tts_service

app = FastAPI(title="VoiceStudio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str
    model: str = "tts_models/en/ljspeech/tacotron2-DDC"


@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/api/v1/info")
async def info():
    return {"name": "VoiceStudio", "version": "1.0.0"}

@app.post("/api/v1/tts")
async def tts(request: TTSRequest):
    try:
        if not tts_service.is_loaded():
            tts_service.load_model(request.model)
        audio_bytes = tts_service.synthesize(request.text)
        return Response(content=audio_bytes, media_type="audio/wav")
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS error: {str(e)}")