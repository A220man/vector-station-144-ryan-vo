import { useState } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState<{status: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ttsText, setTtsText] = useState('')
  const [ttsAudio, setTtsAudio] = useState<string | null>(null)
  const [ttsLoading, setTtsLoading] = useState(false)
  const [ttsError, setTtsError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/v1/info')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setHealth(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const generateTTS = async () => {
    if (!ttsText.trim()) return
    setTtsLoading(true)
    setTtsError(null)
    setTtsAudio(null)
    try {
      const res = await fetch('/api/v1/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsText })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || `HTTP ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setTtsAudio(url)
    } catch (e) {
      setTtsError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setTtsLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>VoiceStudio</h1>
        <p>Open-source, fully-local voice cloning &amp; TTS platform</p>
      </header>
      <main>
        <section className="card">
          <h2>Backend Status</h2>
          <button onClick={checkHealth} disabled={loading}>
            {loading ? 'Checking...' : 'Check Backend'}
          </button>
          {error && <p className="error">Error: {error}</p>}
          {health && (
            <pre>{JSON.stringify(health, null, 2)}</pre>
          )}
        </section>
        <section className="card">
          <h2>Text-to-Speech</h2>
          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="Enter text to synthesize..."
            rows={4}
            cols={50}
          />
          <br />
          <button onClick={generateTTS} disabled={ttsLoading || !ttsText.trim()}>
            {ttsLoading ? 'Generating...' : 'Generate Speech'}
          </button>
          {ttsError && <p className="error">Error: {ttsError}</p>}
          {ttsAudio && (
            <audio controls src={ttsAudio} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App