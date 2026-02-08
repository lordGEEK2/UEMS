import Hero from '../components/common/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, CreditCard, Award, ChevronRight } from 'lucide-react';
import { clubs } from '../data/clubs';

const features = [
    {
        icon: Calendar,
        title: 'Discover Events',
        description: 'Browse through 500+ events across tech, cultural, sports, and more.',
    },
    {
        icon: Users,
        title: 'Join Clubs',
        description: 'Connect with 70+ student-run clubs and find your community.',
    },
    {
        icon: CreditCard,
        title: 'Easy Payments',
        description: 'Secure online payments for event registrations with Razorpay.',
    },
    {
        icon: Award,
        title: 'Get Certified',
        description: 'Download participation and winner certificates from your dashboard.',
    },
];

const howItWorks = [
    { step: '01', title: 'Create Account', desc: 'Sign up with your university email and complete your profile' },
    { step: '02', title: 'Explore & Join', desc: 'Browse events, join clubs, and apply for recruitments' },
    { step: '03', title: 'Participate', desc: 'Register for events, pay fees, and download certificates' },
];

export default function Home() {
    // Get first 8 clubs for preview
    const featuredClubs = clubs.slice(0, 8);

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="h2">Why Choose UEMS?</h2>
                        <p className="body-lg" style={{ maxWidth: 560, margin: '0 auto' }}>
                            Everything you need to discover, participate, and excel in university life.
                        </p>
                    </div>

                    <div className="grid grid-4">
                        {features.map((feature, index) => (
                            <div key={index} className="card">
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--primary-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 'var(--space-4)',
                                    }}
                                >
                                    <feature.icon style={{ width: 24, height: 24, color: 'var(--primary-600)' }} />
                                </div>
                                <h3 className="h4" style={{ marginBottom: 'var(--space-2)' }}>
                                    {feature.title}
                                </h3>
                                <p className="body-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Clubs Section */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="flex items-center justify-between mb-8" style={{ flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                        <div>
                            <h2 className="h2">Student Clubs</h2>
                            <p className="body" style={{ marginTop: 'var(--space-2)' }}>
                                70+ clubs across technology, cultural, sports, and professional domains.
                            </p>
                        </div>
                        <Link to="/clubs" className="btn btn-secondary">
                            View All Clubs
                            <ChevronRight style={{ width: 16, height: 16 }} />
                        </Link>
                    </div>

                    <div className="grid grid-4">
                        {featuredClubs.map((club) => (
                            <Link key={club.id} to={`/clubs/${club.id}`} className="card card-interactive">
                                <div className="flex items-center gap-4">
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 20,
                                        }}
                                    >
                                        {club.name[0]}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 className="h4 line-clamp-1">{club.name}</h4>
                                        <p className="muted" style={{ fontSize: 13 }}>{club.coordinator}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="h2">How It Works</h2>
                    </div>

                    <div className="grid grid-3" style={{ maxWidth: 900, margin: '0 auto' }}>
                        {howItWorks.map((item, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontSize: '3rem',
                                        fontWeight: 700,
                                        color: 'var(--primary-100)',
                                        lineHeight: 1,
                                        marginBottom: 'var(--space-4)',
                                    }}
                                >
                                    {item.step}
                                </div>
                                <h3 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
                                    {item.title}
                                </h3>
                                <p className="body-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="section"
                style={{
                    background: 'var(--primary-600)',
                    color: 'white',
                }}
            >
                <div className="container text-center">
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ opacity: 0.9, maxWidth: 520, margin: '0 auto var(--space-8)' }}>
                        Join thousands of students already using UEMS to discover events,
                        join clubs, and build their university experience.
                    </p>
                    <div className="flex items-center justify-center gap-4" style={{ flexWrap: 'wrap' }}>
                        <Link
                            to="/register"
                            className="btn btn-lg"
                            style={{ background: 'white', color: 'var(--primary-600)' }}
                        >
                            Create Account
                            <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link
                            to="/events"
                            className="btn btn-lg"
                            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                        >
                            Browse Events
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
