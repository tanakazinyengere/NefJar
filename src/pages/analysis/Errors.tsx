import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import {
  ExternalLinkIcon,
  ClaudeIcon,
  ClockIcon,
} from '../../components/icons'

interface ErrorEntry {
  status: number
  title: string
  requestsAffected: number
  firstDetected: string
  likelyCause: string
  confidence: number
  evidence: string[]
}

const errors: ErrorEntry[] = [
  {
    status: 403,
    title: 'Access Denied',
    requestsAffected: 87,
    firstDetected: '14 minutes ago',
    likelyCause: 'Missing product access',
    confidence: 94,
    evidence: [
      'Endpoint requires w_product_data scope',
      'Application does not have Marketing API product',
      '3 different endpoints affected',
    ],
  },
  {
    status: 429,
    title: 'Rate Limited',
    requestsAffected: 12,
    firstDetected: '2 hours ago',
    likelyCause: 'Application quota approaching limit',
    confidence: 89,
    evidence: [
      'Application-level rate limit observed',
      'Current utilization: 81%',
      'Usage increased 34% in last 24h',
    ],
  },
  {
    status: 401,
    title: 'Unauthorized',
    requestsAffected: 5,
    firstDetected: '1 day ago',
    likelyCause: 'Token expired during background task',
    confidence: 97,
    evidence: [
      'Token age exceeded 60-day window',
      'Refresh attempted but failed',
      'Background job needs token refresh handling',
    ],
  },
]

export default function Errors() {
  const navigate = useNavigate()
  const { toast } = useToast()
  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Errors</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Investigate failed requests and identify the most likely cause.
        </p>

        <div className="space-y-4">
          {errors.map((error, i) => (
            <motion.div
              key={`${error.status}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-5">
                  {/* Status code */}
                  <div className="shrink-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-[18px] font-bold font-mono ${
                      error.status >= 500 ? 'bg-danger-light text-danger'
                      : error.status >= 400 ? 'bg-warning-light text-warning'
                      : 'bg-accent-light text-accent'
                    }`}>
                      {error.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-[16px] font-semibold text-text-primary">{error.title}</h2>
                      <span className="text-[12px] text-text-tertiary">
                        {error.requestsAffected} requests affected
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-text-tertiary mb-4">
                      <ClockIcon size={12} />
                      First detected {error.firstDetected}
                    </div>

                    {/* Diagnosis */}
                    <div className="bg-bg rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                          Most likely cause
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-success-light text-success font-medium">
                          {error.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-[14px] font-medium text-text-primary">{error.likelyCause}</p>

                      <div className="mt-3 pt-3 border-t border-border-light">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Evidence</span>
                        <ul className="mt-2 space-y-1">
                          {error.evidence.map((e, j) => (
                            <li key={j} className="text-[12px] text-text-secondary flex items-start gap-2">
                              <span className="text-text-tertiary mt-0.5">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Resolution */}
                    <div className="bg-surface-hover rounded-lg p-4 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                        Resolution
                      </span>
                      <p className="text-[13px] text-text-secondary mt-1">
                        {error.status === 403
                          ? 'Request access to the required LinkedIn product in your Developer Portal.'
                          : error.status === 429
                          ? 'Reduce request frequency. Consider implementing exponential backoff with jitter.'
                          : 'Implement automatic token refresh before expiry window.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="secondary" size="sm" onClick={() => { toast('Opening diagnostics...'); navigate('/analysis/diagnostics') }}>
                        Review resolution
                      </Button>
                      <Button size="sm" onClick={() => { toast('Opening Claude with error context...'); navigate('/ai/claude') }}>
                        <ClaudeIcon size={14} />
                        Open in Claude
                        <ExternalLinkIcon size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
