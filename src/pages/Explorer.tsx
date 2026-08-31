import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusIndicator from '../components/ui/StatusIndicator'
import Breadcrumb from '../components/Breadcrumb'
import {
  SendIcon,
  CheckIcon,
} from '../components/icons'

const endpoints = [
  {
    category: 'Member',
    items: [
      { method: 'GET', path: '/rest/me', description: 'Get current member profile' },
      { method: 'GET', path: '/rest/me?projection=(id,firstName,lastName)', description: 'Get profile with projection' },
      { method: 'POST', path: '/rest/me/posts', description: 'Create a new post' },
    ],
  },
  {
    category: 'Organization',
    items: [
      { method: 'GET', path: '/rest/organizations/{id}', description: 'Get organization details' },
      { method: 'GET', path: '/rest/organizations/{id}/followers/count', description: 'Get follower count' },
    ],
  },
  {
    category: 'Posts',
    items: [
      { method: 'GET', path: '/rest/posts/{id}', description: 'Get post details' },
      { method: 'DELETE', path: '/rest/posts/{id}', description: 'Delete a post' },
    ],
  },
  {
    category: 'Comments',
    items: [
      { method: 'GET', path: '/rest/posts/{id}/comments', description: 'Get post comments' },
      { method: 'POST', path: '/rest/posts/{id}/comments', description: 'Create a comment' },
    ],
  },
  {
    category: 'Events',
    items: [
      { method: 'GET', path: '/rest/events/{id}', description: 'Get event details' },
    ],
  },
]

const methodColors: Record<string, string> = {
  GET: 'bg-success-light text-success',
  POST: 'bg-accent-light text-accent',
  PUT: 'bg-warning-light text-warning',
  DELETE: 'bg-danger-light text-danger',
  PATCH: 'bg-status-info-surface text-status-info',
}

export default function Explorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].items[0])
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    setResponse(null)
    await new Promise((r) => setTimeout(r, 800))
    setResponse(JSON.stringify({
      id: 'urn:li:member:1234567890',
      firstName: { localized: { en_US: 'John' }, preferredLocale: { country: 'US', language: 'en' } },
      lastName: { localized: { en_US: 'Doe' }, preferredLocale: { country: 'US', language: 'en' } },
      profilePicture: { displayImage: { 'com.linkedin.digitalmedia.mediaartifact.StillImage': { storageSize: { width: 400, height: 400 } } } },
    }, null, 2))
    setLoading(false)
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">
          API Explorer
        </h1>
        <p className="text-[15px] text-text-secondary mb-6">
          Inspect endpoints, permissions, request parameters and responses in one place.
        </p>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)]">
          {/* Left: Endpoint list */}
          <div className="col-span-4 overflow-y-auto">
            <Card className="p-4">
              <div className="space-y-4">
                {endpoints.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-2">
                      {group.category}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((ep) => (
                        <motion.button
                          key={ep.path}
                          layoutId={selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method ? 'endpoint-selected' : undefined}
                          onClick={() => setSelectedEndpoint(ep)}
                          whileHover={{ x: 2, transition: { type: 'spring', stiffness: 400, damping: 25, mass: 0.6 } }}
                          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors duration-150 ${
                            selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                              ? 'bg-accent-light border border-accent/20'
                              : 'hover:bg-bg-surface-hover'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColors[ep.method]}`}>
                              {ep.method}
                            </span>
                            <span className="text-text-primary font-mono text-[12px] truncate">
                              {ep.path}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-tertiary pl-[46px]">{ep.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Request/Response */}
          <div className="col-span-8 flex flex-col gap-4">
            {/* Request bar */}
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <motion.span layoutId="endpoint-method" className={`text-[11px] font-bold px-2 py-1 rounded ${methodColors[selectedEndpoint.method]}`}>
                  {selectedEndpoint.method}
                </motion.span>
                <div className="flex-1 bg-bg rounded-md px-3 py-2 text-[13px] font-mono text-text-primary border border-border-light">
                  https://api.linkedin.com{selectedEndpoint.path}
                </div>
                <Button onClick={sendRequest} disabled={loading} size="sm">
                  <SendIcon size={14} />
                  Send
                </Button>
              </div>
            </Card>

            {/* Request Intelligence */}
            <Card className="p-5">
              <h3 className="text-[13px] font-semibold text-text-primary mb-3">Request Intelligence</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Required Permissions</span>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center gap-1.5">
                      <CheckIcon size={12} className="text-success" />
                      <span className="text-[12px] text-text-secondary">r_liteprofile</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckIcon size={12} className="text-success" />
                      <span className="text-[12px] text-text-secondary">w_member_social</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">API Version</span>
                  <p className="text-[14px] font-mono text-text-primary mt-2">202608</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Access</span>
                  <div className="mt-2">
                    <StatusIndicator status="healthy" label="Available to your app" size="sm" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-light">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Headers</span>
                <div className="mt-2 bg-bg rounded-lg p-3 font-mono text-[12px] text-text-secondary space-y-1">
                  <div><span className="text-accent">Authorization:</span> Bearer {'<token>'}</div>
                  <div><span className="text-accent">X-Restli-Protocol-Version:</span> 2.0.0</div>
                  <div><span className="text-accent">LinkedIn-Version:</span> 202608</div>
                </div>
              </div>
            </Card>

            {/* Response */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border-light">
                <h3 className="text-[13px] font-semibold text-text-primary">Response</h3>
                {response && (
                  <div className="flex items-center gap-2">
                    <StatusIndicator status="healthy" label="200 OK" size="sm" />
                    <span className="text-[11px] text-text-tertiary">47ms</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-auto p-5">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-border border-t-accent rounded-full"
                    />
                  </div>
                ) : response ? (
                  <pre className="text-[12px] font-mono text-text-secondary whitespace-pre-wrap">
                    {response}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-[13px] text-text-tertiary">
                    Send a request to see the response
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
