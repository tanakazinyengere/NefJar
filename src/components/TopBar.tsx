import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ChevronIcon,
  BellIcon,
  BookIcon,
  HelpIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
} from './icons'

interface TopBarProps {
  healthScore?: number
}

// Section parent mapping: which route is the "home" of each section
const sectionParents: Record<string, string> = {
  '/build/connection': '/build/explorer',
  '/build/explorer': '/build/connection',
  '/build/simulator': '/build/connection',
  '/test/suites': '/test/webhooks',
  '/test/webhooks': '/test/suites',
  '/monitor/health': '/monitor/api',
  '/monitor/api': '/monitor/health',
  '/monitor/versions': '/monitor/health',
  '/monitor/alerts': '/monitor/health',
  '/analysis/diagnostics': '/analysis/errors',
  '/analysis/errors': '/analysis/diagnostics',
  '/analysis/migrations': '/analysis/diagnostics',
  '/ai/claude': '/ai/mcp',
  '/ai/mcp': '/ai/claude',
  '/settings': '/',
}

// Routes that are "tab roots" (first item in a section) — no back needed
const tabRoots = new Set([
  '/',
  '/build/connection',
  '/test/suites',
  '/monitor/health',
  '/analysis/diagnostics',
  '/ai/claude',
  '/settings',
])

export default function TopBar({ healthScore = 94 }: TopBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [selectedProject, setSelectedProject] = useState('My LinkedIn App')
  const [selectedEnv, setSelectedEnv] = useState<'Development' | 'Production'>('Development')
  const [showEnvDropdown, setShowEnvDropdown] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('nefjar-theme') as 'light' | 'dark') || 'light'
    }
    return 'light'
  })

  const projects = ['My LinkedIn App', 'Recruitment Dashboard', 'Social Scheduler']
  const environments: ('Development' | 'Production')[] = ['Development', 'Production']

  // Tab-specific back: determine where to go back to
  const tabBackTarget = useMemo(() => {
    const path = location.pathname
    // If we're on the overview (home), no back
    if (path === '/') return null
    // If we're on a tab root (first item in section), go to overview
    if (tabRoots.has(path)) return '/'
    // Otherwise, find the section parent
    return sectionParents[path] || '/'
  }, [location.pathname])

  const goBack = () => {
    if (tabBackTarget) {
      navigate(tabBackTarget)
    }
  }

  // Theme management
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('nefjar-theme', next)
      document.documentElement.setAttribute('data-theme', next)
      document.documentElement.classList.add('theme-transition')
      setTimeout(() => document.documentElement.classList.remove('theme-transition'), 400)
      return next
    })
  }, [])

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-status-success'
    if (score >= 70) return 'text-status-warning'
    return 'text-status-error'
  }

  return (
    <header className="h-14 bg-bg-surface border-b border-border-default flex items-center justify-between px-5 shrink-0"
            style={{ position: 'relative', zIndex: 'var(--layer-sticky)' }}>
      {/* Left: Back button + Project selector */}
      <div className="flex items-center gap-2">
        {/* Tab-specific back button — only shows when not on overview */}
        <AnimatePresence>
          {tabBackTarget && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={goBack}
              aria-label="Go back"
              className="flex items-center justify-center w-8 h-8 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover transition-colors btn-touch-target cursor-pointer"
            >
              <ArrowLeftIcon size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {tabBackTarget && <div className="w-px h-4 bg-border-default" />}

        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-bg-surface-hover transition-colors text-[13px] font-medium text-text-primary btn-touch-target"
          >
            {selectedProject}
            <ChevronIcon size={14} className="text-text-tertiary" />
          </button>

          <AnimatePresence>
            {showProjectDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-full left-0 mt-1 w-56 bg-bg-surface-elevated rounded-lg border border-border-default shadow-lg z-[300] py-1"
              >
                {projects.map((project) => (
                  <button
                    key={project}
                    onClick={() => {
                      setSelectedProject(project)
                      setShowProjectDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-bg-surface-hover transition-colors btn-touch-target ${
                      project === selectedProject
                        ? 'text-text-primary font-medium bg-bg-surface-hover'
                        : 'text-text-secondary'
                    }`}
                  >
                    {project}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-4 bg-border-default" />

        {/* Environment */}
        <div className="relative">
          <button
            onClick={() => setShowEnvDropdown(!showEnvDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-bg-surface-hover transition-colors text-[13px] text-text-secondary btn-touch-target"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              selectedEnv === 'Production' ? 'bg-status-success' : 'bg-action-primary'
            }`} />
            {selectedEnv}
            <ChevronIcon size={12} className="text-text-tertiary" />
          </button>

          <AnimatePresence>
            {showEnvDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-full left-0 mt-1 w-44 bg-bg-surface-elevated rounded-lg border border-border-default shadow-lg z-[300] py-1"
              >
                {environments.map((env) => (
                  <button
                    key={env}
                    onClick={() => {
                      setSelectedEnv(env)
                      setShowEnvDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-bg-surface-hover transition-colors flex items-center gap-2 btn-touch-target ${
                      env === selectedEnv ? 'font-medium' : 'text-text-secondary'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      env === 'Production' ? 'bg-status-success' : 'bg-action-primary'
                    }`} />
                    {env}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Health, dark mode toggle, notifications, etc */}
      <div className="flex items-center gap-1.5">
        {/* Health indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-surface-hover text-[13px] font-medium ${getHealthColor(healthScore)}`}>
          <span className={`w-2 h-2 rounded-full ${
            healthScore >= 90 ? 'bg-status-success' : healthScore >= 70 ? 'bg-status-warning' : 'bg-status-error'
          }`} />
          {healthScore}
        </div>

        <div className="w-px h-4 bg-border-default mx-1" />

        {/* Dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="p-2 rounded-md hover:bg-bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors btn-touch-target"
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <SunIcon size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <MoonIcon size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Utility buttons */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="p-2 rounded-md hover:bg-bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors btn-touch-target"
          aria-label="Notifications"
        >
          <BellIcon size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="p-2 rounded-md hover:bg-bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors btn-touch-target"
          aria-label="Documentation"
        >
          <BookIcon size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="p-2 rounded-md hover:bg-bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors btn-touch-target"
          aria-label="Help"
        >
          <HelpIcon size={16} />
        </motion.button>

        {/* Avatar */}
        <div className="ml-1 w-7 h-7 rounded-full bg-action-primary flex items-center justify-center text-white text-[11px] font-semibold cursor-pointer">
          JD
        </div>
      </div>
    </header>
  )
}
