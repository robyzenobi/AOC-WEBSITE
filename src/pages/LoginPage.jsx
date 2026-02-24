import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader, AlertCircle, Leaf } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin/blog');
        } catch (err) {
            console.error("Login Error:", err);
            setError('Failed to log in. Please check your credentials.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-5 mt-[80px] relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595856419342-570a290c01a1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 to-surface"></div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-[450px] relative z-10 border border-black/5">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Leaf size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-text mb-2">Admin Access</h2>
                    <p className="text-text-muted">Please sign in to manage the platform</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-6 text-sm font-medium border border-red-100">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@aoc-tz.com"
                                className="w-full pl-11 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text ml-1">Password</label>
                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 bg-surface border border-black/10 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-all flex items-center justify-center mt-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-md" disabled={loading}>
                        {loading ? <Loader className="animate-spin" size={20} /> : 'Sign In To Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
