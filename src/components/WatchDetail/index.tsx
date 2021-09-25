import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayCircleFilledWhiteOutlined,
  MessageOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
  MoreVert,
} from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import { numberWithCommas } from '@utils/number';
import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import Avatar from '@components/Avatar';
import SubscribeButton from '@components/SubscribeButton';
import EllipsisText from '@components/EllipsisText';
import ActionPopup from './ActionPopup';

import './WatchDetail.css';

interface WatchDetailProps {
  video: IVideo;
}

function WatchDetail({ video }: WatchDetailProps) {
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
          pushMessage('Like không thành công!');
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
          pushMessage('Dislike không thành công!');
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
          pushMessage(`Bỏ ${react ? 'like' : 'dislike'} không thành công!`);
        } finally {
          break;
        }
    }
    reacting.current = false;
  }

  const uploadedAt = video.uploadedAt.toString();

  return (
    <div className="WatchDetail">
      <div className="WatchDetail__Info">
        <div className="WatchDetail__Info-Title">{video.title}</div>
        <div className="WatchDetail__Info-UploadedAt">
          {uploadedAt.slice(0, uploadedAt.indexOf(' GMT'))}
        </div>
      </div>

      <div className="WatchDetail__User" style={{ display: 'flex' }}>
        <Link className="WatchDetail__User__Left" to={`/channel/${video.uploadedBy.username}`}>
          <Avatar user={video.uploadedBy} className="WatchDetail__User__Left-Avatar" />
          <div className="WatchDetail__User__Left-Username">
            {video.uploadedBy.username} ({video.uploadedBy.firstName} {video.uploadedBy.lastName})
          </div>
        </Link>
        <SubscribeButton targetUser={video.uploadedBy} />
      </div>

      <div className="WatchDetail__Statistic">
        <div className="WDS-Item">
          <PlayCircleFilledWhiteOutlined />
          <div>{numberWithCommas(video.views)}</div>
        </div>

        <div className="WDS-Item">
          <MessageOutlined />
          <div>{video.totalComments}</div>
        </div>

        <div
          className="WDS-Item WDS-Item-Button"
          onClick={() => (react === true ? doReact('remove') : doReact('like'))}
        >
          {react === true ? <ThumbUp className="WDS-Like" /> : <ThumbUpOutlined />}
          <div>{like}</div>
        </div>

        <div
          className="WDS-Item WDS-Item-Button"
          onClick={() => (react === false ? doReact('remove') : doReact('dislike'))}
        >
          {react === false ? <ThumbDown className="WDS-Disike" /> : <ThumbDownOutlined />}
          <div>{dislike}</div>
        </div>

        <div id="WDS-Item-Actions" className="WDS-Item">
          <MoreVert />
          <ActionPopup target="WDS-Item-Actions" />
        </div>
      </div>

      <div className="WatchDetail__Description">
        <EllipsisText
          text={video.description || ''}
          lines={5}
          ellipsis={<div className="SidebarGroup-Toggle">show more »</div>}
        />
      </div>
    </div>
  );
}

export default WatchDetail;
