import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import Connection from './pages/Connection'
import Explorer from './pages/Explorer'
import Simulator from './pages/Simulator'
import Diagnostics from './pages/Diagnostics'
import TestSuites from './pages/test/TestSuites'
import Webhooks from './pages/test/Webhooks'
import MonitorHealth from './pages/monitor/Health'
import ApiUsage from './pages/monitor/ApiUsage'
import Versions from './pages/monitor/Versions'
import Alerts from './pages/monitor/Alerts'
import Errors from './pages/analysis/Errors'
import Migrations from './pages/analysis/Migrations'
import ClaudePage from './pages/ai/Claude'
import Mcp from './pages/ai/Mcp'
import Settings from './pages/Settings'

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="h-full">
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route path="/" element={<PageTransition><Overview /></PageTransition>} />

            {/* Build */}
            <Route path="/build/connection" element={<PageTransition><Connection /></PageTransition>} />
            <Route path="/build/explorer" element={<PageTransition><Explorer /></PageTransition>} />
            <Route path="/build/simulator" element={<PageTransition><Simulator /></PageTransition>} />

            {/* Test */}
            <Route path="/test/suites" element={<PageTransition><TestSuites /></PageTransition>} />
            <Route path="/test/webhooks" element={<PageTransition><Webhooks /></PageTransition>} />

            {/* Monitor */}
            <Route path="/monitor/health" element={<PageTransition><MonitorHealth /></PageTransition>} />
            <Route path="/monitor/api" element={<PageTransition><ApiUsage /></PageTransition>} />
            <Route path="/monitor/versions" element={<PageTransition><Versions /></PageTransition>} />
            <Route path="/monitor/alerts" element={<PageTransition><Alerts /></PageTransition>} />

            {/* Analysis */}
            <Route path="/analysis/diagnostics" element={<PageTransition><Diagnostics /></PageTransition>} />
            <Route path="/analysis/errors" element={<PageTransition><Errors /></PageTransition>} />
            <Route path="/analysis/migrations" element={<PageTransition><Migrations /></PageTransition>} />

            {/* AI */}
            <Route path="/ai/claude" element={<PageTransition><ClaudePage /></PageTransition>} />
            <Route path="/ai/mcp" element={<PageTransition><Mcp /></PageTransition>} />

            {/* Settings */}
            <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
            <Route path="/settings/:section" element={<PageTransition><Settings /></PageTransition>} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
