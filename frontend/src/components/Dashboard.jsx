import React from 'react'
import { IndianRupee, Calendar, TrendingUp } from 'lucide-react'

export default function Dashboard({ subscriptions }) {
    const totalMonthly = subscriptions
        .filter(s => s.frequency === 'Monthly' || s.frequency === 'Auto-Pay')
        .reduce((acc, curr) => acc + curr.amount, 0)

    const totalYearly = subscriptions
        .filter(s => s.frequency === 'Yearly')
        .reduce((acc, curr) => acc + curr.amount, 0)

    // Normalize yearly to monthly for a "Total Monthly Average" view
    const monthlyAverage = totalMonthly + (totalYearly / 12)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <IndianRupee size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Monthly Recurring</p>
                        <h3 className="text-2xl font-bold text-slate-900">₹{totalMonthly.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Active Subscriptions</p>
                        <h3 className="text-2xl font-bold text-slate-900">{subscriptions.length}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Est. Yearly Spend</p>
                        <h3 className="text-2xl font-bold text-slate-900">₹{(monthlyAverage * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
