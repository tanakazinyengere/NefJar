import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronIcon,
  BellIcon,
  BookIcon,
  HelpIcon,
} from './icons'

interface TopBarProps {
  healthScore?: number
}

export default function TopBar({ healthScore = 94 }: TopBarProps) {
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [selectedProject, setSelectedProject] = useState('My LinkedIn App')
  const [selectedEnv, setSelectedEnv] = useState<'Development' | 'Production'>('Development')
  const [showEnvDropdown, setShowEnvDropdown] = useState(false)

  const projects = ['My LinkedIn App', 'Recruitment Dashboard', 'Social Scheduler']
  const environments: ('Development' | 'Production')[] = ['Development', 'Production']

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 70) return 'text-warning'
    return 'text-danger'
  }

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-5 shrink-0">
      {/* Left: Project selector */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-surface-hover transition-colors text-[13px] font-medium text-text-primary"
          >
            {selectedProject}
            <ChevronIcon size={14} className="text-text-tertiary" />
          </button>

          <AnimatePresence>
            {showProjectDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 mt-1 w-56 bg-surface rounded-lg border border-border shadow-lg z-50 py-1"
              >
                {projects.map((project) => (
                  <button
                    key={project}
                    onClick={() => {
                      setSelectedProject(project)
                      setShowProjectDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-surface-hover transition-colors ${
                      project === selectedProject
                        ? 'text-text-primary font-medium bg-surface-hover'
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

        <div className="w-px h-4 bg-border" />

        {/* Environment */}
        <div className="relative">
          <button
            onClick={() => setShowEnvDropdown(!showEnvDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-surface-hover transition-colors text-[13px] text-text-secondary"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              selectedEnv === 'Production' ? 'bg-success' : 'bg-accent'
            }`} />
            {selectedEnv}
            <ChevronIcon size={12} className="text-text-tertiary" />
          </button>

          <AnimatePresence>
            {showEnvDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 mt-1 w-44 bg-surface rounded-lg border border-border shadow-lg z-50 py-1"
              >
                {environments.map((env) => (
                  <button
                    key={env}
                    onClick={() => {
                      setSelectedEnv(env)
                      setShowEnvDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-surface-hover transition-colors flex items-center gap-2 ${
                      env === selectedEnv ? 'font-medium' : 'text-text-secondary'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      env === 'Production' ? 'bg-success' : 'bg-accent'
                    }`} />
                    {env}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Health, notifications, etc */}
      <div className="flex items-center gap-2">
        {/* Health indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-hover text-[13px] font-medium ${getHealthColor(healthScore)}`}>
          <span className={`w-2 h-2 rounded-full ${
            healthScore >= 90 ? 'bg-success' : healthScore >= 70 ? 'bg-warning' : 'bg-danger'
          }`} />
          {healthScore}
        </div>

        <div className="w-px h-4 bg-border mx-1" />

        {/* Utility buttons */}
        <button className="p-2 rounded-md hover:bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors">
          <BellIcon size={16} />
        </button>
        <button className="p-2 rounded-md hover:bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors">
          <BookIcon size={16} />
        </button>
        <button className="p-2 rounded-md hover:bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors">
          <HelpIcon size={16} />
        </button>

        {/* Avatar */}
        <div className="ml-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-[11px] font-semibold">
          JD
        </div>
      </div>
    </header>
  )
}
