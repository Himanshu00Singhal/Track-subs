
import { Lightbulb, TrendingUp, PiggyBank, ArrowRight } from 'lucide-react';

const FinancialAdvisor = () => {
    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Your Financial Advisor</h2>
                <p className="text-indigo-100 text-lg">AI-driven insights to optimize your subscription spending.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Lightbulb className="text-orange-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Smart Recommendation</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        You&apos;re paying <strong>₹199/mo</strong> for Netflix. Switching to the annual plan could save you <strong>₹400/year</strong>.
                    </p>
                    <button className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        View Plan <ArrowRight size={16} />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Spending Trend</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        Your subscription spend increased by <strong>15%</strong> this month due to a new Hotstar renewal.
                    </p>
                    <button className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Analyze <ArrowRight size={16} />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <PiggyBank className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Potential Savings</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        We identified <strong>2</strong> unused subscriptions that could save you <strong>₹500/mo</strong> if cancelled.
                    </p>
                    <button className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Review <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Chat Interface Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Ask Advisor</h3>
                </div>
                <div className="p-6 h-64 bg-slate-50 flex flex-col justify-end">
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-md">
                                How can I reduce my monthly bills?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl rounded-tl-none max-w-md shadow-sm">
                                Based on your current subscriptions, you can save ₹400 by switching Netflix to annual billing, and another ₹150 by cancelling the unused Spotify Duo plan.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Ask a question about your finances..."
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialAdvisor;
