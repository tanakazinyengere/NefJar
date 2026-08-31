// Centralized motion tokens — the single source of truth for all animation
export const motion = {
  // Duration tokens
  duration: {
    instant: 0.08,
    micro: 0.12,
    short: 0.18,
    standard: 0.25,
    expressive: 0.4,
    slow: 0.6,
  },

  // Easing presets
  ease: {
    standard: [0.4, 0, 0.2, 1],
    enter: [0, 0, 0.2, 1],
    exit: [0.4, 0, 1, 1],
    spring: { type: 'spring', stiffness: 300, damping: 24 },
    springLight: { type: 'spring', stiffness: 400, damping: 30 },
    springHeavy: { type: 'spring', stiffness: 200, damping: 20 },
  },

  // Scale presets
  scale: {
    press: 0.97,
    hover: 1.02,
    enter: 0.95,
  },

  // Common variants
  fadeUp: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  },

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },

  slideRight: {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  },

  stagger: {
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  },
} as const

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get appropriate transition based on motion preference
export function getMotionTransition(type: 'micro' | 'standard' | 'expressive' = 'standard') {
  if (prefersReducedMotion()) {
    return { duration: motion.duration.instant }
  }
  return { duration: motion.duration[type], ease: motion.ease.standard }
}
