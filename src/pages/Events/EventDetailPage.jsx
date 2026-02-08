import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, Tag, User } from 'lucide-react';

export default function EventDetailPage() {
    const { slug } = useParams();

    // Mock event data - replace with API call
    const event = {
        id: 1,
        slug: slug,
        title: 'TechFest 2026',
        description: `Join us for the biggest technology festival of the year! TechFest 2026 brings together the brightest minds from across India for a celebration of innovation, creativity, and technology.

This year's edition features:
- 24-hour Hackathon with ₹1,00,000+ in prizes
- Workshops on AI/ML, Cloud Computing, and Web3
- Tech talks from industry leaders
- Project exhibitions and competitions
- Networking sessions with startup founders

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
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
        organizer: {
            name: 'Dr. R S Jadon',
            role: 'Faculty Coordinator',
        },
        tags: ['Hackathon', 'Workshops', 'Tech Talks', 'Networking'],
    };

    return (
        <div className="section-spacing">
            <div className="container">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/events" className="inline-flex items-center gap-2 text-secondary hover:text-indigo-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Events</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2"
                    >
                        {/* Hero Image */}
                        <div className="relative rounded-2xl overflow-hidden mb-8">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium mb-3">
                                    {event.category}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold font-display text-white">
                                    {event.title}
                                </h1>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="glass-card mb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Date</p>
                                        <p className="font-medium text-primary">
                                            {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Time</p>
                                        <p className="font-medium text-primary">{event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Venue</p>
                                        <p className="font-medium text-primary">{event.venue}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary">Registrations</p>
                                        <p className="font-medium text-primary">{event.registrations}/{event.maxRegistrations}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold font-display text-primary mb-4">About this Event</h2>
                            <div className="prose prose-lg text-secondary whitespace-pre-line">
                                {event.description}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary text-sm">
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Registration Card */}
                        <div className="glass-card sticky top-24">
                            <div className="text-center mb-6">
                                <p className="text-3xl font-bold text-gradient mb-1">
                                    {event.price === 0 ? 'Free' : `₹${event.price}`}
                                </p>
                                <p className="text-secondary text-sm">per person</p>
                            </div>

                            {/* Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-secondary">{event.registrations} registered</span>
                                    <span className="font-medium text-primary">{Math.round((event.registrations / event.maxRegistrations) * 100)}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-tertiary overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                                        style={{ width: `${(event.registrations / event.maxRegistrations) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-secondary mt-2">{event.maxRegistrations - event.registrations} spots left</p>
                            </div>

                            <button className="btn btn-primary w-full py-4 text-lg mb-4">
                                Register Now
                            </button>

                            <div className="flex gap-3">
                                <button className="btn btn-secondary flex-1">
                                    <Heart className="w-4 h-4" />
                                    <span>Save</span>
                                </button>
                                <button className="btn btn-secondary flex-1">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Organizer Card */}
                        <div className="glass-card">
                            <h3 className="font-semibold text-primary mb-4">Organized by</h3>
                            <Link to={`/clubs/${event.club.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">{event.club[0]}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-primary">{event.club}</p>
                                    <p className="text-sm text-secondary flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {event.organizer.name}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
