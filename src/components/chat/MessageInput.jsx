import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

export default function MessageInput({ onSend, disabled = false }) {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || disabled) return;

        onSend(trimmed);
        setMessage('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                borderTop: '1px solid var(--border)',
                background: 'var(--surface)',
            }}
        >
            {/* Emoji Button */}
            <button
                type="button"
                className="btn btn-ghost btn-icon-sm"
                title="Emoji"
                style={{ color: 'var(--text-muted)' }}
            >
                <Smile size={20} />
            </button>

            {/* Attach Button */}
            <button
                type="button"
                className="btn btn-ghost btn-icon-sm"
                title="Attach file"
                style={{ color: 'var(--text-muted)' }}
            >
                <Paperclip size={20} />
            </button>

            {/* Input */}
            <div style={{ flex: 1, position: 'relative' }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={disabled}
                    className="input"
                    style={{
                        width: '100%',
                        borderRadius: 'var(--radius-full)',
                        paddingRight: 'var(--space-4)',
                    }}
                />
            </div>

            {/* Send / Voice Button */}
            {message.trim() ? (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={disabled}
                    className="btn btn-primary btn-icon"
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        padding: 0,
                    }}
                >
                    <Send size={20} />
                </motion.button>
            ) : (
                <button
                    type="button"
                    className="btn btn-ghost btn-icon"
                    title="Voice message"
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        color: 'var(--text-muted)',
                    }}
                >
                    <Mic size={20} />
                </button>
            )}
        </form>
    );
}
