import CorgiAvatar from './CorgiAvatar'
import './Header.css'

function Header({ onClearChat }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <CorgiAvatar size={45} />
          <div className="header-title">
            <h1>Gracias Pomi</h1>
            <span className="header-subtitle">Votre assistant Corgi 🍅</span>
          </div>
        </div>
        <button 
          className="clear-btn" 
          onClick={onClearChat}
          title="Nouvelle conversation"
          aria-label="Effacer la conversation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
