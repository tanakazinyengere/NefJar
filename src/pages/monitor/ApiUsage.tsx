import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import StatusIndicator from '../../components/ui/StatusIndicator'
import EmptyState from '../../components/ui/EmptyState'
import Breadcrumb from '../../components/Breadcrumb'
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ApiIcon,
} from '../../components/icons'

const endpoints = [
  { name: 'POST /rest/me/posts', method: 'POST', health: 'healthy', latency: '210ms', errors: '0.3%', requests: 1247 },
  { name: 'GET /rest/me', method: 'GET', health: 'healthy', latency: '142ms', errors: '0.1%', requests: 834 },
  { name: 'GET /rest/events/{id}', method: 'GET', health: 'warning', latency: '488ms', errors: '2.1%', requests: 289 },
  { name: 'GET /rest/organizations/{id}/followers/count', method: 'GET', health: 'healthy', latency: '178ms', errors: '0.2%', requests: 156 },
  { name: 'DELETE /rest/posts/{id}', method: 'DELETE', health: 'healthy', latency: '165ms', errors: '0.0%', requests: 87 },
]

const methodColors: Record<string, string> = {
  GET: 'bg-success-light text-success',
  POST: 'bg-accent-light text-accent',
  DELETE: 'bg-danger-light text-danger',
}

export default function ApiUsage() {
  const [hasData] = useState(true)

  if (!hasData) {
    return (
      <div className="max-w-[1200px] mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Breadcrumb />
          <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">API Usage</h1>
          <p className="text-[15px] text-text-secondary mb-8">
            Monitor endpoint performance, latency, and error rates.
          </p>
          <EmptyState
            type="first-use"
            icon={<ApiIcon size={24} />}
            title="No API calls tracked"
            description="API usage data will appear here once your LinkedIn application starts making requests."
            instruction="Connect your LinkedIn app and make your first API call to start tracking usage."
            primaryAction={{ label: 'Make first request', onClick: () => {} }}
            secondaryAction={{ label: 'Explore endpoints', onClick: () => {} }}
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
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">API Usage</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Monitor endpoint performance, latency, and error rates.
        </p>

        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Requests', value: '24,821', sub: 'last 24h', trend: '+12%' },
            { label: 'Errors', value: '184', sub: 'total', trend: '-8%' },
            { label: 'Avg Latency', value: '241ms', sub: 'p50', trend: '+3%' },
            { label: '429 Responses', value: '12', sub: 'last 24h', trend: '+28%' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  {metric.label}
                </span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-[24px] font-bold text-text-primary leading-none">
                    {metric.value}
                  </span>
                  <span className={`text-[12px] font-medium flex items-center gap-1 ${
                    metric.trend.startsWith('+') && metric.label === 'Errors' ? 'text-danger'
                    : metric.trend.startsWith('-') && metric.label === 'Errors' ? 'text-success'
                    : metric.trend.startsWith('+') ? 'text-warning' : 'text-success'
                  }`}>
                    {metric.trend.startsWith('+') ? <TrendingUpIcon size={12} /> : <TrendingDownIcon size={12} />}
                    {metric.trend}
                  </span>
                </div>
                <span className="text-[12px] text-text-tertiary mt-1 block">{metric.sub}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Latency chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-[14px] font-semibold text-text-primary mb-4">Latency (24h)</h2>
          <div className="relative h-40">
            {/* Y axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-text-tertiary w-10">
              <span>500ms</span>
              <span>375ms</span>
              <span>250ms</span>
              <span>125ms</span>
              <span>0</span>
            </div>
            {/* Chart area */}
            <div className="ml-12 h-full flex items-end gap-[3px]">
              {Array.from({ length: 48 }, (_, i) => {
                const latency = i > 28 && i < 36 ? 280 + Math.random() * 150 : 150 + Math.random() * 100
                const height = (latency / 500) * 100
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.01, duration: 0.3 }}
                    className={`flex-1 rounded-t-sm ${
                      latency > 400 ? 'bg-danger/60' : latency > 300 ? 'bg-warning/60' : 'bg-accent/40'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </Card>

        {/* Endpoint health table */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-border-light">
            <h2 className="text-[14px] font-semibold text-text-primary">Endpoint Health</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Endpoint</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Health</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Latency</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Errors</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Requests</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, i) => (
                  <motion.tr
                    key={ep.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border-light last:border-0 hover:bg-surface-hover transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColors[ep.method]}`}>
                          {ep.method}
                        </span>
                        <span className="text-[13px] font-mono text-text-primary">{ep.name.replace(/^(GET|POST|PUT|DELETE|PATCH) /, '')}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusIndicator
                        status={ep.health as 'healthy' | 'warning'}
                        label={ep.health === 'healthy' ? 'Healthy' : 'Attention'}
                        size="sm"
                      />
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-text-secondary font-mono">{ep.latency}</td>
                    <td className="px-5 py-3.5 text-[13px] text-text-secondary">{ep.errors}</td>
                    <td className="px-5 py-3.5 text-[13px] text-text-secondary font-mono">{ep.requests.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
