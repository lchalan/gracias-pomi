import CorgiAvatar from './CorgiAvatar'
import './TypingIndicator.css'

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-avatar">
        <CorgiAvatar size={36} animated />
      </div>
      <div className="typing-bubble">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
    </div>
  )
}

export default TypingIndicator
