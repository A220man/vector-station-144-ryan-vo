import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the header', () => {
    render(<App />)
    expect(screen.getByText('VoiceStudio')).toBeInTheDocument()
    expect(screen.getByText('Open-source, fully-local voice cloning & TTS platform')).toBeInTheDocument()
  })

  it('shows backend info when check button clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'VoiceStudio', version: '1.0.0' }),
    })

    render(<App />)
    const button = screen.getByText('Check Backend')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('VoiceStudio')).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/v1/info')
  })

  it('shows error on fetch failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<App />)
    const button = screen.getByText('Check Backend')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument()
    })
  })
})