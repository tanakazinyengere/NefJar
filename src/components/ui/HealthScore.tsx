import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface HealthScoreProps {
  score: number
  size?: number
  strokeWidth?: number
}

export default function HealthScore({ score, size = 120, strokeWidth = 8 }: HealthScoreProps) {
  const [displayScore, setDisplayScore] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (displayScore / 100) * circumference

  const getColor = (s: number) => {
    if (s >= 90) return '#16A34A'
    if (s >= 70) return '#D97706'
    return '#DC2626'
  }

  useEffect(() => {
    const duration = 1200
    const steps = 60
    const increment = score / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), score)
      setDisplayScore(current)

      if (step >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="health-score-ring"
        width={size}
        height={size}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E7E9ED"
          strokeWidth={strokeWidth}
        />
        {/* Score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[28px] font-bold text-text-primary leading-none"
        >
          {displayScore}
        </motion.span>
        <span className="text-[11px] text-text-tertiary font-medium mt-0.5">out of 100</span>
      </div>
    </div>
  )
}
