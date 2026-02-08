import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Menu, X, Sun, Moon, Bell, User,
    Calendar, Users, Trophy, Sparkles, ChevronDown,
    LogIn, UserPlus
} from 'lucide-react';
import { useThemeStore, useUIStore, useAuthStore } from '../../hooks/useStore';
import { dropdownVariants } from '../../animations/variants';

const navLinks = [
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Recruitments', href: '/recruitments', icon: Trophy },
    { name: 'Sponsors', href: '/sponsors', icon: Sparkles },
];

export default function Navbar() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { theme, toggleTheme } = useThemeStore();
    const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass-strong shadow-lg'
                    : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-[72px]">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <span className="text-white font-bold text-lg font-display">U</span>
                                </div>
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur transition-opacity" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-bold font-display text-gradient">UEMS</span>
                                <span className="hidden md:inline text-sm text-secondary ml-2">MITS Gwalior</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-all duration-200"
                                >
                                    <link.icon className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
                                    <span className="font-medium">{link.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search Button */}
                            <button className="btn-ghost btn-icon hidden sm:flex">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="btn-ghost btn-icon relative overflow-hidden"
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'light' ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Notifications */}
                            {isAuthenticated && (
                                <button className="btn-ghost btn-icon relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                                </button>
                            )}

                            {/* Auth Buttons / User Menu */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-secondary hover:bg-tertiary transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user?.profile?.firstName?.[0] || 'U'}
                                            </span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-secondary" />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                {...dropdownVariants}
                                                className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl shadow-xl border border-primary/10 overflow-hidden"
                                            >
                                                <div className="p-3 border-b border-primary/10">
                                                    <p className="font-semibold text-primary">{user?.profile?.firstName} {user?.profile?.lastName}</p>
                                                    <p className="text-sm text-secondary">{user?.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    <Link
                                                        to="/dashboard"
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-tertiary transition-colors"
                                                    >
                                                        <User className="w-4 h-4" />
                                                        <span>Dashboard</span>
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-tertiary transition-colors text-red-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        <span>Logout</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link to="/login" className="btn btn-ghost">
                                        <LogIn className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                    <Link to="/register" className="btn btn-primary">
                                        <UserPlus className="w-4 h-4" />
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={toggleMobileMenu}
                                className="btn-ghost btn-icon lg:hidden"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-80 glass-strong z-50 lg:hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xl font-bold font-display text-gradient">Menu</span>
                                    <button onClick={() => setMobileMenuOpen(false)} className="btn-ghost btn-icon">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <nav className="space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tertiary transition-colors"
                                        >
                                            <link.icon className="w-5 h-5 text-indigo-500" />
                                            <span className="font-medium">{link.name}</span>
                                        </Link>
                                    ))}
                                </nav>

                                {!isAuthenticated && (
                                    <div className="mt-8 space-y-3">
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary w-full justify-center">
                                            <LogIn className="w-4 h-4" />
                                            <span>Login</span>
                                        </Link>
                                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full justify-center">
                                            <UserPlus className="w-4 h-4" />
                                            <span>Sign Up</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
