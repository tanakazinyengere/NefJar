import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusIndicator from '../../components/ui/StatusIndicator'
import ProgressBar from '../../components/ui/ProgressBar'
import EmptyState from '../../components/ui/EmptyState'
import {
  VersionsIcon,
  CheckIcon,
  WarningIcon,
  ArrowRightIcon,
} from '../../components/icons'

const versions = [
  {
    version: '202608',
    status: 'current' as const,
    label: 'Current',
    description: 'Your application is running on a supported version.',
    remaining: 287,
    total: 365,
    affectedEndpoints: 0,
  },
  {
    version: '202609',
    status: 'upcoming' as const,
    label: 'Upcoming',
    description: 'No action required.',
    remaining: 318,
    total: 365,
    affectedEndpoints: 0,
  },
  {
    version: '202610',
    status: 'attention' as const,
    label: 'Review',
    description: '2 endpoints may require changes.',
    remaining: 349,
    total: 365,
    affectedEndpoints: 2,
  },
  {
    version: '202510',
    status: 'deprecated' as const,
    label: 'Deprecated',
    description: 'This version is no longer supported.',
    remaining: 0,
    total: 365,
    affectedEndpoints: 4,
  },
]

const statusConfig = {
  current: { color: 'success', icon: <CheckIcon size={14} className="text-success" /> },
  upcoming: { color: 'accent', icon: <VersionsIcon size={14} className="text-accent" /> },
  attention: { color: 'warning', icon: <WarningIcon size={14} className="text-warning" /> },
  deprecated: { color: 'danger', icon: <WarningIcon size={14} className="text-danger" /> },
}

export default function Versions() {
  const [hasData] = useState(true)

  if (!hasData) {
    return (
      <div className="max-w-[1200px] mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">API Versions</h1>
          <p className="text-[15px] text-text-secondary mb-8">
            Know what's changing, when versions expire and whether your application is affected.
          </p>
          <EmptyState
            type="first-use"
            icon={<VersionsIcon size={24} />}
            title="No version data yet"
            description="API version tracking begins once your LinkedIn application is connected. You'll see current, upcoming, and deprecated versions here."
            instruction="Connect your app to start tracking API versions and receive sunset warnings."
            primaryAction={{ label: 'Connect your app', onClick: () => {} }}
            secondaryAction={{ label: 'View version docs', onClick: () => {} }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">API Versions</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Know what's changing, when versions expire and whether your application is affected.
        </p>

        {/* Current version hero */}
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Current Version</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[36px] font-bold text-text-primary tracking-tight font-mono">202608</span>
                <StatusIndicator status="healthy" label="Supported" />
              </div>
              <p className="text-[14px] text-text-secondary mt-2">
                Your application is running on a supported version.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Support window</span>
              <div className="w-48 mt-2">
                <ProgressBar value={287} max={365} color="success" height={6} />
              </div>
              <span className="text-[13px] text-text-secondary mt-1 block">287 days remaining</span>
            </div>
          </div>
        </Card>

        {/* Version timeline */}
        <h2 className="text-[14px] font-semibold text-text-primary mb-3">Version Timeline</h2>
        <div className="space-y-3">
          {versions.map((v, i) => {
            const config = statusConfig[v.status]

            return (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card hover className="p-5">
                  <div className="flex items-center gap-5">
                    {/* Version number */}
                    <div className="w-28 shrink-0">
                      <span className="text-[20px] font-bold text-text-primary font-mono">{v.version}</span>
                    </div>

                    {/* Status badge */}
                    <div className={`shrink-0 px-2.5 py-1 rounded-md text-[12px] font-semibold flex items-center gap-1.5 ${
                      v.status === 'current' ? 'bg-success-light text-success'
                      : v.status === 'upcoming' ? 'bg-accent-light text-accent'
                      : v.status === 'attention' ? 'bg-warning-light text-warning'
                      : 'bg-danger-light text-danger'
                    }`}>
                      {config.icon}
                      {v.label}
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <p className="text-[13px] text-text-secondary">{v.description}</p>
                    </div>

                    {/* Affected endpoints */}
                    {v.affectedEndpoints > 0 && (
                      <span className="text-[12px] text-text-tertiary shrink-0">
                        {v.affectedEndpoints} endpoints
                      </span>
                    )}

                    {/* Progress */}
                    <div className="w-32 shrink-0">
                      {v.remaining > 0 ? (
                        <>
                          <ProgressBar
                            value={v.remaining}
                            max={v.total}
                            color={v.status === 'current' ? 'success' : v.status === 'attention' ? 'warning' : 'danger'}
                            height={4}
                          />
                          <span className="text-[11px] text-text-tertiary mt-1 block">{v.remaining}d remaining</span>
                        </>
                      ) : (
                        <span className="text-[12px] text-danger font-medium">Expired</span>
                      )}
                    </div>

                    {/* Action */}
                    <Button variant="ghost" size="sm">
                      <ArrowRightIcon size={14} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
