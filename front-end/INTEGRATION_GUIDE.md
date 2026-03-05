# ChatBot Widget - Integration Guide

A lightweight, plug-and-play chatbot widget that works on any website. Zero configuration needed to get started!

## Quick Start

### Option 1: Embed Script (Any Website)

Add a single line to your website HTML:

```html
<script src="https://your-domain.com/chatbot-embed.js"></script>
```

That's it! The chatbot will appear in the bottom-right corner of your website.

### Option 2: React Component (Next.js / React Apps)

Import the component directly:

```tsx
import { ChatbotWidget } from '@/components/chatbot-widget'

export default function Page() {
  return (
    <div>
      <h1>My Website</h1>
      {/* Add the widget */}
      <ChatbotWidget />
    </div>
  )
}
```

## Configuration

### Embed Script Configuration

Customize the chatbot before loading the script:

```html
<script>
  window.ChatbotConfig = {
    primaryColor: '#7c3aed',        // Brand color (hex)
    position: 'bottom-right',       // 'bottom-right' or 'bottom-left'
    apiEndpoint: 'https://your-api.com/chat'  // Your AI backend
  }
</script>
<script src="https://your-domain.com/chatbot-embed.js"></script>
```

### React Component Props

The component accepts optional configuration:

```tsx
<ChatbotWidget 
  primaryColor="#7c3aed"
  position="bottom-right"
  apiEndpoint="https://your-api.com/chat"
/>
```

## API Integration

To connect your own backend:

### Using the Embed Script

```javascript
window.ChatbotConfig = {
  apiEndpoint: 'https://your-api.com/chat'
}
```

The widget will send POST requests to your endpoint with:

```json
{
  "message": "user message text"
}
```

Your API should respond with:

```json
{
  "response": "bot reply text"
}
```

### Using the React Component

Import and hook up your own API calls:

```tsx
'use client'

import { ChatbotWidget } from '@/components/chatbot-widget'
import { useState } from 'react'

export default function Page() {
  const handleMessage = async (message: string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
    const data = await response.json()
    return data.response
  }

  return <ChatbotWidget onMessage={handleMessage} />
}
```

## Styling

### Default Theme

The chatbot uses a modern dark theme that works on any website:
- Dark background (#1a1a1a)
- Light text (#e0e0e0)
- Primary brand color (customizable)
- Smooth animations

### Custom Colors

```html
<script>
  window.ChatbotConfig = {
    primaryColor: '#3b82f6',  // Blue
    // Add more custom styles as needed
  }
</script>
```

### CSS Variables (Advanced)

For more control, override CSS variables:

```css
:root {
  --chatbot-primary: #7c3aed;
  --chatbot-background: #1a1a1a;
  --chatbot-text: #e0e0e0;
}
```

## JavaScript API

When using the embed script, you can interact with the widget programmatically:

```javascript
// Open the chatbot
ChatbotWidget.open()

// Close the chatbot
ChatbotWidget.close()

// Send a message from code
ChatbotWidget.sendMessage('Hello!')

// Add a message (useful for system announcements)
ChatbotWidget.addMessage('Welcome to our chat!', 'bot')
ChatbotWidget.addMessage('Hi there!', 'user')
```

## Responsive Design

The chatbot automatically adapts to different screen sizes:

- **Desktop**: 400px width, 600px height
- **Tablet**: Maintains aspect ratio
- **Mobile**: Full width minus padding, 500px height

No additional configuration needed!

## Performance

- **Lightweight**: ~15KB minified and gzipped
- **No dependencies**: Works without jQuery or other libraries
- **Lazy loaded**: Script can be loaded asynchronously
- **Optimized animations**: Uses CSS transforms for smooth performance

## Browser Support

- Chrome/Edge: ✅ Latest versions
- Firefox: ✅ Latest versions
- Safari: ✅ Latest versions
- Mobile browsers: ✅ iOS Safari, Chrome Mobile

## Security

- **XSS Protection**: All user input is escaped
- **CORS**: Configure your API endpoint with proper CORS headers
- **No storage**: Messages are not stored by default
- **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Chatbot not appearing

1. Check the script is loaded (open DevTools Console)
2. Ensure no JavaScript errors exist
3. Verify the script URL is correct
4. Check z-index conflicts with other elements

### Messages not sending

1. Check console for errors
2. Verify API endpoint is configured (if using custom backend)
3. Ensure API endpoint is CORS-enabled
4. Test API with curl or Postman

### Styling conflicts

1. The widget uses CSS revert to isolate styles
2. If conflicts occur, add more specific CSS selectors
3. Check browser DevTools for style overrides

## Advanced Usage

### Custom Message Formatting

Extend the component to support Markdown:

```tsx
import { ChatbotWidget } from '@/components/chatbot-widget'
import { marked } from 'marked'

// Modify the message rendering in the component
```

### Message History

Store and retrieve chat history:

```javascript
// Save to localStorage
localStorage.setItem('chatHistory', JSON.stringify(messages))

// Restore on page load
const saved = localStorage.getItem('chatHistory')
```

### Analytics

Track chatbot interactions:

```javascript
window.ChatbotConfig = {
  onMessage: (message) => {
    // Send to analytics
    gtag('event', 'chatbot_message', {
      message: message,
    })
  },
}
```

## Deployment

### Deploy on Vercel

```bash
# Install dependencies
npm install

# Deploy
vercel deploy
```

Your chatbot will be available at `https://your-project.vercel.app`

### Serve Embed Script

Make the embed script publicly available:

```bash
# Your embed script will be at:
# https://your-domain.com/chatbot-embed.js
```

## Examples

### WordPress

```html
<!-- Add to your theme footer.php or use a custom HTML plugin -->
<script src="https://your-domain.com/chatbot-embed.js"></script>
```

### Shopify

```html
<!-- Add to your theme's liquid template -->
<script src="https://your-domain.com/chatbot-embed.js"></script>
```

### Webflow

```html
<!-- Add to custom code in page settings -->
<script src="https://your-domain.com/chatbot-embed.js"></script>
```

### Static HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>Your content here...</p>

    <!-- Add chatbot -->
    <script src="https://your-domain.com/chatbot-embed.js"></script>
  </body>
</html>
```

## License

MIT - Free to use and modify

## Support

For issues, feature requests, or questions:
- GitHub Issues: (add your repo)
- Email: support@your-domain.com
- Discord: (add your community)

---

Happy chatting! 🚀
