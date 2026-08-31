import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  OverviewIcon,
  ConnectionIcon,
  ExplorerIcon,
  SimulatorIcon,
  TestIcon,
  WebhookIcon,
  HealthIcon,
  ApiIcon,
  VersionsIcon,
  AlertsIcon,
  DiagnosticsIcon,
  ErrorsIcon,
  MigrationsIcon,
  ClaudeIcon,
  McpIcon,
  SettingsIcon,
  ChevronIcon,
  GitHubIcon,
} from './icons'

interface NavItem {
  label: string
  path: string
  icon: React.FC<{ size?: number }>
}

interface NavSection {
  label: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    label: 'Overview',
    items: [{ label: 'Overview', path: '/', icon: OverviewIcon }],
  },
  {
    label: 'Build',
    items: [
      { label: 'Connection', path: '/build/connection', icon: ConnectionIcon },
      { label: 'API Explorer', path: '/build/explorer', icon: ExplorerIcon },
      { label: 'API Simulator', path: '/build/simulator', icon: SimulatorIcon },
    ],
  },
  {
    label: 'Test',
    items: [
      { label: 'Test Suites', path: '/test/suites', icon: TestIcon },
      { label: 'Webhooks', path: '/test/webhooks', icon: WebhookIcon },
    ],
  },
  {
    label: 'Monitor',
    items: [
      { label: 'Health', path: '/monitor/health', icon: HealthIcon },
      { label: 'API Usage', path: '/monitor/api', icon: ApiIcon },
      { label: 'API Versions', path: '/monitor/versions', icon: VersionsIcon },
      { label: 'Alerts', path: '/monitor/alerts', icon: AlertsIcon },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { label: 'Diagnostics', path: '/analysis/diagnostics', icon: DiagnosticsIcon },
      { label: 'Errors', path: '/analysis/errors', icon: ErrorsIcon },
      { label: 'Migrations', path: '/analysis/migrations', icon: MigrationsIcon },
    ],
  },
  {
    label: 'AI',
    items: [
      { label: 'Claude', path: '/ai/claude', icon: ClaudeIcon },
      { label: 'MCP', path: '/ai/mcp', icon: McpIcon },
    ],
  },
]

const bottomNav: NavItem[] = [
  { label: 'Settings', path: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="w-[228px] min-w-[228px] h-screen bg-surface border-r border-border flex flex-col overflow-hidden">
      {/* Logo — Click to go home (Overview) */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer btn-touch-target -ml-1 px-1 py-1 rounded-md hover:bg-bg-surface-hover transition-colors"
          aria-label="Go to Overview"
        >
          <div className="w-7 h-7 bg-bg-inverse rounded-lg flex items-center justify-center text-text-inverse">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {/* Jar body */}
              <rect x="3" y="7" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              {/* Lid slanted open */}
              <rect x="3.5" y="3.5" width="8" height="2.2" rx="1" fill="currentColor" opacity="0.85" transform="rotate(-12 7.5 4.6)"/>
              {/* Motion lines */}
              <line x1="5" y1="6" x2="5" y2="5" stroke="#2563EB" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
              <line x1="8" y1="5.5" x2="8" y2="4" stroke="#2563EB" strokeWidth="0.6" strokeLinecap="round" opacity="0.7"/>
              <line x1="11" y1="6" x2="11" y2="5" stroke="#2563EB" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
              {/* Nj inside */}
              <text x="8" y="12.5" fontFamily="Inter,sans-serif" fontWeight="900" fontSize="4.5" fill="currentColor" textAnchor="middle">Nj</text>
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-text-primary tracking-tight">
            NefJar
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navigation.map((section) => {
          const isCollapsed = collapsed[section.label] ?? false
          return (
            <div key={section.label} className="mb-1">
              {section.label !== 'Overview' ? (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  {section.label}
                  <motion.span
                    animate={{ rotate: isCollapsed ? -90 : 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronIcon size={12} />
                  </motion.span>
                </button>
              ) : (
                <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  {section.label}
                </div>
              )}

              <AnimatePresence initial={false}>
                {(!isCollapsed || section.label === 'Overview') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.path)

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={`relative flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium mb-[1px] ${
                            active
                              ? 'text-text-primary'
                              : 'text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {active && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute inset-0 bg-sidebar-active rounded-md"
                              transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-2.5">
                            <Icon size={16} />
                            {item.label}
                          </span>
                        </NavLink>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border py-2 px-3">
        {bottomNav.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-all duration-150 ${
                active
                  ? 'bg-sidebar-active text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          )
        })}

        {/* GitHub */}
        <div className="mt-2 px-2.5 py-2">
          <a
            href="#"
            className="flex items-center gap-2 text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <GitHubIcon size={14} />
            <span>Connected</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-success" />
          </a>
        </div>
      </div>
    </aside>
  )
}
