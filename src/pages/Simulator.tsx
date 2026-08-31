import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusIndicator from '../components/ui/StatusIndicator'
import Breadcrumb from '../components/Breadcrumb'
import {
  SimulatorIcon,
  CheckIcon,
  WarningIcon,
  XIcon,
  RefreshIcon,
  ShieldIcon,
  WebhookIcon,
  CodeIcon,
} from '../components/icons'

interface Scenario {
  id: string
  name: string
  description: string
  status: number
  statusText: string
  category: string
  icon: React.ReactNode
  response: Record<string, unknown>
  headers: Record<string, string>
}

const scenarios: Scenario[] = [
  {
    id: 'success',
    name: 'Successful request',
    description: 'Simulate a successful LinkedIn API response',
    status: 200,
    statusText: 'OK',
    category: 'Success',
    icon: <CheckIcon size={16} className="text-success" />,
    response: { id: 'urn:li:member:12345', firstName: { localized: { en_US: 'John' } } },
    headers: { 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' },
  },
  {
    id: '401',
    name: '401 Unauthorized',
    description: 'Simulate an expired or invalid authorization state',
    status: 401,
    statusText: 'Unauthorized',
    category: 'Error',
    icon: <ShieldIcon size={16} className="text-danger" />,
    response: { status: 401, message: 'Expired access token', errorCode: 'EXPIRED_TOKEN' },
    headers: { 'Content-Type': 'application/json', 'X-RestLi-Error-Response': '401' },
  },
  {
    id: '403',
    name: '403 Forbidden',
    description: 'Simulate an access denied scenario',
    status: 403,
    statusText: 'Access Denied',
    category: 'Error',
    icon: <XIcon size={16} className="text-danger" />,
    response: { status: 403, message: 'ACCESS_DENIED', errorCode: 'Insufficient permissions' },
    headers: { 'Content-Type': 'application/json', 'X-RestLi-Error-Response': '403' },
  },
  {
    id: '404',
    name: '404 Not Found',
    description: 'Simulate a missing resource',
    status: 404,
    statusText: 'Not Found',
    category: 'Error',
    icon: <XIcon size={16} className="text-text-tertiary" />,
    response: { status: 404, message: 'Resource not found' },
    headers: { 'Content-Type': 'application/json' },
  },
  {
    id: '429',
    name: '429 Rate Limited',
    description: 'Simulate LinkedIn API rate limit response',
    status: 429,
    statusText: 'Rate Limited',
    category: 'Rate Limit',
    icon: <WarningIcon size={16} className="text-warning" />,
    response: { status: 429, message: 'Rate limit exceeded', retryAfter: 42 },
    headers: { 'Content-Type': 'application/json', 'Retry-After': '42', 'X-RateLimit-Remaining': '0' },
  },
  {
    id: '500',
    name: '500 Server Error',
    description: 'Simulate a LinkedIn server-side error',
    status: 500,
    statusText: 'Internal Server Error',
    category: 'Error',
    icon: <XIcon size={16} className="text-danger" />,
    response: { status: 500, message: 'Internal server error', reference: 'LI-SERVER-500-001' },
    headers: { 'Content-Type': 'application/json' },
  },
  {
    id: 'token-expired',
    name: 'Token Expired',
    description: 'Simulate an expired OAuth token during active session',
    status: 401,
    statusText: 'Token Expired',
    category: 'Auth',
    icon: <ShieldIcon size={16} className="text-warning" />,
    response: { status: 401, message: 'Token expired', errorCode: 'TOKEN_EXPIRED', expiresAt: '2026-08-30T12:00:00Z' },
    headers: { 'Content-Type': 'application/json', 'X-RestLi-Error-Response': '401' },
  },
  {
    id: 'permission-revoked',
    name: 'Permission Revoked',
    description: 'Simulate permission revocation by member',
    status: 403,
    statusText: 'Permission Revoked',
    category: 'Auth',
    icon: <ShieldIcon size={16} className="text-danger" />,
    response: { status: 403, message: 'Permission revoked by member', errorCode: 'PERMISSION_REVOKED' },
    headers: { 'Content-Type': 'application/json' },
  },
  {
    id: 'webhook-failure',
    name: 'Webhook Failure',
    description: 'Simulate webhook processing failure',
    status: 500,
    statusText: 'Webhook Processing Failed',
    category: 'Webhook',
    icon: <WebhookIcon size={16} className="text-danger" />,
    response: { status: 500, message: 'Webhook payload processing failed', errorCode: 'WEBHOOK_PROCESSING_ERROR' },
    headers: { 'Content-Type': 'application/json', 'X-Li-Webhook-Status': 'FAILED' },
  },
  {
    id: 'version-sunset',
    name: 'API Version Sunset',
    description: 'Simulate deprecated API version response',
    status: 410,
    statusText: 'Gone',
    category: 'Version',
    icon: <CodeIcon size={16} className="text-warning" />,
    response: { status: 410, message: 'API version deprecated', deprecatedVersion: '202401', supportedVersion: '202608' },
    headers: { 'Content-Type': 'application/json', 'X-RestLi-Deprecation': 'true' },
  },
]

export default function Simulator() {
  const [selected, setSelected] = useState<Scenario>(scenarios[0])
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<{ scenario: Scenario; duration: number } | null>(null)

  const runSimulation = async () => {
    setRunning(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))
    setResult({ scenario: selected, duration: Math.round(40 + Math.random() * 100) })
    setRunning(false)
  }

  const categories = [...new Set(scenarios.map((s) => s.category))]

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">
          API Simulator
        </h1>
        <p className="text-[15px] text-text-secondary mb-6">
          Test success, errors, rate limits and authorization scenarios without affecting production.
        </p>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)]">
          {/* Left: Scenarios */}
          <div className="col-span-4 overflow-y-auto">
            <Card className="p-4">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-2">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {scenarios
                        .filter((s) => s.category === category)
                        .map((scenario) => (
                          <motion.button
                            key={scenario.id}
                            layoutId={selected.id === scenario.id ? 'scenario-selected' : undefined}
                            onClick={() => { setSelected(scenario); setResult(null) }}
                            whileHover={{ x: 2, transition: { type: 'spring', stiffness: 400, damping: 25, mass: 0.6 } }}
                            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-150 ${
                              selected.id === scenario.id
                                ? 'bg-accent-light border border-accent/20'
                                : 'hover:bg-bg-surface-hover'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {scenario.icon}
                              <span className="text-[13px] font-medium text-text-primary">
                                {scenario.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-text-tertiary mt-0.5 ml-6">
                              {scenario.description}
                            </p>
                          </motion.button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Simulation */}
          <div className="col-span-8 flex flex-col gap-4">
            {/* Selected scenario info */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {selected.icon}
                  <div>
                    <h2 className="text-[15px] font-semibold text-text-primary">{selected.name}</h2>
                    <p className="text-[13px] text-text-tertiary">{selected.description}</p>
                  </div>
                </div>
                <Button onClick={runSimulation} disabled={running}>
                  {running ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <RefreshIcon size={14} />
                      </motion.span>
                      Simulating...
                    </>
                  ) : (
                    <>
                      <SimulatorIcon size={14} />
                      Run simulation
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-bg rounded-lg p-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Status</span>
                  <p className="text-[16px] font-bold text-text-primary mt-1 font-mono">
                    {selected.status}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Status Text</span>
                  <p className="text-[14px] font-medium text-text-primary mt-1">
                    {selected.statusText}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Category</span>
                  <p className="text-[14px] font-medium text-text-primary mt-1">
                    {selected.category}
                  </p>
                </div>
              </div>
            </Card>

            {/* Response */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border-light">
                <h3 className="text-[13px] font-semibold text-text-primary">Simulated Response</h3>
                {result && (
                  <StatusIndicator
                    status={result.scenario.status < 400 ? 'healthy' : result.scenario.status < 500 ? 'warning' : 'critical'}
                    label={`${result.scenario.status} ${result.scenario.statusText}`}
                    size="sm"
                  />
                )}
              </div>
              <div className="flex-1 overflow-auto p-5">
                {running ? (
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-border border-t-accent rounded-full"
                    />
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Response Time</span>
                      <p className="text-[13px] text-text-primary mt-1">{result.duration}ms</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Headers</span>
                      <pre className="mt-2 text-[12px] font-mono text-text-secondary bg-bg rounded-lg p-3">
                        {Object.entries(result.scenario.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
                      </pre>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Body</span>
                      <pre className="mt-2 text-[12px] font-mono text-text-secondary bg-bg rounded-lg p-3 whitespace-pre-wrap">
                        {JSON.stringify(result.scenario.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-[13px] text-text-tertiary">
                    Select a scenario and run the simulation
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
