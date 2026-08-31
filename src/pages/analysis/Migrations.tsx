import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Breadcrumb from '../../components/Breadcrumb'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import StatusIndicator from '../../components/ui/StatusIndicator'
import {
  MigrationsIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  ClaudeIcon,
  CodeIcon,
  ShieldIcon,
  CheckIcon,
} from '../../components/icons'

const migration = {
  from: '202608',
  to: '202610',
  daysRemaining: 43,
  impacted: {
    endpoints: 3,
    permissions: 1,
    repositories: 2,
    environments: 1,
  },
  changes: [
    {
      type: 'endpoint',
      method: 'POST',
      path: '/rest/me/posts',
      change: 'Content-Type validation tightened',
      severity: 'medium',
      affected: true,
    },
    {
      type: 'endpoint',
      method: 'GET',
      path: '/rest/organizations/{id}/followers/count',
      change: 'Response schema updated',
      severity: 'low',
      affected: true,
    },
    {
      type: 'permission',
      method: 'PERMISSION',
      path: 'w_member_social',
      change: 'New approval process required',
      severity: 'high',
      affected: true,
    },
    {
      type: 'endpoint',
      method: 'DELETE',
      path: '/rest/posts/{id}',
      change: 'Added rate limit header',
      severity: 'low',
      affected: false,
    },
  ],
}

const methodColors: Record<string, string> = {
  GET: 'bg-success-light text-success',
  POST: 'bg-accent-light text-accent',
  DELETE: 'bg-danger-light text-danger',
  PERMISSION: 'bg-status-info-surface text-status-info',
}

export default function Migrations() {
  const navigate = useNavigate()
  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Migrations</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Understand how upcoming LinkedIn changes affect your application before a version reaches sunset.
        </p>

        {/* Migration detected card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning-light flex items-center justify-center">
              <MigrationsIcon size={16} className="text-warning" />
            </div>
            <h2 className="text-[15px] font-semibold text-text-primary">Migration detected</h2>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-5">
            <div className="bg-bg rounded-lg p-3 text-center">
              <span className="text-[24px] font-bold text-text-primary block">{migration.impacted.endpoints}</span>
              <span className="text-[11px] text-text-tertiary">endpoints affected</span>
            </div>
            <div className="bg-bg rounded-lg p-3 text-center">
              <span className="text-[24px] font-bold text-text-primary block">{migration.impacted.permissions}</span>
              <span className="text-[11px] text-text-tertiary">permission change</span>
            </div>
            <div className="bg-bg rounded-lg p-3 text-center">
              <span className="text-[24px] font-bold text-text-primary block">{migration.impacted.repositories}</span>
              <span className="text-[11px] text-text-tertiary">repositories</span>
            </div>
            <div className="bg-bg rounded-lg p-3 text-center">
              <span className="text-[24px] font-bold text-text-primary block">{migration.impacted.environments}</span>
              <span className="text-[11px] text-text-tertiary">environments</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-mono font-bold text-text-primary">{migration.from}</span>
                <ArrowRightIcon size={14} className="text-text-tertiary" />
                <span className="text-[14px] font-mono font-bold text-text-primary">{migration.to}</span>
              </div>
              <span className="text-[13px] text-text-tertiary">
                {migration.daysRemaining} days remaining
              </span>
            </div>
            <div className="w-48">
              <ProgressBar value={migration.daysRemaining} max={365} color="warning" height={4} />
            </div>
          </div>
        </Card>

        {/* Impact analysis */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold text-text-primary">What's changing</h2>
          <Button size="sm" onClick={() => navigate('/ai/claude')}>
            <ClaudeIcon size={14} />
            Generate migration plan
            <ExternalLinkIcon size={12} />
          </Button>
        </div>

        <Card className="overflow-hidden mb-6">
          <div className="divide-y divide-border-light">
            {migration.changes.map((change, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center gap-4 hover:bg-surface-hover transition-colors"
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                  methodColors[change.method] || 'bg-surface-hover text-text-tertiary'
                }`}>
                  {change.type === 'permission' ? 'PERM' : change.method}
                </span>
                <span className="text-[13px] font-mono text-text-primary shrink-0 w-[300px]">
                  {change.path}
                </span>
                <span className="text-[13px] text-text-secondary flex-1">
                  {change.change}
                </span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                  change.severity === 'high' ? 'bg-danger-light text-danger'
                  : change.severity === 'medium' ? 'bg-warning-light text-warning'
                  : 'bg-surface-hover text-text-tertiary'
                }`}>
                  {change.severity}
                </span>
                {change.affected ? (
                  <StatusIndicator status="warning" label="Affected" size="sm" />
                ) : (
                  <StatusIndicator status="neutral" label="No action" size="sm" />
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Your integration impact */}
        <Card className="p-6">
          <h2 className="text-[14px] font-semibold text-text-primary mb-4">Your integration impact</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CodeIcon size={14} className="text-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Code changes</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary mt-2">2</p>
              <p className="text-[12px] text-text-tertiary">likely changes required</p>
            </div>
            <div className="bg-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <ShieldIcon size={14} className="text-warning" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Configuration</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary mt-2">1</p>
              <p className="text-[12px] text-text-tertiary">permission update needed</p>
            </div>
            <div className="bg-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckIcon size={14} className="text-success" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Breaking changes</span>
              </div>
              <p className="text-[20px] font-bold text-text-primary mt-2">0</p>
              <p className="text-[12px] text-text-tertiary">data format changes</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
