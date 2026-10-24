# Product development plan

Each round completes one feature or repair. Future items are planned, not implemented claims.

## Current round

skeleton

## Roadmap

### skeleton — FastAPI + React skeleton with health check

Status: done

Acceptance:
- Backend starts and serves /health
- Frontend builds and loads
- Docker compose runs both services

Implementation: `backend/app/main.py`, `frontend/src/App.tsx`, `docker-compose.yaml`

Tests: `backend/tests/test_main.py`, `frontend/src/App.test.tsx`

### tts-basic — Basic TTS generation with local model

Status: planned

Acceptance:
- API endpoint accepts text and returns audio
- Uses a local TTS model (piper/coqui)
- Frontend form to generate and play audio

### voice-cloning — Voice cloning from reference audio

Status: planned

Acceptance:
- Upload reference audio and generate cloned speech
- Speaker embedding extraction
- Clone quality evaluation

### video-dubbing — Video dubbing workflow

Status: planned

Acceptance:
- Upload video, extract audio, transcribe, translate, synthesize
- Merge dubbed audio back to video
- Progress tracking and result export

### auth-oidc — OIDC Authentication with Keycloak

Status: planned

Acceptance:
- Keycloak realm import and login flow
- Protected API endpoints with role checks
- Frontend auth state and logout

