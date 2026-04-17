import { motion } from 'framer-motion';

// Skeleton base component
const SkeletonBase = ({ style, className = '' }) => (
    <motion.div
        className={`skeleton ${className}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
            background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            borderRadius: 'var(--radius-md)',
            ...style,
        }}
    />
);

// Basic shapes
export function SkeletonText({ lines = 1, width = '100%' }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Array.from({ length: lines }).map((_, i) => (
                <SkeletonBase
                    key={i}
                    style={{
                        height: 14,
                        width: i === lines - 1 && lines > 1 ? '70%' : width,
                    }}
                />
            ))}
        </div>
    );
}

export function SkeletonCircle({ size = 40 }) {
    return (
        <SkeletonBase
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
            }}
        />
    );
}

export function SkeletonRect({ width = '100%', height = 100, radius = 'var(--radius-md)' }) {
    return (
        <SkeletonBase
            style={{
                width,
                height,
                borderRadius: radius,
            }}
        />
    );
}

// Pre-built skeleton patterns
export function SkeletonCard() {
    return (
        <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <SkeletonCircle size={48} />
                <div style={{ flex: 1 }}>
                    <SkeletonBase style={{ height: 16, width: '60%', marginBottom: 8 }} />
                    <SkeletonBase style={{ height: 12, width: '40%' }} />
                </div>
            </div>
            <SkeletonText lines={2} />
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <SkeletonBase style={{ height: 24, width: 60, borderRadius: 'var(--radius-full)' }} />
                <SkeletonBase style={{ height: 24, width: 80, borderRadius: 'var(--radius-full)' }} />
            </div>
        </div>
    );
}

export function SkeletonEventCard() {
    return (
        <div className="card">
            <SkeletonBase style={{ height: 24, width: 60, borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-3)' }} />
            <SkeletonBase style={{ height: 12, width: '30%', marginBottom: 'var(--space-2)' }} />
            <SkeletonBase style={{ height: 20, width: '80%', marginBottom: 'var(--space-2)' }} />
            <SkeletonText lines={2} />
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <SkeletonBase style={{ height: 14, width: 70 }} />
                <SkeletonBase style={{ height: 14, width: 60 }} />
                <SkeletonBase style={{ height: 14, width: 50 }} />
            </div>
        </div>
    );
}

export function SkeletonListItem() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-4)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
        }}>
            <SkeletonCircle size={48} />
            <div style={{ flex: 1 }}>
                <SkeletonBase style={{ height: 16, width: '50%', marginBottom: 8 }} />
                <SkeletonBase style={{ height: 12, width: '30%' }} />
            </div>
            <SkeletonBase style={{ height: 36, width: 100, borderRadius: 'var(--radius-md)' }} />
        </div>
    );
}

export function SkeletonStatCard() {
    return (
        <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <SkeletonBase style={{ height: 32, width: 60, marginBottom: 8 }} />
                    <SkeletonBase style={{ height: 14, width: 100 }} />
                </div>
                <SkeletonCircle size={48} />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
    return (
        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            {/* Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                background: 'var(--bg-secondary)',
            }}>
                {Array.from({ length: cols }).map((_, i) => (
                    <SkeletonBase key={i} style={{ height: 14 }} />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <div
                    key={rowIdx}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        borderTop: '1px solid var(--border-light)',
                    }}
                >
                    {Array.from({ length: cols }).map((_, colIdx) => (
                        <SkeletonBase
                            key={colIdx}
                            style={{
                                height: 14,
                                width: colIdx === 0 ? '80%' : '60%'
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default {
    Text: SkeletonText,
    Circle: SkeletonCircle,
    Rect: SkeletonRect,
    Card: SkeletonCard,
    EventCard: SkeletonEventCard,
    ListItem: SkeletonListItem,
    StatCard: SkeletonStatCard,
    Table: SkeletonTable,
};
