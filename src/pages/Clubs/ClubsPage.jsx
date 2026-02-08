import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { clubs, clubCategories, getClubsByCategory } from '../../data/clubs';

const categories = [
    { id: 'all', name: 'All Clubs' },
    ...Object.values(clubCategories),
];

export default function ClubsPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClubs = useMemo(() => {
        let result = clubs;

        if (activeCategory !== 'all') {
            result = result.filter((club) => club.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (club) =>
                    club.name.toLowerCase().includes(query) ||
                    club.coordinator.toLowerCase().includes(query)
            );
        }

        return result;
    }, [activeCategory, searchQuery]);

    const getCategoryCount = (id) => {
        if (id === 'all') return clubs.length;
        return getClubsByCategory(id).length;
    };

    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="section-header">
                    <h1 className="h1">Student Clubs</h1>
                    <p className="body-lg" style={{ marginTop: 'var(--space-2)', maxWidth: 560 }}>
                        Explore 70+ student-run clubs across technology, cultural, sports, and professional domains.
                    </p>
                </div>

                {/* Search */}
                <div style={{ maxWidth: 480, marginBottom: 'var(--space-6)' }}>
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
                            placeholder="Search clubs by name or coordinator..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 40 }}
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        flexWrap: 'wrap',
                        marginBottom: 'var(--space-8)',
                    }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {cat.icon && <span style={{ marginRight: 4 }}>{cat.icon}</span>}
                            {cat.name}
                            <span className="muted" style={{ marginLeft: 4 }}>({getCategoryCount(cat.id)})</span>
                        </button>
                    ))}
                </div>

                {/* Clubs Grid */}
                <div className="grid grid-4">
                    {filteredClubs.map((club) => (
                        <Link key={club.id} to={`/clubs/${club.id}`} className="card card-interactive">
                            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-3)' }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--bg-tertiary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        color: 'var(--primary-600)',
                                    }}
                                >
                                    {club.name[0]}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 className="h4 line-clamp-1">{club.name}</h3>
                                    <p className="muted" style={{ fontSize: 13 }}>
                                        {clubCategories[club.category]?.name || 'Club'}
                                    </p>
                                </div>
                            </div>
                            <p className="body-sm line-clamp-1">{club.coordinator}</p>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredClubs.length === 0 && (
                    <div className="empty-state">
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">No clubs found</h3>
                        <p className="empty-state-text">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
