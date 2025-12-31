import { useState, useRef, useEffect, useCallback } from 'react'
import VoiceInput from './VoiceInput'
import './ChatInput.css'

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')
  const [autoSendVoice, setAutoSendVoice] = useState(true) // Auto-send voice messages
  const textareaRef = useRef(null)

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Handle voice transcript
  const handleVoiceTranscript = useCallback((transcript) => {
    if (autoSendVoice) {
      // Auto-send the voice message
      onSendMessage(transcript)
    } else {
      // Just fill the input
      setMessage(prev => prev ? `${prev} ${transcript}` : transcript)
      textareaRef.current?.focus()
    }
  }, [autoSendVoice, onSendMessage])

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écris un message à Pomi... ou utilise le micro 🎤"
          disabled={disabled}
          rows={1}
          className="message-input"
        />
        <div className="input-actions">
          <VoiceInput 
            onTranscript={handleVoiceTranscript} 
            disabled={disabled} 
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!message.trim() || disabled}
            aria-label="Envoyer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="input-hint">Entrée pour envoyer • 🎤 Cliquez sur le micro pour dicter</p>
    </form>
  )
}

export default ChatInput
