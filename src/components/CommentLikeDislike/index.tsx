import React, { useEffect, useRef, useState } from 'react';
import { ThumbUpOutlined, ThumbDownOutlined, ThumbUp, ThumbDown } from '@material-ui/icons';

import commentApi from '@api/commentApi';
import IComment from '@interfaces/IComment';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';

import './CommentLikeDislike.css';

interface CommentLikeDislikeProps {
  comment: IComment;
}

function CommentLikeDislike({ comment }: CommentLikeDislikeProps) {
  const [react, setReact] = useState<null | boolean>(comment.react);
  const [like, setLike] = useState<number>(comment.like);
  const [dislike, setDislike] = useState<number>(comment.dislike);
  const reacting = useRef(false);

  const { user } = useAuth();
  const video = useVideo();
  const setShowAuthForm = useSetShowAuthForm();

  useEffect(() => {
    setLike(comment.like);
    setDislike(comment.dislike);
    setReact(comment.react);
  }, [comment]);

  async function doReact(action: 'like' | 'dislike' | 'remove') {
    if (!user) return setShowAuthForm(true);
    if (reacting.current === true) return;

    reacting.current = true;
    switch (action) {
      case 'like':
        await commentApi.reactComment(video.id, comment.id, true);
        if (react === false) setDislike(dislike - 1);
        setLike(like + 1);
        setReact(true);
        break;

      case 'dislike':
        await commentApi.reactComment(video.id, comment.id, false);
        if (react === true) setLike(like - 1);
        setDislike(dislike + 1);
        setReact(false);
        break;

      case 'remove':
        await commentApi.removeCommentReaction(video.id, comment.id);
        if (react === true) setLike(like - 1);
        else if (react === false) setDislike(dislike - 1);
        setReact(null);
        break;
    }
    reacting.current = false;
  }
  return (
    <div className="CommentLikeDislike">
      <div
        className="CommentLikeDislike-Button"
        onClick={() => (react === true ? doReact('remove') : doReact('like'))}
      >
        {react === true ? <ThumbUp className="CommentLikeDislike-Like" /> : <ThumbUpOutlined />}
        <div>{like}</div>
      </div>

      <div
        className="CommentLikeDislike-Button"
        onClick={() => (react === false ? doReact('remove') : doReact('dislike'))}
      >
        {react === false ? (
          <ThumbDown className="CommentLikeDislike-Dislike" />
        ) : (
          <ThumbDownOutlined />
        )}
        <div>{dislike}</div>
      </div>
    </div>
  );
}

export default CommentLikeDislike;
