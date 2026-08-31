import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Breadcrumb from '../../components/Breadcrumb'
import {
  CodeIcon,
  CheckIcon,
  CopyIcon,
} from '../../components/icons'

const mcpConfig = `{
  "mcpServers": {
    "nefjar": {
      "command": "npx",
      "args": ["-y", "@nefjar/mcp-server"],
      "env": {
        "NEFJAR_API_KEY": "your-api-key-here"
      }
    }
  }
}`

export default function Mcp() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(mcpConfig)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-[800px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Breadcrumb />
        <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">MCP Server</h1>
        <p className="text-[15px] text-text-secondary mb-8">
          Connect NefJar to Claude and other MCP-compatible clients through the Model Context Protocol.
        </p>

        {/* Installation */}
        <Card className="p-6 mb-6">
          <h2 className="text-[15px] font-semibold text-text-primary mb-3">Installation</h2>
          <p className="text-[13px] text-text-secondary mb-4">
            Add the NefJar MCP server to your Claude configuration.
          </p>

          <div className="relative">
            <pre className="bg-bg rounded-xl p-4 text-[12px] font-mono text-text-secondary overflow-x-auto">
              {mcpConfig}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors"
            >
              {copied ? <CheckIcon size={14} className="text-success" /> : <CopyIcon size={14} />}
            </button>
          </div>
        </Card>

        {/* Available tools */}
        <Card className="p-6 mb-6">
          <h2 className="text-[15px] font-semibold text-text-primary mb-4">Exposed Tools</h2>
          <div className="space-y-2">
            {[
              { name: 'get_connection_status', description: 'Get LinkedIn connection health and status' },
              { name: 'get_api_version', description: 'Get current and supported API versions' },
              { name: 'get_api_usage', description: 'Get API usage metrics and quota information' },
              { name: 'get_diagnostics', description: 'Run diagnostic checks on the integration' },
              { name: 'get_errors', description: 'Get recent errors with context and resolution' },
              { name: 'get_migration_changes', description: 'Get pending migration impact analysis' },
              { name: 'run_simulation', description: 'Execute API simulations for testing' },
              { name: 'get_health', description: 'Get overall integration health score' },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors"
              >
                <CodeIcon size={14} className="text-accent shrink-0" />
                <span className="text-[13px] font-mono text-text-primary">{tool.name}</span>
                <span className="text-[12px] text-text-tertiary flex-1">— {tool.description}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* CLI install */}
        <Card className="p-6">
          <h2 className="text-[15px] font-semibold text-text-primary mb-3">Quick Start</h2>
          <div className="bg-bg rounded-xl p-4 text-[12px] font-mono text-text-secondary">
            <div className="mb-2"># Install globally</div>
            <div className="text-text-primary">npm install -g @nefjar/mcp-server</div>
            <div className="mt-3 mb-2"># Or use with npx</div>
            <div className="text-text-primary">npx -y @nefjar/mcp-server --help</div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
