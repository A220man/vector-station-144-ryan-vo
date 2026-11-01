# VoiceStudio

> Work in progress. This checkpoint may be incomplete or fail tests. See PLAN.md and STATUS.md before use.


Open-source, fully-local voice cloning & TTS platform.

## Features

- Text-to-Speech (TTS) with local Coqui TTS models
- Health check endpoint
- React frontend for easy interaction

## Quick Start

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

- `GET /health` - Health check
- `GET /api/v1/info` - API info
- `POST /api/v1/tts` - Generate speech from text

### TTS Request

```json
{
  "text": "Hello, world!",
  "model": "tts_models/en/ljspeech/tacotron2-DDC"
}
```

Returns: `audio/wav` file

## Models

The TTS endpoint uses Coqui TTS models. On first use, the model will be downloaded automatically from Hugging Face.

Default model: `tts_models/en/ljspeech/tacotron2-DDC`

## Docker

```bash
docker-compose up --build
```
</arg_key>
<arg_key=i</arg_key>
<arg_value>Create README.md

Maintainer: Ryan Vo <ryandtvo@gmail.com>
