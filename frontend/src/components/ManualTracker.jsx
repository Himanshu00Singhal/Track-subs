import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Calendar, IndianRupee } from 'lucide-react';

const ManualTracker = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSub, setNewSub] = useState({
        merchant: '',
        amount: '',
        frequency: 'Monthly',
        next_due: ''
    });

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const res = await axios.get('/api/manual-subscriptions');
            setSubscriptions(res.data);
        } catch (err) {
            console.error("Failed to fetch subs", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newSub.merchant || !newSub.amount) return;

        try {
            await axios.post('/api/manual-subscriptions', {
                ...newSub,
                amount: parseFloat(newSub.amount),
                confidence: 'Manual'
            });
            setNewSub({ merchant: '', amount: '', frequency: 'Monthly', next_due: '' });
            fetchSubscriptions();
        } catch (err) {
            console.error("Failed to add sub", err);
        }
    };

    const handleDelete = async (merchant) => {
        try {
            await axios.delete(`/api/manual-subscriptions/${merchant}`);
            fetchSubscriptions();
        } catch (err) {
            console.error("Failed to delete sub", err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Subscription</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Service Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Netflix"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={newSub.merchant}
                            onChange={e => setNewSub({ ...newSub, merchant: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={newSub.amount}
                            onChange={e => setNewSub({ ...newSub, amount: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={newSub.frequency}
                            onChange={e => setNewSub({ ...newSub, frequency: e.target.value })}
                        >
                            <option>Monthly</option>
                            <option>Quarterly (3 Months)</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus size={20} /> Add
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Your Subscriptions</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : subscriptions.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No subscriptions added yet. Add one above!
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {subscriptions.map((sub, idx) => (
                            <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-lg">
                                        <IndianRupee className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{sub.merchant}</h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} /> {sub.frequency}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-bold text-slate-900 text-lg">
                                        ₹{sub.amount}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(sub.merchant)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManualTracker;
