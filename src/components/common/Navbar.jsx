import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, Bell, User, Calendar, Users, Trophy, Sparkles, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { useThemeStore, useUIStore, useAuthStore } from '../../hooks/useStore';

const navLinks = [
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Recruitments', href: '/recruitments', icon: Trophy },
    { name: 'Sponsors', href: '/sponsors', icon: Sparkles },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { theme, toggleTheme } = useThemeStore();
    const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setDropdownOpen(false);
        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [dropdownOpen]);

    return (
        <>
            <header className="nav">
                <div className="container nav-container">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: 'var(--primary-600)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>U</span>
                        </div>
                        <div className="hide-mobile">
                            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                UEMS
                            </span>
                            <span className="muted" style={{ marginLeft: 8 }}>MITS Gwalior</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-links hide-mobile">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`nav-link ${location.pathname.startsWith(link.href) ? 'active' : ''}`}
                            >
                                <link.icon style={{ width: 16, height: 16 }} />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-icon-sm"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Sun style={{ width: 18, height: 18 }} />
                            ) : (
                                <Moon style={{ width: 18, height: 18 }} />
                            )}
                        </button>

                        {/* Notifications */}
                        {isAuthenticated && (
                            <button className="btn btn-ghost btn-icon-sm" style={{ position: 'relative' }}>
                                <Bell style={{ width: 18, height: 18 }} />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: 6,
                                        right: 6,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: 'var(--error)',
                                    }}
                                />
                            </button>
                        )}

                        {/* Auth Buttons / User Menu */}
                        {isAuthenticated ? (
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpen(!dropdownOpen);
                                    }}
                                    className="flex items-center gap-2"
                                    style={{
                                        padding: '6px 12px 6px 6px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div className="avatar avatar-sm">
                                        {user?.profile?.firstName?.[0] || 'U'}
                                    </div>
                                    <ChevronDown style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
                                </button>

                                {dropdownOpen && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 'calc(100% + 8px)',
                                            width: 220,
                                            background: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: 'var(--shadow-lg)',
                                            overflow: 'hidden',
                                            zIndex: 'var(--z-dropdown)',
                                        }}
                                    >
                                        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                                            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                {user?.profile?.firstName} {user?.profile?.lastName}
                                            </p>
                                            <p className="muted">{user?.email}</p>
                                        </div>
                                        <div style={{ padding: 'var(--space-2)' }}>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setDropdownOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-3)',
                                                    padding: 'var(--space-2) var(--space-3)',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: 'var(--text-secondary)',
                                                    textDecoration: 'none',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <User style={{ width: 16, height: 16 }} />
                                                <span>Dashboard</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-3)',
                                                    padding: 'var(--space-2) var(--space-3)',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: 'var(--error)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: 'inherit',
                                                    fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <X style={{ width: 16, height: 16 }} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 hide-mobile">
                                <Link to="/login" className="btn btn-ghost">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-ghost btn-icon-sm hide-desktop"
                        >
                            {mobileMenuOpen ? (
                                <X style={{ width: 20, height: 20 }} />
                            ) : (
                                <Menu style={{ width: 20, height: 20 }} />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 150,
                        }}
                    />
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 280,
                            background: 'var(--surface)',
                            borderLeft: '1px solid var(--border)',
                            padding: 'var(--space-6)',
                            zIndex: 200,
                        }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span style={{ fontSize: 18, fontWeight: 600 }}>Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="btn btn-ghost btn-icon-sm">
                                <X style={{ width: 20, height: 20 }} />
                            </button>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="sidebar-link"
                                >
                                    <link.icon style={{ width: 18, height: 18 }} />
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {!isAuthenticated && (
                            <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
