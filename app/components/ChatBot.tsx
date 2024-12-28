'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession, signIn, signOut } from 'next-auth/react'

interface ChatBotProps {
  onDocumentSelect: (document: string) => void
}

export default function ChatBot({ onDocumentSelect }: ChatBotProps) {
  const { data: session } = useSession()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      signIn('google')
      return
    }

    if (!input.trim()) return

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    setMessages(prev => [...prev, userMessage])
    
    // Clear input
    setInput('')

    // Simulate document selection based on user input
    // In a real application, this would be based on the AI's response
    if (input.toLowerCase().includes('document')) {
      onDocumentSelect(`Document related to: ${input}`)
    }

    // TODO: Add backend integration here
    // For now, simulate an AI response
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `This is a simulated response to: "${input}"`
    }
    setMessages(prev => [...prev, aiMessage])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat</h2>
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {session.user?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleMessageSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={"Type your message..."}
          className="flex-1"
        />
        <Button type="submit">
          {"Send"}
        </Button>
      </form>
    </div>
  )
} 