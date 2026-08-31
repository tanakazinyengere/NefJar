import { motion } from 'framer-motion'
import Button from './Button'
import type { ReactNode } from 'react'

type EmptyStateType = 'first-use' | 'creation' | 'collection' | 'search' | 'filter' | 'permission' | 'offline' | 'completed' | 'error' | 'temporary'

interface EmptyStateProps {
  type?: EmptyStateType
  icon?: ReactNode
  title: string
  description: string
  instruction?: string
  primaryAction?: { label: string; onClick: () => void; icon?: ReactNode }
  secondaryAction?: { label: string; onClick: () => void }
  exampleContent?: ReactNode
  className?: string
}

const typeStyles: Record<EmptyStateType, { bg: string; iconBg: string; iconColor: string }> = {
  'first-use': { bg: 'bg-accent-light/30', iconBg: 'bg-accent-light', iconColor: 'text-accent' },
  creation: { bg: 'bg-accent-light/30', iconBg: 'bg-accent-light', iconColor: 'text-accent' },
  collection: { bg: 'bg-surface-hover', iconBg: 'bg-surface-hover', iconColor: 'text-text-tertiary' },
  search: { bg: 'bg-warning-light/30', iconBg: 'bg-warning-light', iconColor: 'text-warning' },
  filter: { bg: 'bg-warning-light/30', iconBg: 'bg-warning-light', iconColor: 'text-warning' },
  permission: { bg: 'bg-danger-light/30', iconBg: 'bg-danger-light', iconColor: 'text-danger' },
  offline: { bg: 'bg-surface-hover', iconBg: 'bg-surface-hover', iconColor: 'text-text-tertiary' },
  completed: { bg: 'bg-success-light/30', iconBg: 'bg-success-light', iconColor: 'text-success' },
  error: { bg: 'bg-danger-light/30', iconBg: 'bg-danger-light', iconColor: 'text-danger' },
  temporary: { bg: 'bg-surface-hover', iconBg: 'bg-surface-hover', iconColor: 'text-text-tertiary' },
}

export default function EmptyState({
  type = 'creation',
  icon,
  title,
  description,
  instruction,
  primaryAction,
  secondaryAction,
  exampleContent,
  className = '',
}: EmptyStateProps) {
  const style = typeStyles[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col items-center justify-center py-16 px-8 ${className}`}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`w-16 h-16 rounded-2xl ${style.iconBg} flex items-center justify-center mb-5`}
        >
          <div className={style.iconColor}>{icon}</div>
        </motion.div>
      )}

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-[18px] font-semibold text-text-primary text-center mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[14px] text-text-secondary text-center max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {instruction && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-[13px] text-text-tertiary text-center max-w-sm mt-2"
        >
          {instruction}
        </motion.p>
      )}

      {exampleContent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 mb-2"
        >
          {exampleContent}
        </motion.div>
      )}

      {(primaryAction || secondaryAction) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3 mt-6"
        >
          {primaryAction && (
            <Button onClick={primaryAction.onClick} size="md">
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick} size="md">
              {secondaryAction.label}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
