import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setDisplay(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {prefix}{display.toLocaleString()}{suffix}
    </motion.span>
  )
}
