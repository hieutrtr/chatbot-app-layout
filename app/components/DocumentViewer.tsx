import React from "react";

interface DocumentViewerProps {
    document: string | null
  }
  
  export default function DocumentViewer({ document }: DocumentViewerProps) {
    return (
      <div className="h-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Document Viewer</h2>
        {document ? (
          <div className="prose max-w-none">
            <p className="text-gray-700">{document}</p>
            {/* In a real application, you would render the actual document content here */}
          </div>
        ) : (
          <div className="flex h-[calc(100%-2rem)] items-center justify-center">
            <p className="text-gray-500 text-center">
              No document selected. Ask the chatbot about a document to view it here.
            </p>
          </div>
        )}
      </div>
    )
  }