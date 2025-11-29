import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import './ChatContainer.css'

function ChatContainer({ messages, isTyping, messagesEndRef }) {
  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatContainer
