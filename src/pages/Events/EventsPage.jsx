import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Clock, Users, ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';
import { staggerContainer } from '../../animations/variants';

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
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
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
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        status: 'upcoming',
    },
    {
        id: 3,
        slug: 'ai-ml-workshop',
        title: 'AI/ML Workshop Series',
        description: 'Hands-on workshop on artificial intelligence and machine learning.',
        category: 'Workshop',
        date: '2026-02-25',
        time: '02:00 PM',
        venue: 'Computer Lab 3',
        club: 'The AI Club',
        registrations: 60,
        maxRegistrations: 60,
        price: 149,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
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
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
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
        image: 'https://images.unsplash.com/photo-1461896836934- voices-6d48e8fc4?w=800',
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
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        status: 'upcoming',
    },
];

const categories = ['All', 'Technology', 'Cultural', 'Workshop', 'Professional', 'Sports'];

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('date');

    const filteredEvents = useMemo(() => {
        let result = mockEvents;

        if (selectedCategory !== 'All') {
            result = result.filter(e => e.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.title.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query) ||
                e.club.toLowerCase().includes(query)
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'registrations') return b.registrations - a.registrations;
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="section-spacing">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-header text-center"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                        <span className="text-primary">Explore </span>
                        <span className="text-gradient">Events</span>
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Discover and register for exciting events happening across campus
                    </p>
                </motion.div>

                {/* Filters Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col lg:flex-row gap-4 mb-10"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-12 w-full"
                        />
                    </div>

                    <div className="flex gap-3">
                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input pr-10 min-w-[150px]"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input pr-10 min-w-[140px]"
                            >
                                <option value="date">By Date</option>
                                <option value="registrations">By Popularity</option>
                                <option value="price">By Price</option>
                            </select>
                            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary pointer-events-none" />
                        </div>

                        {/* View Toggle */}
                        <div className="flex rounded-xl border border-primary/10 overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'bg-secondary text-secondary'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'bg-secondary text-secondary'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Events Grid/List */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className={viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'flex flex-col gap-4'
                    }
                >
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={`/events/${event.slug}`}>
                                <div className={`event-card ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                                    {/* Image */}
                                    <div className={`event-card__image-container ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="event-card__image"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
                                            }}
                                        />
                                        <div className="event-card__overlay" />
                                        <span className={`event-card__badge ${event.status === 'full' ? 'bg-red-500' :
                                                event.price === 0 ? 'bg-green-500' : ''
                                            }`}>
                                            {event.status === 'full' ? 'Sold Out' : event.price === 0 ? 'Free' : `₹${event.price}`}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="event-card__content flex-1">
                                        <span className="event-card__category">
                                            {event.category}
                                        </span>
                                        <h3 className="event-card__title">{event.title}</h3>
                                        <p className="text-secondary text-sm mb-4 line-clamp-2">{event.description}</p>

                                        <div className="event-card__meta flex-wrap">
                                            <div className="event-card__meta-item">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                            </div>
                                            <div className="event-card__meta-item">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="event-card__meta-item">
                                                <Users className="w-4 h-4" />
                                                <span>{event.registrations}/{event.maxRegistrations}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-primary mb-2">No events found</h3>
                        <p className="text-secondary">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
