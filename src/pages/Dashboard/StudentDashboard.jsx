import { Link } from 'react-router-dom';
import { Calendar, Users, Bell, Clock, ChevronRight, Award } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const stats = [
    { label: 'Events Attended', value: '12', icon: Calendar },
    { label: 'Clubs Joined', value: '3', icon: Users },
    { label: 'Certificates', value: '8', icon: Award },
];

const upcomingEvents = [
    { id: 1, title: 'TechFest 2026', club: 'GDSC MITS', date: 'Mar 15', time: '9:00 AM' },
    { id: 2, title: 'AI/ML Workshop', club: 'The AI Club', date: 'Feb 25', time: '2:00 PM' },
    { id: 3, title: 'Cultural Night', club: 'Zephyr', date: 'Mar 20', time: '6:00 PM' },
];

const notifications = [
    { id: 1, title: 'Registration confirmed for TechFest 2026', time: '2 hours ago', unread: true },
    { id: 2, title: 'New event from GDSC MITS', time: '1 day ago', unread: true },
    { id: 3, title: 'Certificate available for download', time: '3 days ago', unread: false },
];

export default function StudentDashboard() {
    const { user } = useAuthStore();

    return (
        <div style={{ padding: 'var(--space-8)' }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
                <h1 className="h1">
                    Welcome back, {user?.profile?.firstName || 'Student'}!
                </h1>
                <p className="body" style={{ marginTop: 'var(--space-2)' }}>
                    Here's what's happening with your campus activities.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-3" style={{ marginBottom: 'var(--space-8)' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                            <div
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
                            </div>
                        </div>
                    </div>
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
                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="h3">Upcoming Events</h2>
                        <Link to="/events" className="btn btn-ghost btn-sm">
                            View All
                            <ChevronRight style={{ width: 14, height: 14 }} />
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="flex items-center justify-between"
                                style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
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
                                    </div>
                                    <div>
                                        <h4 className="h4">{event.title}</h4>
                                        <p className="muted" style={{ fontSize: 13 }}>{event.club}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p style={{ fontWeight: 500, fontSize: 14 }}>{event.date}</p>
                                    <p className="muted" style={{ fontSize: 13 }}>{event.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="h3 flex items-center gap-2">
                            <Bell style={{ width: 18, height: 18 }} />
                            Notifications
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                style={{
                                    padding: 'var(--space-3)',
                                    borderRadius: 'var(--radius-md)',
                                    background: notif.unread ? 'var(--primary-50)' : 'transparent',
                                }}
                            >
                                <p className="body-sm" style={{ color: 'var(--text-primary)' }}>
                                    {notif.title}
                                </p>
                                <p className="muted" style={{ fontSize: 12, marginTop: 'var(--space-1)' }}>
                                    {notif.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card" style={{ marginTop: 'var(--space-8)' }}>
                <h2 className="h3" style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h2>
                <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                    <Link to="/events" className="btn btn-secondary">
                        <Calendar style={{ width: 16, height: 16 }} />
                        Browse Events
                    </Link>
                    <Link to="/clubs" className="btn btn-secondary">
                        <Users style={{ width: 16, height: 16 }} />
                        Explore Clubs
                    </Link>
                    <Link to="/recruitments" className="btn btn-secondary">
                        <Award style={{ width: 16, height: 16 }} />
                        View Recruitments
                    </Link>
                </div>
            </div>

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
