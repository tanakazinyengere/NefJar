import { motion } from 'framer-motion'

type Status = 'healthy' | 'warning' | 'critical' | 'neutral'

interface StatusIndicatorProps {
  status: Status
  label: string
  size?: 'sm' | 'md'
}

const statusConfig = {
  healthy: { color: 'bg-success', text: 'text-success', label: 'Healthy' },
  warning: { color: 'bg-warning', text: 'text-warning', label: 'Attention' },
  critical: { color: 'bg-danger', text: 'text-danger', label: 'Critical' },
  neutral: { color: 'bg-text-tertiary', text: 'text-text-tertiary', label: 'Unknown' },
}

export default function StatusIndicator({ status, label, size = 'md' }: StatusIndicatorProps) {
  const config = statusConfig[status]
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`rounded-full ${dotSize} ${config.color}`}
        />
        {status === 'healthy' && (
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${dotSize} ${config.color}`}
          />
        )}
      </span>
      <span className={`text-[13px] font-medium ${config.text}`}>
        {label || config.label}
      </span>
    </div>
  )
}
