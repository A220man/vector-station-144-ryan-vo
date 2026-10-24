import { useState } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState<{status: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      </main>
    </div>
  )
}

export default App