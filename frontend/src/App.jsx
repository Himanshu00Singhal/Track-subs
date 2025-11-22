import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import SubscriptionList from './components/SubscriptionList'
import Insights from './components/Insights'
import Login from './components/Login'
import { Activity, CreditCard, Upload, LogOut } from 'lucide-react'

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setSubscriptions([])
    }

    const loadDemoData = async () => {
        setLoading(true)
        setError(null)
        try {
            // 1. Get the seed data
            const seedResponse = await axios.get('http://localhost:8000/api/seed-data')
            const seedData = seedResponse.data

            // 2. Convert to file for the analyze endpoint
            const blob = new Blob([JSON.stringify(seedData)], { type: 'application/json' })
            const file = new File([blob], "transactions.json")
            const formData = new FormData()
            formData.append('file', file)

            // 3. Analyze
            const response = await axios.post('http://localhost:8000/api/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSubscriptions(response.data)
        } catch (err) {
            console.error(err)
            setError("Failed to load or analyze data. Ensure backend is running.")
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return <Login onLoginSuccess={setToken} />
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="text-indigo-600" />
                            SubTrack India
                        </h1>
                        <p className="text-slate-500 mt-1">Smart Subscription Manager</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={loadDemoData}
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : <><Upload size={18} /> Load Demo Data</>}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-slate-500 hover:text-red-600 transition-colors p-2"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                {subscriptions.length > 0 && (
                    <>
                        <Dashboard subscriptions={subscriptions} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <SubscriptionList subscriptions={subscriptions} />
                            </div>
                            <div>
                                <Insights subscriptions={subscriptions} />
                            </div>
                        </div>
                    </>
                )}

                {subscriptions.length === 0 && !loading && !error && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <CreditCard className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No subscriptions found</h3>
                        <p className="text-slate-500">Upload your bank statement or load demo data to get started.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default App
