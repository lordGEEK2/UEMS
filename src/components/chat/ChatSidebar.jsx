import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Users, MessageCircle, Plus } from 'lucide-react';

export default function ChatSidebar({
    rooms,
    activeRoomId,
    onSelectRoom,
    onCreateRoom,
    loading = false,
}) {
    return (
        <div
            style={{
                width: 320,
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--surface)',
                height: '100%',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: 'var(--space-4)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2 style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                    <MessageCircle
                        size={20}
                        style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }}
                    />
                    Chats
                </h2>
                <button
                    onClick={onCreateRoom}
                    className="btn btn-ghost btn-icon-sm"
                    title="New Chat"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Room List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {loading ? (
                    // Skeleton loaders
                    [...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                padding: 'var(--space-3) var(--space-4)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                            }}
                        >
                            <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                            <div style={{ flex: 1 }}>
                                <div className="skeleton" style={{ width: '60%', height: 16, marginBottom: 8 }} />
                                <div className="skeleton" style={{ width: '80%', height: 12 }} />
                            </div>
                        </div>
                    ))
                ) : rooms.length === 0 ? (
                    <div
                        style={{
                            padding: 'var(--space-8)',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                        }}
                    >
                        <MessageCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                        <p>No chats yet</p>
                        <p style={{ fontSize: '0.8125rem', marginTop: 4 }}>
                            Start a new conversation!
                        </p>
                    </div>
                ) : (
                    rooms.map((room) => (
                        <ChatRoomItem
                            key={room._id}
                            room={room}
                            isActive={room._id === activeRoomId}
                            onClick={() => onSelectRoom(room)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function ChatRoomItem({ room, isActive, onClick }) {
    const lastMessage = room.lastMessage;
    const timeAgo = room.lastMessageAt
        ? formatDistanceToNow(new Date(room.lastMessageAt), { addSuffix: true })
        : '';

    const roomName = room.club?.name || room.name || 'Chat Room';
    const roomInitials = roomName
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <motion.div
            whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            style={{
                padding: 'var(--space-3) var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
                background: isActive ? 'var(--primary-50)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--primary-600)' : '3px solid transparent',
                transition: 'background 0.15s, border-color 0.15s',
            }}
        >
            {/* Avatar */}
            <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: room.type === 'club'
                        ? 'var(--primary-100)'
                        : 'var(--bg-tertiary)',
                    color: room.type === 'club'
                        ? 'var(--primary-600)'
                        : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    flexShrink: 0,
                }}
            >
                {room.type === 'club' ? <Users size={20} /> : roomInitials}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center justify-between">
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            color: 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {roomName}
                    </span>
                    <span
                        style={{
                            fontSize: '0.6875rem',
                            color: 'var(--text-muted)',
                            flexShrink: 0,
                            marginLeft: 8,
                        }}
                    >
                        {timeAgo}
                    </span>
                </div>
                <p
                    style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: 2,
                    }}
                >
                    {lastMessage?.content || 'No messages yet'}
                </p>
            </div>
        </motion.div>
    );
}
