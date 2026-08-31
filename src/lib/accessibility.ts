import { useEffect, useState } from 'react'

/**
 * Detects OS prefers-reduced-motion and subscribes to changes.
 */
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

/**
 * Returns appropriate framer-motion transition based on reduced motion preference.
 */
export function useMotionTransition(type: 'micro' | 'standard' | 'expressive' = 'standard') {
  const reduced = useReducedMotion()

  if (reduced) {
    return { duration: 0.05 }
  }

  const durations = { micro: 0.12, standard: 0.25, expressive: 0.4 }
  return { duration: durations[type], ease: [0.4, 0, 0.2, 1] }
}

/**
 * Announce a message to screen readers via a live region.
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const el = document.getElementById(`sr-announcer-${priority}`)
  if (el) {
    el.textContent = ''
    // Small timeout ensures the DOM change triggers announcement
    requestAnimationFrame(() => {
      el.textContent = message
    })
  }
}

/**
 * Move focus to an element, useful for modal focus management.
 */
export function focusElement(selector: string) {
  const el = document.querySelector<HTMLElement>(selector)
  if (el) {
    el.focus()
  }
}

/**
 * Trap focus within a container element (for modals/drawers).
 */
export function trapFocus(container: HTMLElement) {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  const handler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  container.addEventListener('keydown', handler)
  first?.focus()

  return () => container.removeEventListener('keydown', handler)
}
