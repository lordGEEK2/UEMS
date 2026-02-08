import { motion } from 'framer-motion';
import {
    Users, Calendar, TrendingUp, Activity, Shield,
    AlertTriangle, CheckCircle, Clock
} from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-bold font-display text-primary">
                    Admin Dashboard
                </h1>
                <p className="text-secondary mt-1">Overview of the entire UEMS platform</p>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Total Users', value: '10,234', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Active Clubs', value: '70', change: '+5', icon: Shield, color: 'from-purple-500 to-pink-500' },
                    { label: 'Events This Month', value: '45', change: '+8', icon: Calendar, color: 'from-green-500 to-emerald-500' },
                    { label: 'Revenue', value: '₹2.4L', change: '+23%', icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}>
                            <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-indigo-500" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-secondary">{stat.label}</p>
                            <span className="text-xs text-green-500">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 glass-card"
                >
                    <h2 className="text-lg font-bold font-display text-primary mb-6">Platform Activity</h2>
                    <div className="space-y-4">
                        {[
                            { type: 'success', message: 'TechFest 2026 event created by GDSC MITS', time: '2 hours ago', icon: CheckCircle },
                            { type: 'warning', message: 'High traffic detected on event registration', time: '4 hours ago', icon: AlertTriangle },
                            { type: 'info', message: 'New club "AI Research Group" pending approval', time: '1 day ago', icon: Clock },
                            { type: 'success', message: '₹15,000 payment processed for Cultural Night', time: '1 day ago', icon: CheckCircle },
                        ].map((activity, i) => (
                            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${activity.type === 'success' ? 'bg-green-500/5' :
                                    activity.type === 'warning' ? 'bg-yellow-500/5' : 'bg-blue-500/5'
                                }`}>
                                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.type === 'success' ? 'text-green-500' :
                                        activity.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm text-primary">{activity.message}</p>
                                    <p className="text-xs text-secondary mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card"
                >
                    <h2 className="text-lg font-bold font-display text-primary mb-6">System Status</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Server Status', status: 'Healthy', color: 'text-green-500' },
                            { label: 'Database', status: 'Connected', color: 'text-green-500' },
                            { label: 'Payment Gateway', status: 'Active', color: 'text-green-500' },
                            { label: 'Email Service', status: 'Active', color: 'text-green-500' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                                <span className="text-sm text-primary">{item.label}</span>
                                <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
