interface ProgressIndicatorProps {
  current: number
  total: number
  showLabel?: boolean
  isPercentage?: boolean
}

export default function ProgressIndicator({ 
  current, 
  total, 
  showLabel = true,
  isPercentage = false 
}: ProgressIndicatorProps) {
  const percentage = isPercentage 
    ? Math.min(100, Math.max(0, current))
    : Math.min(100, Math.max(0, (current / total) * 100))

  return (
    <div className="space-y-3">
        {showLabel && !isPercentage && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80">Fortschritt</span>
            <span className="text-white font-medium">{current} von {total} Modulen</span>
          </div>
        )}
      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 shadow-soft">
        <div
          className="bg-white h-3 rounded-full transition-all duration-500 shadow-soft"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

