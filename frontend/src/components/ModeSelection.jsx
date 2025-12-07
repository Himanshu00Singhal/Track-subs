
import { User, Upload, Building2 } from 'lucide-react';

const ModeSelection = ({ onSelectMode }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to SubTrack India</h1>
                <p className="text-slate-600 text-lg">Choose how you want to track your subscriptions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {/* Self Tracker */}
                <div
                    onClick={() => onSelectMode('manual')}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                >
                    <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                        <User className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Self Tracker</h3>
                    <p className="text-slate-500">
                        Manually add and manage your active subscriptions. Get alerts for upcoming payments.
                    </p>
                </div>

                {/* Bank Statement Upload */}
                <div
                    onClick={() => onSelectMode('upload')}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                >
                    <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                        <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Statement</h3>
                    <p className="text-slate-500">
                        Upload up to 4 bank statements. Our AI detects subscriptions automatically.
                    </p>
                </div>

                {/* Account Aggregator */}
                <div
                    onClick={() => onSelectMode('aa')}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                >
                    <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                        <Building2 className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Connect Bank (AA)</h3>
                    <p className="text-slate-500">
                        Securely fetch financial data via Account Aggregator. (Demo Mode)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModeSelection;
