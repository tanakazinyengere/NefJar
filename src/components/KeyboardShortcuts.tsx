import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const isMac = typeof navigator !== 'undefined' && navigator.platform.startsWith('Mac')
const mod = isMac ? '⌘' : 'Ctrl'

const shortcuts = [
  { section: 'General', items: [
    { action: 'Command palette', keys: `${mod} K` },
    { action: 'Show shortcuts', keys: '?' },
    { action: 'Close / cancel', keys: 'Esc' },
  ]},
  { section: 'Navigation', items: [
    { action: 'Overview', keys: 'G H' },
    { action: 'Settings', keys: `${mod} ,` },
  ]},
  { section: 'Actions', items: [
    { action: 'Search', keys: `${mod} K` },
    { action: 'Run diagnostic', keys: `${mod} D` },
  ]},
]

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-border z-50 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border-light">
              <h2 className="text-[15px] font-semibold text-text-primary">Keyboard Shortcuts</h2>
            </div>
            <div className="px-6 py-4 max-h-96 overflow-y-auto space-y-5">
              {shortcuts.map((group) => (
                <div key={group.section}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-2">{group.section}</h3>
                  <div className="space-y-1.5">
                    {group.items.map((item) => (
                      <div key={item.action} className="flex items-center justify-between py-1">
                        <span className="text-[13px] text-text-secondary">{item.action}</span>
                        <kbd className="text-[12px] text-text-tertiary bg-surface-hover px-2 py-0.5 rounded font-mono min-w-[60px] text-center">
                          {item.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-border-light text-[12px] text-text-tertiary text-center">
              Press <kbd className="bg-surface-hover px-1 rounded font-mono">?</kbd> to toggle this reference
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
