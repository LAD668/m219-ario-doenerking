'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { learningModules } from '@/lib/data'
import {
  initializeProgress,
  getProgress,
  markContentViewed,
  getModuleState,
  isModuleAccessible,
  unlockAllModules,
} from '@/lib/learningPath'
import Card from '@/components/ui/Card'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import Button from '@/components/ui/Button'
import ReactMarkdown from 'react-markdown'

function LerninhaltePageContent() {
  const searchParams = useSearchParams()
  const moduleId = searchParams.get('module')
  const [progress, setProgress] = useState<ReturnType<typeof initializeProgress> | null>(null)
  const [mounted, setMounted] = useState(false)
  
  // Find first accessible module or first module
  const getFirstAccessibleModule = () => {
    const sorted = [...learningModules].sort((a, b) => a.order - b.order)
    return sorted.find((m) => isModuleAccessible(m.id, learningModules)) || sorted[0] || null
  }

  const [selectedModule, setSelectedModule] = useState<typeof learningModules[0] | null>(null)

  useEffect(() => {
    setMounted(true)
    // Unlock all modules on mount
    unlockAllModules(learningModules)
    // Refresh progress
    const initialProgress = initializeProgress(learningModules)
    setProgress(initialProgress)
    
    // Set initial module
    if (moduleId) {
      const moduleData = learningModules.find((m) => m.id === moduleId)
      if (moduleData) {
        setSelectedModule(moduleData)
      } else {
        setSelectedModule(getFirstAccessibleModule())
      }
    } else {
      setSelectedModule(getFirstAccessibleModule())
    }
  }, [])

  useEffect(() => {
    // Update selected module when URL changes
    if (moduleId) {
      const moduleData = learningModules.find((m) => m.id === moduleId)
      if (moduleData) {
        setSelectedModule(moduleData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  // Mark content as viewed when module is displayed
  useEffect(() => {
    if (mounted && selectedModule && isModuleAccessible(selectedModule.id, learningModules)) {
      markContentViewed(selectedModule.id, learningModules)
      setProgress(initializeProgress(learningModules))
    }
  }, [mounted, selectedModule])

  const totalModules = learningModules.length
  const completedModules = progress ? Object.values(progress.modules).filter(
    (m) => m.progress === 'completed'
  ).length : 0

  return (
    <div className="min-h-screen">
      <div className="container-custom section-spacing">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4">
              Lerninhalte
            </h1>
            <p className="text-large mb-6">
              Strukturierte Lernmodule mit Theorie, Videos und klaren Lernzielen
            </p>
            {mounted && totalModules > 0 && (
              <ProgressIndicator current={completedModules} total={totalModules} />
            )}
          </div>

          {/* Module Navigation */}
          {learningModules.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {learningModules
                  .sort((a, b) => a.order - b.order)
                  .map((module) => {
                    const state = getModuleState(module.id)
                    const isAccessible = isModuleAccessible(module.id, learningModules)
                    const isSelected = selectedModule?.id === module.id

                    return (
                      <button
                        key={module.id}
                        onClick={() => {
                          if (isAccessible) {
                            setSelectedModule(module)
                            window.history.pushState(
                              {},
                              '',
                              `/lerninhalte?module=${module.id}`
                            )
                          }
                        }}
                        disabled={!isAccessible}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-primary-600 text-white'
                            : isAccessible
                            ? 'bg-white border border-grey-200 text-grey-700 hover:bg-grey-50'
                            : 'bg-grey-100 border border-grey-200 text-grey-400 cursor-not-allowed'
                        }`}
                      >
                        Modul {module.order}
                      </button>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Selected Module */}
          {selectedModule && isModuleAccessible(selectedModule.id, learningModules) ? (
            <Card>
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                    Modul {selectedModule.order}
                  </span>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-grey-900">
                      {selectedModule.title}
                    </h2>
                    <p className="text-grey-600 text-base leading-relaxed">{selectedModule.description}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg prose-slate max-w-none mb-8 bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-grey-900 leading-relaxed text-base">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-grey-900 mt-8 mb-4 first:mt-0" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-grey-900 mt-8 mb-4 first:mt-0" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-grey-900 mt-6 mb-3" {...props} />,
                      h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-grey-900 mt-4 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="text-base text-grey-700 leading-7 mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-grey-700" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-grey-700" {...props} />,
                      li: ({node, ...props}) => <li className="text-base leading-7" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-grey-900" {...props} />,
                      code: ({node, ...props}) => <code className="font-mono text-sm bg-grey-100 text-primary-700 px-2 py-1 rounded font-medium" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-grey-900 text-grey-50 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm leading-6" {...props} />,
                    }}
                  >
                    {selectedModule.content}
                  </ReactMarkdown>
                </div>
              </div>

              {selectedModule.videoUrl && (
                <div className="mb-8">
                  <div className="aspect-video rounded-lg overflow-hidden bg-grey-900 border border-grey-200">
                    <iframe
                      src={selectedModule.videoUrl}
                      title={selectedModule.title}
                      className="w-full h-full"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-grey-200 pt-6">
                <h3 className="mb-5 text-xl font-semibold text-grey-900">
                  Lernziele
                </h3>
                <ul className="space-y-3">
                  {selectedModule.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 font-bold mt-0.5 flex-shrink-0 text-lg">✓</span>
                      <span className="text-base text-grey-700 leading-7">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Action */}
              <div className="border-t border-grey-200 pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-grey-600">
                    Theorie angesehen. Jetzt kannst du die Aufgabe lösen.
                  </p>
                  <Button href={`/aufgaben?module=${selectedModule.id}`}>
                    Zur Aufgabe
                  </Button>
                </div>
              </div>
            </Card>
          ) : selectedModule ? (
            <Card className="border-2 border-grey-300 bg-grey-50">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-grey-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mb-2">
                  Modul gesperrt
                </h3>
                <p className="text-grey-600 mb-6">
                  Schließe zuerst das vorherige Modul ab, um dieses Modul freizuschalten.
                </p>
                <Button href="/lernpfad">
                  Zum Lernpfad
                </Button>
              </div>
            </Card>
          ) : null}

          {learningModules.length === 0 && (
            <Card>
              <p className="text-center text-white/80 py-12">
                Noch keine Lerninhalte verfügbar. Weitere Module folgen in Kürze.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LerninhaltePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Lade...</div>}>
      <LerninhaltePageContent />
    </Suspense>
  )
}

