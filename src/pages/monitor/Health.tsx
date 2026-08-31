import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import StatusIndicator from '../../components/ui/StatusIndicator'
import HealthScore from '../../components/ui/HealthScore'
import Button from '../../components/ui/Button'
import {
  ShieldIcon,
  ApiIcon,
  WebhookIcon,
  VersionsIcon,
  RefreshIcon,
} from '../../components/icons'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function MonitorHealth() {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-[1200px] mx-auto p-8">
      <motion.div variants={fadeUp} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Health</h1>
          <p className="text-[15px] text-text-secondary">
            Track API usage, errors, latency and reliability across your environments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1500) }} disabled={refreshing}>
            <RefreshIcon size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </motion.div>

      {/* Main health score */}
      <motion.div variants={fadeUp}>
        <Card className="p-8 mb-6">
          <div className="flex items-center gap-10">
            <HealthScore score={99} size={120} strokeWidth={8} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <StatusIndicator status="healthy" label="Healthy" />
              </div>
              <p className="text-[15px] text-text-secondary mb-4">
                99.97% uptime across all monitored endpoints
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Uptime</span>
                  <p className="text-[20px] font-bold text-text-primary mt-1">99.97%</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Avg Latency</span>
                  <p className="text-[20px] font-bold text-text-primary mt-1">241ms</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Error Rate</span>
                  <p className="text-[20px] font-bold text-success mt-1">0.3%</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Last Incident</span>
                  <p className="text-[20px] font-bold text-text-primary mt-1">12d</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Component health */}
      <motion.div variants={fadeUp}>
        <h2 className="text-[14px] font-semibold text-text-primary mb-3">Component Health</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                <ShieldIcon size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-text-primary">Authentication</h3>
              </div>
              <StatusIndicator status="healthy" label="Healthy" size="sm" />
            </div>
            <div className="space-y-2 text-[12px] text-text-secondary">
              <div className="flex justify-between"><span>Token expiry</span><span>6h remaining</span></div>
              <div className="flex justify-between"><span>Last refresh</span><span>18m ago</span></div>
              <div className="flex justify-between"><span>Refresh success</span><span>100%</span></div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                <ApiIcon size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-text-primary">API Endpoints</h3>
              </div>
              <StatusIndicator status="healthy" label="Operational" size="sm" />
            </div>
            <div className="space-y-2 text-[12px] text-text-secondary">
              <div className="flex justify-between"><span>Requests today</span><span>2,481</span></div>
              <div className="flex justify-between"><span>Success rate</span><span>99.7%</span></div>
              <div className="flex justify-between"><span>Avg response</span><span>241ms</span></div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                <WebhookIcon size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-text-primary">Webhooks</h3>
              </div>
              <StatusIndicator status="healthy" label="Healthy" size="sm" />
            </div>
            <div className="space-y-2 text-[12px] text-text-secondary">
              <div className="flex justify-between"><span>Events received</span><span>184</span></div>
              <div className="flex justify-between"><span>Processed</span><span>100%</span></div>
              <div className="flex justify-between"><span>Avg processing</span><span>38ms</span></div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
                <VersionsIcon size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-text-primary">API Version</h3>
              </div>
              <StatusIndicator status="healthy" label="Current" size="sm" />
            </div>
            <div className="space-y-2 text-[12px] text-text-secondary">
              <div className="flex justify-between"><span>Current</span><span>202608</span></div>
              <div className="flex justify-between"><span>Days remaining</span><span>287</span></div>
              <div className="flex justify-between"><span>Breaking changes</span><span>0</span></div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* 24h health timeline */}
      <motion.div variants={fadeUp}>
        <h2 className="text-[14px] font-semibold text-text-primary mb-3">24-hour health</h2>
        <Card className="p-5">
          <div className="flex items-end gap-[2px] h-20">
            {Array.from({ length: 48 }, (_, i) => {
              const health = i > 30 && i < 35 ? 85 : i > 40 ? 90 : 95 + Math.random() * 5
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${health}%` }}
                  transition={{ delay: i * 0.01, duration: 0.3 }}
                  className={`flex-1 rounded-sm ${
                    health >= 95 ? 'bg-success/60' : health >= 80 ? 'bg-warning/60' : 'bg-danger/60'
                  }`}
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-text-tertiary">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
