import { useState } from 'react'
import Login from './components/Login'
import ModeSelection from './components/ModeSelection'
import ManualTracker from './components/ManualTracker'
import StatementTracker from './components/StatementTracker'
import AADemo from './components/AADemo'
import FinancialAdvisor from './components/FinancialAdvisor'
import { Activity, LogOut, LayoutGrid, HelpCircle } from 'lucide-react'

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [mode, setMode] = useState(null) // null, 'manual', 'upload', 'aa', 'advisor'

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setMode(null)
    }

    if (!token) {
        return <Login onLoginSuccess={setToken} />
    }

    if (!mode) {
        return (
            <>
                <div className="absolute top-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="text-slate-500 hover:text-red-600 transition-colors p-2 flex items-center gap-2"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
                <ModeSelection onSelectMode={setMode} />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMode(null)}
                            className="text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                            <LayoutGrid size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                                <Activity className="text-indigo-600" />
                                SubTrack India
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {mode === 'manual' && 'Self Tracker'}
                                {mode === 'upload' && 'Statement Analysis'}
                                {mode === 'aa' && 'Account Aggregator'}
                                {mode === 'advisor' && 'Financial Advisor'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {mode !== 'advisor' && (
                            <button
                                onClick={() => setMode('advisor')}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
                            >
                                <HelpCircle size={18} /> Advisor
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-slate-500 hover:text-red-600 transition-colors p-2"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {mode === 'manual' && <ManualTracker />}
                    {mode === 'upload' && <StatementTracker />}
                    {mode === 'aa' && <AADemo />}
                    {mode === 'advisor' && <FinancialAdvisor />}
                </div>

            </div>
        </div>
    )
}

export default App
