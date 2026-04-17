import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, Bell, ChevronRight, Award, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';
import { notificationService } from '../../services/notificationService';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: {
        y: -5,
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
};

const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.4 }
    }),
    hover: {
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 400 }
    }
};

export default function StudentDashboard() {
    const { user } = useAuthStore();

    const stats = [
        { label: 'Events Attended', value: user?.eventsAttended?.length || '0', icon: Calendar },
        { label: 'Clubs Joined', value: user?.clubs?.length || '0', icon: Users },
        { label: 'Certificates', value: user?.certificates?.length || '0', icon: Award },
    ];

    const { data: eventsData, isLoading: eventsLoading } = useQuery({
        queryKey: ['events', 'upcoming'],
        queryFn: () => eventService.getAllEvents({ limit: 3 }),
    });

    const { data: notifData, isLoading: notifLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationService.getNotifications({ limit: 3 }),
    });

    const upcomingEvents = eventsData?.events || [];
    const notifications = notifData?.notifications || [];

    return (
        <div style={{ padding: 'var(--space-8)' }}>
            {/* Welcome Header */}
            <motion.div
                style={{ marginBottom: 'var(--space-8)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={24} style={{ color: 'var(--primary-500)' }} />
                    <span className="badge badge-primary">Dashboard</span>
                </div>
                <h1 className="h1">
                    Welcome back, {user?.profile?.firstName || user?.name?.split(' ')[0] || 'Student'}!
                </h1>
                <p className="body" style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                    Here's what's happening with your campus activities.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-3" style={{ marginBottom: 'var(--space-8)' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="stat-card"
                        custom={i}
                        variants={statVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--primary-50)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <stat.icon style={{ width: 24, height: 24, color: 'var(--primary-600)' }} />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 'var(--space-8)',
                }}
            >
                {/* Upcoming Events */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="h3">Upcoming Events</h2>
                        <motion.div whileHover={{ x: 3 }}>
                            <Link to="/events" className="btn btn-ghost btn-sm">
                                View All
                                <ChevronRight style={{ width: 14, height: 14 }} />
                            </Link>
                        </motion.div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {eventsLoading ? (
                            <div className="p-4 text-center muted">Loading events...</div>
                        ) : upcomingEvents.length === 0 ? (
                            <div className="p-4 text-center muted">No upcoming events</div>
                        ) : upcomingEvents.map((event, index) => (
                            <motion.div
                                key={event._id}
                                className="flex items-center justify-between"
                                style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                whileHover={{
                                    x: 5,
                                    backgroundColor: 'var(--primary-50)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--primary-50)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Calendar style={{ width: 20, height: 20, color: 'var(--primary-600)' }} />
                                    </motion.div>
                                    <div>
                                        <h4 className="h4 line-clamp-1">{event.title}</h4>
                                        <p className="muted" style={{ fontSize: 13 }}>{event.club?.name || 'Unknown Club'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p style={{ fontWeight: 500, fontSize: 14 }}>
                                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </p>
                                    <p className="muted" style={{ fontSize: 13 }}>{event.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="h3 flex items-center gap-2">
                            <Bell style={{ width: 18, height: 18 }} />
                            Notifications
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {notifLoading ? (
                            <div className="p-4 text-center muted">Loading notifications...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-4 text-center muted">No new notifications</div>
                        ) : notifications.map((notif, index) => (
                            <motion.div
                                key={notif._id}
                                style={{
                                    padding: 'var(--space-3)',
                                    borderRadius: 'var(--radius-md)',
                                    background: !notif.isRead ? 'var(--primary-50)' : 'transparent',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{
                                    x: 3,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <p className="body-sm" style={{ color: 'var(--text-primary)' }}>
                                    {notif.title}
                                </p>
                                <p className="muted" style={{ fontSize: 12, marginTop: 'var(--space-1)' }}>
                                    {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                className="card"
                style={{ marginTop: 'var(--space-8)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="h3" style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h2>
                <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                    {[
                        { to: '/events', icon: Calendar, text: 'Browse Events' },
                        { to: '/clubs', icon: Users, text: 'Explore Clubs' },
                        { to: '/recruitments', icon: Award, text: 'View Recruitments' },
                    ].map((action, index) => (
                        <motion.div
                            key={action.to}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link to={action.to} className="btn btn-secondary">
                                <action.icon style={{ width: 16, height: 16 }} />
                                {action.text}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: 2fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
