import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Phone, Video, Users } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';
import ChatSidebar from '../../components/chat/ChatSidebar';
import MessageBubble from '../../components/chat/MessageBubble';
import MessageInput from '../../components/chat/MessageInput';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ChatPage() {
    const { user, token } = useAuthStore();
    const [socket, setSocket] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const messagesEndRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        if (!token) return;

        const newSocket = io(API_URL, {
            auth: { token },
        });

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on('newMessage', (message) => {
            setMessages((prevMessages) => {
                // Only add if it belongs to the *currently active* room
                if (activeRoom && message.chatRoom === activeRoom._id) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
            // Update room's last message
            setRooms((prev) =>
                prev.map((room) =>
                    room._id === message.chatRoom
                        ? { ...room, lastMessage: message, lastMessageAt: message.createdAt }
                        : room
                )
            );
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token, activeRoom]); // added activeRoom to deps for message closure 

    // Fetch rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${API_URL}/api/chat/rooms`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    setRooms(data.rooms);
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoadingRooms(false);
            }
        };

        if (token) {
            fetchRooms();
        }
    }, [token]);

    // Fetch messages and handle room join when room changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeRoom) return;
            setLoadingMessages(true);

            try {
                const response = await fetch(
                    `${API_URL}/api/chat/rooms/${activeRoom._id}/messages`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = await response.json();
                if (data.success) {
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();

        // Join room via socket
        if (socket && activeRoom) {
            socket.emit('join_room', activeRoom._id);
        }
    }, [activeRoom, token, socket]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = useCallback(
        async (content) => {
            if (!activeRoom || !content.trim()) return;

            try {
                const response = await fetch(
                    `${API_URL}/api/chat/rooms/${activeRoom._id}/messages`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ content }),
                    }
                );
                const data = await response.json();
                if (data.success) {
                    // Message will be added via socket event
                    socket?.emit('sendMessage', {
                        roomId: activeRoom._id,
                        message: data.message,
                    });
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
        [activeRoom, token, socket]
    );

    const handleSelectRoom = (room) => {
        setActiveRoom(room);
        setShowSidebar(false); // Hide sidebar on mobile
    };

    const handleCreateRoom = () => {
        // TODO: Open create room modal
        console.log('Create room clicked');
    };

    return (
        <div
            style={{
                display: 'flex',
                height: 'calc(100vh - 120px)',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
            }}
        >
            {/* Sidebar */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.div
                        initial={{ x: -320 }}
                        animate={{ x: 0 }}
                        exit={{ x: -320 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="hide-mobile-full"
                        style={{ display: 'flex' }}
                    >
                        <ChatSidebar
                            rooms={rooms}
                            activeRoomId={activeRoom?._id}
                            onSelectRoom={handleSelectRoom}
                            onCreateRoom={handleCreateRoom}
                            loading={loadingRooms}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {activeRoom ? (
                    <>
                        {/* Chat Header */}
                        <div
                            style={{
                                padding: 'var(--space-3) var(--space-4)',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                                background: 'var(--surface)',
                            }}
                        >
                            {/* Back button (mobile) */}
                            <button
                                onClick={() => setShowSidebar(true)}
                                className="btn btn-ghost btn-icon-sm hide-desktop"
                            >
                                <ArrowLeft size={20} />
                            </button>

                            {/* Room Avatar */}
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'var(--primary-100)',
                                    color: 'var(--primary-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Users size={18} />
                            </div>

                            {/* Room Info */}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                                    {activeRoom.club?.name || activeRoom.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {activeRoom.participants?.length || 0} participants
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <button className="btn btn-ghost btn-icon-sm">
                                    <Phone size={18} />
                                </button>
                                <button className="btn btn-ghost btn-icon-sm">
                                    <Video size={18} />
                                </button>
                                <button className="btn btn-ghost btn-icon-sm">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: 'var(--space-4)',
                                background: 'var(--bg-primary)',
                            }}
                        >
                            {loadingMessages ? (
                                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
                                    Loading messages...
                                </div>
                            ) : messages.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <MessageBubble
                                        key={msg._id}
                                        message={msg}
                                        isOwn={msg.sender?._id === user?.id}
                                        showAvatar={
                                            i === 0 ||
                                            messages[i - 1]?.sender?._id !== msg.sender?._id
                                        }
                                    />
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <MessageInput onSend={handleSendMessage} />
                    </>
                ) : (
                    // No room selected
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)',
                            padding: 'var(--space-8)',
                        }}
                    >
                        <Users size={64} style={{ opacity: 0.3, marginBottom: 'var(--space-4)' }} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
                            Welcome to Chat
                        </h3>
                        <p style={{ maxWidth: 300, textAlign: 'center' }}>
                            Select a conversation from the sidebar or start a new chat with your
                            club members.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
