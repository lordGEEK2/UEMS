import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, User, Users, Shield } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const loginTypes = [
    { id: 'student', label: 'Student', icon: User, description: 'Access events and clubs' },
    { id: 'club', label: 'Club Member', icon: Users, description: 'Manage your club activities' },
    { id: 'admin', label: 'Admin', icon: Shield, description: 'Administrative access' },
];

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [loginType, setLoginType] = useState('student');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validation
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!formData.password) {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
            return;
        }

        setIsLoading(true);

        // Simulate login - replace with actual API call
        setTimeout(() => {
            const role = loginType === 'club' ? 'club_member' : loginType === 'admin' ? 'super_admin' : 'student';

            login({
                id: '1',
                email: formData.email,
                role,
                profile: {
                    firstName: 'Demo',
                    lastName: 'User',
                }
            }, 'demo-token');

            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-3xl font-bold font-display text-primary mb-2">
                Welcome back
            </h1>
            <p className="text-secondary mb-8">
                Sign in to your account to continue
            </p>

            {/* Login Type Selector */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {loginTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setLoginType(type.id)}
                        className={`
              p-4 rounded-xl border-2 transition-all text-center
              ${loginType === type.id
                                ? 'border-indigo-500 bg-indigo-500/5'
                                : 'border-primary/10 hover:border-primary/30'}
            `}
                    >
                        <type.icon className={`w-6 h-6 mx-auto mb-2 ${loginType === type.id ? 'text-indigo-500' : 'text-secondary'}`} />
                        <span className={`text-sm font-medium ${loginType === type.id ? 'text-indigo-500' : 'text-secondary'}`}>
                            {type.label}
                        </span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="email"
                            placeholder="you@mits.ac.in"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className={`input pl-12 ${errors.email ? 'input-error' : ''}`}
                        />
                    </div>
                    {errors.email && <p className="input-error-message">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div className="input-group">
                    <div className="flex items-center justify-between mb-2">
                        <label className="input-label mb-0">Password</label>
                        <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className={`input pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-secondary"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="input-error-message">{errors.password}</p>}
                </div>

                {/* Submit Button */}
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
                            Signing in...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <LogIn className="w-5 h-5" />
                            Sign In
                        </span>
                    )}
                </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-secondary mt-8">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-500 font-medium hover:underline">
                    Create account
                </Link>
            </p>
        </motion.div>
    );
}
