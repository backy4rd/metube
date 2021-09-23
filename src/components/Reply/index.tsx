import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Close } from '@material-ui/icons';

import IComment from '@interfaces/IComment';
import { timeDifference } from '@utils/time';
import { useVideo } from '@contexts/VideoContext';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import commentApi from '@api/commentApi';

import Avatar from '@components/Avatar';
import EllipsisText from '@components/EllipsisText';
import CommentLikeDislike from '@components/CommentLikeDislike';
import CommentInput from '@components/CommentInput';

import './Reply.css';

interface ReplyProps {
  reply: IComment;
  handleRemoveReply: (reply: IComment) => void;
}

function Reply({ reply, handleRemoveReply }: ReplyProps) {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(reply.content);

  const { user } = useAuth();
  const video = useVideo();
  const pushMessage = usePushMessage();

  async function handleUpdateReply(newContent: string) {
    try {
      await commentApi.updateComment(video.id, reply.id, newContent);
      setContent(newContent);
      reply.content = newContent;
    } catch (err) {
      pushMessage('Cập nhật trả lời không thành công!');
    } finally {
      setEditable(false);
    }
  }

  return (
    <div className="Reply">
      <Avatar className="Reply-Avatar" user={reply.user} size="30px" />
      <div className="Reply__Main">
        <div className="Reply__Main__Info">
          <Link className="Reply__Main__Info-Author" to={`/channel/${reply.user.username}`}>
            {reply.user.username} -
          </Link>
          <div className="Reply__Main__Info-CreatedAt">
            {timeDifference(new Date(), reply.createdAt)}
          </div>
        </div>

        {editable ? (
          <CommentInput
            submitButtonText="Cập nhật"
            defaultText={content}
            showButtonByDefault={true}
            showAvatar={false}
            autoFocus={true}
            handleSubmit={handleUpdateReply}
            handleCancel={() => setEditable(false)}
            className="Reply-Input"
          />
        ) : (
          <EllipsisText
            text={content || ''}
            lines={3}
            ellipsis={<div className="SidebarGroup-Toggle">show more »</div>}
          />
        )}

        <div className="Reply__Main__Buttons">
          <CommentLikeDislike comment={reply} />
        </div>
      </div>

      {user && (
        <div className="Reply__Buttons">
          {user.username === reply.user.username && (
            <Edit className="Reply__Buttons-Remove" onClick={() => setEditable(!editable)} />
          )}
          {(user.username === reply.user.username ||
            user.username === video.uploadedBy.username) && (
            <Close className="Reply__Buttons-Remove" onClick={() => handleRemoveReply(reply)} />
          )}
        </div>
      )}
    </div>
  );
}

export default Reply;
