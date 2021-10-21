import React, { useEffect, useRef, useState } from 'react';
import {
  PlayCircleFilledWhiteOutlined,
  MessageOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
} from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import { numberWithCommas } from '@utils/number';
import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';

import './WatchStatistic.css';

interface WatchStatisticProps {
  video: IVideo;
}

function WatchStatistic({ video }: WatchStatisticProps) {
  const [react, setReact] = useState<null | boolean>(video.react);
  const [like, setLike] = useState<number>(video.like);
  const [dislike, setDislike] = useState<number>(video.dislike);
  const reacting = useRef(false);

  const { user } = useAuth();
  const setShowAuthForm = useSetShowAuthForm();
  const pushMessage = usePushMessage();

  useEffect(() => {
    setLike(video.like);
    setDislike(video.dislike);
    setReact(video.react);
  }, [video]);

  async function doReact(action: 'like' | 'dislike' | 'remove') {
    if (!user) return setShowAuthForm(true);
    if (reacting.current === true) return;

    reacting.current = true;
    switch (action) {
      case 'like':
        try {
          if (react === false) setDislike(dislike - 1);
          setLike(like + 1);
          setReact(true);
          await videoApi.reactVideo(video.id, true);
        } catch {
          if (react === false) setDislike(dislike);
          setLike(like);
          setReact(react);
          pushMessage('Like không thành công!', 'error');
        } finally {
          break;
        }

      case 'dislike':
        try {
          if (react === true) setLike(like - 1);
          setDislike(dislike + 1);
          setReact(false);
          await videoApi.reactVideo(video.id, false);
        } catch {
          if (react === true) setLike(like);
          setDislike(dislike);
          setReact(react);
          pushMessage('Dislike không thành công!', 'error');
        } finally {
          break;
        }

      case 'remove':
        try {
          if (react === true) setLike(like - 1);
          else if (react === false) setDislike(dislike - 1);
          setReact(null);
          await videoApi.removeVideoReaction(video.id);
        } catch {
          if (react === true) setLike(like);
          else if (react === false) setDislike(dislike);
          setReact(react);
          pushMessage(`Bỏ ${react ? 'like' : 'dislike'} không thành công!`, 'error');
        } finally {
          break;
        }
    }
    reacting.current = false;
  }

  return (
    <div className="WatchStatistic">
      <div className="WatchStatistic-Item">
        <PlayCircleFilledWhiteOutlined />
        <div>{numberWithCommas(video.views)}</div>
      </div>

      <div className="WatchStatistic-Item">
        <MessageOutlined />
        <div>{video.totalComments}</div>
      </div>

      <div
        className="WatchStatistic-Item WatchStatistic-Item-Button"
        onClick={() => (react === true ? doReact('remove') : doReact('like'))}
      >
        {react === true ? <ThumbUp className="WatchStatistic-Like" /> : <ThumbUpOutlined />}
        <div>{like}</div>
      </div>

      <div
        className="WatchStatistic-Item WatchStatistic-Item-Button"
        onClick={() => (react === false ? doReact('remove') : doReact('dislike'))}
      >
        {react === false ? <ThumbDown className="WatchStatistic-Disike" /> : <ThumbDownOutlined />}
        <div>{dislike}</div>
      </div>
    </div>
  );
}

export default WatchStatistic;
