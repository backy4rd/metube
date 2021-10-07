import React, { useEffect, useRef, useState } from 'react';

import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';

import Avatar from '@components/Avatar';
import { useAuth } from '@contexts/AuthContext';

import './LiveChatInput.css';

interface LiveChatInputProps {
  handleSubmit: (message: string) => any;
}

function LiveChatInput({ handleSubmit }: LiveChatInputProps) {
  const [message, setMessage] = useState<string>('');
  const isUnmounted = useRef(false);

  const setShowAuthForm = useSetShowAuthForm();
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
      onClick={user ? undefined : () => setShowAuthForm(true)}
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
        placeholder={user ? 'Tin nhắn...' : 'Đăng nhập để trò chuyện'}
        style={{ cursor: user ? 'text' : 'pointer' }}
        disabled={!user}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input className="LiveChatInput-Submit App-GreenButton" type="submit" value="Gửi »" />
    </form>
  );
}

export default LiveChatInput;
