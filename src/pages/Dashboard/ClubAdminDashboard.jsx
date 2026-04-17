import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Calendar, Users, Settings, Plus, Edit, Trash2,
    Eye, MessageCircle, UserPlus, Crown, Shield, MoreVertical
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';
import { clubService } from '../../services/clubService';
import { toast } from 'react-toastify';

export default function ClubAdminDashboard() {
    const { role } = useAuthStore();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');
    const queryClient = useQueryClient();

    const isHead = role === 'club_head';
    const isAdmin = role === 'club_admin' || isHead;

    const { data: response, isLoading, error } = useQuery({
        queryKey: ['myClub'],
        queryFn: clubService.getMyClub,
        retry: 1
    });

    const approveMutation = useMutation({
        mutationFn: ({ slug, userId }) => clubService.approveMember(slug, userId),
        onSuccess: () => {
            toast.success('Member approved');
            queryClient.invalidateQueries(['myClub']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to approve member');
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="avatar avatar-lg animate-pulse bg-gray-200"></div>
            </div>
        );
    }

    if (error || !response?.club) {
        return (
            <div className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto text-primary opacity-50 mb-4" />
                <h2 className="text-lg font-bold">No Club Assigned</h2>
                <p className="text-secondary mt-2">You are not currently assigned as an admin to any club.</p>
            </div>
        );
    }

    const club = response.club;
    const pendingRequests = club.pendingRequests || [];
    const members = club.members || [];
    const events = []; // Will fetch from eventService later

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
                            {club.name}
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
                    <Link to="/dashboard/chat" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                        <MessageCircle className="w-4 h-4" />
                        <span>Club Chat</span>
                    </Link>
                    <Link to="/dashboard/events/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        <Plus className="w-4 h-4" />
                        <span>Create Event</span>
                    </Link>
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
                    { label: 'Total Members', value: members.length, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
                    { label: 'Events', value: events.length, icon: Calendar, color: 'text-purple-500 bg-purple-500/10' },
                    { label: 'Pending Requests', value: pendingRequests.length, icon: UserPlus, color: 'text-orange-500 bg-orange-500/10' },
                    { label: 'Active Chats', value: 1, icon: MessageCircle, color: 'text-green-500 bg-green-500/10' },
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
                                {members.map((member) => {
                                    const user = member.user;
                                    if (!user) return null;
                                    return (
                                    <tr key={member._id} className="border-b border-primary/5 hover:bg-secondary/50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm">
                                                        {user.name?.[0] || user.profile?.firstName?.[0] || '?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-primary">
                                                        {user.name || `${user.profile?.firstName} ${user.profile?.lastName}`}
                                                    </p>
                                                    <p className="text-xs text-secondary">{user.email}</p>
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
                                            {new Date(member.joinedAt).toLocaleDateString()}
                                        </td>
                                        {isHead && (
                                            <td className="py-4 px-4 text-right">
                                                <button className="btn-ghost btn-icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                )})}
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
                            {pendingRequests.map((request) => {
                                const user = request.user;
                                if (!user) return null;
                                return (
                                <div key={request._id} className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <span className="text-white font-medium">{user.name?.[0] || '?'}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-primary">{user.name}</p>
                                            <p className="text-sm text-secondary">{request.message}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => approveMutation.mutate({ slug: club.slug, userId: user._id })}
                                            disabled={approveMutation.isPending}
                                        >
                                            Accept
                                        </button>
                                        <button className="btn btn-secondary btn-sm">Reject</button>
                                    </div>
                                </div>
                            )})}
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
                            <input type="text" defaultValue={club.name} className="input" />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Description</label>
                            <textarea rows={4} className="input" defaultValue={club.description} />
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
                            <div className="text-center py-4 text-secondary">
                                Activity feed coming soon...
                            </div>
                        </div>
                    </div>

                    <div className="glass-card">
                        <h2 className="text-lg font-bold font-display text-primary mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Create Event', icon: Plus, to: '/dashboard/events/create' },
                                { label: 'View Members', icon: Users, action: () => setActiveTab('members') },
                                { label: 'Club Chat', icon: MessageCircle, to: '/dashboard/chat' },
                                ...(isHead ? [{ label: 'Settings', icon: Settings, action: () => setActiveTab('settings') }] : []),
                            ].map((action, i) => {
                                if (action.to) {
                                    return (
                                        <Link key={i} to={action.to} className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors" style={{ textDecoration: 'none' }}>
                                            <action.icon className="w-5 h-5 text-indigo-500" />
                                            <span className="text-sm font-medium text-primary">{action.label}</span>
                                        </Link>
                                    );
                                }
                                return (
                                    <button onClick={action.action} key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors">
                                        <action.icon className="w-5 h-5 text-indigo-500" />
                                        <span className="text-sm font-medium text-primary">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
