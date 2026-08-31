import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'accent' | 'success' | 'warning' | 'danger'
  height?: number
  showLabel?: boolean
  delay?: number
}

const colorMap = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'accent',
  height = 6,
  showLabel = false,
  delay = 0,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[12px] text-text-secondary font-medium">{value} / {max}</span>
          <span className="text-[12px] text-text-tertiary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-border-light overflow-hidden"
        style={{ height }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
          className={`h-full rounded-full ${colorMap[color]}`}
        />
      </div>
    </div>
  )
}
