'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Send, X, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! 👋 How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Optional: Prevent background scrolling on mobile when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = inputValue.trim()
    if (!prompt) return

    // 1. Add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // 2. Point to your FastAPI endpoint
      const response = await fetch('https://api.rakshitr.co.in/resobot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()

      // 3. Add the real bot response from the API
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response, 
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

    } catch (error) {
      console.error("Failed to fetch from ResoBot API:", error)
      
      // 4. Fallback error message in the chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-primary-foreground ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[600px] sm:max-h-[80vh] bg-card shadow-2xl sm:border border-border flex flex-col sm:rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-primary-foreground">Chat Assistant</h2>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted border border-border/50 text-foreground rounded-bl-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border/50 text-foreground px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-3 sm:p-4 bg-card shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground text-base sm:text-sm rounded-full px-4 h-12 sm:h-10 focus-visible:ring-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12 sm:w-10 sm:h-10 p-0 shrink-0"
                size="icon"
              >
                <Send className="w-5 h-5 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </form>
          </div>
          
        </div>
      )}
    </>
  )
}
