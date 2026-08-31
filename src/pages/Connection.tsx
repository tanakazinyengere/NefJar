import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusIndicator from '../components/ui/StatusIndicator'
import {
  GitHubIcon,
  ConnectionIcon,
  CheckIcon,
  ChevronIcon,
  ExternalLinkIcon,
  ShieldIcon,
  ApiIcon,
  WebhookIcon,
  CodeIcon,
} from '../components/icons'

type Step = 'select' | 'github' | 'detect' | 'linkedin' | 'complete'

const repositories = [
  { name: 'career-platform', description: 'LinkedIn integration for job listings', language: 'TypeScript', selected: false },
  { name: 'recruitment-dashboard', description: 'Candidate tracking system', language: 'TypeScript', selected: false },
  { name: 'social-scheduler', description: 'Post scheduling and publishing', language: 'TypeScript', selected: true },
  { name: 'analytics-api', description: 'LinkedIn Analytics API client', language: 'Go', selected: false },
]

export default function Connection() {
  const [step, setStep] = useState<Step>('select')
  const [selectedRepo, setSelectedRepo] = useState<string | null>('social-scheduler')

  return (
    <div className="max-w-[800px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">
          Connect your LinkedIn application
        </h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Connect your GitHub repository and LinkedIn developer application to start monitoring your integration.
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {(['select', 'github', 'detect', 'linkedin', 'complete'] as Step[]).map((s, i) => {
            const steps = ['select', 'github', 'detect', 'linkedin', 'complete']
            const currentIdx = steps.indexOf(step)
            const isComplete = i < currentIdx
            const isCurrent = i === currentIdx

            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-300 ${
                  isComplete
                    ? 'bg-success text-white'
                    : isCurrent
                    ? 'bg-text-primary text-white'
                    : 'bg-surface-hover text-text-tertiary'
                }`}>
                  {isComplete ? <CheckIcon size={14} /> : i + 1}
                </div>
                {i < 4 && (
                  <div className={`w-8 h-px ${
                    i < currentIdx ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Step: Select method */}
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-[13px] text-text-secondary mb-4">Choose how to add your project:</p>

              <Card
                hover
                onClick={() => setStep('github')}
                className="p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-text-primary flex items-center justify-center text-white">
                  <GitHubIcon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">GitHub</h3>
                  <p className="text-[13px] text-text-secondary">Import an existing project</p>
                </div>
                <div className="text-text-tertiary">
                  <ChevronIcon size={16} />
                </div>
              </Card>

              <Card hover className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center">
                  <CodeIcon size={24} className="text-text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">Local CLI</h3>
                  <p className="text-[13px] text-text-secondary">Connect a project from your machine</p>
                </div>
                <div className="text-text-tertiary">
                  <ChevronIcon size={16} />
                </div>
              </Card>

              <Card hover className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center">
                  <ConnectionIcon size={24} className="text-text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">Start without a repository</h3>
                  <p className="text-[13px] text-text-secondary">Explore the tools with no setup</p>
                </div>
                <div className="text-text-tertiary">
                  <ChevronIcon size={16} />
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step: GitHub */}
          {step === 'github' && (
            <motion.div
              key="github"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <GitHubIcon size={20} />
                  <h2 className="text-[15px] font-semibold text-text-primary">Your GitHub repositories</h2>
                </div>

                <div className="space-y-2">
                  {repositories.map((repo) => (
                    <div
                      key={repo.name}
                      onClick={() => setSelectedRepo(repo.name)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                        selectedRepo === repo.name
                          ? 'bg-accent-light border border-accent/20'
                          : 'hover:bg-surface-hover border border-transparent'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedRepo === repo.name
                          ? 'border-accent bg-accent'
                          : 'border-border'
                      }`}>
                        {selectedRepo === repo.name && (
                          <CheckIcon size={10} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-text-primary">{repo.name}</span>
                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-hover text-text-tertiary">{repo.language}</span>
                        </div>
                        <p className="text-[12px] text-text-tertiary mt-0.5">{repo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-light">
                  <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                    Back
                  </Button>
                  <Button size="sm" onClick={() => setStep('detect')}>
                    Continue
                    <ChevronIcon size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step: Detect */}
          {step === 'detect' && (
            <motion.div
              key="detect"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                    <CodeIcon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-text-primary">Detecting LinkedIn integration</h2>
                    <p className="text-[13px] text-text-tertiary">Scanning social-scheduler...</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'LinkedIn API references', detected: true, icon: <ApiIcon size={16} /> },
                    { label: 'OAuth configuration', detected: true, icon: <ShieldIcon size={16} /> },
                    { label: 'API version', detected: true, value: '202608', icon: <CodeIcon size={16} /> },
                    { label: 'Webhook handlers', detected: true, icon: <WebhookIcon size={16} /> },
                    { label: 'Environment variables', detected: true, icon: <CodeIcon size={16} /> },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover/50"
                    >
                      <div className="text-text-tertiary">{item.icon}</div>
                      <span className="text-[13px] text-text-primary flex-1">{item.label}</span>
                      {item.detected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.2 + 0.1 }}
                        >
                          <StatusIndicator status="healthy" label={item.value || 'Detected'} size="sm" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border-light">
                  <Button className="w-full" onClick={() => setStep('linkedin')}>
                    Continue to LinkedIn connection
                    <ChevronIcon size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step: LinkedIn */}
          {step === 'linkedin' && (
            <motion.div
              key="linkedin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                    <ConnectionIcon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-text-primary">Connect LinkedIn</h2>
                    <p className="text-[13px] text-text-tertiary">Authorize your LinkedIn developer application</p>
                  </div>
                </div>

                <div className="bg-surface-hover rounded-xl p-5 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Application</span>
                      <p className="text-[13px] text-text-primary mt-1">social-scheduler-app</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Environment</span>
                      <p className="text-[13px] text-text-primary mt-1">Development</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Scopes</span>
                      <p className="text-[13px] text-text-primary mt-1">w_member_social, r_liteprofile</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Redirect URI</span>
                      <p className="text-[13px] text-text-primary mt-1">https://app.nefjar.dev/callback</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => setStep('complete')}>
                  Connect LinkedIn
                  <ExternalLinkIcon size={14} />
                </Button>

                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" onClick={() => setStep('detect')}>
                    Back
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4"
                >
                  <CheckIcon size={32} className="text-success" />
                </motion.div>

                <h2 className="text-[20px] font-bold text-text-primary mb-2">
                  LinkedIn connected
                </h2>
                <p className="text-[14px] text-text-secondary mb-6">
                  Your application is authorized and ready to analyze.
                </p>

                <div className="bg-surface-hover rounded-xl p-5 max-w-md mx-auto mb-6">
                  <div className="space-y-3">
                    {[
                      { label: 'LinkedIn API', status: 'healthy', value: 'Detected' },
                      { label: 'OAuth', status: 'healthy', value: 'Detected' },
                      { label: 'API Version', status: 'healthy', value: '202608' },
                      { label: 'Webhooks', status: 'healthy', value: 'Detected' },
                      { label: 'GitHub', status: 'healthy', value: 'Connected' },
                      { label: 'Environment', status: 'healthy', value: 'Development' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-[13px] text-text-secondary">{item.label}</span>
                        <StatusIndicator status={item.status as 'healthy'} label={item.value} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button variant="secondary" onClick={() => setStep('select')}>
                    Connect another
                  </Button>
                  <Button onClick={() => window.location.href = '/analysis/diagnostics'}>
                    Run Integration Check
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
