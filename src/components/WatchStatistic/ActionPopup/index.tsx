import React from 'react';
import { Menu, Tooltip } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { PlaylistAdd, Delete, Block, Timeline, MoreVert, Flag } from '@mui/icons-material';

import videoApi from '@api/videoApi';
import adminApi from '@api/adminApi';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { usePlaylistPopup } from '@contexts/PlaylistPopupContext';
import { useReportPopup } from '@contexts/ReportPopupContext';

import './ActionPopup.css';

interface ActionPopupProps {
  target: string;
}

function ActionPopup(props: ActionPopupProps) {
  const [anchorEl, setAnchorEl] = React.useState<SVGElement | null>(null);

  const video = useVideo();
  const pushMessage = usePushMessage();
  const history = useHistory();
  const { user } = useAuth();
  const { showConfirm } = useShowConfirm();
  const { showPlaylistPopup } = usePlaylistPopup();
  const { showReportPopup } = useReportPopup();
  const setShowAuthForm = useSetShowAuthForm();

  if (!user) return null;
  if (!video) return null;

  function handleAddToPlaylistClick() {
    setAnchorEl(null);
    if (!video) return;
    showPlaylistPopup(video.id);
  }

  function handleRemoveVideoClick() {
    setAnchorEl(null);
    showConfirm('Video của bạn sẽ bị xóa vĩnh viễn, bạn có chắc vẫn muốn thực hiện?', async () => {
      setAnchorEl(null);
      if (!video) return;
      try {
        await videoApi.removeVideo(video.id);
        pushMessage('Đã xóa video!');
        history.goBack();
      } catch {
        pushMessage('Xóa video thất bại!', 'error');
      }
    });
  }

  async function handleBlockVideoClick() {
    setAnchorEl(null);
    if (!video) return;
    try {
      const action = video.isBlocked ? 'unban' : 'ban';
      await adminApi.modifyVideo(video.id, action);
      pushMessage(`Đã ${action} video!`);
      history.goBack();
    } catch {
      pushMessage('Chặn video thất bại!', 'error');
    }
  }

  async function handleReportClick() {
    setAnchorEl(null);
    if (!video) return;
    if (!user) return setShowAuthForm('LOGIN');
    showReportPopup(video.id);
  }

  return (
    <div id="WDSAA-Actions" className="WDSAA__Actions-Item">
      <Tooltip title="Hành động">
        <MoreVert onClick={(e) => setAnchorEl(e.currentTarget)} />
      </Tooltip>

      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="ActionPopup-Action" onClick={handleAddToPlaylistClick}>
          <PlaylistAdd />
          <div className="ActionPopup-Action-Text">Thêm Vào Danh Sách Phát</div>
        </div>
        {user.username === video.uploadedBy.username && (
          <Link className="ActionPopup-Action" to={'/analysis/' + video.id}>
            <Timeline />
            <div className="ActionPopup-Action-Text">Tổng Quan</div>
          </Link>
        )}
        {user.username === video.uploadedBy.username && (
          <div className="ActionPopup-Action" onClick={handleRemoveVideoClick}>
            <Delete />
            <div className="ActionPopup-Action-Text">Xóa Video</div>
          </div>
        )}
        <div className="ActionPopup-Action" onClick={handleReportClick}>
          <Flag />
          <div className="ActionPopup-Action-Text">Báo cáo</div>
        </div>
        {user.role === 'admin' && (
          <div className="ActionPopup-Action" onClick={handleBlockVideoClick}>
            <Block />
            <div className="ActionPopup-Action-Text">{video.isBlocked && 'Bỏ '}Chặn Video</div>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default ActionPopup;
