# 🐕 Gracias Pomi

Une PWA de chat mignonne avec Pomodoro le Corgi, connectée à N8N pour les automatisations.

![Pomi](public/pomi-icon.svg)

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Mode développement (avec réponses simulées)

```bash
npm run dev
```

L'app démarre sur `http://localhost:5173`

### Configuration de N8N

1. Copie `.env.example` vers `.env`
2. Remplace l'URL par ton webhook N8N :

```env
VITE_N8N_WEBHOOK_URL=https://ton-n8n.com/webhook/pomi-chat
```

## 📱 Installation sur mobile

### Android
1. Ouvre l'app dans Chrome
2. Menu ⋮ → "Ajouter à l'écran d'accueil"

### iOS
1. Ouvre l'app dans Safari
2. Bouton partager → "Sur l'écran d'accueil"

## 🔧 Configuration N8N

Ton workflow N8N doit :

1. **Recevoir** un webhook POST avec ce format :
```json
{
  "message": "Message de l'utilisateur",
  "metadata": {
    "conversationHistory": [...],
    "timestamp": "2025-11-29T...",
    "sessionId": "pomi-xxx-xxx",
    "source": "gracias-pomi",
    "version": "1.0.0"
  }
}
```

2. **Répondre** avec ce format :
```json
{
  "message": "Réponse de Pomi"
}
```

### Exemple de workflow N8N

1. **Webhook** (trigger) - Méthode POST
2. **Ton traitement** (OpenAI, Ollama, etc.)
3. **Respond to Webhook** - Renvoie `{ "message": "..." }`

## 🏗️ Build pour production

```bash
npm run build
```

Les fichiers sont générés dans `dist/`

## 🌐 Déploiement

### Vercel (recommandé)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🎨 Personnalisation

- **Couleurs** : Modifie les variables CSS dans `src/index.css`
- **Avatar** : Modifie `src/components/CorgiAvatar.jsx`
- **Messages par défaut** : Modifie `src/App.jsx`

## 📄 Licence

MIT - Fais ce que tu veux avec ! 🐕🍅
