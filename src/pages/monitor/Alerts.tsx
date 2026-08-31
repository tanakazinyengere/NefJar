import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import {
  AlertsIcon,
  WarningIcon,
  TrendingUpIcon,
  ShieldIcon,
  WebhookIcon,
  VersionsIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../../components/icons'

interface Alert {
  id: string
  title: string
  description: string
  severity: 'warning' | 'info' | 'critical'
  time: string
  category: string
  action?: string
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'API usage approaching limit',
    description: 'Application-level quota is approaching its observed limit. Current utilization: 81%.',
    severity: 'warning',
    time: '2m ago',
    category: 'Usage',
    action: 'View usage',
  },
  {
    id: '2',
    title: 'New API version available',
    description: 'API version 202609 is now available. No breaking changes detected.',
    severity: 'info',
    time: '1h ago',
    category: 'Version',
    action: 'View version',
  },
  {
    id: '3',
    title: 'Authorization token expiring soon',
    description: 'Your OAuth token will expire in 6 hours. Automatic refresh is enabled.',
    severity: 'info',
    time: '3h ago',
    category: 'Auth',
    action: 'Review token',
  },
  {
    id: '4',
    title: 'Error rate increased',
    description: 'API error rate increased 24% over the last hour. Primarily 429 responses.',
    severity: 'warning',
    time: '4h ago',
    category: 'Errors',
    action: 'View errors',
  },
  {
    id: '5',
    title: 'Webhook endpoint responding slowly',
    description: 'Webhook processing time increased to 380ms (baseline: 45ms).',
    severity: 'warning',
    time: '6h ago',
    category: 'Webhooks',
    action: 'View webhooks',
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Usage: <TrendingUpIcon size={16} className="text-warning" />,
  Version: <VersionsIcon size={16} className="text-accent" />,
  Auth: <ShieldIcon size={16} className="text-accent" />,
  Errors: <WarningIcon size={16} className="text-warning" />,
  Webhooks: <WebhookIcon size={16} className="text-warning" />,
}

export default function Alerts() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [readAlerts, setReadAlerts] = useState<Set<string>>(new Set())

  const [showEmpty, setShowEmpty] = useState(false)

  const handleMarkAllRead = () => {
    setReadAlerts(new Set(alerts.map(a => a.id)))
    setShowEmpty(true)
    toast('All alerts marked as read')
  }

  if (showEmpty || alerts.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Alerts</h1>
          <p className="text-[15px] text-text-secondary mb-8">
            Get notified when your integration needs attention.
          </p>
          <EmptyState
            type="completed"
            icon={<CheckIcon size={24} />}
            title="You're all caught up"
            description="No outstanding alerts. Your integration is running smoothly."
            instruction="We'll notify you when something needs your attention."
            primaryAction={{ label: 'Run diagnostic', onClick: () => { toast('Running diagnostic...'); setShowEmpty(false) } }}
            secondaryAction={{ label: 'View health', onClick: () => {} }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Alerts</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Get notified when your integration needs attention.
        </p>

        {/* Active alerts */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-semibold text-text-primary">Active Alerts</h2>
            <span className="text-[12px] px-2 py-0.5 rounded-full bg-warning-light text-warning font-medium">
              {alerts.filter((a) => a.severity === 'warning').length}
            </span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleMarkAllRead}>
            <CheckIcon size={14} />
            Mark all as read
          </Button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hover className={`p-5 transition-opacity ${readAlerts.has(alert.id) ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    alert.severity === 'warning' ? 'bg-warning-light'
                    : alert.severity === 'critical' ? 'bg-danger-light'
                    : 'bg-accent-light'
                  }`}>
                    {categoryIcons[alert.category] || <AlertsIcon size={16} className="text-text-secondary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[14px] font-medium text-text-primary">{alert.title}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ${
                        alert.severity === 'warning' ? 'bg-warning-light text-warning'
                        : alert.severity === 'critical' ? 'bg-danger-light text-danger'
                        : 'bg-accent-light text-accent'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[12px] text-text-tertiary flex items-center gap-1">
                        <ClockIcon size={12} />
                        {alert.time}
                      </span>
                      <span className="text-[12px] text-text-tertiary">{alert.category}</span>
                    </div>
                  </div>
                  {alert.action && (
                    <Button variant="ghost" size="sm" className="shrink-0" onClick={() => {
                      if (alert.category === 'Usage') navigate('/monitor/api')
                      else if (alert.category === 'Version') navigate('/monitor/versions')
                      else if (alert.category === 'Auth') navigate('/build/connection')
                      else if (alert.category === 'Errors') navigate('/analysis/errors')
                      else if (alert.category === 'Webhooks') navigate('/test/webhooks')
                    }}>
                      {alert.action}
                      <ArrowRightIcon size={14} />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
