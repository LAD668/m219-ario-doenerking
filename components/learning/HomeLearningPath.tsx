'use client'

import { useEffect, useState } from 'react'
import { learningModules } from '@/lib/data'
import {
  initializeProgress,
  getModuleState,
  isModuleAccessible,
  unlockAllModules,
  ModuleState,
} from '@/lib/learningPath'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface HomeLearningPathProps {
  className?: string
}

function getModuleIcon(state: ModuleState, order: number) {
  switch (state) {
    case 'completed':
      return (
        <div className="w-14 h-14 rounded-2xl bg-primary-medium flex items-center justify-center shadow-soft-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    case 'active':
      return (
        <div className="w-14 h-14 rounded-2xl bg-primary-medium flex items-center justify-center shadow-soft-xl ring-4 ring-primary-light/50">
          <span className="text-white font-bold text-xl">{order}</span>
        </div>
      )
    case 'locked':
      return (
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )
  }
}

function getModuleCardClass(state: ModuleState, isAccessible: boolean) {
  const base = 'relative glass-card p-8'
  
  switch (state) {
    case 'completed':
      return `${base} ${isAccessible ? 'cursor-pointer' : ''}`
    case 'active':
      return `${base} ring-2 ring-primary-medium/20 ${isAccessible ? 'cursor-pointer' : ''}`
    case 'locked':
      return `${base} bg-white/15 opacity-50 cursor-not-allowed hover:translate-y-0`
  }
}

export default function HomeLearningPath({ className = '' }: HomeLearningPathProps) {
  const [progress, setProgress] = useState<ReturnType<typeof initializeProgress> | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Unlock all modules on mount
    unlockAllModules(learningModules)
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

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="glass-card p-8 mb-6">
          <h2 className="mb-4 text-on-glass">
            Dein Lernpfad
          </h2>
          <p className="text-large mb-6">
            {completedCount} von {sortedModules.length} Modulen abgeschlossen
          </p>
          <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-4 backdrop-blur-sm">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500 shadow-soft"
              style={{ width: `${(completedCount / sortedModules.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Connection Lines */}
          {sortedModules.length > 1 && (
            <div className="absolute left-7 top-14 w-1 rounded-full" style={{ height: `${(sortedModules.length - 1) * 100}%` }}>
              {sortedModules.map((module, index) => {
                if (index === sortedModules.length - 1) return null
                const state = getModuleState(module.id, learningModules)
                const nextState = getModuleState(sortedModules[index + 1].id, learningModules)
                const isCompleted = state === 'completed'
                // All modules are unlocked, so lines are always visible
                const lineColor = isCompleted ? 'bg-white/60' : 'bg-white/40'
                
                return (
                  <div
                    key={`line-${module.id}`}
                    className={`absolute w-full h-32 ${lineColor} transition-colors duration-300 rounded-full`}
                    style={{ top: `${index * 100}%` }}
                  />
                )
              })}
            </div>
          )}

          {/* Modules */}
          <div className="relative space-y-8">
            {sortedModules.map((module, index) => {
              const state = mounted ? getModuleState(module.id, learningModules) : 'active'
              const isAccessible = mounted ? isModuleAccessible(module.id, learningModules) : true
              const isActive = state === 'active'
              const isCompleted = state === 'completed'

              return (
                <div key={module.id} className="relative flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    {getModuleIcon(state, module.order)}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pt-1">
                    <div
                      className={getModuleCardClass(state, isAccessible)}
                      onClick={() => {
                        if (isAccessible) {
                          window.location.href = `/lerninhalte?module=${module.id}`
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-grey-500 uppercase tracking-wide">
                              Modul {module.order}
                            </span>
                            {isActive && (
                              <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">
                                Aktiv
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                Abgeschlossen
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-on-glass mb-3">
                            {module.title}
                          </h3>
                          <p className="text-sm text-grey-700 leading-relaxed">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      {isAccessible && (
                        <div className="mt-4 pt-4 border-t border-grey-100">
                          <Button
                            href={`/lerninhalte?module=${module.id}`}
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            {isCompleted ? 'Wiederholen' : 'Jetzt starten'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Button href="/lernpfad" size="lg">
          Vollständigen Lernpfad anzeigen
        </Button>
      </div>
    </div>
  )
}

