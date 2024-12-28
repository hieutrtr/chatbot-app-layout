'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import ChatBot from '@/components/ChatBot'
import DocumentViewer from '@/components/DocumentViewer'

export default function Home() {
  const { data: session } = useSession()
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Basic layout for non-authenticated users
  const BasicLayout = () => (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <ChatBot onDocumentSelect={setSelectedDocument} />
    </div>
  )

  // Advanced layout for authenticated users
  const AdvancedLayout = () => (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white shadow-md">
        <ChatBot onDocumentSelect={setSelectedDocument} />
      </div>
      <div className="w-2/3 p-4">
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  )

  return session ? <AdvancedLayout /> : <BasicLayout />
} 