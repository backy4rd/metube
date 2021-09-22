import React, { useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';

import { useAuth } from '@contexts/AuthContext';

import Avatar from '@components/Avatar';
import Spinner from '@components/Spinner';

import './CommentInput.css';

type Props = {
  handleSubmit: (content: string) => Promise<void>;
  submitButtonText: string;
  avatarSize?: string;
  handleCancel?: () => void;
  autoFocus?: boolean;
  showAvatar?: boolean;
  showButtonByDefault?: boolean;
  defaultText?: string;
  className?: string;
};

function CommentInput({
  handleSubmit,
  submitButtonText,
  handleCancel = () => {},
  autoFocus = false,
  showAvatar = true,
  showButtonByDefault = false,
  defaultText = '',
  avatarSize = '40px',
  className = '',
}: Props) {
  const [content, setContent] = useState(defaultText);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function _handleSubmit() {
    setLoading(true);
    await handleSubmit(content);
    setContent('');
    setLoading(false);
  }

  if (!user) return null;
  return (
    <div className={`commentInput ${className}`}>
      {showAvatar && <Avatar className="commnetInput-Avatar" user={user} size={avatarSize} />}
      <div className="commentInput__input">
        <TextareaAutosize
          placeholder="bình luận công khai..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus={!!autoFocus}
        />
        {(content !== '' || showButtonByDefault) && (
          <div className="buttons">
            <div className="publish" onClick={_handleSubmit}>
              {submitButtonText}
            </div>
            <div
              className="cancel"
              onClick={() => {
                setContent('');
                handleCancel();
              }}
            >
              Hủy
            </div>

            <Spinner loading={loading} className="commentInput-Spinner" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentInput;
