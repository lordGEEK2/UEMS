import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    Calendar, Users, Settings, Plus, Edit, Trash2,
    Eye, MessageCircle, UserPlus, Crown, Shield, MoreVertical
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';

const mockClubData = {
    name: 'GDSC MITS',
    members: 120,
    events: 15,
    pendingRequests: 5,
};

const mockMembers = [
    { id: 1, name: 'Rahul Sharma', role: 'head', email: 'rahul@mits.ac.in', joined: '2024-01-15' },
    { id: 2, name: 'Priya Singh', role: 'admin', email: 'priya@mits.ac.in', joined: '2024-02-20' },
    { id: 3, name: 'Amit Kumar', role: 'member', email: 'amit@mits.ac.in', joined: '2024-03-10' },
    { id: 4, name: 'Sneha Patel', role: 'member', email: 'sneha@mits.ac.in', joined: '2024-03-15' },
    { id: 5, name: 'Vikram Joshi', role: 'member', email: 'vikram@mits.ac.in', joined: '2024-04-01' },
];

const pendingRequests = [
    { id: 1, name: 'Ananya Gupta', email: 'ananya@mits.ac.in', year: '2nd Year', department: 'CSE' },
    { id: 2, name: 'Rohan Verma', email: 'rohan@mits.ac.in', year: '3rd Year', department: 'IT' },
];

export default function ClubAdminDashboard() {
    const { role } = useAuthStore();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');

    const isHead = role === 'club_head';
    const isAdmin = role === 'club_admin' || isHead;

    // Determine active section from URL
    const currentSection = location.pathname.includes('/chat') ? 'chat' :
        location.pathname.includes('/settings') ? 'settings' : 'overview';

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold font-display text-primary">
                            {mockClubData.name}
                        </h1>
                        {isHead && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium">
                                <Crown className="w-3 h-3" />
                                Head
                            </span>
                        )}
                        {!isHead && isAdmin && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-medium">
                                <Shield className="w-3 h-3" />
                                Admin
                            </span>
                        )}
                    </div>
                    <p className="text-secondary mt-1">Manage your club, members, and events</p>
                </div>

                <div className="flex gap-3">
                    <button className="btn btn-secondary">
                        <MessageCircle className="w-4 h-4" />
                        <span>Club Chat</span>
                    </button>
                    <button className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        <span>Create Event</span>
                    </button>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Total Members', value: mockClubData.members, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
                    { label: 'Events', value: mockClubData.events, icon: Calendar, color: 'text-purple-500 bg-purple-500/10' },
                    { label: 'Pending Requests', value: mockClubData.pendingRequests, icon: UserPlus, color: 'text-orange-500 bg-orange-500/10' },
                    { label: 'Active Chats', value: 3, icon: MessageCircle, color: 'text-green-500 bg-green-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-secondary">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 overflow-x-auto pb-2"
            >
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'members', label: 'Members' },
                    { id: 'requests', label: `Requests (${pendingRequests.length})` },
                    ...(isHead ? [{ id: 'settings', label: 'Club Settings' }] : []),
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === tab.id
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                : 'bg-secondary text-secondary hover:bg-tertiary'}
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Content */}
            {activeTab === 'members' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold font-display text-primary">Club Members</h2>
                        {isHead && (
                            <button className="btn btn-primary btn-sm">
                                <UserPlus className="w-4 h-4" />
                                <span>Add Member</span>
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-primary/10">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Member</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Joined</th>
                                    {isHead && <th className="text-right py-3 px-4 text-sm font-medium text-secondary">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {mockMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-primary/5 hover:bg-secondary/50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm">{member.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-primary">{member.name}</p>
                                                    <p className="text-xs text-secondary">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`
                        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize
                        ${member.role === 'head' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    member.role === 'admin' ? 'bg-purple-500/10 text-purple-500' :
                                                        'bg-gray-500/10 text-gray-500'}
                      `}>
                                                {member.role === 'head' && <Crown className="w-3 h-3" />}
                                                {member.role === 'admin' && <Shield className="w-3 h-3" />}
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-secondary">
                                            {new Date(member.joined).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        {isHead && (
                                            <td className="py-4 px-4 text-right">
                                                <button className="btn-ghost btn-icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'requests' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                >
                    <h2 className="text-lg font-bold font-display text-primary mb-6">Pending Join Requests</h2>

                    {pendingRequests.length > 0 ? (
                        <div className="space-y-4">
                            {pendingRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <span className="text-white font-medium">{request.name.split(' ').map(n => n[0]).join('')}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-primary">{request.name}</p>
                                            <p className="text-sm text-secondary">{request.department} • {request.year}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="btn btn-primary btn-sm">Accept</button>
                                        <button className="btn btn-secondary btn-sm">Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <UserPlus className="w-12 h-12 mx-auto text-secondary mb-3" />
                            <p className="text-secondary">No pending requests</p>
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'settings' && isHead && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                >
                    <h2 className="text-lg font-bold font-display text-primary mb-6">Club Settings</h2>

                    <div className="space-y-6">
                        <div className="input-group">
                            <label className="input-label">Club Name</label>
                            <input type="text" defaultValue={mockClubData.name} className="input" />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Description</label>
                            <textarea rows={4} className="input" placeholder="Describe your club..." />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Contact Email</label>
                            <input type="email" placeholder="club@mits.ac.in" className="input" />
                        </div>

                        <div className="flex gap-3">
                            <button className="btn btn-primary">
                                Save Changes
                            </button>
                            <button className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'overview' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    <div className="glass-card">
                        <h2 className="text-lg font-bold font-display text-primary mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            {[
                                { action: 'New member joined', user: 'Vikram Joshi', time: '2 hours ago' },
                                { action: 'Event created', user: 'TechFest 2026', time: '1 day ago' },
                                { action: 'Member promoted', user: 'Priya Singh to Admin', time: '3 days ago' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <div className="flex-1">
                                        <p className="text-sm text-primary">{activity.action}: <span className="font-medium">{activity.user}</span></p>
                                        <p className="text-xs text-secondary">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card">
                        <h2 className="text-lg font-bold font-display text-primary mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Create Event', icon: Plus },
                                { label: 'View Members', icon: Users },
                                { label: 'Club Chat', icon: MessageCircle },
                                { label: 'Settings', icon: Settings },
                            ].map((action, i) => (
                                <button key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors">
                                    <action.icon className="w-5 h-5 text-indigo-500" />
                                    <span className="text-sm font-medium text-primary">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
