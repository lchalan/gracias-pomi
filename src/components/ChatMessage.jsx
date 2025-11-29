import ReactMarkdown from 'react-markdown'
import CorgiAvatar from './CorgiAvatar'
import './ChatMessage.css'

function ChatMessage({ message }) {
  const isPomi = message.type === 'pomi'
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`message ${isPomi ? 'message-pomi' : 'message-user'}`}>
      {isPomi && (
        <div className="message-avatar">
          <CorgiAvatar size={36} />
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">
          {isPomi ? (
            <ReactMarkdown
              components={{
                // Personnalisation des éléments Markdown
                p: ({children}) => <p className="md-paragraph">{children}</p>,
                ul: ({children}) => <ul className="md-list">{children}</ul>,
                ol: ({children}) => <ol className="md-list md-list-ordered">{children}</ol>,
                li: ({children}) => <li className="md-list-item">{children}</li>,
                strong: ({children}) => <strong className="md-bold">{children}</strong>,
                em: ({children}) => <em className="md-italic">{children}</em>,
                code: ({inline, children}) => 
                  inline 
                    ? <code className="md-code-inline">{children}</code>
                    : <pre className="md-code-block"><code>{children}</code></pre>,
                a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">{children}</a>,
                h1: ({children}) => <h3 className="md-heading">{children}</h3>,
                h2: ({children}) => <h4 className="md-heading">{children}</h4>,
                h3: ({children}) => <h5 className="md-heading">{children}</h5>,
                blockquote: ({children}) => <blockquote className="md-blockquote">{children}</blockquote>,
              }}
            >
              {message.text}
            </ReactMarkdown>
          ) : (
            message.text
          )}
        </div>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  )
}

export default ChatMessage
