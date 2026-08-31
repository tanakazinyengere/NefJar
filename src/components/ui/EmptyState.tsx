import { motion } from 'framer-motion'
import Button from './Button'
import type { ReactNode } from 'react'

// Per Empty State Mastery System — 10 distinct empty state types
type EmptyStateType =
  | 'first-use'       // Type A: User has never used the feature
  | 'creation'        // Type B: User needs to create something
  | 'collection'      // Type C: Place for saved content, nothing saved yet
  | 'search'          // Search returned zero results
  | 'filter'          // Filters exclude all results
  | 'permission'      // Content requires permission
  | 'offline'         // Network unavailable
  | 'completed'       // User has completed everything (positive empty)
  | 'error'           // Request failed (NOT an empty state — different treatment)
  | 'temporary'       // Process in progress, content loading

interface EmptyStateProps {
  type?: EmptyStateType
  icon?: ReactNode
  /** Eyebrow label above the title — identifies the category */
  eyebrow?: string
  title: string
  description: string
  instruction?: string
  primaryAction?: { label: string; onClick: () => void; icon?: ReactNode }
  secondaryAction?: { label: string; onClick: () => void }
  tertiaryAction?: { label: string; onClick: () => void }
  exampleContent?: ReactNode
  className?: string
}

// Semantic color mapping per COLOR SYSTEM spec
const typeConfig: Record<EmptyStateType, {
  bg: string
  iconBg: string
  iconColor: string
  eyebrow: string
  accentBorder: string
}> = {
  'first-use': {
    bg: 'bg-status-info-surface',
    iconBg: 'bg-status-info-surface',
    iconColor: 'text-status-info',
    eyebrow: 'text-status-info',
    accentBorder: 'border-status-info-border',
  },
  creation: {
    bg: 'bg-status-info-surface',
    iconBg: 'bg-status-info-surface',
    iconColor: 'text-status-info',
    eyebrow: 'text-status-info',
    accentBorder: 'border-status-info-border',
  },
  collection: {
    bg: 'bg-bg-surface-hover',
    iconBg: 'bg-bg-surface-hover',
    iconColor: 'text-text-tertiary',
    eyebrow: 'text-text-tertiary',
    accentBorder: 'border-border-default',
  },
  search: {
    bg: 'bg-status-warning-surface',
    iconBg: 'bg-status-warning-surface',
    iconColor: 'text-status-warning',
    eyebrow: 'text-status-warning',
    accentBorder: 'border-status-warning-border',
  },
  filter: {
    bg: 'bg-status-warning-surface',
    iconBg: 'bg-status-warning-surface',
    iconColor: 'text-status-warning',
    eyebrow: 'text-status-warning',
    accentBorder: 'border-status-warning-border',
  },
  permission: {
    bg: 'bg-status-error-surface',
    iconBg: 'bg-status-error-surface',
    iconColor: 'text-status-error',
    eyebrow: 'text-status-error',
    accentBorder: 'border-status-error-border',
  },
  offline: {
    bg: 'bg-bg-surface-hover',
    iconBg: 'bg-bg-surface-hover',
    iconColor: 'text-text-tertiary',
    eyebrow: 'text-text-tertiary',
    accentBorder: 'border-border-default',
  },
  completed: {
    bg: 'bg-status-success-surface',
    iconBg: 'bg-status-success-surface',
    iconColor: 'text-status-success',
    eyebrow: 'text-status-success',
    accentBorder: 'border-status-success-border',
  },
  error: {
    bg: 'bg-status-error-surface',
    iconBg: 'bg-status-error-surface',
    iconColor: 'text-status-error',
    eyebrow: 'text-status-error',
    accentBorder: 'border-status-error-border',
  },
  temporary: {
    bg: 'bg-bg-surface-hover',
    iconBg: 'bg-bg-surface-hover',
    iconColor: 'text-text-tertiary',
    eyebrow: 'text-text-tertiary',
    accentBorder: 'border-border-default',
  },
}

// Contextual eyebrow labels per state
const defaultEyebrows: Record<EmptyStateType, string> = {
  'first-use': 'Getting started',
  creation: 'Create your first',
  collection: 'Nothing here yet',
  search: 'No results found',
  filter: 'No matches with these filters',
  permission: 'Access required',
  offline: 'You\'re offline',
  completed: 'All caught up',
  error: 'Something went wrong',
  temporary: 'Loading...',
}

export default function EmptyState({
  type = 'creation',
  icon,
  eyebrow,
  title,
  description,
  instruction,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  exampleContent,
  className = '',
}: EmptyStateProps) {
  const config = typeConfig[type]
  const displayEyebrow = eyebrow || defaultEyebrows[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col items-center justify-center py-16 px-8 ${className}`}
      role="status"
      aria-label={`${title}. ${description}`}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center mb-5`}
        >
          <div className={config.iconColor}>{icon}</div>
        </motion.div>
      )}

      {/* Eyebrow */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className={`text-[11px] font-semibold uppercase tracking-wider ${config.eyebrow} mb-2`}
      >
        {displayEyebrow}
      </motion.span>

      {/* Title — semantic heading for accessibility */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-[18px] font-semibold text-text-primary text-center mb-2"
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[14px] text-text-secondary text-center max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {/* Instruction — micro-instruction per spec */}
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

      {/* Example content — "Show Me" principle */}
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

      {/* CTA hierarchy — primary, secondary, tertiary */}
      {(primaryAction || secondaryAction || tertiaryAction) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
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
          {tertiaryAction && (
            <button
              onClick={tertiaryAction.onClick}
              className="text-[13px] text-text-link hover:underline cursor-pointer btn-touch-target"
            >
              {tertiaryAction.label}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
