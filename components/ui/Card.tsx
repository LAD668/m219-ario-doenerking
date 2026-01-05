import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export default function Card({ children, className = '', hover = false, glass = true }: CardProps) {
  return (
    <div
      className={`${
        glass ? 'glass-card' : 'bg-white rounded-3xl shadow-soft-lg'
      } p-6 ${
        hover ? 'hover:shadow-soft-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

