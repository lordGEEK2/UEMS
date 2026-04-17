import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';

const categories = ['All', 'Technology', 'Cultural', 'Workshop', 'Professional', 'Sports'];

// Card animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 }
    }),
    hover: {
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
};

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const { data, isLoading, error } = useQuery({
        queryKey: ['events', selectedCategory, searchQuery, sortBy],
        queryFn: () => eventService.getAllEvents({
            category: selectedCategory !== 'All' ? selectedCategory : undefined,
            search: searchQuery || undefined,
            sort: sortBy
        })
    });

    const filteredEvents = data?.events || [];

    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="h1">Events</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560 }}>
                        Discover and register for events happening across campus
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
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
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="input"
                        style={{ minWidth: 150 }}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Sort */}
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
                </motion.div>

                {/* Events Grid */}
                <div className="grid grid-3">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                        >
                            <Link to={`/events/${event.slug}`} className="card" style={{ display: 'block', height: '100%' }}>
                                <div style={{ marginBottom: 'var(--space-3)' }}>
                                    <span
                                        className={`badge ${event.registrations?.length >= event.maxRegistrations
                                            ? 'badge-error'
                                            : event.price === 0
                                                ? 'badge-success'
                                                : 'badge-primary'
                                            }`}
                                    >
                                        {event.registrations?.length >= event.maxRegistrations ? 'Sold Out' : event.price === 0 ? 'Free' : `₹${event.price}`}
                                    </span>
                                </div>

                                {/* Category */}
                                <p className="muted" style={{ fontSize: 12, marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {event.category}
                                </p>

                                {/* Title */}
                                <h3 className="h4 line-clamp-1" style={{ marginBottom: 'var(--space-2)' }}>
                                    {event.title}
                                </h3>

                                {/* Description */}
                                <p className="body-sm line-clamp-2" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
                                    {event.description}
                                </p>

                                {/* Meta */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 'var(--space-3)',
                                        fontSize: 12,
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    <span className="flex items-center gap-1">
                                        <Calendar style={{ width: 14, height: 14 }} />
                                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock style={{ width: 14, height: 14 }} />
                                        {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users style={{ width: 14, height: 14 }} />
                                        {event.registrations?.length || 0}/{event.maxRegistrations}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading events...</div>
                )}
                
                {error && (
                    <div className="empty-state text-red-500">Failed to load events.</div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredEvents.length === 0 && (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No events found</h3>
                        <p className="empty-state-text">Try adjusting your search or filters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
