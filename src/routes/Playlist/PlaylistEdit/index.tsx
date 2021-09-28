import React, { useEffect, useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';

import IPlaylist from '@interfaces/IPlaylist';
import { useAuth } from '@contexts/AuthContext';

import User from '@components/User';

import './PlaylistEdit.css';

interface PlaylistEditProps {
  playlist: IPlaylist;
  className?: string;
}

function PlaylistInfo({ className, playlist }: PlaylistEditProps) {
  const [description, setDescription] = useState(playlist.description || '');
  const [name, setName] = useState(playlist.name);

  const { user } = useAuth();

  useEffect(() => {
    setName(playlist.name);
    setDescription(playlist.description || '');
  }, [playlist]);

  return (
    <div className={`PlaylistInfo ${className || ''}`}>
      <User user={playlist.createdBy} />

      <div className="PlaylistEdit">
        <div className="PlaylistEdit-Item">
          <div className="PlaylistEdit-Label">Tên Playlist:</div>
          <input
            className="App-TextInput PlaylistEdit-Text"
            placeholder="Playlist name"
            type="text"
            disabled={!user || user.username !== playlist.createdBy.username}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="PlaylistEdit-Item">
          <div className="PlaylistEdit-Label">Mô tả:</div>
          <TextareaAutosize
            className="App-TextInput PlaylistEdit-Text"
            placeholder="Description"
            disabled={!user || user.username !== playlist.createdBy.username}
            maxRows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PlaylistInfo;
