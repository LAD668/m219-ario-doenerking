// Learning Path Logic and State Management

import { LearningModule, Challenge } from './data'

export type ModuleState = 'locked' | 'active' | 'completed'
export type ModuleProgress = 'not-started' | 'in-progress' | 'completed'

export interface ModuleProgressData {
  moduleId: string
  state: ModuleState
  progress: ModuleProgress
  contentViewed: boolean
  challengeCompleted: boolean
  completedAt?: number // timestamp
}

export interface LearningPathProgress {
  modules: Record<string, ModuleProgressData>
  lastActiveModuleId: string | null
  overallProgress: number // 0-100
}

const STORAGE_KEY = 'ariano-learning-path-progress'

// Initialize progress for a module
export function initializeModuleProgress(moduleId: string, order: number): ModuleProgressData {
  return {
    moduleId,
    state: 'active', // All modules are unlocked by default
    progress: 'not-started',
    contentViewed: false,
    challengeCompleted: false,
  }
}

// Get all progress data from localStorage
export function getProgress(): LearningPathProgress {
  if (typeof window === 'undefined') {
    return {
      modules: {},
      lastActiveModuleId: null,
      overallProgress: 0,
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return {
      modules: {},
      lastActiveModuleId: null,
      overallProgress: 0,
    }
  }

  try {
    return JSON.parse(stored)
  } catch {
    return {
      modules: {},
      lastActiveModuleId: null,
      overallProgress: 0,
    }
  }
}

// Save progress to localStorage
export function saveProgress(progress: LearningPathProgress): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

// Initialize progress for all modules (server-safe version)
export function initializeProgress(modules: LearningModule[]): LearningPathProgress {
  // On server, return empty progress
  if (typeof window === 'undefined') {
    const modulesProgress: Record<string, ModuleProgressData> = {}
    modules.forEach((module) => {
      modulesProgress[module.id] = initializeModuleProgress(module.id, module.order)
    })
    return {
      modules: modulesProgress,
      lastActiveModuleId: null,
      overallProgress: 0,
    }
  }

  const currentProgress = getProgress()
  const modulesProgress: Record<string, ModuleProgressData> = {}

  modules.forEach((module) => {
    if (currentProgress.modules[module.id]) {
      // Keep existing progress
      modulesProgress[module.id] = currentProgress.modules[module.id]
    } else {
      // Initialize new module
      modulesProgress[module.id] = initializeModuleProgress(module.id, module.order)
    }
  })

  // Update states based on completion
  updateModuleStates(modulesProgress, modules)

  const completedCount = Object.values(modulesProgress).filter(
    (m) => m.progress === 'completed'
  ).length

  return {
    modules: modulesProgress,
    lastActiveModuleId: currentProgress.lastActiveModuleId || modules[0]?.id || null,
    overallProgress: modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0,
  }
}

// Update module states based on completion rules
export function updateModuleStates(
  modulesProgress: Record<string, ModuleProgressData>,
  modules: LearningModule[]
): void {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order)

  sortedModules.forEach((module, index) => {
    const progress = modulesProgress[module.id]
    if (!progress) return

    // All modules are unlocked by default - set to active if not completed
    if (progress.state === 'locked') {
      progress.state = 'active'
      if (progress.progress === 'not-started') {
        progress.progress = 'in-progress'
      }
    }

    // Check if module is completed
    const isCompleted = progress.contentViewed && progress.challengeCompleted

    if (isCompleted) {
      progress.progress = 'completed'
      progress.state = 'completed'
      if (!progress.completedAt) {
        progress.completedAt = Date.now()
      }
    } else if (progress.state === 'active') {
      // Update progress based on what's been done
      if (progress.contentViewed || progress.challengeCompleted) {
        progress.progress = 'in-progress'
      }
    }
  })
}

// Mark content as viewed
export function markContentViewed(moduleId: string, modules: LearningModule[]): void {
  const progress = getProgress()
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = initializeModuleProgress(
      moduleId,
      modules.find((m) => m.id === moduleId)?.order || 1
    )
  }

  progress.modules[moduleId].contentViewed = true
  progress.lastActiveModuleId = moduleId

  updateModuleStates(progress.modules, modules)

  const completedCount = Object.values(progress.modules).filter(
    (m) => m.progress === 'completed'
  ).length
  progress.overallProgress =
    modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0

  saveProgress(progress)
}

// Mark challenge as completed
export function markChallengeCompleted(moduleId: string, modules: LearningModule[]): void {
  const progress = getProgress()
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = initializeModuleProgress(
      moduleId,
      modules.find((m) => m.id === moduleId)?.order || 1
    )
  }

  progress.modules[moduleId].challengeCompleted = true
  progress.lastActiveModuleId = moduleId

  updateModuleStates(progress.modules, modules)

  const completedCount = Object.values(progress.modules).filter(
    (m) => m.progress === 'completed'
  ).length
  progress.overallProgress =
    modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0

  saveProgress(progress)
}

// Get module state
export function getModuleState(moduleId: string, modules?: LearningModule[]): ModuleState {
  const progress = getProgress()
  const state = progress.modules[moduleId]?.state
  
  // All modules are unlocked by default - return active if no state exists
  if (!state) {
    return 'active'
  }
  
  return state
}

// Get module progress
export function getModuleProgress(moduleId: string): ModuleProgress {
  const progress = getProgress()
  return progress.modules[moduleId]?.progress || 'not-started'
}

// Check if module is accessible
export function isModuleAccessible(moduleId: string, modules?: LearningModule[]): boolean {
  // All modules are accessible by default
  return true
}

// Get overall progress percentage
export function getOverallProgress(modules: LearningModule[]): number {
  const progress = getProgress()
  if (modules.length === 0) return 0

  const completedCount = Object.values(progress.modules).filter(
    (m) => m.progress === 'completed'
  ).length

  return Math.round((completedCount / modules.length) * 100)
}

// Reset all progress (for testing/debugging)
export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Unlock all modules (set all locked modules to active)
export function unlockAllModules(modules: LearningModule[]): void {
  const progress = getProgress()
  
  modules.forEach((module) => {
    if (!progress.modules[module.id]) {
      progress.modules[module.id] = initializeModuleProgress(module.id, module.order)
    } else {
      // Unlock if locked
      if (progress.modules[module.id].state === 'locked') {
        progress.modules[module.id].state = 'active'
        if (progress.modules[module.id].progress === 'not-started') {
          progress.modules[module.id].progress = 'in-progress'
        }
      }
    }
  })
  
  updateModuleStates(progress.modules, modules)
  saveProgress(progress)
}

