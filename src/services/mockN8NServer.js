/**
 * Mock N8N responses for testing without a real N8N instance
 * This simulates what your N8N workflow would return
 */

const pomiResponses = [
  "Woof woof ! 🐕 C'est une super question ! Laisse-moi réfléchir...",
  "Oh, intéressant ! *remue la queue* 🍅 Je pense que...",
  "*pose sa patte sur ton clavier* Tu veux que je t'aide avec ça ? 🐕",
  "Gracias pour ta question ! Voilà ce que j'en pense... 🍅",
  "*fait le beau* Je suis là pour t'aider ! Woof ! 🐕",
  "Hmm, laisse Pomi analyser ça... *renifle l'écran* 🐕🍅",
  "*court en cercles excité* Oh oh oh ! Je sais ! 🐕",
  "Tu sais quoi ? Tu poses les meilleures questions ! Woof ! 🍅"
]

const contextualResponses = {
  bonjour: "Woof woof ! Bonjour à toi ! 🐕 Comment va ta journée ? Je suis Pomi, ton assistant Corgi préféré ! 🍅",
  salut: "Hey hey ! *remue la queue très fort* Salut ! Qu'est-ce que je peux faire pour toi aujourd'hui ? 🐕",
  merci: "Aww, de rien ! 🍅 Ça me fait plaisir de t'aider ! *fait le beau* 🐕",
  aide: "Bien sûr ! Je suis là pour ça ! Dis-moi ce dont tu as besoin et Pomi s'en occupe ! Woof ! 🐕🍅",
  comment: "Hmm, bonne question ! *penche la tête* Laisse-moi réfléchir à la meilleure façon de t'expliquer... 🐕",
  pourquoi: "*se gratte l'oreille* Ah, les grandes questions existentielles ! J'adore ! 🍅",
  problème: "Oh non ! *oreilles baissées* Raconte-moi tout, on va résoudre ça ensemble ! 🐕",
  super: "Woooof ! *saute de joie* Je suis content que ça te plaise ! 🐕🍅"
}

/**
 * Simulate N8N response with a small delay
 */
export function getMockResponse(message) {
  return new Promise((resolve) => {
    // Simulate network delay (500-1500ms)
    const delay = 500 + Math.random() * 1000
    
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()
      
      // Check for contextual responses
      for (const [keyword, response] of Object.entries(contextualResponses)) {
        if (lowerMessage.includes(keyword)) {
          resolve({ message: response })
          return
        }
      }
      
      // Return random response
      const randomResponse = pomiResponses[Math.floor(Math.random() * pomiResponses.length)]
      resolve({ message: randomResponse })
    }, delay)
  })
}
