import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bell, User, Calendar, Users, Code2, Home, LogOut, Heart } from 'lucide-react';
import { useThemeStore, useUIStore, useAuthStore } from '../../hooks/useStore';
import mitsLogo from '../../assets/mits-logo.png';

const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Saved', href: '/events/saved', icon: Heart },
    { name: 'Developers', href: '/developers', icon: Code2 },
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

    const isActive = (href) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    return (
        <>
            <header className="nav">
                <div className="container nav-container">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={mitsLogo}
                            alt="MITS Gwalior"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                        />
                        <div className="hide-mobile">
                            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                UEMS
                            </span>
                            <span className="muted" style={{ marginLeft: 8, fontSize: 13 }}>MITS Gwalior</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-links hide-mobile">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                            >
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

                        {/* Auth Buttons / User Menu */}
                        {isAuthenticated ? (
                            <>
                                {/* Dashboard Button */}
                                <Link
                                    to="/dashboard"
                                    className="btn btn-primary hide-mobile"
                                    style={{ gap: 'var(--space-2)' }}
                                >
                                    <User style={{ width: 16, height: 16 }} />
                                    Dashboard
                                </Link>

                                {/* Logout Link */}
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-ghost hide-mobile"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <LogOut style={{ width: 16, height: 16 }} />
                                    Logout
                                </button>

                                {/* User Avatar for small indicator */}
                                <div
                                    className="avatar avatar-sm hide-desktop"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    {user?.profile?.firstName?.[0] || 'U'}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 hide-mobile">
                                <Link to="/login" className="btn btn-ghost">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Dashboard
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

                        {isAuthenticated ? (
                            <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                    Dashboard
                                </Link>
                                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
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
