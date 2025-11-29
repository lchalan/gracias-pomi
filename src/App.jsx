import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'
import { sendMessageToN8N } from './services/n8nService'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'pomi',
      text: "Woof woof ! 🐕 Je suis Pomodoro, mais tu peux m'appeler Pomi ! Comment puis-je t'aider aujourd'hui ?",
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setError(null)

    try {
      // Prepare conversation history for N8N
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))

      // Send to N8N with metadata
      const response = await sendMessageToN8N(text.trim(), {
        conversationHistory,
        timestamp: new Date().toISOString(),
        sessionId: sessionStorage.getItem('pomiSessionId') || generateSessionId()
      })

      // Add Pomi's response
      const pomiMessage = {
        id: Date.now() + 1,
        type: 'pomi',
        text: response.message || response.text || response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, pomiMessage])
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Oups ! Pomi a du mal à répondre... Vérifie ta connexion ! 🐕')
      
      // Add error message from Pomi
      const errorMessage = {
        id: Date.now() + 1,
        type: 'pomi',
        text: "*se gratte l'oreille* Woof... J'ai un petit souci technique ! Réessaie dans un moment ? 🐕",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const generateSessionId = () => {
    const id = `pomi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('pomiSessionId', id)
    return id
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'pomi',
        text: "Woof ! On repart à zéro ! 🐕 Que puis-je faire pour toi ?",
        timestamp: new Date()
      }
    ])
    sessionStorage.removeItem('pomiSessionId')
    generateSessionId()
  }

  return (
    <div className="app">
      <Header onClearChat={handleClearChat} />
      <ChatContainer 
        messages={messages} 
        isTyping={isTyping} 
        messagesEndRef={messagesEndRef}
      />
      {error && <div className="error-toast">{error}</div>}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  )
}

export default App
