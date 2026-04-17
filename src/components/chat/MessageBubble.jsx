import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message, isOwn, showAvatar = true }) {
    const time = format(new Date(message.createdAt), 'HH:mm');
    const senderName = message.sender?.profile
        ? `${message.sender.profile.firstName} ${message.sender.profile.lastName}`
        : 'Unknown';
    const initials = message.sender?.profile
        ? `${message.sender.profile.firstName?.[0] || ''}${message.sender.profile.lastName?.[0] || ''}`
        : '?';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-end gap-2 mb-3 ${isOwn ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            {showAvatar && !isOwn && (
                <div
                    className="avatar avatar-sm flex-shrink-0"
                    style={{ width: 32, height: 32, fontSize: 12 }}
                >
                    {initials}
                </div>
            )}
            {showAvatar && isOwn && <div style={{ width: 32 }} />}

            {/* Message Content */}
            <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                {/* Sender name (only for group chats, not own messages) */}
                {!isOwn && (
                    <span
                        className="text-xs"
                        style={{
                            color: 'var(--text-muted)',
                            marginBottom: 4,
                            display: 'block',
                            marginLeft: 12,
                        }}
                    >
                        {senderName}
                    </span>
                )}

                {/* Bubble */}
                <div
                    style={{
                        padding: '10px 14px',
                        borderRadius: isOwn
                            ? '18px 18px 4px 18px'
                            : '18px 18px 18px 4px',
                        background: isOwn
                            ? 'var(--primary-600)'
                            : 'var(--bg-secondary)',
                        color: isOwn ? 'white' : 'var(--text-primary)',
                        wordBreak: 'break-word',
                    }}
                >
                    <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.9375rem' }}>
                        {message.content}
                    </p>

                    {/* Time and read status */}
                    <div
                        className="flex items-center gap-1 justify-end"
                        style={{
                            marginTop: 4,
                            fontSize: '0.6875rem',
                            opacity: 0.7,
                        }}
                    >
                        <span>{time}</span>
                        {isOwn && (
                            message.readBy?.length > 1 ? (
                                <CheckCheck size={14} />
                            ) : (
                                <Check size={14} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
