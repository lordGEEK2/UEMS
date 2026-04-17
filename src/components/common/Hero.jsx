import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FolderOpen } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero-grid-bg" style={{ paddingTop: 'calc(64px + var(--space-16))', paddingBottom: 'var(--space-16)' }}>
            <div className="container">
                <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                    {/* Official Badge */}
                    <div className="official-badge" style={{ marginBottom: 'var(--space-8)' }}>
                        <Sparkles style={{ width: 16, height: 16 }} />
                        Official MITS Gwalior Portal
                    </div>

                    {/* Hindi Text */}
                    <p className="hindi-text" style={{ marginBottom: 'var(--space-2)' }}>
                        माधव प्रौद्योगिकी एवं विज्ञान संस्थान, ग्वालियर
                    </p>
                    <p className="muted" style={{ marginBottom: 'var(--space-6)', fontSize: '0.9375rem' }}>
                        Madhav Institute of Technology & Science, Gwalior
                    </p>

                    {/* Main Title */}
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.15,
                        marginBottom: 'var(--space-6)',
                        color: 'var(--text-primary)'
                    }}>
                        University Event<br />
                        <span className="title-accent">Management System</span>
                    </h1>

                    {/* Description */}
                    <p
                        className="body-lg"
                        style={{
                            maxWidth: 560,
                            margin: '0 auto var(--space-8)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        A comprehensive platform for managing university events, tracking
                        progress, and fostering innovation at MITS Gwalior.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center justify-center gap-4" style={{ flexWrap: 'wrap' }}>
                        <Link
                            to="/dashboard"
                            className="btn btn-lg"
                            style={{
                                background: 'var(--gray-900)',
                                color: 'white',
                                paddingLeft: 'var(--space-6)',
                                paddingRight: 'var(--space-6)'
                            }}
                        >
                            Get Started
                            <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link
                            to="/events"
                            className="btn btn-secondary btn-lg"
                            style={{
                                paddingLeft: 'var(--space-6)',
                                paddingRight: 'var(--space-6)'
                            }}
                        >
                            <FolderOpen style={{ width: 18, height: 18 }} />
                            Browse Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
