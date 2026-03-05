/**
 * ChatBot Widget - Embed Script
 * 
 * Usage: Add this to any website
 * <script src="https://your-domain.com/chatbot-embed.js"></script>
 * 
 * Optional Configuration:
 * window.ChatbotConfig = {
 *   primaryColor: '#7c3aed',
 *   position: 'bottom-right', // or 'bottom-left'
 *   apiEndpoint: 'https://your-api.com/chat',
 * }
 */

(function () {
  // Get config from window or use defaults
  const config = window.ChatbotConfig || {}
  const primaryColor = config.primaryColor || '#7c3aed'
  const position = config.position || 'bottom-right'
  const apiEndpoint = config.apiEndpoint || null

  // Create styles
  const style = document.createElement('style')
  style.textContent = `
    .chatbot-widget-container {
      all: revert;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    .chatbot-widget-button {
      position: fixed;
      bottom: 24px;
      ${position === 'bottom-left' ? 'left' : 'right'}: 24px;
      z-index: 999998;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .chatbot-widget-button:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }

    .chatbot-widget-button svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    .chatbot-widget-window {
      position: fixed;
      bottom: 24px;
      ${position === 'bottom-left' ? 'left' : 'right'}: 24px;
      z-index: 999999;
      width: 400px;
      max-width: calc(100vw - 32px);
      height: 600px;
      max-height: 70vh;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
      animation: slideInUp 0.3s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chatbot-header {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: green;
    }

    .chatbot-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chatbot-header-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-header-icon svg {
      width: 20px;
      height: 20px;
    }

    .chatbot-header-text h2 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }

    .chatbot-header-text p {
      margin: 0;
      font-size: 12px;
      opacity: 0.8;
    }

    .chatbot-close {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .chatbot-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .chatbot-close svg {
      width: 20px;
      height: 20px;
    }

    .chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      space-y: 16px;
      background: rgba(255, 255, 255, 0.02);
    }

    .chatbot-message {
      display: flex;
      margin-bottom: 16px;
    }

    .chatbot-message.user {
      justify-content: flex-end;
    }

    .chatbot-message-content {
      max-width: 80%;
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
    }

    .chatbot-message.bot .chatbot-message-content {
      background: #2a2a2a;
      color: #e0e0e0;
      border-radius: 12px 12px 0 12px;
    }

    .chatbot-message.user .chatbot-message-content {
      background: ${primaryColor};
      color: white;
      border-radius: 12px 12px 12px 0;
    }

    .chatbot-input-area {
      border-top: 1px solid #333;
      padding: 16px;
      background: #1a1a1a;
    }

    .chatbot-input-form {
      display: flex;
      gap: 8px;
    }

    .chatbot-input-form input {
      flex: 1;
      background: #2a2a2a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 10px 12px;
      color: #e0e0e0;
      font-size: 14px;
      font-family: inherit;
    }

    .chatbot-input-form input::placeholder {
      color: #666;
    }

    .chatbot-input-form button {
      background: ${primaryColor};
      border: none;
      color: white;
      cursor: pointer;
      padding: 10px 12px;
      border-radius: 8px;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-input-form button:hover:not(:disabled) {
      opacity: 0.9;
    }

    .chatbot-input-form button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chatbot-input-form button svg {
      width: 16px;
      height: 16px;
    }

    .chatbot-typing {
      display: flex;
      gap: 4px;
      padding: 10px 16px;
    }

    .chatbot-typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #666;
      animation: typing 1.4s infinite;
    }

    .chatbot-typing-dot:nth-child(2) {
      animation-delay: 0.1s;
    }

    .chatbot-typing-dot:nth-child(3) {
      animation-delay: 0.2s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.5;
      }
      30% {
        opacity: 1;
      }
    }

    @media (max-width: 480px) {
      .chatbot-widget-window {
        width: calc(100vw - 32px);
        height: 500px;
      }

      .chatbot-message-content {
        max-width: 85%;
      }
    }
  `
  document.head.appendChild(style)

  // Icons
  const messageIcon = `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`
  const sendIcon = `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151493 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99021575 L3.03521743,10.4310088 C3.03521743,10.5881061 3.19218622,10.7452035 3.50612381,10.7452035 L16.6915026,11.5306905 C16.6915026,11.5306905 17.1624089,11.5306905 17.1624089,12.0019827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/></svg>`
  const closeIcon = `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`

  // State
  let isOpen = false
  let messages = [
    {
      id: '1',
      text: 'Hi there! 👋 How can I help you today?',
      sender: 'bot',
    },
  ]

  // Create button
  const button = document.createElement('button')
  button.className = 'chatbot-widget-button'
  button.innerHTML = messageIcon
  button.setAttribute('aria-label', 'Open chatbot')

  // Create window
  const chatWindow = document.createElement('div')
  chatWindow.className = 'chatbot-widget-window'
  chatWindow.style.display = 'none'
  chatWindow.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-header-content">
        <div class="chatbot-header-icon">${messageIcon}</div>
        <div class="chatbot-header-text">
          <h2>Chat Assistant</h2>
          <p>Always here to help</p>
        </div>
      </div>
      <button class="chatbot-close" aria-label="Close chatbot">${closeIcon}</button>
    </div>
    <div class="chatbot-messages"></div>
    <div class="chatbot-input-area">
      <form class="chatbot-input-form">
        <input type="text" placeholder="Type your message..." />
        <button type="submit">${sendIcon}</button>
      </form>
    </div>
  `

  // Functions
  function renderMessages() {
    const messagesContainer = chatWindow.querySelector('.chatbot-messages')
    messagesContainer.innerHTML = messages
      .map(
        (msg) => `
      <div class="chatbot-message ${msg.sender}">
        <div class="chatbot-message-content">${escapeHtml(msg.text)}</div>
      </div>
    `
      )
      .join('')

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  function sendMessage(text) {
    if (!text.trim()) return

    // Add user message
    messages.push({
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    })

    renderMessages()

    const input = chatWindow.querySelector('input')
    input.value = ''
    input.disabled = true

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'Thanks for your message! '

      if (apiEndpoint) {
        // In production, you would fetch from your API
        botResponse +=
          'This would call your API endpoint: ' + apiEndpoint
      } else {
        botResponse +=
          "This is a demo chatbot. To add AI responses, configure an API endpoint in the window.ChatbotConfig."
      }

      messages.push({
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
      })

      renderMessages()
      input.disabled = false
      input.focus()
    }, 500)
  }

  // Event listeners
  button.addEventListener('click', () => {
    isOpen = !isOpen
    chatWindow.style.display = isOpen ? 'flex' : 'none'
    button.style.display = isOpen ? 'none' : 'flex'
    if (isOpen) {
      chatWindow.querySelector('input').focus()
    }
  })

  chatWindow.querySelector('.chatbot-close').addEventListener('click', () => {
    isOpen = false
    chatWindow.style.display = 'none'
    button.style.display = 'flex'
  })

  chatWindow.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = chatWindow.querySelector('input')
    sendMessage(input.value)
  })

  // Mount to page
  const container = document.createElement('div')
  container.className = 'chatbot-widget-container'
  container.appendChild(button)
  container.appendChild(chatWindow)
  document.body.appendChild(container)

  // Initial render
  renderMessages()

  // Expose API for external use
  window.ChatbotWidget = {
    open: () => {
      button.click()
    },
    close: () => {
      if (isOpen) {
        button.click()
      }
    },
    sendMessage: (text) => {
      sendMessage(text)
    },
    addMessage: (text, sender = 'bot') => {
      messages.push({
        id: Date.now().toString(),
        text: text,
        sender: sender,
      })
      renderMessages()
    },
  }
})()
