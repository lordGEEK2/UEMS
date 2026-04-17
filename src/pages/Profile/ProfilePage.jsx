import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, Calendar, MapPin, Building2,
    Camera, Save, Edit3, X, Shield, Bell, Lock, Palette
} from 'lucide-react';
import { useAuthStore, useThemeStore } from '../../hooks/useStore';
import { toast } from '../../components/ui/Toast';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ProfilePage() {
    const { user } = useAuthStore();
    const { theme, setTheme } = useThemeStore();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [formData, setFormData] = useState({
        firstName: user?.profile?.firstName || '',
        lastName: user?.profile?.lastName || '',
        phone: user?.profile?.phone || '',
        department: user?.profile?.department || '',
        year: user?.profile?.year || '',
        bio: user?.profile?.bio || '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = async () => {
        try {
            // API call to save profile
            // await api.put('/users/profile', formData);
            toast.success('Profile Updated', 'Your profile has been updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Update Failed', 'Could not update profile');
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    return (
        <div className="page-content">
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-8)' }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>
                        Account Settings
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                        Manage your profile and preferences
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)' }}>
                    {/* Sidebar Tabs */}
                    <motion.div variants={itemVariants}>
                        <nav style={{
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-2)',
                            border: '1px solid var(--border)'
                        }}>
                            {tabs.map(tab => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-3)',
                                        width: '100%',
                                        padding: 'var(--space-3) var(--space-4)',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'var(--primary-50)' : 'transparent',
                                        color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                                        fontWeight: activeTab === tab.id ? 600 : 400,
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        marginBottom: 'var(--space-1)',
                                    }}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-6)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        {activeTab === 'profile' && (
                            <div>
                                {/* Profile Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: 'var(--space-6)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div
                                                className="avatar avatar-xl"
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    fontSize: '1.5rem',
                                                    background: 'var(--primary-100)',
                                                    color: 'var(--primary-600)',
                                                }}
                                            >
                                                {formData.firstName?.[0] || 'U'}{formData.lastName?.[0] || ''}
                                            </div>
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: '50%',
                                                    background: 'var(--primary-600)',
                                                    color: 'white',
                                                    border: '2px solid var(--surface)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Camera size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <h2 style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                                                {formData.firstName} {formData.lastName}
                                            </h2>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                <X size={16} /> Cancel
                                            </button>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={handleSave}
                                            >
                                                <Save size={16} /> Save Changes
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <Edit3 size={16} /> Edit Profile
                                        </button>
                                    )}
                                </div>

                                {/* Profile Form */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 'var(--space-4)'
                                }}>
                                    <div className="form-group">
                                        <label className="label">First Name</label>
                                        <div className="input-with-icon">
                                            <User size={18} className="input-icon" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="label">Last Name</label>
                                        <div className="input-with-icon">
                                            <User size={18} className="input-icon" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="label">Phone Number</label>
                                        <div className="input-with-icon">
                                            <Phone size={18} className="input-icon" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="label">Department</label>
                                        <div className="input-with-icon">
                                            <Building2 size={18} className="input-icon" />
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="input"
                                            >
                                                <option value="">Select Department</option>
                                                <option value="CSE">Computer Science & Engineering</option>
                                                <option value="CSBS">Computer Science & Business Systems</option>
                                                <option value="IT">Information Technology</option>
                                                <option value="ECE">Electronics & Communication</option>
                                                <option value="EE">Electrical Engineering</option>
                                                <option value="ME">Mechanical Engineering</option>
                                                <option value="CE">Civil Engineering</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="label">Year of Study</label>
                                        <div className="input-with-icon">
                                            <Calendar size={18} className="input-icon" />
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="input"
                                            >
                                                <option value="">Select Year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label className="label">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="input"
                                            rows={3}
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>

                                {/* Role Badge */}
                                <div style={{
                                    marginTop: 'var(--space-6)',
                                    padding: 'var(--space-4)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)'
                                }}>
                                    <Shield size={20} style={{ color: 'var(--primary-600)' }} />
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Account Type</p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                                            {user?.role || 'Student'} Account
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                    Security Settings
                                </h3>

                                <div style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--space-3)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>Change Password</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                Update your password regularly for security
                                            </p>
                                        </div>
                                        <button className="btn btn-outline btn-sm">Change</button>
                                    </div>
                                </div>

                                <div style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>Two-Factor Authentication</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                Add an extra layer of security
                                            </p>
                                        </div>
                                        <button className="btn btn-outline btn-sm">Enable</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                    Notification Preferences
                                </h3>

                                {[
                                    { label: 'Email Notifications', desc: 'Receive updates via email' },
                                    { label: 'Event Reminders', desc: 'Get reminded before events' },
                                    { label: 'Club Updates', desc: 'Updates from clubs you follow' },
                                    { label: 'Recruitment Alerts', desc: 'New recruitment postings' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: 'var(--space-4)',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: 'var(--space-3)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{item.label}</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                    Theme Settings
                                </h3>

                                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                    {[
                                        { id: 'light', label: 'Light', emoji: '☀️' },
                                        { id: 'dark', label: 'Dark', emoji: '🌙' },
                                        { id: 'system', label: 'System', emoji: '💻' },
                                    ].map(option => (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setTheme(option.id)}
                                            style={{
                                                flex: 1,
                                                padding: 'var(--space-4)',
                                                background: theme === option.id ? 'var(--primary-50)' : 'var(--bg-secondary)',
                                                border: theme === option.id ? '2px solid var(--primary-600)' : '2px solid transparent',
                                                borderRadius: 'var(--radius-lg)',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-2)' }}>
                                                {option.emoji}
                                            </span>
                                            <p style={{ fontWeight: 600 }}>{option.label}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
