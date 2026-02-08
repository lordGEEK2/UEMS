import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Calendar, Users, CreditCard, Award, Bell, ArrowRight,
    TrendingUp, Clock, CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const mockStats = [
    { label: 'Events Registered', value: 5, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Clubs Joined', value: 3, icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Payments Made', value: '₹1,299', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
    { label: 'Certificates', value: 2, icon: Award, color: 'from-orange-500 to-amber-500' },
];

const upcomingEvents = [
    { id: 1, title: 'TechFest 2026', date: 'Mar 15', time: '09:00 AM', status: 'confirmed' },
    { id: 2, title: 'AI/ML Workshop', date: 'Mar 20', time: '02:00 PM', status: 'pending' },
    { id: 3, title: 'Hackathon MITS', date: 'Apr 15', time: '09:00 AM', status: 'confirmed' },
];

const notifications = [
    { id: 1, message: 'Your registration for TechFest 2026 is confirmed', time: '2 hours ago', unread: true },
    { id: 2, message: 'GDSC MITS accepted your membership request', time: '1 day ago', unread: true },
    { id: 3, message: 'Payment of ₹299 received successfully', time: '2 days ago', unread: false },
];

export default function StudentDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-display text-primary">
                        Welcome back, {user?.profile?.firstName || 'Student'}! 👋
                    </h1>
                    <p className="text-secondary mt-1">
                        Here's what's happening with your campus activities
                    </p>
                </div>
                <Link to="/events" className="btn btn-primary">
                    <span>Explore Events</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {mockStats.map((stat, index) => (
                    <div key={index} className="glass-card">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}>
                            <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-indigo-500" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-secondary">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 glass-card"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold font-display text-primary">Upcoming Events</h2>
                        <Link to="/events" className="text-sm text-indigo-500 hover:underline">View all</Link>
                    </div>

                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors">
                                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex flex-col items-center justify-center">
                                    <span className="text-xs text-indigo-500 font-medium">{event.date.split(' ')[0]}</span>
                                    <span className="text-lg font-bold text-indigo-500">{event.date.split(' ')[1]}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-primary">{event.title}</p>
                                    <p className="text-sm text-secondary flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {event.time}
                                    </p>
                                </div>
                                <span className={`
                  inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                  ${event.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
                `}>
                                    {event.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold font-display text-primary flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </h2>
                        <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            2
                        </span>
                    </div>

                    <div className="space-y-4">
                        {notifications.map((notif) => (
                            <div key={notif.id} className={`p-3 rounded-xl ${notif.unread ? 'bg-indigo-500/5 border-l-2 border-indigo-500' : 'bg-secondary'}`}>
                                <p className="text-sm text-primary">{notif.message}</p>
                                <p className="text-xs text-secondary mt-1">{notif.time}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card"
            >
                <h2 className="text-lg font-bold font-display text-primary mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Browse Events', href: '/events', icon: Calendar },
                        { label: 'Join Clubs', href: '/clubs', icon: Users },
                        { label: 'View Payments', href: '/dashboard', icon: CreditCard },
                        { label: 'My Certificates', href: '/dashboard', icon: Award },
                    ].map((action, i) => (
                        <Link
                            key={i}
                            to={action.href}
                            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <action.icon className="w-6 h-6 text-indigo-500 group-hover:text-white" />
                            </div>
                            <span className="text-sm font-medium text-primary">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
