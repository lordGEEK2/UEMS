import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Phone, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Architecture',
];

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        department: '',
        year: '',
        enrollmentNo: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.year) newErrors.year = 'Year is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        setIsLoading(true);

        // Simulate registration
        setTimeout(() => {
            login({
                id: '1',
                email: formData.email,
                role: 'student',
                profile: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    department: formData.department,
                    year: parseInt(formData.year),
                }
            }, 'demo-token');

            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-3xl font-bold font-display text-primary mb-2">
                Create Account
            </h1>
            <p className="text-secondary mb-8">
                Join the UEMS community at MITS Gwalior
            </p>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${step >= s ? 'bg-indigo-500 text-white' : 'bg-tertiary text-secondary'}
            `}>
                            {s}
                        </div>
                        <span className={`text-sm ${step >= s ? 'text-primary' : 'text-secondary'}`}>
                            {s === 1 ? 'Personal Info' : 'Account Setup'}
                        </span>
                        {s === 1 && <div className="w-12 h-0.5 bg-tertiary mx-2" />}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                    <>
                        {/* First & Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <label className="input-label">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                        className={`input pl-12 ${errors.firstName ? 'input-error' : ''}`}
                                    />
                                </div>
                                {errors.firstName && <p className="input-error-message">{errors.firstName}</p>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className={`input ${errors.lastName ? 'input-error' : ''}`}
                                />
                                {errors.lastName && <p className="input-error-message">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
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

                        {/* Phone */}
                        <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    className={`input pl-12 ${errors.phone ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.phone && <p className="input-error-message">{errors.phone}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="btn btn-primary w-full py-4 text-lg"
                        >
                            Continue
                        </button>
                    </>
                ) : (
                    <>
                        {/* Password */}
                        <div className="input-group">
                            <label className="input-label">Password</label>
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

                        {/* Confirm Password */}
                        <div className="input-group">
                            <label className="input-label">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className={`input pl-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="input-error-message">{errors.confirmPassword}</p>}
                        </div>

                        {/* Department & Year */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <label className="input-label">Department</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                        className={`input pl-12 ${errors.department ? 'input-error' : ''}`}
                                    >
                                        <option value="">Select...</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.department && <p className="input-error-message">{errors.department}</p>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Year</label>
                                <select
                                    value={formData.year}
                                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                                    className={`input ${errors.year ? 'input-error' : ''}`}
                                >
                                    <option value="">Select...</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                                {errors.year && <p className="input-error-message">{errors.year}</p>}
                            </div>
                        </div>

                        {/* Enrollment Number */}
                        <div className="input-group">
                            <label className="input-label">Enrollment Number (Optional)</label>
                            <input
                                type="text"
                                placeholder="0901CS211001"
                                value={formData.enrollmentNo}
                                onChange={(e) => setFormData(prev => ({ ...prev, enrollmentNo: e.target.value }))}
                                className="input"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="btn btn-secondary flex-1 py-4"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary flex-1 py-4 text-lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <UserPlus className="w-5 h-5" />
                                        Create Account
                                    </span>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </form>

            {/* Login Link */}
            <p className="text-center text-secondary mt-8">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-500 font-medium hover:underline">
                    Sign in
                </Link>
            </p>
        </motion.div>
    );
}
