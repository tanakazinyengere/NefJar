import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface HealthScoreProps {
  score: number
  size?: number
  strokeWidth?: number
}

export default function HealthScore({ score, size = 120, strokeWidth = 8 }: HealthScoreProps) {
  const [mounted, setMounted] = useState(false)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  // Spring-animated score value
  const springScore = useSpring(0, { stiffness: 80, damping: 20, mass: 1 })
  const displayScore = useTransform(springScore, (v) => Math.round(v))
  const offset = useTransform(springScore, (v) => circumference - (v / 100) * circumference)

  const getColor = (s: number) => {
    if (s >= 90) return 'var(--color-status-success)'
    if (s >= 70) return 'var(--color-status-warning)'
    return 'var(--color-status-error)'
  }

  useEffect(() => {
    // Trigger spring animation after mount
    const timer = setTimeout(() => {
      springScore.set(score)
      setMounted(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [score, springScore])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-default)"
          strokeWidth={strokeWidth}
        />
        {/* Score ring — animated via spring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.6, delay: 0.2 }}
          className="text-[28px] font-bold text-text-primary leading-none"
        >
          {displayScore}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-[11px] text-text-tertiary font-medium mt-0.5"
        >
          out of 100
        </motion.span>
      </div>
    </div>
  )
}
