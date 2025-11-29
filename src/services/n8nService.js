import { getMockResponse } from './mockN8NServer'

// N8N Webhook Configuration
// Replace this URL with your actual N8N webhook URL
// Set to 'mock' or leave empty to use mock responses for testing
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

// Check if we should use mock mode
const USE_MOCK = !N8N_WEBHOOK_URL || N8N_WEBHOOK_URL === 'mock'

/**
 * Send a message to N8N webhook and get a response
 * @param {string} message - The user's message
 * @param {object} metadata - Additional metadata (conversation history, session ID, etc.)
 * @returns {Promise<object>} - The response from N8N
 */
export async function sendMessageToN8N(message, metadata = {}) {
  // Use mock responses if no N8N URL is configured
  if (USE_MOCK) {
    console.log('🐕 Using mock responses (configure VITE_N8N_WEBHOOK_URL to connect to N8N)')
    return getMockResponse(message)
  }

  const payload = {
    message,
    metadata: {
      ...metadata,
      source: 'gracias-pomi',
      version: '1.0.0'
    }
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // N8N returns an array with { output: "..." } format
    // Normalize to { message: "..." } format
    if (Array.isArray(data) && data.length > 0) {
      return { message: data[0].output || data[0].message || data[0].text || JSON.stringify(data[0]) }
    }
    if (data.output) {
      return { message: data.output }
    }
    return data
  } catch (error) {
    console.error('N8N Service Error:', error)
    throw error
  }
}

/**
 * Check if N8N webhook is available
 * @returns {Promise<boolean>}
 */
export async function checkN8NConnection() {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}
