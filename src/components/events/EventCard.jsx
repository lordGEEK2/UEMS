import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Heart } from 'lucide-react';
import { useSavedEventsStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';

export default function EventCard({ event, index = 0 }) {
    const { toggleSaveEvent, isSaved } = useSavedEventsStore();
    const saved = isSaved(event._id || event.id);

    const handleToggleSave = (e) => {
        e.preventDefault(); // Prevent navigating to detail page
        e.stopPropagation();
        toggleSaveEvent(event);
        
        if (!saved) {
            toast.success('Event saved to your list!');
        } else {
            toast.info('Event removed from your list');
        }
    };

    // Calculate if event is in the past
    const isPast = new Date(event.date) < new Date();

    return (
        <Link 
            to={`/events/${event.slug}`} 
            className="card" 
            style={{ 
                display: 'block', 
                height: '100%', 
                textDecoration: 'none', 
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Save Button */}
            <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleSave}
                style={{
                    position: 'absolute',
                    top: 'var(--space-3)',
                    right: 'var(--space-3)',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    color: saved ? 'var(--error)' : 'var(--text-muted)'
                }}
            >
                <Heart 
                    style={{ 
                        width: 16, 
                        height: 16, 
                        fill: saved ? 'var(--error)' : 'none' 
                    }} 
                />
            </motion.button>

            <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                {isPast && (
                    <span className="badge">
                        Completed
                    </span>
                )}
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
                    marginTop: 'auto'
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
    );
}
