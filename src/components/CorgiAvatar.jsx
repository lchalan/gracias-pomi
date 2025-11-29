import './CorgiAvatar.css'

function CorgiAvatar({ size = 40, animated = false }) {
  return (
    <div 
      className={`corgi-avatar ${animated ? 'animated' : ''}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/pomi-avatar.png" 
        alt="Pomodoro le Corgi"
        className="corgi-img"
      />
    </div>
  )
}

export default CorgiAvatar
