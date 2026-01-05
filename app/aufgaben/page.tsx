'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { challenges, learningModules, validateCodeSolution } from '@/lib/data'
import {
  initializeProgress,
  markChallengeCompleted,
  getModuleState,
  isModuleAccessible,
} from '@/lib/learningPath'
import Card from '@/components/ui/Card'
import CodeEditor from '@/components/ui/CodeEditor'
import Button from '@/components/ui/Button'

function AufgabenPageContent() {
  const searchParams = useSearchParams()
  const moduleId = searchParams.get('module')
  const [progress, setProgress] = useState<ReturnType<typeof initializeProgress> | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)
    setProgress(initializeProgress(learningModules))
  }, [])

  // Filter challenges by module if moduleId is provided
  const availableChallenges = moduleId
    ? challenges.filter((c) => c.moduleId === moduleId)
    : challenges

  // Filter to only show challenges for accessible modules
  const accessibleChallenges = mounted ? availableChallenges.filter((challenge) =>
    isModuleAccessible(challenge.moduleId, learningModules)
  ) : availableChallenges

  // Auto-select first challenge if module is specified
  useEffect(() => {
    if (mounted && moduleId && accessibleChallenges.length > 0 && !selectedChallenge) {
      setSelectedChallenge(accessibleChallenges[0].id)
    }
  }, [mounted, moduleId, accessibleChallenges, selectedChallenge])

  const handleCodeSubmit = async (challengeId: string, code: string): Promise<{ success: boolean; message: string }> => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge || !challenge.solution) {
      return {
        success: false,
        message: 'Lösung konnte nicht validiert werden.',
      }
    }

    const isValid = validateCodeSolution(code, challenge.solution)
    
    if (isValid) {
      // Mark challenge as completed
      markChallengeCompleted(challenge.moduleId, learningModules)
      setProgress(initializeProgress(learningModules))
      
      return {
        success: true,
        message: 'Herzlichen Glückwunsch! Deine Lösung ist korrekt. Das Modul wurde als abgeschlossen markiert.',
      }
    } else {
      return {
        success: false,
        message: 'Deine Lösung ist noch nicht korrekt. Versuche es erneut!',
      }
    }
  }

  const handleQuizSubmit = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge || challenge.quizCorrectAnswer === undefined) return

    const userAnswer = quizAnswers[challengeId]
    const isCorrect = userAnswer === challenge.quizCorrectAnswer
    
    setQuizResults((prev) => ({ ...prev, [challengeId]: isCorrect }))

    // If correct, mark challenge as completed
    if (isCorrect) {
      markChallengeCompleted(challenge.moduleId, learningModules)
      if (mounted) {
        setProgress(initializeProgress(learningModules))
      }
    }
  }

  const getModuleTitle = (moduleId: string) => {
    return learningModules.find((m) => m.id === moduleId)?.title || 'Unbekanntes Modul'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-grey-100 text-grey-700'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Einfach'
      case 'medium':
        return 'Mittel'
      case 'hard':
        return 'Schwer'
      default:
        return difficulty
    }
  }

  const currentProgress = progress || {
    modules: {},
    lastActiveModuleId: null,
    overallProgress: 0,
  }

  const currentModule = moduleId
    ? learningModules.find((m) => m.id === moduleId)
    : null

  // Check if all challenges for current module are completed
  const moduleChallenges = moduleId
    ? accessibleChallenges.filter((c) => c.moduleId === moduleId)
    : []
  
  const allChallengesCompleted = mounted && moduleId && moduleChallenges.length > 0
    ? moduleChallenges.every((challenge) => {
        // Check if challenge was completed (code or quiz)
        const moduleProgress = currentProgress.modules[moduleId]
        return moduleProgress?.challengeCompleted === true
      })
    : false

  const moduleProgress = moduleId ? currentProgress.modules[moduleId] : null
  const isModuleCompleted = mounted && moduleProgress?.progress === 'completed'

  return (
    <div className="min-h-screen">
      <div className="container-custom section-spacing">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="mb-4">
              Aufgaben & Herausforderungen
            </h1>
            <p className="text-large mb-4">
              Übe dein Wissen mit praktischen Aufgaben, Quizfragen und Programmieraufgaben
            </p>
            {currentModule && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {currentModule.title}
                  </span>
                  {isModuleCompleted && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Fertig
                    </span>
                  )}
                </div>
                <Button href="/aufgaben" variant="outline" size="sm">
                  Alle Aufgaben
                </Button>
              </div>
            )}
          </div>

          {/* Module Completion Banner */}
          {moduleId && isModuleCompleted && (
            <Card className="mb-8 border-2 border-green-200 bg-green-50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Modul abgeschlossen! 🎉
                  </h3>
                  <p className="text-green-800 mb-4 leading-relaxed">
                    Du hast alle Aufgaben dieses Moduls erfolgreich gelöst. Das nächste Modul ist jetzt freigeschaltet.
                  </p>
                  <div className="flex gap-3">
                    <Button href="/lernpfad" size="sm">
                      Zum Lernpfad
                    </Button>
                    {currentModule && learningModules.find((m) => m.order === currentModule.order + 1) && (
                      <Button 
                        href={`/aufgaben?module=${learningModules.find((m) => m.order === currentModule.order + 1)?.id}`}
                        variant="outline"
                        size="sm"
                      >
                        Nächstes Modul
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {accessibleChallenges.length === 0 ? (
            <Card className="border-2 border-grey-300 bg-grey-50">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-grey-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mb-2">
                  Keine Aufgaben verfügbar
                </h3>
                <p className="text-grey-600 mb-6">
                  {moduleId
                    ? 'Dieses Modul ist noch gesperrt. Schließe zuerst das vorherige Modul ab.'
                    : 'Es sind noch keine Aufgaben verfügbar. Beginne mit dem ersten Modul.'}
                </p>
                <Button href="/lernpfad">
                  Zum Lernpfad
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar mit Aufgabenliste */}
              <div className="lg:col-span-1">
                <Card>
                  <h2 className="text-xl font-semibold text-grey-900 mb-4">
                    Verfügbare Aufgaben
                  </h2>
                  <div className="space-y-2">
                    {accessibleChallenges.map((challenge) => (
                      <button
                        key={challenge.id}
                        onClick={() => setSelectedChallenge(challenge.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedChallenge === challenge.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-grey-200 hover:border-primary-300 hover:bg-grey-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-grey-900 text-sm">
                            {challenge.title}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(
                              challenge.difficulty
                            )}`}
                          >
                            {getDifficultyLabel(challenge.difficulty)}
                          </span>
                        </div>
                        <p className="text-xs text-grey-600">
                          {getModuleTitle(challenge.moduleId)}
                        </p>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Hauptbereich mit Aufgabe */}
              <div className="lg:col-span-2">
                {selectedChallenge ? (
                  (() => {
                    const challenge = challenges.find((c) => c.id === selectedChallenge)
                    if (!challenge) return null

                    return (
                      <Card>
                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor(
                                challenge.difficulty
                              )}`}
                            >
                              {getDifficultyLabel(challenge.difficulty)}
                            </span>
                            <span className="text-sm text-grey-600">
                              {getModuleTitle(challenge.moduleId)}
                            </span>
                          </div>
                          <h2 className="mb-3">
                            {challenge.title}
                          </h2>
                          <p className="text-grey-700 leading-relaxed">{challenge.description}</p>
                        </div>

                        {challenge.type === 'code' && (
                          <div className="mt-8">
                            <h3 className="mb-6">
                              Deine Lösung
                            </h3>
                            <CodeEditor
                              initialValue="" // Start with empty editor - students must write their own code
                              language={challenge.language || 'javascript'}
                              onSubmit={(code) => handleCodeSubmit(challenge.id, code)}
                            />
                          </div>
                        )}

                        {challenge.type === 'multiple-choice' && challenge.quizQuestion && (
                          <div className="mt-8">
                            <h3 className="mb-6">
                              Quizfrage
                            </h3>
                            <div className="space-y-6">
                              <p className="text-lg text-grey-900 font-medium leading-relaxed">
                                {challenge.quizQuestion}
                              </p>
                              <div className="space-y-3">
                                {challenge.quizOptions?.map((option, index) => (
                                  <label
                                    key={index}
                                    className="flex items-start gap-3 p-4 border border-grey-200 rounded-lg hover:bg-grey-50 hover:border-primary-300 cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="radio"
                                      name={`quiz-${challenge.id}`}
                                      value={index}
                                      checked={quizAnswers[challenge.id] === index}
                                      onChange={() =>
                                        setQuizAnswers((prev) => ({
                                          ...prev,
                                          [challenge.id]: index,
                                        }))
                                      }
                                      className="mt-1 flex-shrink-0"
                                    />
                                    <span className="text-grey-700 leading-relaxed">{option}</span>
                                  </label>
                                ))}
                              </div>
                              <button
                                onClick={() => handleQuizSubmit(challenge.id)}
                                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                              >
                                Antwort einreichen
                              </button>
                              {quizResults[challenge.id] !== undefined && (
                                <div
                                  className={`p-4 rounded-lg border ${
                                    quizResults[challenge.id]
                                      ? 'bg-green-50 border-green-200 text-green-800'
                                      : 'bg-red-50 border-red-200 text-red-800'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <span className={`text-lg font-semibold flex-shrink-0 ${
                                      quizResults[challenge.id] ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                      {quizResults[challenge.id] ? '✓' : '✗'}
                                    </span>
                                    <p className="font-medium leading-relaxed">
                                      {quizResults[challenge.id]
                                        ? 'Richtig! Herzlichen Glückwunsch! Das Modul wurde als abgeschlossen markiert.'
                                        : 'Leider falsch. Versuche es erneut!'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Module Completion Message */}
                        {(() => {
                          const moduleProgress = currentProgress.modules[challenge.moduleId]
                          const isModuleCompleted = mounted && moduleProgress?.progress === 'completed'
                          
                          if (isModuleCompleted) {
                            return (
                              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <div>
                                    <p className="font-semibold text-green-800 mb-1">
                                      Modul abgeschlossen!
                                    </p>
                                    <p className="text-sm text-green-700 mb-3">
                                      Du hast dieses Modul erfolgreich abgeschlossen. Das nächste Modul ist jetzt freigeschaltet.
                                    </p>
                                    <Button href="/lernpfad" size="sm">
                                      Zum Lernpfad
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })()}
                      </Card>
                    )
                  })()
                ) : (
                  <Card>
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="mb-3">
                        Wähle eine Aufgabe aus
                      </h3>
                      <p className="text-grey-700 max-w-md mx-auto">
                        Klicke auf eine Aufgabe in der Liste, um zu beginnen
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AufgabenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Lade...</div>}>
      <AufgabenPageContent />
    </Suspense>
  )
}
