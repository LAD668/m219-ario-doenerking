'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-64 bg-grey-100 rounded flex items-center justify-center">Editor wird geladen...</div>,
})

interface CodeEditorProps {
  initialValue?: string
  language?: string
  onSubmit?: (code: string) => Promise<{ success: boolean; message: string }>
  height?: string
  exampleCode?: string // Beispiel-Lösung, die oben angezeigt wird
}

export default function CodeEditor({
  initialValue = '',
  language = 'javascript',
  onSubmit,
  height = '400px',
  exampleCode,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; correctSolution?: string } | null>(null)

  const handleSubmit = async () => {
    if (!onSubmit) return
    
    setIsSubmitting(true)
    setResult(null)
    
    try {
      const response = await onSubmit(code)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCode('') // Reset to empty instead of initialValue
    setResult(null)
  }

  return (
      <div className="space-y-6">
      {/* Beispiel-Lösung oben anzeigen */}
      {exampleCode && (
        <div className="bg-grey-800/80 border border-grey-600/50 rounded-2xl overflow-hidden shadow-soft">
          <div className="px-4 py-3 bg-grey-700/50 border-b border-grey-600/50">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Beispiel-Lösung
            </h4>
          </div>
          <div className="p-4">
            <pre className="text-sm text-grey-100 font-mono whitespace-pre-wrap overflow-x-auto">
              <code>{exampleCode}</code>
            </pre>
          </div>
        </div>
      )}
      
      <div className="bg-grey-900 border border-grey-700/50 rounded-2xl overflow-hidden shadow-soft-lg">
        <MonacoEditor
          height={height}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: 'Monaco, "Courier New", monospace',
            lineHeight: 20,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-primary-medium text-white font-medium rounded-2xl hover:bg-primary-dark hover:shadow-soft-lg disabled:bg-grey-300 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-medium focus:ring-offset-2"
        >
          {isSubmitting ? 'Wird geprüft...' : 'Lösung einreichen'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 glass-card-light text-grey-700 font-medium hover:shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
        >
          Zurücksetzen
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border ${
              result.success
                ? 'bg-green-50/90 backdrop-blur-sm border-green-200/50 text-green-800 shadow-soft'
                : 'bg-red-50/90 backdrop-blur-sm border-red-200/50 text-red-800 shadow-soft'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`text-lg font-semibold flex-shrink-0 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.success ? '✓' : '✗'}
              </span>
              <p className="font-medium leading-relaxed">{result.message}</p>
            </div>
          </div>
          
          {/* Richtige Lösung anzeigen, wenn die Lösung falsch ist */}
          {!result.success && result.correctSolution && (
            <div className="bg-blue-50/90 backdrop-blur-sm border border-blue-200/50 rounded-2xl overflow-hidden shadow-soft">
              <div className="px-4 py-3 bg-blue-100/50 border-b border-blue-200/50">
                <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Richtige Lösung
                </h4>
              </div>
              <div className="p-4">
                <pre className="text-sm text-blue-900 font-mono whitespace-pre-wrap overflow-x-auto">
                  <code>{result.correctSolution}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

