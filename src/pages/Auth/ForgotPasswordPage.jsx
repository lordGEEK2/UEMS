import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold font-display text-primary mb-2">
                    Check your email
                </h1>
                <p className="text-secondary mb-8">
                    We've sent password reset instructions to <span className="font-medium text-primary">{email}</span>
                </p>
                <Link to="/login" className="btn btn-primary">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Link to="/login" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to login</span>
            </Link>

            <h1 className="text-3xl font-bold font-display text-primary mb-2">
                Forgot Password?
            </h1>
            <p className="text-secondary mb-8">
                Enter your email and we'll send you reset instructions
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="email"
                            placeholder="you@mits.ac.in"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            className={`input pl-12 ${error ? 'input-error' : ''}`}
                        />
                    </div>
                    {error && <p className="input-error-message">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full py-4 text-lg"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Reset Link
                        </span>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
