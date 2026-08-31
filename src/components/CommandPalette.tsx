import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ExplorerIcon,
  SimulatorIcon,
  TestIcon,
  HealthIcon,
  ApiIcon,
  DiagnosticsIcon,
  MigrationsIcon,
  ClaudeIcon,
  SettingsIcon,
} from './icons'

// We define search icon inline since it's not in our icon set
function SearchIconFallback({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

interface Command {
  id: string
  label: string
  category: string
  shortcut?: string
  icon: React.ReactNode
  action: () => void
}

const isMac = typeof navigator !== 'undefined' && navigator.platform.startsWith('Mac')
const modKey = isMac ? '⌘' : 'Ctrl'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const commands: Command[] = [
    { id: 'overview', label: 'Go to Overview', category: 'Navigation', shortcut: 'G H', icon: <HealthIcon size={16} />, action: () => { navigate('/'); setOpen(false) } },
    { id: 'connection', label: 'Go to Connection', category: 'Navigation', icon: <HealthIcon size={16} />, action: () => { navigate('/build/connection'); setOpen(false) } },
    { id: 'explorer', label: 'Go to API Explorer', category: 'Navigation', icon: <ExplorerIcon size={16} />, action: () => { navigate('/build/explorer'); setOpen(false) } },
    { id: 'simulator', label: 'Go to API Simulator', category: 'Navigation', icon: <SimulatorIcon size={16} />, action: () => { navigate('/build/simulator'); setOpen(false) } },
    { id: 'tests', label: 'Go to Test Suites', category: 'Navigation', icon: <TestIcon size={16} />, action: () => { navigate('/test/suites'); setOpen(false) } },
    { id: 'health', label: 'Go to Health', category: 'Navigation', icon: <HealthIcon size={16} />, action: () => { navigate('/monitor/health'); setOpen(false) } },
    { id: 'api', label: 'Go to API Usage', category: 'Navigation', icon: <ApiIcon size={16} />, action: () => { navigate('/monitor/api'); setOpen(false) } },
    { id: 'versions', label: 'Go to API Versions', category: 'Navigation', icon: <ApiIcon size={16} />, action: () => { navigate('/monitor/versions'); setOpen(false) } },
    { id: 'diagnostics', label: 'Go to Diagnostics', category: 'Navigation', icon: <DiagnosticsIcon size={16} />, action: () => { navigate('/analysis/diagnostics'); setOpen(false) } },
    { id: 'errors', label: 'Go to Errors', category: 'Navigation', icon: <DiagnosticsIcon size={16} />, action: () => { navigate('/analysis/errors'); setOpen(false) } },
    { id: 'migrations', label: 'Go to Migrations', category: 'Navigation', icon: <MigrationsIcon size={16} />, action: () => { navigate('/analysis/migrations'); setOpen(false) } },
    { id: 'claude', label: 'Go to Claude', category: 'Navigation', icon: <ClaudeIcon size={16} />, action: () => { navigate('/ai/claude'); setOpen(false) } },
    { id: 'settings', label: 'Open Settings', category: 'Navigation', shortcut: `${modKey} ,`, icon: <SettingsIcon size={16} />, action: () => { navigate('/settings'); setOpen(false) } },
  ]

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
    : commands

  // Group by category
  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, Command[]>)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      filtered[selectedIndex].action()
    }
  }

  let flatIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-border z-50 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-light">
              <SearchIconFallback size={18} className="text-text-tertiary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or run a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <kbd className="text-[11px] text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded font-mono">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-text-tertiary">
                  No commands found for "{query}"
                </div>
              ) : (
                Object.entries(grouped).map(([category, cmds]) => (
                  <div key={category}>
                    <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                      {category}
                    </div>
                    {cmds.map((cmd) => {
                      const currentIndex = flatIndex++
                      const isSelected = currentIndex === selectedIndex
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-[13px] transition-colors ${
                            isSelected ? 'bg-accent-light text-text-primary' : 'text-text-secondary hover:bg-surface-hover'
                          }`}
                        >
                          <span className={isSelected ? 'text-accent' : 'text-text-tertiary'}>{cmd.icon}</span>
                          <span className="flex-1">{cmd.label}</span>
                          {cmd.shortcut && (
                            <kbd className="text-[11px] text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded font-mono">
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border-light flex items-center gap-4 text-[11px] text-text-tertiary">
              <span className="flex items-center gap-1"><kbd className="bg-surface-hover px-1 rounded">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-surface-hover px-1 rounded">↵</kbd> select</span>
              <span className="flex items-center gap-1"><kbd className="bg-surface-hover px-1 rounded">esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
