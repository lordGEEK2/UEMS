import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, Users } from 'lucide-react';
import { useAuthStore } from '../../hooks/useStore';
import { chatService } from '../../services/chatService';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ClubChatPanel({ clubId }) {
    const { user, token } = useAuthStore();
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // 1. Fetch Room & Connect Socket
    useEffect(() => {
        let newSocket;

        const initChat = async () => {
            try {
                setLoading(true);
                // Fetch the specific chat room for this club
                const data = await chatService.getRoomByClub(clubId);
                if (data.success && data.room) {
                    setRoom(data.room);
                    
                    // Fetch message history
                    const history = await chatService.getMessages(data.room._id);
                    if (history.success) {
                        setMessages(history.messages);
                        setTimeout(() => scrollToBottom(), 100);
                    }

                    // Setup Socket connection
                    newSocket = io(API_URL, {
                        auth: { token },
                    });

                    newSocket.on('connect', () => {
                        newSocket.emit('join_room', data.room._id);
                    });

                    newSocket.on('newMessage', (message) => {
                        if (message.chatRoom === data.room._id) {
                            setMessages((prev) => [...prev, message]);
                            setTimeout(() => scrollToBottom(), 100);
                        }
                    });

                    setSocket(newSocket);
                }
            } catch (err) {
                console.error('Failed to load club chat:', err);
                setError(err.response?.data?.message || 'Failed to load chat');
            } finally {
                setLoading(false);
            }
        };

        if (token && clubId) {
            initChat();
        }

        return () => {
            if (newSocket) {
                if (room) newSocket.emit('leave_room', room._id);
                newSocket.disconnect();
            }
        };
    }, [clubId, token]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = useCallback(async (content) => {
        if (!room || !content.trim()) return;

        try {
            const data = await chatService.sendMessage(room._id, content);
            if (data.success && socket) {
                socket.emit('sendMessage', {
                    roomId: room._id,
                    message: data.message,
                });
                // Local state update is handled by the socket listener
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    }, [room, socket]);

    if (loading) {
        return (
            <div className="card text-center p-8">
                <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%', margin: '0 auto 16px' }} />
                <p className="text-muted">Loading club chat...</p>
            </div>
        );
    }

    if (error || !room) {
        return (
            <div className="empty-state">
                <MessageCircle className="empty-state-icon" />
                <h3 className="empty-state-title">Club Chat Unavailable</h3>
                <p className="empty-state-text text-red-500">{error || "You are not a member of this chat room"}</p>
            </div>
        );
    }

    return (
        <div className="card flex flex-col p-0 overflow-hidden" style={{ height: '600px' }}>
            {/* Embedded Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
                <div className="avatar avatar-sm bg-primary-100 text-primary-600">
                    <Users size={16} />
                </div>
                <div>
                    <h3 className="font-semibold text-sm m-0">Members Chat Room</h3>
                    <p className="text-xs text-muted m-0">{room.participants?.length || 0} participants</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-white" style={{ scrollBehavior: 'smooth' }}>
                {messages.length === 0 ? (
                    <div className="empty-state py-12">
                        <MessageCircle className="empty-state-icon" style={{ width: 32, height: 32, opacity: 0.3 }} />
                        <p className="text-sm text-muted">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <MessageBubble
                            key={msg._id}
                            message={msg}
                            isOwn={msg.sender?._id === user?.id}
                            showAvatar={i === 0 || messages[i - 1]?.sender?._id !== msg.sender?._id}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t">
                <MessageInput onSend={handleSendMessage} />
            </div>
        </div>
    );
}
