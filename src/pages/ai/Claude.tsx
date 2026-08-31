import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Breadcrumb from '../../components/Breadcrumb'
import Button from '../../components/ui/Button'
import StatusIndicator from '../../components/ui/StatusIndicator'
import {
  ClaudeIcon,
  CheckIcon,
  ExternalLinkIcon,
  ShieldIcon,
  ApiIcon,
  ErrorsIcon,
  VersionsIcon,
  SimulatorIcon,
  HealthIcon,
} from '../../components/icons'

const tools = [
  { name: 'Diagnose integration', description: 'Run full diagnostic analysis', icon: <ShieldIcon size={16} className="text-success" />, available: true },
  { name: 'Inspect API errors', description: 'Analyze failed requests', icon: <ErrorsIcon size={16} className="text-success" />, available: true },
  { name: 'Check permissions', description: 'Verify OAuth scopes and access', icon: <ShieldIcon size={16} className="text-success" />, available: true },
  { name: 'Check version', description: 'Verify API version compatibility', icon: <VersionsIcon size={16} className="text-success" />, available: true },
  { name: 'Generate test scenario', description: 'Create API test cases', icon: <SimulatorIcon size={16} className="text-success" />, available: true },
  { name: 'Explain migration', description: 'Detail version migration impact', icon: <ClaudeIcon size={16} className="text-success" />, available: true },
  { name: 'Run simulator', description: 'Execute API simulations', icon: <SimulatorIcon size={16} className="text-success" />, available: true },
  { name: 'Inspect health', description: 'Review integration health data', icon: <HealthIcon size={16} className="text-success" />, available: true },
]

const exampleQueries = [
  { query: 'Why is my LinkedIn integration failing?', context: 'Claude calls get_diagnostics, get_errors, get_connection_status, then provides a structured diagnosis with actionable steps.' },
  { query: 'What do I need to change for API version 202610?', context: 'Claude calls get_migration_changes, get_api_version, then generates a prioritized migration plan.' },
  { query: 'Is my integration production-ready?', context: 'Claude calls run_diagnostics, get_health, get_api_usage, then provides a readiness assessment with specific recommendations.' },
]

export default function ClaudePage() {
  const navigate = useNavigate()
  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Claude Integration</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          NefJar gives Claude specialized LinkedIn context. Claude writes the code. We understand the integration.
        </p>

        {/* Connection status */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg-inverse flex items-center justify-center text-text-inverse">
                <ClaudeIcon size={24} className="text-current" />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-text-primary">Claude Code</h2>
                <StatusIndicator status="healthy" label="Connected" size="sm" />
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/ai/mcp')}>
              <ExternalLinkIcon size={14} />
              Configure MCP
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Available tools */}
          <div>
            <h2 className="text-[14px] font-semibold text-text-primary mb-3">Available Tools</h2>
            <Card className="divide-y divide-border-light">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="px-4 py-3 flex items-center gap-3"
                >
                  {tool.icon}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-text-primary">{tool.name}</p>
                    <p className="text-[11px] text-text-tertiary">{tool.description}</p>
                  </div>
                  <CheckIcon size={14} className="text-success shrink-0" />
                </motion.div>
              ))}
            </Card>
          </div>

          {/* Example queries */}
          <div>
            <h2 className="text-[14px] font-semibold text-text-primary mb-3">How it works</h2>
            <div className="space-y-3">
              {exampleQueries.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-accent-light flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[11px] font-bold text-accent">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-text-primary mb-1">
                          "{example.query}"
                        </p>
                        <p className="text-[12px] text-text-tertiary leading-relaxed">
                          {example.context}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture diagram */}
        <Card className="p-6">
          <h2 className="text-[14px] font-semibold text-text-primary mb-4">Architecture</h2>
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-2">
                <ClaudeIcon size={28} className="text-accent" />
              </div>
              <span className="text-[12px] text-text-secondary font-medium">Claude</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-text-tertiary">MCP</span>
              <div className="w-24 h-px bg-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-tertiary" />
                </div>
              </div>
              <span className="text-[10px] text-text-tertiary">Protocol</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-bg-inverse flex items-center justify-center text-text-inverse mx-auto mb-2">
                <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10v2H3zM3 8h7v2H3zM3 12h10v2H3z" fill="currentColor" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-[12px] text-text-secondary font-medium">NefJar</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-text-tertiary">API</span>
              <div className="w-24 h-px bg-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-tertiary" />
                </div>
              </div>
              <span className="text-[10px] text-text-tertiary">Context</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-2">
                <ApiIcon size={28} className="text-accent" />
              </div>
              <span className="text-[12px] text-text-secondary font-medium">LinkedIn</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
