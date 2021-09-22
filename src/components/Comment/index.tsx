import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Close, Edit } from '@material-ui/icons';

import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import IComment from '@interfaces/IComment';
import { timeDifference } from '@utils/time';
import commentApi from '@api/commentApi';

import Avatar from '@components/Avatar';
import Replies from '@components/Replies';
import EllipsisText from '@components/EllipsisText';
import CommentInput from '@components/CommentInput';
import CommentLikeDislike from '@components/CommentLikeDislike';

import './Comment.css';

interface CommentProps {
  comment: IComment;
  handleRemoveComment: (comment: IComment) => void;
}

function Comment({ comment, handleRemoveComment }: CommentProps) {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);

  const { user } = useAuth();
  const video = useVideo();
  const pushMessage = usePushMessage();
  const setShowAuthForm = useSetShowAuthForm();

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  function handleReplyClick() {
    if (!user) setShowAuthForm(true);
    else setReplying(!replying);
  }

  async function handleUpdateComment(newContent: string) {
    try {
      await commentApi.updateComment(video.id, comment.id, newContent);
      setContent(newContent);
      comment.content = newContent;
    } catch (err) {
      pushMessage('Cập nhật bình luận không thành công!');
    } finally {
      setEditable(false);
    }
  }

  return (
    <div className="Comment">
      <Avatar className="Comment-Avatar" user={comment.user} size="40px" />
      <div className="Comment__Main">
        <div className="Comment__Main__Info">
          <Link className="Comment__Main__Info-Author" to={`/channel/${comment.user.username}`}>
            {comment.user.username} -
          </Link>
          <div className="Comment__Main__Info-CreatedAt">
            {timeDifference(new Date(), new Date(comment.createdAt))}
          </div>
        </div>

        {editable ? (
          <CommentInput
            submitButtonText="Cập nhật"
            defaultText={content}
            showButtonByDefault={true}
            showAvatar={false}
            autoFocus={true}
            handleSubmit={handleUpdateComment}
            handleCancel={() => setEditable(false)}
          />
        ) : (
          <EllipsisText
            text={content || ''}
            lines={3}
            ellipsis={<div className="SidebarGroup-Toggle">show more »</div>}
          />
        )}

        <div className="Comment__Main__Buttons">
          <CommentLikeDislike comment={comment} />
          <div className="Comment__Main__Buttons-Reply" onClick={handleReplyClick}>
            Trả lời
          </div>
        </div>

        <Replies comment={comment} replying={replying} setReplying={setReplying} />
      </div>

      {user && (
        <div className="Comment__Buttons">
          {user.username === comment.user.username && (
            <Edit className="Comment__Buttons-Remove" onClick={() => setEditable(!editable)} />
          )}
          {(user.username === comment.user.username ||
            user.username === video.uploadedBy.username) && (
            <Close
              className="Comment__Buttons-Remove"
              onClick={() => handleRemoveComment(comment)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
