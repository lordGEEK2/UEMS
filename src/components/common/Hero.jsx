import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section
            className="section"
            style={{
                background: 'linear-gradient(to bottom, var(--primary-50), var(--bg-primary))',
                paddingTop: 'var(--space-24)',
                paddingBottom: 'var(--space-16)',
            }}
        >
            <div className="container">
                <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                    {/* Badge */}
                    <div
                        className="badge badge-primary"
                        style={{ marginBottom: 'var(--space-6)' }}
                    >
                        <Sparkles style={{ width: 14, height: 14, marginRight: 6 }} />
                        MITS Gwalior's Official Platform
                    </div>

                    {/* Headline */}
                    <h1
                        className="h1"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: 'var(--space-6)',
                        }}
                    >
                        Discover Events, Join Clubs, Build Your University Experience
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="body-lg"
                        style={{
                            maxWidth: 560,
                            margin: '0 auto var(--space-8)',
                        }}
                    >
                        The centralized platform for 70+ student clubs, 500+ annual events,
                        and endless opportunities at MITS Gwalior.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center justify-center gap-4" style={{ flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started
                            <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link to="/events" className="btn btn-secondary btn-lg">
                            Browse Events
                        </Link>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-3"
                        style={{
                            marginTop: 'var(--space-16)',
                            maxWidth: 480,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            gap: 'var(--space-6)',
                        }}
                    >
                        {[
                            { value: '70+', label: 'Active Clubs' },
                            { value: '500+', label: 'Annual Events' },
                            { value: '10k+', label: 'Students' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                                    {stat.value}
                                </div>
                                <div className="muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
