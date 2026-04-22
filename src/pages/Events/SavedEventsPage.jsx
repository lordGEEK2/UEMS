import { motion } from 'framer-motion';
import { Heart, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedEventsStore } from '../../hooks/useStore';
import EventCard from '../../components/events/EventCard';

export default function SavedEventsPage() {
    const { savedEvents } = useSavedEventsStore();

    return (
        <div className="section">
            <div className="container">
                {/* Header */}
                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Link 
                            to="/events" 
                            className="flex items-center gap-2 muted mb-4" 
                            style={{ textDecoration: 'none', display: 'inline-flex' }}
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Events</span>
                        </Link>
                        <h1 className="h1">Saved Events</h1>
                        <p className="body-lg mt-2">Your personalized list of favorited events</p>
                    </div>
                    
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'var(--primary-50)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary-600)'
                        }}
                    >
                        <Heart size={32} fill="currentColor" />
                    </div>
                </div>

                {/* Content */}
                {savedEvents.length > 0 ? (
                    <div className="grid grid-3 mt-8">
                        {savedEvents.map((event, index) => (
                            <motion.div
                                key={event._id || event.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <EventCard event={event} index={index} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ padding: 'var(--space-20) 0' }}
                    >
                        <div 
                            style={{ 
                                width: 80, 
                                height: 80, 
                                borderRadius: '50%', 
                                background: 'var(--bg-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto var(--space-6)',
                                border: '2px dashed var(--border)'
                            }}
                        >
                            <Heart size={40} className="muted" />
                        </div>
                        <h3 className="h3">No saved events yet</h3>
                        <p className="body mt-2 text-muted">
                            Click the heart icon on any event to save it for later.
                        </p>
                        <Link to="/events" className="btn btn-primary mt-8">
                            Explore Events
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
