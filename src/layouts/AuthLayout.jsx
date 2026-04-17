import { Outlet, Link } from 'react-router-dom';
import mitsLogo from '../assets/mits-logo.png';

export default function AuthLayout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left Side - Branding */}
            <div
                style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 'var(--space-12)',
                    background: 'linear-gradient(135deg, var(--primary-50), var(--bg-secondary))',
                }}
                className="hide-mobile"
            >
                <Link to="/" style={{ marginBottom: 'var(--space-8)', textDecoration: 'none' }}>
                    <img
                        src={mitsLogo}
                        alt="MITS Gwalior"
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 'var(--radius-xl)',
                            objectFit: 'contain',
                        }}
                    />
                </Link>

                <h1
                    className="h1"
                    style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}
                >
                    Welcome to <span style={{ color: 'var(--primary-600)' }}>UEMS</span>
                </h1>

                <p
                    className="body-lg text-center"
                    style={{ maxWidth: 400, color: 'var(--text-secondary)' }}
                >
                    University Event Management System - Your gateway to campus life at MITS Gwalior
                </p>

                {/* Stats */}
                <div
                    className="grid grid-3"
                    style={{ marginTop: 'var(--space-12)', gap: 'var(--space-8)' }}
                >
                    {[
                        { value: '10K+', label: 'Students' },
                        { value: '70+', label: 'Clubs' },
                        { value: '500+', label: 'Events' },
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    color: 'var(--primary-600)',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="muted">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-8)',
                    background: 'var(--bg-primary)',
                }}
            >
                <div style={{ width: '100%', maxWidth: 440 }}>
                    {/* Mobile Logo */}
                    <Link
                        to="/"
                        className="hide-desktop flex items-center justify-center gap-3"
                        style={{ marginBottom: 'var(--space-8)', textDecoration: 'none' }}
                    >
                        <img
                            src={mitsLogo}
                            alt="MITS Gwalior"
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 'var(--radius-lg)',
                                objectFit: 'contain',
                            }}
                        />
                        <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                            UEMS
                        </span>
                    </Link>

                    <Outlet />
                </div>
            </div>
        </div>
    );
}
