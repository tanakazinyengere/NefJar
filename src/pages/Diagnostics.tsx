import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import HealthScore from '../components/ui/HealthScore'
import StatusIndicator from '../components/ui/StatusIndicator'
import { useToast } from '../components/ui/Toast'
import {
  DiagnosticsIcon,
  CheckIcon,
  WarningIcon,
  XIcon,
  RefreshIcon,
} from '../components/icons'

interface CheckItem {
  id: string
  label: string
  status: 'pending' | 'running' | 'passed' | 'warning' | 'failed'
  category: string
  detail?: string
}

const initialChecks: CheckItem[] = [
  { id: '1', label: 'OAuth configuration', status: 'pending', category: 'Authentication' },
  { id: '2', label: 'Redirect URI', status: 'pending', category: 'Authentication' },
  { id: '3', label: 'Token handling', status: 'pending', category: 'Authentication' },
  { id: '4', label: 'Required scopes', status: 'pending', category: 'Permissions' },
  { id: '5', label: 'Product access', status: 'pending', category: 'Permissions', detail: 'Some permissions may require product access' },
  { id: '6', label: 'API version', status: 'pending', category: 'API' },
  { id: '7', label: 'Endpoint availability', status: 'pending', category: 'API' },
  { id: '8', label: 'Retry strategy', status: 'pending', category: 'API', detail: 'Recommend implementing exponential backoff' },
  { id: '9', label: 'Rate limit handling', status: 'pending', category: 'API' },
  { id: '10', label: 'Webhook configuration', status: 'pending', category: 'Webhooks' },
  { id: '11', label: 'Webhook signature verification', status: 'pending', category: 'Webhooks' },
  { id: '12', label: 'Error handling', status: 'pending', category: 'General' },
]

export default function Diagnostics() {
  const [checks, setChecks] = useState<CheckItem[]>(initialChecks)
  const [running, setRunning] = useState(false)
  const [complete, setComplete] = useState(false)
  const { toast } = useToast()

  const runDiagnostics = async () => {
    setRunning(true)
    toast('Running integration diagnostic...')
    setComplete(false)
    setChecks(initialChecks.map((c) => ({ ...c, status: 'pending' as const })))

    const categories = [...new Set(checks.map((c) => c.category))]

    for (const category of categories) {
      const categoryChecks = checks.filter((c) => c.category === category)

      for (const check of categoryChecks) {
        // Running
        setChecks((prev) =>
          prev.map((c) => (c.id === check.id ? { ...c, status: 'running' as const } : c))
        )
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 300))

        // Result
        let result: CheckItem['status'] = 'passed'
        if (check.id === '5') result = 'warning'
        if (check.id === '8') result = 'warning'
        else if (check.id === '12') result = 'passed'

        setChecks((prev) =>
          prev.map((c) => (c.id === check.id ? { ...c, status: result } : c))
        )
      }
    }

    setRunning(false)
    setComplete(true)
    toast('Diagnostic complete — 12 passed, 2 recommendations')
  }

  const categories = [...new Set(checks.map((c) => c.category))]
  const passed = checks.filter((c) => c.status === 'passed').length
  const warnings = checks.filter((c) => c.status === 'warning').length
  const failed = checks.filter((c) => c.status === 'failed').length

  const getScore = () => {
    if (!complete) return 0
    return Math.round((passed / checks.length) * 100)
  }

  return (
    <div className="max-w-[800px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">
              Integration Diagnostics
            </h1>
            <p className="text-[15px] text-text-secondary">
              Find configuration, authentication, permission and API problems before they reach production.
            </p>
          </div>
          <Button
            onClick={runDiagnostics}
            disabled={running}
          >
            {running ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshIcon size={14} />
                </motion.span>
                Running...
              </>
            ) : complete ? (
              <>
                <RefreshIcon size={14} />
                Re-run
              </>
            ) : (
              <>
                <DiagnosticsIcon size={14} />
                Run Diagnostic
              </>
            )}
          </Button>
        </div>

        {/* Results summary */}
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="p-6 mb-6">
                <div className="flex items-center gap-8">
                  <HealthScore score={getScore()} size={100} strokeWidth={7} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIndicator
                        status={failed > 0 ? 'critical' : warnings > 0 ? 'warning' : 'healthy'}
                        label={
                          failed > 0
                            ? 'Issues detected'
                            : warnings > 0
                            ? 'Recommendations available'
                            : 'All checks passed'
                        }
                      />
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <CheckIcon size={14} className="text-success" />
                        <span className="text-[13px] text-text-secondary">{passed} passed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <WarningIcon size={14} className="text-warning" />
                        <span className="text-[13px] text-text-secondary">{warnings} recommendations</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <XIcon size={14} className="text-danger" />
                        <span className="text-[13px] text-text-secondary">{failed} critical</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-text-tertiary mt-3">
                      {checks.length} checks completed
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Check categories */}
        <div className="space-y-6">
          {categories.map((category, catIdx) => {
            const categoryChecks = checks.filter((c) => c.category === category)
            const allPassed = categoryChecks.every((c) => c.status === 'passed')
            const hasWarning = categoryChecks.some((c) => c.status === 'warning')
            const hasRunning = categoryChecks.some((c) => c.status === 'running')

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-[13px] font-semibold text-text-primary">{category}</h3>
                  {complete && !hasRunning && (
                    <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                      allPassed ? 'bg-success-light text-success' : hasWarning ? 'bg-warning-light text-warning' : 'bg-danger-light text-danger'
                    }`}>
                      {allPassed ? 'All passed' : hasWarning ? 'Review' : 'Issues'}
                    </span>
                  )}
                </div>

                <Card className="divide-y divide-border-light">
                  {categoryChecks.map((check) => (
                    <div
                      key={check.id}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {check.status === 'pending' && (
                          <div className="w-2 h-2 rounded-full bg-border" />
                        )}
                        {check.status === 'running' && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-accent"
                          />
                        )}
                        {check.status === 'passed' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckIcon size={16} className="text-success" />
                          </motion.div>
                        )}
                        {check.status === 'warning' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <WarningIcon size={16} className="text-warning" />
                          </motion.div>
                        )}
                        {check.status === 'failed' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <XIcon size={16} className="text-danger" />
                          </motion.div>
                        )}
                      </div>
                      <span className={`text-[13px] ${
                        check.status === 'running' ? 'text-text-tertiary' : 'text-text-primary'
                      }`}>
                        {check.label}
                      </span>
                      {check.detail && check.status !== 'pending' && check.status !== 'running' && (
                        <span className="text-[12px] text-text-tertiary ml-auto">
                          {check.detail}
                        </span>
                      )}
                    </div>
                  ))}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
