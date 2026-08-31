import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusIndicator from '../components/ui/StatusIndicator'
import {
  SettingsIcon,
  GitHubIcon,
  UsersIcon,
  CreditCardIcon,
  GlobeIcon,
  KeyIcon,
  BellIcon,
  LockIcon,
  CheckIcon,
  RefreshIcon,
} from '../components/icons'

const sections = [
  'Project',
  'LinkedIn',
  'GitHub',
  'Environments',
  'Security',
  'Team',
  'Integrations',
  'Billing',
]

const sectionIcons: Record<string, React.ReactNode> = {
  Project: <SettingsIcon size={16} />,
  LinkedIn: <GlobeIcon size={16} />,
  GitHub: <GitHubIcon size={16} />,
  Environments: <GlobeIcon size={16} />,
  Security: <LockIcon size={16} />,
  Team: <UsersIcon size={16} />,
  Integrations: <KeyIcon size={16} />,
  Billing: <CreditCardIcon size={16} />,
}

function SaveButton() {
  const [saved, setSaved] = useState(false)
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }}
    >
      <AnimatePresence mode="wait">
        {saved ? (
          <motion.span key="saved" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-success">
            <CheckIcon size={14} />
            Saved
          </motion.span>
        ) : (
          <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Save changes
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

function SyncButton() {
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const handleSync = () => {
    setSyncing(true)
    setSynced(false)
    setTimeout(() => { setSyncing(false); setSynced(true); setTimeout(() => setSynced(false), 2000) }, 1500)
  }
  return (
    <Button variant="ghost" size="sm" className="ml-auto" onClick={handleSync} disabled={syncing}>
      <RefreshIcon size={14} className={syncing ? 'animate-spin' : ''} />
      {syncing ? 'Syncing...' : synced ? 'Synced' : 'Sync now'}
    </Button>
  )
}

function AddEnvironmentButton() {
  const [added, setAdded] = useState(false)
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
    >
      {added ? <><CheckIcon size={14} /> Added</> : 'Add environment'}
    </Button>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Project')
  const navigate = useNavigate()

  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-8">Settings</h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Settings nav */}
          <div className="col-span-3">
            <Card className="p-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 flex items-center gap-2 ${
                    activeSection === section
                      ? 'bg-sidebar-active text-text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {sectionIcons[section]}
                  {section}
                </button>
              ))}
            </Card>
          </div>

          {/* Settings content */}
          <div className="col-span-9">
            {activeSection === 'Project' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Project Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">
                      Project Name
                    </label>
                    <input
                      type="text"
                      defaultValue="My LinkedIn App"
                      className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">
                      Description
                    </label>
                    <textarea
                      defaultValue="LinkedIn integration for career platform"
                      rows={3}
                      className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                    />
                  </div>
                </div>
                <SaveButton />
              </Card>
            )}

            {activeSection === 'LinkedIn' && (
              <Card className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[15px] font-semibold text-text-primary">LinkedIn Configuration</h2>
                  <StatusIndicator status="healthy" label="Connected" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Application ID</label>
                    <input type="text" defaultValue="86u5k4ch6x" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">API Version</label>
                    <input type="text" defaultValue="202608" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">OAuth Redirect URI</label>
                    <input type="text" defaultValue="https://app.nefjar.dev/callback" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Scopes</label>
                    <input type="text" defaultValue="w_member_social, r_liteprofile, r_organization_social" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" />
                  </div>
                </div>
                <SaveButton />
              </Card>
            )}

            {activeSection === 'GitHub' && (
              <Card className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[15px] font-semibold text-text-primary">GitHub Integration</h2>
                  <StatusIndicator status="healthy" label="Connected" />
                </div>
                <div className="bg-bg rounded-lg p-4 flex items-center gap-3">
                  <GitHubIcon size={20} />
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">social-scheduler</p>
                    <p className="text-[12px] text-text-tertiary">Last synced 12 minutes ago</p>
                  </div>
                  <SyncButton />
                </div>
              </Card>
            )}

            {activeSection === 'Billing' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Billing</h2>
                <div className="bg-accent-light rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">Current Plan</span>
                      <p className="text-[20px] font-bold text-text-primary mt-1">Free</p>
                      <p className="text-[13px] text-text-secondary mt-1">1 project · 1 environment · 1,000 monitored requests</p>
                    </div>
                    <Button onClick={() => navigate('/billing')}>Upgrade to Pro</Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-bg rounded-lg p-3 text-center">
                    <span className="text-[18px] font-bold text-text-primary block">1/1</span>
                    <span className="text-[11px] text-text-tertiary">projects</span>
                  </div>
                  <div className="bg-bg rounded-lg p-3 text-center">
                    <span className="text-[18px] font-bold text-text-primary block">1/1</span>
                    <span className="text-[11px] text-text-tertiary">environments</span>
                  </div>
                  <div className="bg-bg rounded-lg p-3 text-center">
                    <span className="text-[18px] font-bold text-text-primary block">281/1K</span>
                    <span className="text-[11px] text-text-tertiary">requests today</span>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'Security' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Security</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                    <div className="flex items-center gap-3">
                      <KeyIcon size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">API Keys</p>
                        <p className="text-[12px] text-text-tertiary">Manage API keys for programmatic access</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => setActiveSection('Security')}>Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                    <div className="flex items-center gap-3">
                      <LockIcon size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">Token Storage</p>
                        <p className="text-[12px] text-text-tertiary">OAuth tokens are encrypted at rest</p>
                      </div>
                    </div>
                    <StatusIndicator status="healthy" label="Encrypted" size="sm" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                    <div className="flex items-center gap-3">
                      <BellIcon size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">Audit Logs</p>
                        <p className="text-[12px] text-text-tertiary">Track all configuration changes</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-text-tertiary">Pro plan feature</span>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'Team' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Team</h2>
                <p className="text-[13px] text-text-secondary">Team collaboration is available on Pro and Scale plans.</p>
                <Button onClick={() => navigate('/billing')}>Upgrade to Pro</Button>
              </Card>
            )}

            {activeSection === 'Environments' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Environments</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-[13px] font-medium text-text-primary">Development</span>
                    </div>
                    <StatusIndicator status="healthy" label="Active" size="sm" />
                  </div>
                </div>
                <AddEnvironmentButton />
              </Card>
            )}

            {activeSection === 'Integrations' && (
              <Card className="p-6 space-y-6">
                <h2 className="text-[15px] font-semibold text-text-primary">Integrations</h2>
                <div className="space-y-3">
                  {[
                    { name: 'GitHub', status: 'healthy', label: 'Connected', route: '/build/connection' },
                    { name: 'Claude / MCP', status: 'healthy', label: 'Connected', route: '/ai/mcp' },
                    { name: 'Slack', status: 'neutral' as const, label: 'Not configured', route: null },
                    { name: 'Email', status: 'neutral' as const, label: 'Not configured', route: null },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-bg rounded-lg">
                      <span className="text-[13px] font-medium text-text-primary">{integration.name}</span>
                      <div className="flex items-center gap-2">
                        <StatusIndicator
                          status={integration.status as 'healthy'}
                          label={integration.label}
                          size="sm"
                        />
                        {integration.route && (
                          <Button variant="ghost" size="sm" onClick={() => navigate(integration.route!)}>
                            Configure
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
