import Avatar from '@components/Avatar';
import { useAuth } from '@contexts/AuthContext';
import React, { useEffect, useRef, useState } from 'react';

import './LiveChatInput.css';

interface LiveChatInputProps {
  handleSubmit: (message: string) => any;
}

function LiveChatInput({ handleSubmit }: LiveChatInputProps) {
  const [message, setMessage] = useState<string>('');
  const isUnmounted = useRef(false);

  const { user } = useAuth();

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return (
    <form
      className="LiveChatInput"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(message);
        if (!isUnmounted.current) setMessage('');
      }}
    >
      {user && <Avatar className="LiveChatInput-Avatar" user={user} size="28px" />}
      <input
        className="LiveChatInput-Message App-TextInput"
        type="text"
        placeholder="Tin nhắn..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input className="LiveChatInput-Submit App-GreenButton" type="submit" value="Gửi »" />
    </form>
  );
}

export default LiveChatInput;
