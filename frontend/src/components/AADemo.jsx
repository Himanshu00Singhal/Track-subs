import { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import Dashboard from './Dashboard';
import SubscriptionList from './SubscriptionList';
import Insights from './Insights';

const AADemo = () => {
    const [status, setStatus] = useState('input'); // input, connecting, success, dashboard
    const [subscriptions, setSubscriptions] = useState([]);
    const [pan, setPan] = useState('');
    const [consent, setConsent] = useState(false);

    const handleConnect = async () => {
        if (!pan || !consent) return;
        setStatus('connecting');

        // Simulate connection delay
        await new Promise(r => setTimeout(r, 2000));
        setStatus('success');

        // Load mock data
        try {
            const seedResponse = await axios.get('/api/seed-data');
            const seedData = seedResponse.data;

            const blob = new Blob([JSON.stringify(seedData)], { type: 'application/json' });
            const file = new File([blob], "aa_data.json");
            const formData = new FormData();
            formData.append('files', file);

            const response = await axios.post('/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSubscriptions(response.data);

            setTimeout(() => setStatus('dashboard'), 1500);
        } catch (err) {
            console.error("AA Demo failed", err);
        }
    };

    if (status === 'input') {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-center mb-8">
                    <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Connect Bank Account</h2>
                    <p className="text-slate-500 mt-2">Securely fetch data via Account Aggregator</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Permanent Account Number (PAN)</label>
                        <input
                            type="text"
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase tracking-widest"
                            value={pan}
                            onChange={(e) => setPan(e.target.value.toUpperCase())}
                        />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <input
                            type="checkbox"
                            id="consent"
                            className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        <label htmlFor="consent" className="text-sm text-slate-600">
                            I authorize <strong>SubTrack India</strong> to fetch my transaction history for the purpose of subscription detection. I understand this is a demo and no real data is shared.
                        </label>
                    </div>

                    <button
                        onClick={handleConnect}
                        disabled={!pan || !consent}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Lock size={18} /> Secure Connect
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'connecting') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-slate-900">Connecting to Account Aggregator...</h2>
                <p className="text-slate-500 mt-2">Securely fetching your financial data</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="text-xl font-semibold text-slate-900">Connected Successfully!</h2>
                <p className="text-slate-500 mt-2">Analyzing your transactions...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span className="font-medium">Live Data from Account Aggregator</span>
            </div>
            <Dashboard subscriptions={subscriptions} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SubscriptionList subscriptions={subscriptions} />
                </div>
                <div>
                    <Insights subscriptions={subscriptions} />
                </div>
            </div>
        </div>
    );
};

export default AADemo;
