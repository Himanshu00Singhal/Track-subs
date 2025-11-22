import React from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SubscriptionList({ subscriptions }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Active Subscriptions</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Merchant</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Frequency</th>
                            <th className="px-6 py-4">Next Renewal</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {subscriptions.map((sub, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                        {sub.merchant[0]}
                                    </div>
                                    {sub.merchant}
                                </td>
                                <td className="px-6 py-4 text-slate-600">₹{sub.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.frequency === 'Yearly' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                        {sub.frequency}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{sub.next_due || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    {sub.confidence === 'High' ? (
                                        <div className="flex items-center gap-1 text-emerald-600 text-sm">
                                            <CheckCircle2 size={16} />
                                            <span>Confirmed</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-amber-600 text-sm">
                                            <AlertCircle size={16} />
                                            <span>Likely</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
