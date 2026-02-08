import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, User, Users, Shield } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const loginTypes = [
    { id: 'student', label: 'Student', icon: User, description: 'Access events and clubs' },
    { id: 'club', label: 'Club Member', icon: Users, description: 'Manage club activities' },
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

        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!formData.password) {
            setErrors((prev) => ({ ...prev, password: 'Password is required' }));
            return;
        }

        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            const role = loginType === 'club' ? 'club_member' : loginType === 'admin' ? 'super_admin' : 'student';

            login(
                {
                    id: '1',
                    email: formData.email,
                    role,
                    profile: {
                        firstName: 'Demo',
                        lastName: 'User',
                    },
                },
                'demo-token'
            );

            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div>
            <h1 className="h2" style={{ marginBottom: 'var(--space-2)' }}>
                Welcome back
            </h1>
            <p className="body" style={{ marginBottom: 'var(--space-8)' }}>
                Sign in to your account to continue
            </p>

            {/* Login Type Selector */}
            <div className="grid grid-3" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                {loginTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setLoginType(type.id)}
                        type="button"
                        style={{
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            border: `2px solid ${loginType === type.id ? 'var(--primary-600)' : 'var(--border)'}`,
                            background: loginType === type.id ? 'var(--primary-50)' : 'transparent',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        <type.icon
                            style={{
                                width: 24,
                                height: 24,
                                margin: '0 auto var(--space-2)',
                                color: loginType === type.id ? 'var(--primary-600)' : 'var(--text-muted)',
                            }}
                        />
                        <span
                            style={{
                                display: 'block',
                                fontSize: 14,
                                fontWeight: 500,
                                color: loginType === type.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                            }}
                        >
                            {type.label}
                        </span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail
                            style={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 18,
                                height: 18,
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type="email"
                            placeholder="you@mits.ac.in"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className={`input ${errors.email ? 'input-error' : ''}`}
                            style={{ paddingLeft: 40 }}
                        />
                    </div>
                    {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="form-group">
                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                        <label className="form-label" style={{ marginBottom: 0 }}>
                            Password
                        </label>
                        <Link
                            to="/forgot-password"
                            style={{
                                fontSize: 13,
                                color: 'var(--primary-600)',
                                textDecoration: 'none',
                            }}
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock
                            style={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 18,
                                height: 18,
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            className={`input ${errors.password ? 'input-error' : ''}`}
                            style={{ paddingLeft: 40, paddingRight: 40 }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted)',
                            }}
                        >
                            {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                        </button>
                    </div>
                    {errors.password && <p className="form-error">{errors.password}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: 'var(--space-4)' }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin"
                                style={{ width: 18, height: 18 }}
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    style={{ opacity: 0.25 }}
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    style={{ opacity: 0.75 }}
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Signing in...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <LogIn style={{ width: 18, height: 18 }} />
                            Sign In
                        </span>
                    )}
                </button>
            </form>

            <p className="body text-center" style={{ marginTop: 'var(--space-8)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none' }}>
                    Create account
                </Link>
            </p>
        </div>
    );
}
