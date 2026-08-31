import { BrowserRouter, Routes, Route } from 'react-router-dom'
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />

          {/* Build */}
          <Route path="/build/connection" element={<Connection />} />
          <Route path="/build/explorer" element={<Explorer />} />
          <Route path="/build/simulator" element={<Simulator />} />

          {/* Test */}
          <Route path="/test/suites" element={<TestSuites />} />
          <Route path="/test/webhooks" element={<Webhooks />} />

          {/* Monitor */}
          <Route path="/monitor/health" element={<MonitorHealth />} />
          <Route path="/monitor/api" element={<ApiUsage />} />
          <Route path="/monitor/versions" element={<Versions />} />
          <Route path="/monitor/alerts" element={<Alerts />} />

          {/* Analysis */}
          <Route path="/analysis/diagnostics" element={<Diagnostics />} />
          <Route path="/analysis/errors" element={<Errors />} />
          <Route path="/analysis/migrations" element={<Migrations />} />

          {/* AI */}
          <Route path="/ai/claude" element={<ClaudePage />} />
          <Route path="/ai/mcp" element={<Mcp />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/:section" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
