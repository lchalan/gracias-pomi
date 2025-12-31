import { useState, useEffect, useCallback } from 'react'
import './VoiceInput.css'

function VoiceInput({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [transcript, setTranscript] = useState('')
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognitionInstance = new SpeechRecognition()
    recognitionInstance.continuous = false
    recognitionInstance.interimResults = true
    recognitionInstance.lang = 'fr-FR' // French language

    recognitionInstance.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognitionInstance.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }

      setTranscript(finalTranscript || interimTranscript)

      // When we have a final transcript, send it
      if (finalTranscript) {
        onTranscript(finalTranscript.trim())
        setIsListening(false)
      }
    }

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      
      if (event.error === 'not-allowed') {
        alert('🎤 Pomi a besoin d\'accéder au micro ! Autorise l\'accès dans ton navigateur.')
      }
    }

    recognitionInstance.onend = () => {
      setIsListening(false)
    }

    setRecognition(recognitionInstance)

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort()
      }
    }
  }, [onTranscript])

  const toggleListening = useCallback(() => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
    } else {
      setTranscript('')
      recognition.start()
    }
  }, [recognition, isListening])

  if (!isSupported) {
    return (
      <button 
        className="voice-button unsupported" 
        disabled
        title="La reconnaissance vocale n'est pas supportée par ce navigateur"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </button>
    )
  }

  return (
    <div className="voice-input-wrapper">
      <button
        type="button"
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        disabled={disabled}
        title={isListening ? 'Arrêter l\'écoute' : 'Parler à Pomi'}
      >
        {isListening ? (
          <div className="listening-indicator">
            <span className="pulse-ring"></span>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </button>
      
      {isListening && transcript && (
        <div className="transcript-preview">
          <span className="transcript-text">{transcript}</span>
          <span className="listening-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default VoiceInput
