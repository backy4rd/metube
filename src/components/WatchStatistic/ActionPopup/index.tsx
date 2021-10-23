import React from 'react';
import { Menu, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { PlaylistAdd, Delete, Block, Timeline, MoreVert } from '@material-ui/icons';

import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { usePlaylistPopup } from '@contexts/PlaylistPopupContext';

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
          <div className="ActionPopup-Action">
            <Timeline />
            <div className="ActionPopup-Action-Text">Tổng Quan</div>
          </div>
        )}
        {user.username === video.uploadedBy.username && (
          <div className="ActionPopup-Action" onClick={handleRemoveVideoClick}>
            <Delete />
            <div className="ActionPopup-Action-Text">Xóa Video</div>
          </div>
        )}
        {user.role === 'admin' && (
          <div>
            <Block />
            <div className="ActionPopup-Action-Text">Chặn Video</div>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default ActionPopup;
