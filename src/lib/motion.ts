// ===== MOTION SYSTEM =====
// Per React Motion System spec:
// - Motion personality: technical, precise, calm
// - Spring physics for organic interactions
// - Hierarchy: ambient → structural → interaction → micro
// - Composition: combine primitives for premium effects

// ---- Duration Tokens ----
export const duration = {
  instant: 0,
  fast: 0.12,      // 120ms — micro feedback
  normal: 0.2,     // 200ms — standard transitions
  slow: 0.35,      // 350ms — deliberate transitions
  expressive: 0.5, // 500ms — narrative transitions
  dramatic: 0.8,   // 800ms — cinematic transitions
} as const

// ---- Easing Curves ----
export const easing = {
  // Standard: smooth deceleration
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Enter: slow start, fast middle, slow end
  enter: [0, 0, 0.2, 1] as [number, number, number, number],
  // Exit: fast start, slow end
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
  // Emphasized: for important transitions
  emphasized: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Bounce: subtle overshoot
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const

// ---- Spring Configurations ----
// Spring physics feel more organic than easing curves
export const springs = {
  // Gentle — for subtle UI shifts
  gentle: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  // Snappy — for immediate response
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
    mass: 0.6,
  },
  // Bouncy — for playful interactions
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  },
  // Stiff — for mechanical precision
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
  // Slow — for large dramatic movements
  slow: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 20,
    mass: 1,
  },
} as const

// ---- Scale Values ----
export const scale = {
  none: 1,
  subtle: 1.02,
  hover: 1.04,
  active: 0.97,
  pop: 1.08,
  dramatic: 1.15,
} as const

// ---- Translate Distances ----
export const distance = {
  micro: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
} as const

// ===== MOTION PRESETS =====
// Ready-to-use animation objects for common patterns

export const presets = {
  // ---- Page Transitions (Level 3: Structural) ----
  pageEnter: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: duration.normal, easing: easing.standard },
  },

  // ---- Card Entrance (Level 3: Structural) ----
  cardEnter: {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { ...springs.gentle, duration: duration.slow },
  },

  // ---- Hover Lift (Level 4: Interaction) ----
  hoverLift: {
    whileHover: { y: -2, transition: { ...springs.gentle } },
  },

  // ---- Button Press (Level 5: Micro) ----
  buttonPress: {
    whileHover: { scale: scale.hover, transition: { ...springs.snappy } },
    whileTap: { scale: scale.active, transition: { duration: duration.fast } },
  },

  // ---- Icon Spin (Level 5: Micro) ----
  iconSpin: {
    whileHover: { rotate: 5, transition: { ...springs.snappy } },
  },

  // ---- Stagger Container (Level 3: Structural) ----
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.05 } },
  },

  // ---- Stagger Item (Level 3: Structural) ----
  staggerItem: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.gentle },
  },

  // ---- Fade In (Level 2: Narrative) ----
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.normal },
  },

  // ---- Scale In (Level 4: Interaction) ----
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { ...springs.gentle },
  },

  // ---- Slide Up (Level 3: Structural) ----
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.gentle },
  },

  // ---- Modal Backdrop (Level 3: Structural) ----
  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.fast },
  },

  // ---- Modal Content (Level 3: Structural) ----
  modalContent: {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 10 },
    transition: { ...springs.gentle },
  },

  // ---- Dropdown (Level 3: Structural) ----
  dropdown: {
    initial: { opacity: 0, y: -4, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.98 },
    transition: { duration: duration.fast, easing: easing.enter },
  },

  // ---- Toast Slide (Level 3: Structural) ----
  toastSlide: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
    transition: { ...springs.snappy },
  },

  // ---- Health Score Ring Draw (Level 2: Narrative) ----
  ringDraw: (progress: number) => ({
    strokeDashoffset: 100 - progress,
    transition: { duration: duration.dramatic, easing: easing.standard },
  }),

  // ---- Number Counter (Level 2: Narrative) ----
  numberCount: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.slow },
  },

  // ---- Skeleton Shimmer (Level 1: Ambient) ----
  skeletonShimmer: {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },

  // ---- Pulse (Level 5: Micro) ----
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
    },
    transition: {
      duration: 2,
      ease: easing.standard,
      repeat: Infinity,
    },
  },
} as const

// ===== MOTION HOOKS =====

import { useState, useEffect } from 'react'
import type { Transition } from 'framer-motion'

// Hook for automatic reduced-motion handling
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// Returns appropriate transition based on user preferences
export function useMotionTransition(preferredTransition: Transition): Transition {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) {
    return { duration: 0 }
  }
  return preferredTransition
}
