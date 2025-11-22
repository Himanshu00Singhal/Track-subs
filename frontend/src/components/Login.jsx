import React, { useState } from 'react'
import axios from 'axios'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState('EMAIL') // EMAIL | OTP
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSendOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await axios.post('http://localhost:8001/auth/send-otp', { email })
            setStep('OTP')
        } catch (err) {
            setError('Failed to send OTP. Ensure Security Service is running on port 8001.')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await axios.post('http://localhost:8001/auth/verify-otp', { email, otp })
            const token = res.data.access_token
            localStorage.setItem('token', token)
            onLoginSuccess(token)
        } catch (err) {
            setError('Invalid OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Sign in to manage your subscriptions</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                {step === 'EMAIL' ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send OTP <ArrowRight size={20} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="text-sm text-slate-500">OTP sent to </span>
                            <span className="text-sm font-medium text-slate-900">{email}</span>
                            <button
                                type="button"
                                onClick={() => setStep('EMAIL')}
                                className="text-xs text-indigo-600 hover:underline ml-2"
                            >
                                Change
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all tracking-widest"
                                    placeholder="123456"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
