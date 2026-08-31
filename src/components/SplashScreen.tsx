import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'jar' | 'spin' | 'open' | 'particles' | 'text' | 'exit'>('jar')

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase('spin'), 400))
    timers.push(setTimeout(() => setPhase('open'), 1200))
    timers.push(setTimeout(() => setPhase('particles'), 1800))
    timers.push(setTimeout(() => setPhase('text'), 2400))
    timers.push(setTimeout(() => setPhase('exit'), 3200))
    timers.push(setTimeout(() => onComplete(), 3800))
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative flex flex-col items-center">
            {/* The Jar SVG */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: phase === 'spin' ? 360 : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                rotate: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              {/* Jar body */}
              <motion.rect
                x="24"
                y="48"
                width="72"
                height="60"
                rx="8"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-text-primary"
              />

              {/* Jar lid — animates open */}
              <motion.rect
                x="32"
                y="32"
                width="56"
                height="14"
                rx="5"
                fill="currentColor"
                className="text-text-primary"
                animate={
                  phase === 'open' || phase === 'particles' || phase === 'text'
                    ? {
                        rotate: -18,
                        y: 24,
                        x: -8,
                      }
                    : { rotate: 0, y: 32, x: 32 }
                }
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: '60px 46px' }}
              />

              {/* Nj text inside jar */}
              <motion.text
                x="60"
                y="86"
                fontFamily="Inter, sans-serif"
                fontWeight="900"
                fontSize="24"
                fill="currentColor"
                className="text-text-primary"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={
                  phase === 'open' || phase === 'particles' || phase === 'text'
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Nj
              </motion.text>
            </motion.svg>

            {/* Particles rising from the jar */}
            {(phase === 'particles' || phase === 'text') && (
              <>
                {[
                  { x: 44, delay: 0, size: 4, opacity: 0.7 },
                  { x: 56, delay: 0.1, size: 3, opacity: 0.5 },
                  { x: 68, delay: 0.05, size: 3.5, opacity: 0.6 },
                  { x: 50, delay: 0.15, size: 2.5, opacity: 0.4 },
                  { x: 62, delay: 0.2, size: 2, opacity: 0.3 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-accent"
                    style={{ left: p.x, top: 50, width: p.size, height: p.size }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: p.opacity, y: -30 - i * 8 }}
                    transition={{
                      duration: 1.2,
                      delay: p.delay,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                ))}
              </>
            )}

            {/* NefJar text — stamps in */}
            <motion.div
              className="mt-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase === 'text' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-[32px] font-bold text-text-primary tracking-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={
                  phase === 'text'
                    ? { y: 0, opacity: 1 }
                    : { y: 30, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                NefJar
              </motion.h1>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
