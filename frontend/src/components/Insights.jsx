import { Lightbulb, ArrowRight } from 'lucide-react'

export default function Insights({ subscriptions }) {
    // Mock logic for insights
    const monthlySubs = subscriptions.filter(s => s.frequency === 'Monthly' || s.frequency === 'Auto-Pay')

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Lightbulb size={24} className="text-yellow-300" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">Smart Savings</h4>
                        <p className="text-indigo-100 text-sm mb-4">
                            You have {monthlySubs.length} monthly subscriptions. Switching to annual plans could save you up to 20%.
                        </p>
                        <button className="text-xs font-semibold bg-white text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1">
                            View Opportunities <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Upcoming Renewals</h4>
                <div className="space-y-4">
                    {subscriptions.slice(0, 3).map((sub, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <span className="text-sm font-medium text-slate-700">{sub.merchant}</span>
                            </div>
                            <span className="text-sm text-slate-500">{sub.next_due}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
