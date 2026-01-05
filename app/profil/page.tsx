'use client'

import { useState, useEffect } from 'react'
import { learningModules } from '@/lib/data'
import { initializeProgress } from '@/lib/learningPath'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressIndicator from '@/components/ui/ProgressIndicator'

export default function ProfilPage() {
  const [progress, setProgress] = useState<ReturnType<typeof initializeProgress> | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setProgress(initializeProgress(learningModules))
  }, [])

  const sortedModules = [...learningModules].sort((a, b) => a.order - b.order)
  const currentProgress = progress || {
    modules: {},
    lastActiveModuleId: null,
    overallProgress: 0,
  }
  const completedCount = mounted ? Object.values(currentProgress.modules).filter(
    (m) => m.progress === 'completed'
  ).length : 0

  const totalChallenges = sortedModules.length * 2 // Approximate
  const completedChallenges = mounted ? Object.values(currentProgress.modules).filter(
    (m) => m.challengeCompleted
  ).length : 0

  return (
    <div className="min-h-screen">
      <div className="container-custom section-spacing">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-3xl bg-primary-medium mx-auto mb-6 flex items-center justify-center shadow-soft-lg">
                <span className="text-white font-bold text-4xl">E</span>
              </div>
              <h1 className="mb-3">
                Dein Profil
              </h1>
              <p className="text-large">
                Übersicht über deinen Lernfortschritt
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-2">
                  {mounted ? completedCount : 0}
                </div>
                <div className="text-sm text-grey-600">
                  Module abgeschlossen
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-2">
                  {mounted ? completedChallenges : 0}
                </div>
                <div className="text-sm text-grey-600">
                  Aufgaben gelöst
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-medium mb-2">
                  {mounted ? currentProgress.overallProgress : 0}%
                </div>
                <div className="text-sm text-grey-600">
                  Gesamtfortschritt
                </div>
              </div>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card className="mb-12">
            <h2 className="mb-6">
              Lernfortschritt
            </h2>
            {mounted && (
              <div className="mb-6">
                <ProgressIndicator 
                  current={currentProgress.overallProgress} 
                  total={100} 
                  isPercentage={true}
                  showLabel={false}
                />
                <p className="text-sm text-grey-600 mt-3 text-center">
                  {completedCount} von {sortedModules.length} Modulen abgeschlossen
                </p>
              </div>
            )}
          </Card>

          {/* Module Overview */}
          <Card>
            <h2 className="mb-6">
              Module-Übersicht
            </h2>
            <div className="space-y-4">
              {sortedModules.map((module) => {
                const moduleProgress = currentProgress.modules[module.id]
                const isCompleted = moduleProgress?.progress === 'completed'
                const isInProgress = moduleProgress?.progress === 'in-progress'

                return (
                  <div
                    key={module.id}
                    className="p-4 rounded-2xl bg-grey-50 border border-grey-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCompleted
                            ? 'bg-primary-medium text-white'
                            : isInProgress
                            ? 'bg-primary-light text-primary-medium'
                            : 'bg-grey-200 text-grey-500'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="font-bold text-sm">{module.order}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-grey-900 mb-1">
                            {module.title}
                          </h3>
                          <p className="text-sm text-grey-600">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-grey-700 mb-1">
                          {isCompleted ? 'Abgeschlossen' : isInProgress ? 'In Bearbeitung' : 'Nicht gestartet'}
                        </div>
                        {moduleProgress && (
                          <div className="flex items-center gap-2 text-xs text-grey-500">
                            {moduleProgress.contentViewed && (
                              <span className="text-green-600">✓ Theorie</span>
                            )}
                            {moduleProgress.challengeCompleted && (
                              <span className="text-green-600">✓ Aufgabe</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="mt-12 text-center">
            <Button href="/lernpfad" size="lg">
              Zum Lernpfad
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

