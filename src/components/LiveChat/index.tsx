import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '@contexts/AuthContext';
import generateSkeletons from '@utils/generateSkeleton';

import LiveMessage, { ILiveMessage } from './LiveMessage';
import LiveChatInput from './LiveChatInput';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';

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
  const isAtBottom = useRef(true);

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

    socket.on('old messages', (_msgs) => setMessages((msgs) => [..._msgs, ...msgs]));
    socket.on('live count', handleLiveCountChange);
    socket.on('new message', (msg) => setMessages((msgs) => [...msgs, msg]));
    // eslint-disable-next-line
  }, [socket]);

  useLayoutEffect(() => {
    if (!messagesRef.current) return;
    if (isAtBottom.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (!messagesRef.current) return;
    const scrollTarget = messagesRef.current;

    function handleScroll(e: Event) {
      const element = e.target as HTMLDivElement;
      isAtBottom.current =
        element.scrollHeight - Math.round(element.scrollTop) === element.clientHeight;
    }

    scrollTarget.addEventListener('scroll', handleScroll);
    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
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
