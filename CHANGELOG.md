# Changelog

## 1.2.0 — work-in-progress checkpoint

Partial code published for continued development. Known issues: STATUS.md.

## 1.1.0 — work-in-progress checkpoint

Partial code published for continued development. TTS mocking patches fixed; all tests pass.
### Fixed
- Fixed TTS mocking patches in backend tests; all 8 tests now pass.

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-11-01

### Added
- FastAPI backend with health check and info endpoints
- React frontend with Vite
- Docker Compose for running both services
- TTS endpoint (`POST /api/v1/tts`) with Coqui TTS integration
- Frontend TTS form with audio playback
- TTS service module (`backend/app/tts.py`)
- Backend tests for TTS endpoint

### Changed
- Updated requirements.txt with torch, torchaudio, coqui-tts
- Updated default TTS model to Coqui's tacotron2-DDC

### Fixed
- N/A (initial release)
</arg_key>
<arg_key=i</arg_key>
<arg_value>Create CHANGELOG.md
