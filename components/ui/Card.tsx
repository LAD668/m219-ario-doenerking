import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', hover = false, glass = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`${
        glass ? 'glass-card' : 'bg-white rounded-3xl shadow-soft-lg'
      } p-6 ${
        hover ? 'hover:shadow-soft-xl' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

