import React, { useEffect, useRef, useState } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function _handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    await handleSubmit(content);
    if (isMounted.current) {
      setContent('');
      setSubmitting(false);
    }
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
            <div className="publish App-GreenButton" onClick={_handleSubmit}>
              {submitButtonText}
            </div>
            <div
              className="cancel App-GreyButton"
              onClick={() => {
                setContent('');
                handleCancel();
              }}
            >
              Hủy
            </div>

            <Spinner loading={submitting} className="commentInput-Spinner" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentInput;
