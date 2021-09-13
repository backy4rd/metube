import React, { useEffect, useState } from 'react';

import IPlaylist from '@interfaces/IPlaylist';
import userApi from '@api/userApi';
import { useAuth } from './AuthContext';

const PlaylistsContext = React.createContext<Array<IPlaylist>>([]);

export function usePlaylists() {
  return React.useContext(PlaylistsContext);
}

interface PlaylistsProviderProps {
  children: React.ReactNode;
}

export function PlaylistsProvider(props: PlaylistsProviderProps) {
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    userApi.getOwnPlaylists().then(setPlaylists);
  }, [user]);

  return <PlaylistsContext.Provider value={playlists}>{props.children}</PlaylistsContext.Provider>;
}
