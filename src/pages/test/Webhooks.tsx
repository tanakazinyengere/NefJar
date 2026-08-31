import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusIndicator from '../../components/ui/StatusIndicator'
import {
  WebhookIcon,
  PlayIcon,
  RefreshIcon,
} from '../../components/icons'

const webhookEvents = [
  { id: '1', event: 'organizationSocialWallPostCreated', received: 42, failed: 0, lastReceived: '12m ago', status: 'healthy' as const },
  { id: '2', event: 'organizationSocialWallPostCommented', received: 18, failed: 0, lastReceived: '1h ago', status: 'healthy' as const },
  { id: '3', event: 'organizationSocialWallPostReactionCreated', received: 95, failed: 1, lastReceived: '5m ago', status: 'warning' as const },
]

export default function Webhooks() {
  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Webhooks</h1>
            <p className="text-[15px] text-text-secondary">
              Test and validate your webhook processing pipeline.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => {}}>
              <RefreshIcon size={14} />
              Test all
            </Button>
            <Button size="sm" onClick={() => {}}>
              <PlayIcon size={14} />
              Send test event
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {webhookEvents.map((wh, i) => (
            <motion.div
              key={wh.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    wh.status === 'healthy' ? 'bg-success-light' : 'bg-warning-light'
                  }`}>
                    <WebhookIcon size={16} className={wh.status === 'healthy' ? 'text-success' : 'text-warning'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-mono font-medium text-text-primary">{wh.event}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[12px] text-text-tertiary">
                      <span>{wh.received} received</span>
                      <span>{wh.failed} failed</span>
                      <span>Last {wh.lastReceived}</span>
                    </div>
                  </div>
                  <StatusIndicator
                    status={wh.status}
                    label={wh.status === 'healthy' ? 'Healthy' : 'Attention'}
                    size="sm"
                  />
                  <Button variant="ghost" size="sm" onClick={() => {}}>
                    <PlayIcon size={14} />
                    Test
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
