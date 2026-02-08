import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Animated Mesh Background */}
                <div className="mesh-gradient-bg" />
                <div className="grid-pattern" />

                <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                    <Link to="/" className="flex items-center gap-3 mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                            <span className="text-white font-bold text-3xl font-display">U</span>
                        </div>
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold font-display mb-6"
                    >
                        <span className="text-primary">Welcome to </span>
                        <span className="text-gradient-google">UEMS</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-secondary max-w-md mb-12"
                    >
                        University Event Management System - Your gateway to campus life at MITS Gwalior
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-8"
                    >
                        {[
                            { value: '10K+', label: 'Students' },
                            { value: '70+', label: 'Clubs' },
                            { value: '500+', label: 'Events' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                                <div className="text-sm text-secondary">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-primary">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link to="/" className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl font-display">U</span>
                        </div>
                        <span className="text-2xl font-bold font-display text-gradient">UEMS</span>
                    </Link>

                    <Outlet />
                </div>
            </div>
        </div>
    );
}
