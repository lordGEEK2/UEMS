import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Users, MapPin, ChevronDown } from 'lucide-react';

// Mock events data
const mockEvents = [
    {
        id: 1,
        slug: 'techfest-2026',
        title: 'TechFest 2026',
        description: 'Annual technology festival featuring hackathons, workshops, and competitions.',
        category: 'Technology',
        date: '2026-03-15',
        time: '09:00 AM',
        venue: 'Main Auditorium',
        club: 'GDSC MITS',
        registrations: 450,
        maxRegistrations: 500,
        price: 299,
        status: 'upcoming',
    },
    {
        id: 2,
        slug: 'cultural-night-2026',
        title: 'Cultural Night 2026',
        description: 'Annual cultural evening with dance, music, and drama performances.',
        category: 'Cultural',
        date: '2026-03-20',
        time: '06:00 PM',
        venue: 'Open Air Theatre',
        club: 'Zephyr',
        registrations: 200,
        maxRegistrations: 300,
        price: 0,
        status: 'upcoming',
    },
    {
        id: 3,
        slug: 'ai-ml-workshop',
        title: 'AI/ML Workshop Series',
        description: 'Hands-on workshop on artificial intelligence and machine learning fundamentals.',
        category: 'Workshop',
        date: '2026-02-25',
        time: '02:00 PM',
        venue: 'Computer Lab 3',
        club: 'The AI Club',
        registrations: 60,
        maxRegistrations: 60,
        price: 149,
        status: 'full',
    },
    {
        id: 4,
        slug: 'startup-summit',
        title: 'Startup Summit 2026',
        description: 'Network with founders, VCs, and entrepreneurs. Pitch your ideas!',
        category: 'Professional',
        date: '2026-04-10',
        time: '10:00 AM',
        venue: 'Seminar Hall',
        club: 'E-Cell MITS',
        registrations: 120,
        maxRegistrations: 150,
        price: 499,
        status: 'upcoming',
    },
    {
        id: 5,
        slug: 'sports-meet-2026',
        title: 'Annual Sports Meet',
        description: 'Inter-department sports competition. Show your athletic skills!',
        category: 'Sports',
        date: '2026-03-01',
        time: '07:00 AM',
        venue: 'Sports Ground',
        club: 'Sports Council',
        registrations: 300,
        maxRegistrations: 500,
        price: 0,
        status: 'upcoming',
    },
    {
        id: 6,
        slug: 'hackathon-mits',
        title: 'Hackathon MITS 2026',
        description: '24-hour coding marathon. Build, innovate, and win prizes!',
        category: 'Technology',
        date: '2026-04-15',
        time: '09:00 AM',
        venue: 'Innovation Hub',
        club: 'Coders Hub',
        registrations: 180,
        maxRegistrations: 200,
        price: 199,
        status: 'upcoming',
    },
];

const categories = ['All', 'Technology', 'Cultural', 'Workshop', 'Professional', 'Sports'];

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const filteredEvents = useMemo(() => {
        let result = mockEvents;

        if (selectedCategory !== 'All') {
            result = result.filter((e) => e.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (e) =>
                    e.title.toLowerCase().includes(query) ||
                    e.description.toLowerCase().includes(query) ||
                    e.club.toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'registrations') return b.registrations - a.registrations;
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="section-header">
                    <h1 className="h1">Events</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560 }}>
                        Discover and register for events happening across campus
                    </p>
                </div>

                {/* Filters */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-8)',
                    }}
                >
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '1 1 300px' }}>
                        <Search
                            style={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 18,
                                height: 18,
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>

                    {/* Category */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input"
                            style={{ minWidth: 150 }}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="input"
                            style={{ minWidth: 140 }}
                        >
                            <option value="date">By Date</option>
                            <option value="registrations">By Popularity</option>
                            <option value="price">By Price</option>
                        </select>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-3">
                    {filteredEvents.map((event) => (
                        <Link key={event.id} to={`/events/${event.slug}`} className="card card-interactive">
                            {/* Badge */}
                            <div style={{ marginBottom: 'var(--space-4)' }}>
                                <span
                                    className={`badge ${event.status === 'full'
                                            ? 'badge-error'
                                            : event.price === 0
                                                ? 'badge-success'
                                                : 'badge-primary'
                                        }`}
                                >
                                    {event.status === 'full' ? 'Sold Out' : event.price === 0 ? 'Free' : `₹${event.price}`}
                                </span>
                            </div>

                            {/* Category */}
                            <p className="muted" style={{ fontSize: 13, marginBottom: 'var(--space-1)' }}>
                                {event.category}
                            </p>

                            {/* Title */}
                            <h3 className="h3 line-clamp-1" style={{ marginBottom: 'var(--space-2)' }}>
                                {event.title}
                            </h3>

                            {/* Description */}
                            <p className="body-sm line-clamp-2" style={{ marginBottom: 'var(--space-4)' }}>
                                {event.description}
                            </p>

                            {/* Meta */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 'var(--space-4)',
                                    fontSize: 13,
                                    color: 'var(--text-muted)',
                                }}
                            >
                                <span className="flex items-center gap-2">
                                    <Calendar style={{ width: 14, height: 14 }} />
                                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock style={{ width: 14, height: 14 }} />
                                    {event.time}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users style={{ width: 14, height: 14 }} />
                                    {event.registrations}/{event.maxRegistrations}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="empty-state">
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No events found</h3>
                        <p className="empty-state-text">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
