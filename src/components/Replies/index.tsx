import React, { useState } from 'react';

import IVideo from '@interfaces/IVideo';
import IComment from '@interfaces/IComment';
import commentApi from '@api/commentApi';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import fulfillNewComment from '@utils/fulfillNewComment';

import Reply from '@components/Reply';
import Spinner from '@components/Spinner';
import CommentInput from '@components/CommentInput';

import './Replies.css';

interface RepliesProps {
  video: IVideo;
  comment: IComment;
  replying: boolean;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

const step = 2;

function Replies({ video, comment, replying, setReplying }: RepliesProps) {
  const [replies, setReplies] = useState<Array<IComment>>([]);
  const [isLoadable, setIsLoadable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const pushMessage = usePushMessage();

  async function loadReplies() {
    setLoading(true);
    const _replies = await commentApi.getCommentReplies(video.id, comment.id, {
      offset: replies.length,
      limit: step,
    });
    setIsLoadable(_replies.length === step);
    setReplies([...replies, ..._replies]);
    setLoading(false);
  }

  async function handleReplyComment(content: string) {
    if (!user) return;
    try {
      let reply = await commentApi.replyComment(video.id, comment.id, content);
      comment.totalReplies++;
      setReplies([fulfillNewComment(reply, user), ...replies]);
    } catch (err) {
      pushMessage('Gửi trả lời không thành công!');
    } finally {
      setReplying(false);
    }
  }

  async function handleRemoveReply(reply: IComment) {
    try {
      await commentApi.removeComment(video.id, reply.id);
      comment.totalReplies--;
      setReplies(replies.filter((c) => c !== reply));
    } catch (err) {
      pushMessage('Xóa trả lời không thành công!');
    }
  }

  return (
    <div className="Replies">
      {comment.totalReplies > 0 && replies.length === 0 && !loading && (
        <div className="App-BlueClickableText" onClick={loadReplies}>
          {comment.totalReplies} Trả lời »
        </div>
      )}

      {replies.length > 0 && (
        <div className="App-BlueClickableText" onClick={() => setReplies([])}>
          Ẩn tất cả trả lời «
        </div>
      )}

      {(replies.length > 0 || replying || loading) && (
        <div className="Replies__Main">
          {replying && (
            <CommentInput
              handleSubmit={handleReplyComment}
              handleCancel={() => setReplying(false)}
              submitButtonText="Trả lời"
              avatarSize="30px"
              showButtonByDefault
              autoFocus
            />
          )}

          {replies.map((reply) => (
            <Reply
              key={reply.id}
              video={video}
              reply={reply}
              handleRemoveReply={handleRemoveReply}
            />
          ))}

          {isLoadable && !loading && (
            <div onClick={loadReplies} className="App-BlueClickableText">
              Hiển thị thêm trả lời »
            </div>
          )}

          <Spinner loading={loading} className="Replies-Spinner" />
        </div>
      )}
    </div>
  );
}

export default Replies;
