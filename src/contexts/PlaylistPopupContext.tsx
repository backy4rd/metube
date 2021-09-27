import React, { useMemo, useState } from 'react';

const PlaylistPopupContext = React.createContext<{
  showPlaylistPopup: (videoId: string) => void;
  hidePlaylistPopup: () => void;
}>({
  showPlaylistPopup: () => {},
  hidePlaylistPopup: () => {},
});

const PlaylistVideoIdContext = React.createContext<string | null>(null);

export function usePlaylistPopup() {
  return React.useContext(PlaylistPopupContext);
}

export function usePlaylistVideoId() {
  return React.useContext(PlaylistVideoIdContext);
}

interface PlaylistPopupProviderProps {
  children: React.ReactNode;
}

export function PlaylistPopupProvider(props: PlaylistPopupProviderProps) {
  const [videoId, setVideoId] = useState<string | null>(null);

  const popupValue = useMemo(
    () => ({
      showPlaylistPopup: (_videoId: string) => setVideoId(_videoId),
      hidePlaylistPopup: () => setVideoId(null),
    }),
    []
  );

  return (
    <PlaylistVideoIdContext.Provider value={videoId}>
      <PlaylistPopupContext.Provider value={popupValue}>
        {props.children}
      </PlaylistPopupContext.Provider>
    </PlaylistVideoIdContext.Provider>
  );
}
