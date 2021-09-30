import React, { useEffect, useState } from 'react';

import IComment from '@interfaces/IComment';
import commentApi from '@api/commentApi';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import fulfillNewComment from '@utils/fulfillNewComment';

import Comment from '@components/Comment';
import CommentInput from '@components/CommentInput';
import Spinner from '@components/Spinner';

import './Comments.css';
import { useVideo } from '@contexts/VideoContext';

const step = 10;

function Comments() {
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [isLoadable, setIsLoadable] = useState(false);
  const [loading, setLoading] = useState(false);

  const video = useVideo();
  const { user } = useAuth();
  const pushMessage = usePushMessage();

  useEffect(() => {
    if (!video) return;
    setComments([]);
    setLoading(true);
    setIsLoadable(false);
    commentApi
      .getComments(video.id, { offset: 0, limit: step })
      .then((_comments) => {
        if (_comments.length >= step) setIsLoadable(true);
        setComments(_comments);
      })
      .finally(() => setLoading(false));
  }, [video]);

  async function loadComments() {
    if (!video) return;
    setLoading(true);
    const _comments = await commentApi.getComments(video.id, {
      offset: comments.length,
      limit: step,
    });
    if (_comments.length < step) setIsLoadable(false);
    setComments([...comments, ..._comments]);
    setLoading(false);
  }

  async function handleSubbmitNewComment(content: string) {
    if (!user || !video) return;
    try {
      let newComment = await commentApi.postComment(video.id, content);
      setComments([fulfillNewComment(newComment, user), ...comments]);
    } catch (err) {
      pushMessage('Bình luận không thành công!');
    }
  }

  async function handleRemoveComment(comment: IComment) {
    if (!video) return;
    try {
      await commentApi.removeComment(video.id, comment.id);
      setComments(comments.filter((c) => c !== comment));
    } catch (err) {
      pushMessage('Xóa bình luận không thành công!');
    }
  }

  if (!video) return null;
  return (
    <div className="Comments">
      {user && (
        <CommentInput
          className="Comments-Input"
          submitButtonText="Bình luận"
          handleSubmit={handleSubbmitNewComment}
        />
      )}

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          video={video}
          comment={comment}
          handleRemoveComment={handleRemoveComment}
        />
      ))}

      {isLoadable && !loading && (
        <div onClick={loadComments} className="App-BlueClickableText" style={{ marginTop: 6 }}>
          Hiển thị thêm bình luận »
        </div>
      )}
      <Spinner loading={loading} className="Comments-Spinner" />
    </div>
  );
}

export default Comments;
