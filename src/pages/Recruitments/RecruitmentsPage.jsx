import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, MapPin, Briefcase, ChevronRight } from 'lucide-react';

const mockRecruitments = [
    {
        id: 1,
        position: 'Web Developer',
        club: 'GDSC MITS',
        description: 'Looking for passionate web developers to build innovative projects.',
        skills: ['React', 'Node.js', 'TypeScript'],
        deadline: '2026-03-01',
        positions: 3,
        applications: 25,
        status: 'open',
    },
    {
        id: 2,
        position: 'Content Writer',
        club: 'Literary Society',
        description: 'Create engaging content for club events and social media.',
        skills: ['Writing', 'Editing', 'Creativity'],
        deadline: '2026-02-28',
        positions: 2,
        applications: 18,
        status: 'open',
    },
    {
        id: 3,
        position: 'Graphic Designer',
        club: 'Design Club',
        description: 'Design posters, banners, and digital content for events.',
        skills: ['Photoshop', 'Illustrator', 'Figma'],
        deadline: '2026-03-05',
        positions: 2,
        applications: 12,
        status: 'open',
    },
    {
        id: 4,
        position: 'Event Coordinator',
        club: 'Cultural Committee',
        description: 'Plan and execute cultural events and festivals.',
        skills: ['Event Planning', 'Communication', 'Leadership'],
        deadline: '2026-03-10',
        positions: 4,
        applications: 30,
        status: 'open',
    },
    {
        id: 5,
        position: 'Data Science Intern',
        club: 'The AI Club',
        description: 'Work on real-world ML projects and data analysis.',
        skills: ['Python', 'ML', 'Data Analysis'],
        deadline: '2026-02-20',
        positions: 2,
        applications: 45,
        status: 'closing_soon',
    },
];

export default function RecruitmentsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRecruitments = searchQuery.trim()
        ? mockRecruitments.filter(
            (r) =>
                r.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.club.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : mockRecruitments;

    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="section-header">
                    <h1 className="h1">Recruitments</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560 }}>
                        Find open positions across clubs and showcase your skills
                    </p>
                </div>

                {/* Search */}
                <div style={{ maxWidth: 480, marginBottom: 'var(--space-8)' }}>
                    <div style={{ position: 'relative' }}>
                        <Search
                            style={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 18,
                                height: 18,
                                color: 'var(--text-muted)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search positions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>
                </div>

                {/* Recruitments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {filteredRecruitments.map((recruitment) => (
                        <div key={recruitment.id} className="card">
                            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="h3">{recruitment.position}</h3>
                                        <span
                                            className={`badge ${recruitment.status === 'closing_soon' ? 'badge-warning' : 'badge-success'
                                                }`}
                                        >
                                            {recruitment.status === 'closing_soon' ? 'Closing Soon' : 'Open'}
                                        </span>
                                    </div>
                                    <p className="body-sm" style={{ marginBottom: 'var(--space-3)' }}>
                                        {recruitment.description}
                                    </p>
                                    <div className="flex gap-4" style={{ flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>
                                        <span className="flex items-center gap-2">
                                            <Briefcase style={{ width: 14, height: 14 }} />
                                            {recruitment.club}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar style={{ width: 14, height: 14 }} />
                                            Deadline:{' '}
                                            {new Date(recruitment.deadline).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </span>
                                        <span>{recruitment.positions} positions</span>
                                        <span>{recruitment.applications} applications</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary">
                                    Apply Now
                                    <ChevronRight style={{ width: 16, height: 16 }} />
                                </button>
                            </div>

                            {/* Skills */}
                            <div className="flex gap-2 mt-4" style={{ flexWrap: 'wrap' }}>
                                {recruitment.skills.map((skill) => (
                                    <span key={skill} className="badge">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredRecruitments.length === 0 && (
                    <div className="empty-state">
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No positions found</h3>
                        <p className="empty-state-text">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
