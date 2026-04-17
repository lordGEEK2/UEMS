import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, Clock, MapPin, Users, DollarSign, Image,
    Plus, X, Save, ArrowLeft, Tag, FileText
} from 'lucide-react';
import { toast } from '../../components/ui/Toast';
import { eventService } from '../../services/eventService';

const categories = [
    'Technical', 'Cultural', 'Sports', 'Workshop',
    'Seminar', 'Competition', 'Fest', 'Other'
];

export default function EventCreatePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        capacity: '',
        registrationFee: '0',
        isFree: true,
        tags: [],
        thumbnail: null,
        club: '',
    });

    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validation
            if (!formData.title || !formData.date || !formData.venue || !formData.category) {
                toast.error('Missing Fields', 'Please fill in all required fields');
                return;
            }

            const response = await eventService.createEvent({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                venue: formData.venue,
                capacity: formData.capacity ? Number(formData.capacity) : 0,
                registrationFee: !formData.isFree ? Number(formData.registrationFee) : 0,
                tags: formData.tags,
                clubRef: formData.club
            });

            if (response.success) {
                toast.success('Event Created', 'Your event has been created successfully');
                navigate('/dashboard/events');
            }
        } catch (error) {
            toast.error('Creation Failed', error.response?.data?.message || 'Could not create event');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-content">
            <div className="container" style={{ maxWidth: 800 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 'var(--space-6)' }}
                >
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate(-1)}
                        style={{ marginBottom: 'var(--space-4)' }}
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>
                        Create New Event
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                        Fill in the details to create a new event
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    style={{
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-6)',
                        border: '1px solid var(--border)'
                    }}
                >
                    {/* Basic Info */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <FileText size={18} /> Basic Information
                        </h3>

                        <div className="form-group">
                            <label className="label">Event Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter event title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input"
                                rows={4}
                                placeholder="Describe your event..."
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                            <div className="form-group">
                                <label className="label">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="label">Organizing Club</label>
                                <select
                                    name="club"
                                    value={formData.club}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="">Select club</option>
                                    <option value="gdsc">GDSC MITS</option>
                                    <option value="asimov">ASIMOV Robotics</option>
                                    <option value="ai-club">The AI Club</option>
                                    <option value="bandish">Bandish Music Club</option>
                                    <option value="dance">Dance Club</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Date & Time */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Calendar size={18} /> Date & Time
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                            <div className="form-group">
                                <label className="label">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Venue & Capacity */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <MapPin size={18} /> Venue & Capacity
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                            <div className="form-group">
                                <label className="label">Venue *</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., Auditorium, Room 101"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">Capacity</label>
                                <div className="input-with-icon">
                                    <Users size={18} className="input-icon" />
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Max attendees"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Registration */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <DollarSign size={18} /> Registration
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="isFree"
                                    checked={formData.isFree}
                                    onChange={handleChange}
                                />
                                <span>Free Event</span>
                            </label>
                        </div>

                        {!formData.isFree && (
                            <div className="form-group" style={{ maxWidth: 200 }}>
                                <label className="label">Registration Fee (₹)</label>
                                <input
                                    type="number"
                                    name="registrationFee"
                                    value={formData.registrationFee}
                                    onChange={handleChange}
                                    className="input"
                                    min="0"
                                />
                            </div>
                        )}
                    </section>

                    {/* Tags */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Tag size={18} /> Tags
                        </h3>

                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                className="input"
                                placeholder="Add a tag and press Enter"
                                style={{ flex: 1 }}
                            />
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={handleAddTag}
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                            {formData.tags.map(tag => (
                                <motion.span
                                    key={tag}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="badge badge-secondary"
                                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 2,
                                            display: 'flex'
                                        }}
                                    >
                                        <X size={12} />
                                    </button>
                                </motion.span>
                            ))}
                        </div>
                    </section>

                    {/* Thumbnail */}
                    <section style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Image size={18} /> Event Image
                        </h3>

                        <div
                            style={{
                                border: '2px dashed var(--border)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--space-8)',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s',
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <Image size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }} />
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                                Drag and drop an image or click to browse
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="thumbnail-upload"
                            />
                            <label htmlFor="thumbnail-upload" className="btn btn-outline btn-sm">
                                Choose File
                            </label>
                        </div>
                    </section>

                    {/* Actions */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 'var(--space-3)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--border)'
                    }}>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                        >
                            <Save size={18} />
                            {isSubmitting ? 'Creating...' : 'Create Event'}
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
