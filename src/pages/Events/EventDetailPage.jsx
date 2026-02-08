import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Heart } from 'lucide-react';

export default function EventDetailPage() {
    const { slug } = useParams();

    // Mock event data
    const event = {
        id: 1,
        slug: slug,
        title: 'TechFest 2026',
        description: `Join us for the biggest technology festival of the year! TechFest 2026 brings together the brightest minds from across India for a celebration of innovation, creativity, and technology.

This year's edition features:
• 24-hour Hackathon with ₹1,00,000+ in prizes
• Workshops on AI/ML, Cloud Computing, and Web3
• Tech talks from industry leaders
• Project exhibitions and competitions
• Networking sessions with startup founders

Whether you're a coding enthusiast, a tech entrepreneur, or just curious about the future of technology, TechFest 2026 has something for everyone.`,
        category: 'Technology',
        date: '2026-03-15',
        endDate: '2026-03-17',
        time: '09:00 AM',
        venue: 'Main Auditorium, MITS Gwalior',
        club: 'GDSC MITS',
        registrations: 450,
        maxRegistrations: 500,
        price: 299,
        organizer: {
            name: 'Dr. R S Jadon',
            role: 'Faculty Coordinator',
        },
        tags: ['Hackathon', 'Workshops', 'Tech Talks', 'Networking'],
    };

    const spotsLeft = event.maxRegistrations - event.registrations;
    const percentFilled = Math.round((event.registrations / event.maxRegistrations) * 100);

    return (
        <div className="section">
            <div className="container">
                {/* Back Link */}
                <Link
                    to="/events"
                    className="flex items-center gap-2 muted"
                    style={{ marginBottom: 'var(--space-6)', textDecoration: 'none' }}
                >
                    <ArrowLeft style={{ width: 16, height: 16 }} />
                    <span>Back to Events</span>
                </Link>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 360px',
                        gap: 'var(--space-8)',
                    }}
                >
                    {/* Main Content */}
                    <div>
                        {/* Header */}
                        <div style={{ marginBottom: 'var(--space-8)' }}>
                            <span className="badge badge-primary" style={{ marginBottom: 'var(--space-3)' }}>
                                {event.category}
                            </span>
                            <h1 className="h1" style={{ marginBottom: 'var(--space-4)' }}>
                                {event.title}
                            </h1>
                            <p className="body" style={{ color: 'var(--text-secondary)' }}>
                                Organized by <strong style={{ color: 'var(--text-primary)' }}>{event.club}</strong>
                            </p>
                        </div>

                        {/* Event Details Grid */}
                        <div
                            className="card"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 'var(--space-6)',
                                marginBottom: 'var(--space-8)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--primary-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Calendar style={{ width: 20, height: 20, color: 'var(--primary-600)' }} />
                                </div>
                                <div>
                                    <p className="muted" style={{ fontSize: 12 }}>Date</p>
                                    <p style={{ fontWeight: 500 }}>
                                        {new Date(event.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--primary-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Clock style={{ width: 20, height: 20, color: 'var(--primary-600)' }} />
                                </div>
                                <div>
                                    <p className="muted" style={{ fontSize: 12 }}>Time</p>
                                    <p style={{ fontWeight: 500 }}>{event.time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--primary-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MapPin style={{ width: 20, height: 20, color: 'var(--primary-600)' }} />
                                </div>
                                <div>
                                    <p className="muted" style={{ fontSize: 12 }}>Venue</p>
                                    <p style={{ fontWeight: 500 }}>{event.venue}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--primary-50)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Users style={{ width: 20, height: 20, color: 'var(--primary-600)' }} />
                                </div>
                                <div>
                                    <p className="muted" style={{ fontSize: 12 }}>Registrations</p>
                                    <p style={{ fontWeight: 500 }}>
                                        {event.registrations}/{event.maxRegistrations}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: 'var(--space-8)' }}>
                            <h2 className="h3" style={{ marginBottom: 'var(--space-4)' }}>
                                About this Event
                            </h2>
                            <div
                                className="body"
                                style={{ whiteSpace: 'pre-line', maxWidth: '65ch' }}
                            >
                                {event.description}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                            {event.tags.map((tag) => (
                                <span key={tag} className="badge">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div
                            className="card"
                            style={{
                                position: 'sticky',
                                top: 'calc(64px + var(--space-6))',
                            }}
                        >
                            {/* Price */}
                            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                                    {event.price === 0 ? 'Free' : `₹${event.price}`}
                                </p>
                                <p className="muted">per person</p>
                            </div>

                            {/* Progress */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <div className="flex justify-between mb-2" style={{ fontSize: 13 }}>
                                    <span className="muted">{event.registrations} registered</span>
                                    <span style={{ fontWeight: 500 }}>{percentFilled}%</span>
                                </div>
                                <div
                                    style={{
                                        height: 6,
                                        borderRadius: 3,
                                        background: 'var(--bg-tertiary)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${percentFilled}%`,
                                            background: 'var(--primary-600)',
                                            borderRadius: 3,
                                        }}
                                    />
                                </div>
                                <p className="muted" style={{ fontSize: 13, marginTop: 'var(--space-2)' }}>
                                    {spotsLeft} spots left
                                </p>
                            </div>

                            {/* CTA */}
                            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 'var(--space-4)' }}>
                                Register Now
                            </button>

                            <div className="flex gap-4">
                                <button className="btn btn-secondary" style={{ flex: 1 }}>
                                    <Heart style={{ width: 16, height: 16 }} />
                                    Save
                                </button>
                                <button className="btn btn-secondary" style={{ flex: 1 }}>
                                    <Share2 style={{ width: 16, height: 16 }} />
                                    Share
                                </button>
                            </div>

                            {/* Organizer */}
                            <div className="divider" />
                            <div>
                                <p className="muted" style={{ fontSize: 13, marginBottom: 'var(--space-3)' }}>
                                    Organized by
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="avatar">{event.club[0]}</div>
                                    <div>
                                        <p style={{ fontWeight: 500 }}>{event.club}</p>
                                        <p className="muted" style={{ fontSize: 13 }}>{event.organizer.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
