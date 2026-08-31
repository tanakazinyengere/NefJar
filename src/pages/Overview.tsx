import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import HealthScore from '../components/ui/HealthScore'
import StatusIndicator from '../components/ui/StatusIndicator'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import { useToast } from '../components/ui/Toast'
import {
  ShieldIcon,
  ApiIcon,
  VersionsIcon,
  WebhookIcon,
  ArrowRightIcon,
  CheckIcon,
  WarningIcon,
  ClockIcon,
  TrendingUpIcon,
  RefreshIcon,
} from '../components/icons'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function Overview() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [runningDiagnostic, setRunningDiagnostic] = useState(false)

  const handleRunDiagnostic = () => {
    setRunningDiagnostic(true)
    toast('Running integration diagnostic...')
    setTimeout(() => {
      setRunningDiagnostic(false)
      toast('Diagnostic complete — 94/100 health score')
      navigate('/analysis/diagnostics')
    }, 1200)
  }

  const handleViewDetails = () => {
    toast('Opening health monitor')
    navigate('/monitor/health')
  }

  const handleReviewMigration = () => {
    toast('Opening migration analysis')
    navigate('/analysis/migrations')
  }

  const handleInspectUsage = () => {
    toast('Opening API usage')
    navigate('/monitor/api')
  }

  const handleImproveScore = () => {
    toast('Loading improvement recommendations...')
    navigate('/analysis/diagnostics')
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="max-w-[1200px] mx-auto p-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-[26px] font-bold text-text-primary tracking-tight"
        >
          Good morning.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[15px] text-text-secondary mt-1"
        >
          Your LinkedIn integration is healthy.
          <span className="text-text-tertiary ml-2 text-[13px]">Last checked 12 seconds ago</span>
        </motion.p>
      </motion.div>

      {/* Health Hero */}
      <motion.div variants={fadeUp}>
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-3">
                Integration Health
              </div>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-[42px] font-bold text-text-primary leading-none tracking-tight">
                  94
                </span>
                <span className="text-[15px] text-text-tertiary font-medium mb-1">/ 100</span>
              </div>

              <ProgressBar value={94} color="success" height={8} delay={0.3} />

              <div className="flex items-center gap-4 mt-4">
                <StatusIndicator status="healthy" label="Excellent" />
                <span className="text-[13px] text-text-tertiary">
                  1 recommendation · 0 critical issues
                </span>
              </div>
            </div>

            <div className="ml-8">
              <HealthScore score={94} size={130} strokeWidth={8} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-border-light">
            <div className="flex items-center gap-2 text-[12px] text-text-tertiary">
              <ClockIcon size={14} />
              Last diagnostic 12s ago
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleRunDiagnostic}>
                <RefreshIcon size={14} className={runningDiagnostic ? 'animate-spin' : ''} />
                {runningDiagnostic ? 'Running...' : 'Run diagnostic'}
              </Button>
              <Button size="sm" onClick={handleViewDetails}>
                View details
                <ArrowRightIcon size={14} />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Four Core Status Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-6">
        <Card hover onClick={() => { toast('Opening authentication details'); }} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
              <ShieldIcon size={16} className="text-success" />
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">
              Authentication
            </span>
          </div>
          <StatusIndicator status="healthy" label="Healthy" size="sm" />
          <p className="text-[12px] text-text-tertiary mt-3">OAuth2 · Token valid</p>
        </Card>

        <Card hover onClick={() => { toast('Opening API health'); navigate('/monitor/api'); }} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
              <ApiIcon size={16} className="text-success" />
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">
              API Health
            </span>
          </div>
          <StatusIndicator status="healthy" label="Operational" size="sm" />
          <p className="text-[12px] text-text-tertiary mt-3">2,481 calls today</p>
        </Card>

        <Card hover onClick={() => { toast('Opening API versions'); navigate('/monitor/versions'); }} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
              <VersionsIcon size={16} className="text-accent" />
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">
              API Version
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[18px] font-bold text-text-primary">202608</span>
          </div>
          <p className="text-[12px] text-text-tertiary mt-3">287 days remaining</p>
        </Card>

        <Card hover onClick={() => { toast('Opening webhook monitor'); navigate('/test/webhooks'); }} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
              <WebhookIcon size={16} className="text-success" />
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">
              Webhooks
            </span>
          </div>
          <StatusIndicator status="healthy" label="Healthy" size="sm" />
          <p className="text-[12px] text-text-tertiary mt-3">99.9% uptime</p>
        </Card>
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        {/* Left: Attention + Timeline */}
        <div className="col-span-3 space-y-6">
          {/* Attention */}
          <motion.div variants={fadeUp}>
            <h2 className="text-[14px] font-semibold text-text-primary mb-3">
              What needs your attention
            </h2>
            <Card className="divide-y divide-border-light">
              <motion.div
                whileHover={{ backgroundColor: 'rgba(249,250,251,1)' }}
                whileTap={{ scale: 0.995 }}
                onClick={handleReviewMigration}
                className="p-4 flex items-center gap-3 cursor-pointer rounded-t-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-warning-light flex items-center justify-center shrink-0">
                  <WarningIcon size={16} className="text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">API version approaching sunset</p>
                  <p className="text-[12px] text-text-tertiary">43 days remaining</p>
                </div>
                <span className="text-[12px] text-accent font-medium whitespace-nowrap">Review migration →</span>
              </motion.div>

              <motion.div
                whileHover={{ backgroundColor: 'rgba(249,250,251,1)' }}
                whileTap={{ scale: 0.995 }}
                onClick={handleInspectUsage}
                className="p-4 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-warning-light flex items-center justify-center shrink-0">
                  <TrendingUpIcon size={16} className="text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">Rate usage increasing</p>
                  <p className="text-[12px] text-text-tertiary">+28% this week</p>
                </div>
                <span className="text-[12px] text-accent font-medium whitespace-nowrap">Inspect usage →</span>
              </motion.div>

              <div className="p-4 flex items-center gap-3 rounded-b-xl">
                <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center shrink-0">
                  <CheckIcon size={16} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">Webhooks healthy</p>
                  <p className="text-[12px] text-text-tertiary">All endpoints responding normally</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Today's Activity */}
          <motion.div variants={fadeUp}>
            <h2 className="text-[14px] font-semibold text-text-primary mb-3">
              Today's activity
            </h2>
            <Card className="p-5">
              <div className="space-y-0">
                {[
                  { time: '09:42', event: 'API version checked', icon: <CheckIcon size={14} className="text-success" /> },
                  { time: '09:38', event: '429 response detected', icon: <WarningIcon size={14} className="text-warning" /> },
                  { time: '09:37', event: 'Webhook validated', icon: <CheckIcon size={14} className="text-success" /> },
                  { time: '09:12', event: 'Deployment detected', icon: <ApiIcon size={14} className="text-accent" /> },
                  { time: '08:54', event: 'OAuth token refreshed', icon: <ShieldIcon size={14} className="text-success" /> },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3 timeline-dot"
                  >
                    <span className="text-[12px] font-mono text-text-tertiary w-12 shrink-0">
                      {item.time}
                    </span>
                    <div className="relative w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[13px] text-text-secondary">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right: Developer Score */}
        <motion.div variants={fadeUp} className="col-span-2">
          <h2 className="text-[14px] font-semibold text-text-primary mb-3">
            Developer Score
          </h2>
          <Card className="p-6">
            <div className="text-center mb-6">
              <HealthScore score={94} size={100} strokeWidth={7} />
              <p className="text-[13px] text-text-secondary mt-3">
                You can improve this to 98
              </p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={handleImproveScore}>
                Improve score
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t border-border-light">
              {[
                { label: 'Authentication', score: 100 },
                { label: 'API reliability', score: 96 },
                { label: 'Rate management', score: 88 },
                { label: 'Version health', score: 100 },
                { label: 'Webhook health', score: 99 },
                { label: 'Testing', score: 87 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-text-secondary">{item.label}</span>
                    <span className={`text-[12px] font-semibold ${
                      item.score >= 95 ? 'text-success' : item.score >= 80 ? 'text-warning' : 'text-danger'
                    }`}>
                      {item.score}
                    </span>
                  </div>
                  <ProgressBar
                    value={item.score}
                    color={item.score >= 95 ? 'success' : item.score >= 80 ? 'warning' : 'danger'}
                    height={4}
                    delay={0.4 + i * 0.05}
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
