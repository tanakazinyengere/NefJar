import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronIcon } from './icons'

// Route hierarchy mapping — which section each route belongs to
const routeHierarchy: Record<string, { label: string; parent?: string; parentPath?: string }> = {
  '/': { label: 'Overview' },
  '/build/connection': { label: 'Connection', parent: 'Build', parentPath: '/build/explorer' },
  '/build/explorer': { label: 'API Explorer', parent: 'Build' },
  '/build/simulator': { label: 'API Simulator', parent: 'Build' },
  '/test/suites': { label: 'Test Suites', parent: 'Test' },
  '/test/webhooks': { label: 'Webhooks', parent: 'Test' },
  '/monitor/health': { label: 'Health', parent: 'Monitor' },
  '/monitor/api': { label: 'API Usage', parent: 'Monitor' },
  '/monitor/versions': { label: 'API Versions', parent: 'Monitor' },
  '/monitor/alerts': { label: 'Alerts', parent: 'Monitor' },
  '/analysis/diagnostics': { label: 'Diagnostics', parent: 'Analysis' },
  '/analysis/errors': { label: 'Errors', parent: 'Analysis' },
  '/analysis/migrations': { label: 'Migrations', parent: 'Analysis' },
  '/ai/claude': { label: 'Claude', parent: 'AI' },
  '/ai/mcp': { label: 'MCP', parent: 'AI' },
  '/settings': { label: 'Settings' },
}

// Section root paths
const sectionRoots: Record<string, string> = {
  Build: '/build/explorer',
  Test: '/test/suites',
  Monitor: '/monitor/health',
  Analysis: '/analysis/diagnostics',
  AI: '/ai/claude',
}

interface BreadcrumbItem {
  label: string
  path: string
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation()
  const route = routeHierarchy[location.pathname]

  if (!route) return []
  if (location.pathname === '/') return []

  const crumbs: BreadcrumbItem[] = []

  // Add parent section if exists
  if (route.parent) {
    const parentPath = route.parentPath || sectionRoots[route.parent]
    if (parentPath) {
      crumbs.push({ label: route.parent, path: parentPath })
    }
  }

  // Add current page (not linked — you're already here)
  crumbs.push({ label: route.label, path: location.pathname })

  return crumbs
}

export default function Breadcrumb() {
  const crumbs = useBreadcrumbs()

  if (crumbs.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 mb-4"
    >
      {/* Home */}
      <Link
        to="/"
        className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
      >
        Home
      </Link>

      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <ChevronIcon size={10} className="text-text-tertiary" />
            {isLast ? (
              <span className="text-[12px] font-medium text-text-primary">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-[12px] text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </motion.nav>
  )
}
