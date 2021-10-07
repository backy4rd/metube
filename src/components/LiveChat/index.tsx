import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import { useAuth } from '@contexts/AuthContext';
import generateSkeletons from '@utils/generateSkeleton';

import LiveMessage, { ILiveMessage } from './LiveMessage';
import LiveChatInput from './LiveChatInput';

import './LiveChat.css';

interface LiveChatProps {
  streamId: string;
  className?: string;
  handleLiveCountChange?: (liveCount: number) => void;
}

function LiveChat({ streamId, className, handleLiveCountChange = () => {} }: LiveChatProps) {
  const [messages, setMessages] = useState<Array<ILiveMessage | ISkeleton>>(generateSkeletons(7));
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user === undefined) return;

    const socket = io(process.env.REACT_APP_CHAT_HOST || 'http://127.0.0.1', {
      path: process.env.REACT_APP_CHAT_PATH,
      auth: { room: streamId, token: user?.token },
    });
    setMessages([]);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [streamId, user]);

  useEffect(() => {
    if (!socket) return;

    socket.on('old messages', (_msgs) => setMessages((msgs) => [...msgs, ..._msgs.reverse()]));
    socket.on('live count', handleLiveCountChange);
    socket.on('new message', (msg) => setMessages((msgs) => [msg, ...msgs]));
    // eslint-disable-next-line
  }, [socket]);

  function handleSendMessage(message: string) {
    if (!socket || !message) return;
    socket.emit('message', message);
  }

  return (
    <div className={`LiveChat ${className || ''}`}>
      <div className="LiveChat-Header">STREAM LIVE CHAT</div>
      <div ref={messagesRef} id="LiveChat__Messages">
        {messages.map((mess) => (
          <LiveMessage
            key={isSkeleton(mess) ? mess.bone : mess.user.username + mess.timestamp}
            className="LCM-LiveMessage"
            message={mess}
          />
        ))}
      </div>
      <LiveChatInput handleSubmit={handleSendMessage} />
    </div>
  );
}

export default LiveChat;
