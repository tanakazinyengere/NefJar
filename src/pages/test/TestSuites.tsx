import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import {
  TestIcon,
  CheckIcon,
  RefreshIcon,
} from '../../components/icons'

interface TestSuite {
  id: string
  name: string
  tests: { name: string; status: 'passed' | 'failed' | 'pending' }[]
  lastRun: string
  passRate: number
}

const suites: TestSuite[] = [
  {
    id: '1',
    name: 'LinkedIn Publishing Flow',
    lastRun: '2h ago',
    passRate: 100,
    tests: [
      { name: 'OAuth authentication', status: 'passed' },
      { name: 'Permission check', status: 'passed' },
      { name: 'Create post', status: 'passed' },
      { name: 'Handle 401', status: 'passed' },
      { name: 'Handle 429', status: 'passed' },
      { name: 'Retry logic', status: 'passed' },
      { name: 'Confirm response', status: 'passed' },
    ],
  },
  {
    id: '2',
    name: 'Profile Retrieval',
    lastRun: '2h ago',
    passRate: 100,
    tests: [
      { name: 'Get member profile', status: 'passed' },
      { name: 'Projection fields', status: 'passed' },
      { name: 'Error handling', status: 'passed' },
    ],
  },
  {
    id: '3',
    name: 'Event Management',
    lastRun: '5h ago',
    passRate: 66,
    tests: [
      { name: 'List events', status: 'passed' },
      { name: 'Get event details', status: 'passed' },
      { name: 'Update event', status: 'failed' },
    ],
  },
]

export default function TestSuites() {
  const [expandedSuite, setExpandedSuite] = useState<string | null>('1')
  const [running, setRunning] = useState(false)
  const [ran, setRan] = useState(false)

  const runAll = () => {
    setRunning(true)
    setRan(false)
    setTimeout(() => { setRunning(false); setRan(true) }, 2000)
  }

  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold text-text-primary tracking-tight mb-2">Test Suites</h1>
            <p className="text-[15px] text-text-secondary">
              Verify that your LinkedIn integration behaves correctly before changes reach production.
            </p>
          </div>
          <Button onClick={runAll} disabled={running}>
            {running ? <><RefreshIcon size={14} className="animate-spin" /> Running...</> : ran ? <><CheckIcon size={14} /> All passed</> : <><TestIcon size={14} /> Run all tests</>}
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <span className="text-[24px] font-bold text-success block">11</span>
            <span className="text-[12px] text-text-tertiary">passed</span>
          </Card>
          <Card className="p-4 text-center">
            <span className="text-[24px] font-bold text-danger block">1</span>
            <span className="text-[12px] text-text-tertiary">failed</span>
          </Card>
          <Card className="p-4 text-center">
            <span className="text-[24px] font-bold text-text-primary block">0</span>
            <span className="text-[12px] text-text-tertiary">pending</span>
          </Card>
        </div>

        {/* Suites */}
        {suites.length === 0 ? (
          <EmptyState
            type="creation"
            icon={<TestIcon size={24} />}
            title="No test suites yet"
            description="Create your first test suite to verify your LinkedIn integration behaves correctly before changes reach production."
            instruction="Test suites run automatically against your configured endpoints."
            primaryAction={{ label: 'Create test suite', onClick: () => {} }}
            secondaryAction={{ label: 'View examples', onClick: () => {} }}
          />
        ) : (
        <div className="space-y-3">
          {suites.map((suite, i) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden">
                <div
                  onClick={() => setExpandedSuite(expandedSuite === suite.id ? null : suite.id)}
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-surface-hover transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    suite.passRate === 100 ? 'bg-success-light' : 'bg-danger-light'
                  }`}>
                    {suite.passRate === 100
                      ? <CheckIcon size={16} className="text-success" />
                      : <TestIcon size={16} className="text-danger" />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-medium text-text-primary">{suite.name}</h3>
                    <p className="text-[12px] text-text-tertiary">{suite.tests.length} tests · Last run {suite.lastRun}</p>
                  </div>
                  <span className={`text-[13px] font-semibold ${
                    suite.passRate === 100 ? 'text-success' : 'text-danger'
                  }`}>
                    {suite.passRate}%
                  </span>
                </div>

                {expandedSuite === suite.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border-light"
                  >
                    {suite.tests.map((test) => (
                      <div key={test.name} className="px-5 py-2.5 flex items-center gap-3 border-b border-border-light last:border-0">
                        {test.status === 'passed' ? (
                          <CheckIcon size={14} className="text-success" />
                        ) : test.status === 'failed' ? (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-danger" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-border" />
                        )}
                        <span className={`text-[13px] ${
                          test.status === 'failed' ? 'text-danger' : 'text-text-secondary'
                        }`}>
                          {test.name}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        )}
      </motion.div>
    </div>
  )
}
