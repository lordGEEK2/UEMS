import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Home, Calendar, Users, MessageCircle, Settings, LogOut,
    Menu, Sun, Moon, ChevronLeft, ChevronRight, Code2, User
} from 'lucide-react';
import { useThemeStore, useAuthStore, useUIStore } from '../hooks/useStore';
import mitsLogo from '../assets/mits-logo.png';

const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Team', href: '/dashboard/clubs', icon: Users },
    { name: 'My Projects', href: '/dashboard/events', icon: Calendar },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'Create Team', href: '/dashboard/create', icon: Users },
    { name: 'Join Team', href: '/dashboard/join', icon: Users },
];

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeStore();
    const { user, role, logout } = useAuthStore();
    const { sidebarOpen, setSidebarOpen } = useUIStore();
    const [collapsed, setCollapsed] = useState(false);

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
        <div className={`dashboard-sdms ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* SDMS-style Sidebar */}
            <aside className={`sidebar-sdms ${sidebarOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
                {/* Collapse Toggle */}
                <button
                    className="sidebar-toggle hide-mobile"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Logo */}
                <Link to="/" className="sidebar-logo">
                    <img
                        src={mitsLogo}
                        alt="MITS Gwalior"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            objectFit: 'contain',
                            flexShrink: 0,
                        }}
                    />
                    {!collapsed && (
                        <div className="sidebar-logo-text">
                            <span className="sidebar-logo-title">UEMS</span>
                            <span className="sidebar-logo-subtitle">MITS Gwalior</span>
                        </div>
                    )}
                </Link>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {sidebarLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                title={collapsed ? link.name : ''}
                            >
                                <link.icon style={{ width: 20, height: 20, flexShrink: 0 }} />
                                {!collapsed && <span>{link.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    {/* Theme Toggle */}
                    <div className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                        {!collapsed && <span>Dark Mode</span>}
                    </div>

                    {/* User Card */}
                    <div className="user-card">
                        <div className="user-avatar">
                            {user?.profile?.firstName?.[0] || 'U'}
                        </div>
                        {!collapsed && (
                            <>
                                <div className="user-info">
                                    <div className="user-name">
                                        {user?.profile?.firstName || 'User'} {user?.profile?.lastName || ''}
                                    </div>
                                    <div className="user-role">{getRoleLabel()}</div>
                                </div>
                                <button className="logout-btn" onClick={handleLogout} title="Logout">
                                    <LogOut size={18} />
                                </button>
                            </>
                        )}
                    </div>
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
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 150,
                        }}
                        className="hide-desktop"
                    />
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="main-content">
                {/* Top Header */}
                <header className="top-header">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="btn btn-ghost btn-icon hide-desktop"
                        style={{ marginRight: 'auto' }}
                    >
                        <Menu size={20} />
                    </button>

                    {/* Home Link */}
                    <Link to="/" className="header-link">
                        <Home size={18} />
                    </Link>

                    {/* Developers Link */}
                    <Link to="/developers" className="header-link">
                        <Code2 size={16} />
                        <span className="hide-mobile">Developers</span>
                    </Link>

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="btn btn-ghost btn-icon-sm">
                        {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* User */}
                    <div className="header-user">
                        <div className="avatar avatar-sm">
                            {user?.profile?.firstName?.[0] || 'U'}
                        </div>
                        <span className="hide-mobile" style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                            {user?.profile?.firstName || 'User'} {user?.profile?.lastName || ''}
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: 'var(--space-6)' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
