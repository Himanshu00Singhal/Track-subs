import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, X } from 'lucide-react';
import Dashboard from './Dashboard';
import SubscriptionList from './SubscriptionList';
import Insights from './Insights';

const StatementTracker = () => {
    const [files, setFiles] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        if (files.length + newFiles.length > 4) {
            alert("You can only upload up to 4 files.");
            return;
        }
        setFiles([...files, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        setLoading(true);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSubscriptions(response.data);
            setAnalyzed(true);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to analyze files.");
        } finally {
            setLoading(false);
        }
    };

    if (analyzed) {
        return (
            <div className="space-y-8">
                <button
                    onClick={() => { setAnalyzed(false); setSubscriptions([]); setFiles([]); }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium mb-4"
                >
                    ← Upload different files
                </button>
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
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Bank Statements</h2>
                <p className="text-slate-500 mb-8">
                    Upload up to 4 JSON statement files to detect your subscriptions.
                </p>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 mb-6 hover:bg-slate-50 transition-colors relative">
                    <input
                        type="file"
                        multiple
                        accept=".json"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-slate-500">
                        <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
                        <br />JSON files only
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mb-8 space-y-2">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg text-sm">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <FileText size={16} />
                                    {file.name}
                                </div>
                                <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Analyzing...' : 'Analyze Statements'}
                </button>
            </div>
        </div>
    );
};

export default StatementTracker;
