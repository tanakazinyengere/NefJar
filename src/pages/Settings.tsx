import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/ui/Button'
import StatusIndicator from '../components/ui/StatusIndicator'
import { useToast } from '../components/ui/Toast'
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
  FileTextIcon,
  LayersIcon,
} from '../components/icons'

const sections = [
  'Project', 'LinkedIn', 'GitHub', 'Environments', 'Account',
  'Appearance', 'Notifications', 'Security', 'Data Export', 'Team', 'Integrations', 'Billing',
]

const sectionIcons: Record<string, React.ReactNode> = {
  Project: <SettingsIcon size={16} />,
  LinkedIn: <GlobeIcon size={16} />,
  GitHub: <GitHubIcon size={16} />,
  Environments: <GlobeIcon size={16} />,
  Account: <UsersIcon size={16} />,
  Appearance: <LayersIcon size={16} />,
  Notifications: <BellIcon size={16} />,
  Security: <LockIcon size={16} />,
  'Data Export': <FileTextIcon size={16} />,
  Team: <UsersIcon size={16} />,
  Integrations: <KeyIcon size={16} />,
  Billing: <CreditCardIcon size={16} />,
}

function SaveButton() {
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => { setSaved(true); toast('Settings saved successfully'); setTimeout(() => setSaved(false), 2000) }}
    >
      <AnimatePresence mode="wait">
        {saved ? (
          <motion.span key="saved" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-success">
            <CheckIcon size={14} /> Saved
          </motion.span>
        ) : (
          <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Save changes</motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

function Toggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        <p className="text-[12px] text-text-tertiary">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${on ? 'bg-accent' : 'bg-border'}`}
        role="switch"
        aria-checked={on}
        aria-label={label}
      >
        <motion.span
          animate={{ x: on ? 18 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  )
}

function SyncButton() {
  const [syncing, setSyncing] = useState(false)
  const { toast } = useToast()
  return (
    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => { setSyncing(true); setTimeout(() => { setSyncing(false); toast('GitHub synced') }, 1500) }} disabled={syncing}>
      <RefreshIcon size={14} className={syncing ? 'animate-spin' : ''} />
      {syncing ? 'Syncing...' : 'Sync now'}
    </Button>
  )
}

function AddEnvironmentButton() {
  const [added, setAdded] = useState(false)
  const { toast } = useToast()
  return (
    <Button variant="secondary" size="sm" onClick={() => { setAdded(true); toast('Environment added'); setTimeout(() => setAdded(false), 2000) }}>
      {added ? <><CheckIcon size={14} /> Added</> : 'Add environment'}
    </Button>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Project')
  const navigate = useNavigate()

  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-8">Settings</h1>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card className="p-2">
              {sections.map((section) => (
                <button key={section} onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 flex items-center gap-2 ${activeSection === section ? 'bg-sidebar-active text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'}`}>
                  {sectionIcons[section]}{section}
                </button>
              ))}
            </Card>
          </div>

          <div className="col-span-9">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>

                {activeSection === 'Project' && (
                  <Card className="p-6 space-y-6">
                    <h2 className="text-[15px] font-semibold text-text-primary">Project Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Project Name</label>
                        <input type="text" defaultValue="My LinkedIn App" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Description</label>
                        <textarea defaultValue="LinkedIn integration for career platform" rows={3} className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
                      </div>
                    </div>
                    <SaveButton />
                  </Card>
                )}

                {activeSection === 'Account' && (
                  <Card className="p-6 space-y-6">
                    <h2 className="text-[15px] font-semibold text-text-primary">Account</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-[14px] font-semibold">JD</div>
                      <div>
                        <p className="text-[14px] font-medium text-text-primary">John Doe</p>
                        <p className="text-[12px] text-text-tertiary">john@example.com</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Display Name</label>
                        <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30" /></div>
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Email</label>
                        <input type="email" defaultValue="john@example.com" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-accent/30" /></div>
                    </div>
                    <SaveButton />
                  </Card>
                )}

                {activeSection === 'Appearance' && (
                  <Card className="p-6 space-y-4">
                    <h2 className="text-[15px] font-semibold text-text-primary">Appearance</h2>
                    <Toggle label="Dark mode" description="Switch between light and dark themes" />
                    <Toggle label="Compact layout" description="Reduce spacing for more information density" />
                    <Toggle label="Reduced motion" description="Minimize animations throughout the interface" />
                    <div className="pt-3 border-t border-border-light">
                      <h3 className="text-[13px] font-medium text-text-primary mb-3">Density</h3>
                      <div className="flex gap-2">
                        {['Comfortable', 'Compact', 'Dense'].map((d) => (
                          <button key={d} className="px-4 py-2 rounded-lg text-[13px] font-medium border border-border hover:border-accent hover:text-accent transition-colors">
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                {activeSection === 'Notifications' && (
                  <Card className="p-6 space-y-1">
                    <h2 className="text-[15px] font-semibold text-text-primary mb-4">Notifications</h2>
                    <Toggle label="API version alerts" description="Get notified when API versions change" defaultOn />
                    <Toggle label="Error rate increases" description="Alert when error rates exceed thresholds" defaultOn />
                    <Toggle label="Rate limit warnings" description="Notify when approaching rate limits" defaultOn />
                    <Toggle label="Webhook failures" description="Alert on webhook processing failures" defaultOn />
                    <Toggle label="Health changes" description="Notify on integration health changes" />
                    <Toggle label="Migration reminders" description="Reminders before version sunsets" defaultOn />
                    <div className="pt-3 border-t border-border-light mt-2">
                      <h3 className="text-[13px] font-medium text-text-primary mb-3">Channels</h3>
                      <Toggle label="Email notifications" description="Receive alerts via email" />
                      <Toggle label="Slack notifications" description="Post alerts to Slack channel" />
                      <Toggle label="In-app notifications" description="Show notifications inside the app" defaultOn />
                    </div>
                  </Card>
                )}

                {activeSection === 'Data Export' && (
                  <Card className="p-6 space-y-6">
                    <div>
                      <h2 className="text-[15px] font-semibold text-text-primary">Data Export</h2>
                      <p className="text-[13px] text-text-secondary mt-1">Download a copy of your integration data.</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'All data', desc: 'Complete export including configuration, diagnostics, and history', format: 'JSON' },
                        { label: 'Diagnostics history', desc: 'Export diagnostic results and health data', format: 'CSV' },
                        { label: 'Error logs', desc: 'Export error analysis and resolution history', format: 'CSV' },
                        { label: 'Configuration', desc: 'Export project settings and connection data', format: 'JSON' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 bg-bg rounded-lg">
                          <div>
                            <p className="text-[13px] font-medium text-text-primary">{item.label}</p>
                            <p className="text-[12px] text-text-tertiary">{item.desc}</p>
                          </div>
                          <Button variant="secondary" size="sm">Export {item.format}</Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {activeSection === 'LinkedIn' && (
                  <Card className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[15px] font-semibold text-text-primary">LinkedIn Configuration</h2>
                      <StatusIndicator status="healthy" label="Connected" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Application ID</label>
                        <input type="text" defaultValue="86u5k4ch6x" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" /></div>
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">API Version</label>
                        <input type="text" defaultValue="202608" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" /></div>
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">OAuth Redirect URI</label>
                        <input type="text" defaultValue="https://app.nefjar.dev/callback" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" /></div>
                      <div><label className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1.5">Scopes</label>
                        <input type="text" defaultValue="w_member_social, r_liteprofile, r_organization_social" className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-[13px] text-text-primary font-mono" /></div>
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
                      <div><p className="text-[13px] font-medium text-text-primary">social-scheduler</p><p className="text-[12px] text-text-tertiary">Last synced 12 minutes ago</p></div>
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
                        <Button onClick={() => {}}>Upgrade to Pro</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-bg rounded-lg p-3 text-center"><span className="text-[18px] font-bold text-text-primary block">1/1</span><span className="text-[11px] text-text-tertiary">projects</span></div>
                      <div className="bg-bg rounded-lg p-3 text-center"><span className="text-[18px] font-bold text-text-primary block">1/1</span><span className="text-[11px] text-text-tertiary">environments</span></div>
                      <div className="bg-bg rounded-lg p-3 text-center"><span className="text-[18px] font-bold text-text-primary block">281/1K</span><span className="text-[11px] text-text-tertiary">requests today</span></div>
                    </div>
                  </Card>
                )}

                {activeSection === 'Security' && (
                  <Card className="p-6 space-y-4">
                    <h2 className="text-[15px] font-semibold text-text-primary">Security</h2>
                    <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                      <div className="flex items-center gap-3"><KeyIcon size={16} className="text-text-secondary" /><div><p className="text-[13px] font-medium text-text-primary">API Keys</p><p className="text-[12px] text-text-tertiary">Manage API keys for programmatic access</p></div></div>
                      <Button variant="secondary" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                      <div className="flex items-center gap-3"><LockIcon size={16} className="text-text-secondary" /><div><p className="text-[13px] font-medium text-text-primary">Token Storage</p><p className="text-[12px] text-text-tertiary">OAuth tokens are encrypted at rest</p></div></div>
                      <StatusIndicator status="healthy" label="Encrypted" size="sm" />
                    </div>
                    <Toggle label="Two-factor authentication" description="Add an extra layer of security to your account" />
                    <Toggle label="Login notifications" description="Get notified of new sign-ins" defaultOn />
                  </Card>
                )}

                {activeSection === 'Team' && (
                  <Card className="p-6 space-y-6">
                    <h2 className="text-[15px] font-semibold text-text-primary">Team</h2>
                    <p className="text-[13px] text-text-secondary">Team collaboration is available on Pro and Scale plans.</p>
                    <Button onClick={() => {}}>Upgrade to Pro</Button>
                  </Card>
                )}

                {activeSection === 'Environments' && (
                  <Card className="p-6 space-y-6">
                    <h2 className="text-[15px] font-semibold text-text-primary">Environments</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-bg rounded-lg">
                        <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-[13px] font-medium text-text-primary">Development</span></div>
                        <StatusIndicator status="healthy" label="Active" size="sm" />
                      </div>
                    </div>
                    <AddEnvironmentButton />
                  </Card>
                )}

                {activeSection === 'Integrations' && (
                  <Card className="p-6 space-y-4">
                    <h2 className="text-[15px] font-semibold text-text-primary">Integrations</h2>
                    {[
                      { name: 'GitHub', status: 'healthy', label: 'Connected', route: '/build/connection' },
                      { name: 'Claude / MCP', status: 'healthy', label: 'Connected', route: '/ai/mcp' },
                      { name: 'Slack', status: 'neutral' as const, label: 'Not configured', route: null },
                      { name: 'Email', status: 'neutral' as const, label: 'Not configured', route: null },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 bg-bg rounded-lg">
                        <span className="text-[13px] font-medium text-text-primary">{integration.name}</span>
                        <div className="flex items-center gap-2">
                          <StatusIndicator status={integration.status as 'healthy'} label={integration.label} size="sm" />
                          {integration.route && <Button variant="ghost" size="sm" onClick={() => navigate(integration.route!)}>Configure</Button>}
                        </div>
                      </div>
                    ))}
                  </Card>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
