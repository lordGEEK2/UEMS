import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, Calendar, Users, MessageCircle, Settings, LogOut, Bell,
    Menu, X, Sun, Moon, ChevronDown, Plus, Search
} from 'lucide-react';
import { useThemeStore, useAuthStore, useUIStore } from '../hooks/useStore';

const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Events', href: '/dashboard/events', icon: Calendar },
    { name: 'Clubs', href: '/dashboard/clubs', icon: Users },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeStore();
    const { user, role, logout } = useAuthStore();
    const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getRoleLabel = () => {
        switch (role) {
            case 'student': return 'Student';
            case 'club_admin': return 'Club Admin';
            case 'club_head': return 'Club Head';
            case 'club_member': return 'Club Member';
            case 'super_admin': return 'Super Admin';
            case 'admin': return 'Admin';
            default: return 'User';
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg font-display">U</span>
                    </div>
                    <span className="text-xl font-bold font-display text-gradient">UEMS</span>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-500 font-medium'
                                        : 'text-secondary hover:bg-tertiary hover:text-primary'}
                `}
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                                {link.name === 'Chat' && (
                                    <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        3
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Card */}
                <div className="mt-auto pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {user?.profile?.firstName?.[0] || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-primary truncate">
                                {user?.profile?.firstName || 'User'} {user?.profile?.lastName || ''}
                            </p>
                            <p className="text-xs text-secondary">{getRoleLabel()}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="dashboard-header">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="btn-ghost btn-icon lg:hidden"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search */}
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
                        <Search className="w-4 h-4 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-48"
                        />
                        <kbd className="hidden md:inline-flex px-2 py-0.5 rounded bg-tertiary text-xs text-secondary">⌘K</kbd>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Quick Actions */}
                    <button className="btn btn-primary hidden sm:inline-flex">
                        <Plus className="w-4 h-4" />
                        <span>Create Event</span>
                    </button>

                    {/* Notifications */}
                    <button className="btn-ghost btn-icon relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="btn-ghost btn-icon">
                        {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}
