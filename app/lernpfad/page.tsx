'use client'

import { useState, useEffect } from 'react'
import { learningModules } from '@/lib/data'
import {
  initializeProgress,
  getProgress,
  getModuleState,
  isModuleAccessible,
  unlockAllModules,
  ModuleState,
  type LearningPathProgress,
} from '@/lib/learningPath'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import Link from 'next/link'

function getStateIcon(state: ModuleState) {
  switch (state) {
    case 'completed':
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    case 'active':
      return (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary-600"></div>
        </div>
      )
    case 'locked':
      return (
        <div className="w-8 h-8 rounded-full bg-grey-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )
  }
}

function getStateLabel(state: ModuleState) {
  switch (state) {
    case 'completed':
      return 'Abgeschlossen'
    case 'active':
      return 'Aktiv'
    case 'locked':
      return 'Gesperrt'
  }
}

function getStateColor(state: ModuleState) {
  switch (state) {
    case 'completed':
      return 'glass-card'
    case 'active':
      return 'glass-card ring-2 ring-primary-medium/20'
    case 'locked':
      return 'bg-white/15 opacity-50 cursor-not-allowed hover:translate-y-0'
  }
}

export default function LernpfadPage() {
  const [progress, setProgress] = useState<LearningPathProgress | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Unlock all modules on mount
    unlockAllModules(learningModules)
    // Refresh progress on mount
    setProgress(initializeProgress(learningModules))
  }, [])

  // Use empty progress during SSR
  const currentProgress = progress || {
    modules: {},
    lastActiveModuleId: null,
    overallProgress: 0,
  }

  const sortedModules = [...learningModules].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen">
      <div className="container-custom section-spacing">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4">
              Lernpfad
            </h1>
            <p className="text-large mb-6">
              Strukturierter Lernweg durch alle Module. Arbeite die Module in der vorgegebenen Reihenfolge durch.
            </p>
            <ProgressIndicator current={currentProgress.overallProgress} total={100} isPercentage={true} />
            {mounted && (
              <p className="text-sm text-white/80 mt-3 text-center">
                {currentProgress.overallProgress}% abgeschlossen
              </p>
            )}
          </div>

          {/* Module List */}
          <div className="space-y-4">
            {sortedModules.map((module, index) => {
              const moduleProgress = currentProgress.modules[module.id]
              // All modules are unlocked by default
              let state = moduleProgress?.state || 'active'
              // Ensure modules are never locked
              if (state === 'locked') {
                state = 'active'
              }
              const isAccessible = isModuleAccessible(module.id, learningModules)
              const isActive = state === 'active'
              const isCompleted = state === 'completed'

              const canClick = true // All modules are accessible

              return (
                <Card
                  key={module.id}
                  className={`transition-all ${getStateColor(state)} ${
                    isActive ? 'ring-2 ring-primary-medium/30' : ''
                  } ${canClick ? 'cursor-pointer hover:shadow-soft-xl' : 'cursor-not-allowed'}`}
                  onClick={() => {
                    if (canClick) {
                      window.location.href = `/lerninhalte?module=${module.id}`
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getStateIcon(state)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Modul {module.order}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              isCompleted
                                ? 'bg-green-100 text-green-700'
                                : isActive
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-grey-100 text-grey-600'
                            }`}>
                              {getStateLabel(state)}
                            </span>
                          </div>
                          <h2 className="mb-2">
                            {module.title}
                          </h2>
                          <p className="text-grey-600 leading-relaxed">
                            {module.description}
                          </p>
                        </div>
                        {/* Play Button */}
                        {canClick && (
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-primary-medium rounded-2xl flex items-center justify-center hover:bg-primary-dark transition-all duration-200 shadow-soft-lg hover:shadow-soft-xl">
                              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Progress Details */}
                      {moduleProgress && (
                        <div className="flex items-center gap-4 text-sm text-grey-600 mb-4">
                          <div className="flex items-center gap-2">
                            {moduleProgress.contentViewed ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <div className="w-4 h-4 border-2 border-grey-300 rounded"></div>
                            )}
                            <span>Theorie angesehen</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {moduleProgress.challengeCompleted ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <div className="w-4 h-4 border-2 border-grey-300 rounded"></div>
                            )}
                            <span>Aufgabe gelöst</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {canClick ? (
                          <>
                            <Button href={`/lerninhalte?module=${module.id}`} size="sm">
                              Starten
                            </Button>
                            <Button href={`/aufgaben?module=${module.id}`} variant="outline" size="sm">
                              Aufgabe lösen
                            </Button>
                          </>
                        ) : (
                          <div className="text-sm text-grey-600 italic">
                            Schließe zuerst das vorherige Modul ab, um dieses Modul freizuschalten.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {sortedModules.length === 0 && (
            <Card>
              <p className="text-center text-grey-700 py-12">
                Noch keine Module verfügbar.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

