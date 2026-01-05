import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-medium text-white hover:bg-primary-dark hover:shadow-soft-lg focus:ring-primary-medium disabled:bg-grey-300 disabled:text-white disabled:cursor-not-allowed',
    secondary: 'bg-grey-600 text-white hover:bg-grey-700 hover:shadow-soft-lg focus:ring-grey-500 disabled:bg-grey-300 disabled:text-white disabled:cursor-not-allowed',
    outline: 'bg-white/80 backdrop-blur-sm border border-white/40 text-primary-medium hover:bg-white hover:shadow-soft focus:ring-primary-medium disabled:border-grey-300 disabled:text-grey-300 disabled:cursor-not-allowed',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed' : ''}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}

