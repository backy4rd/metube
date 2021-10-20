import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Close, Edit } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import IComment from '@interfaces/IComment';
import commentApi from '@api/commentApi';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { timeDifference } from '@utils/time';

import Avatar from '@components/Avatar';
import Replies from '@components/Replies';
import EllipsisText from '@components/EllipsisText';
import CommentInput from '@components/CommentInput';
import CommentLikeDislike from '@components/CommentLikeDislike';

import './Comment.css';

interface CommentProps {
  comment: IComment;
  video: IVideo;
  handleRemoveComment: (comment: IComment) => Promise<void>;
}

function Comment({ video, comment, handleRemoveComment }: CommentProps) {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);

  const { user } = useAuth();
  const pushMessage = usePushMessage();
  const setShowAuthForm = useSetShowAuthForm();
  const { showConfirm } = useShowConfirm();

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
      pushMessage('Cập nhật bình luận không thành công!', 'error');
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
            {comment.user.username}
          </Link>
          <div className="Comment__Main__Info-CreatedAt">
            {' — '}
            {timeDifference(new Date(), comment.createdAt)}
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
          <CommentLikeDislike video={video} comment={comment} />
          <div className="Comment__Main__Buttons-Reply" onClick={handleReplyClick}>
            Trả lời
          </div>
        </div>

        <Replies video={video} comment={comment} replying={replying} setReplying={setReplying} />
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
              onClick={() =>
                showConfirm('Bạn có thực sự muốn xóa bình luận này không?', () =>
                  handleRemoveComment(comment).catch(() =>
                    pushMessage('Xóa bình luận không thành công!', 'error')
                  )
                )
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
