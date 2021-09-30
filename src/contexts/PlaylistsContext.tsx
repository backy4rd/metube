import React, { useEffect, useState } from 'react';

import IPlaylist from '@interfaces/IPlaylist';
import userApi from '@api/userApi';
import { useAuth } from './AuthContext';

const PlaylistsContext = React.createContext<Array<IPlaylist> | null>([]);
const SetPlaylistsContext = React.createContext<
  React.Dispatch<React.SetStateAction<Array<IPlaylist> | null>>
>(() => {});

export function usePlaylists() {
  return React.useContext(PlaylistsContext);
}

export function useSetPlaylists() {
  return React.useContext(SetPlaylistsContext);
}

interface PlaylistsProviderProps {
  children: React.ReactNode;
}

export function PlaylistsProvider(props: PlaylistsProviderProps) {
  const [playlists, setPlaylists] = useState<Array<IPlaylist> | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    userApi.getOwnPlaylists().then(setPlaylists);
  }, [user]);

  return (
    <SetPlaylistsContext.Provider value={setPlaylists}>
      <PlaylistsContext.Provider value={playlists}>{props.children}</PlaylistsContext.Provider>;
    </SetPlaylistsContext.Provider>
  );
}
