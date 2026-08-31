import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  delay?: number
}

export default function Card({ children, className = '', hover = false, onClick, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover || onClick ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' } : undefined}
      onClick={onClick}
      className={`
        bg-surface rounded-xl border border-border
        transition-all duration-200
        ${hover || onClick ? 'cursor-pointer hover:border-border-light' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
