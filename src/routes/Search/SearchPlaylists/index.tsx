import React, { useEffect, useState } from 'react';

import searchApi from '@api/searchApi';
import IPlaylist from '@interfaces/IPlaylist';
import { isSkeleton } from '@interfaces/ISkeleton';
import { useLoading, useSetLoading } from '@contexts/LoadingContext';
import useQuery from '@hooks/useQuery';
import generateSkeletons from '@utils/generateSkeleton';

import SearchNotFound from '../SearchNotFound';
import HorizontalPlaylist from '@components/HorizontalPlaylist';

import './SearchPlaylists.css';

function SearchPlaylists() {
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);

  const setLoading = useSetLoading();
  const loading = useLoading();
  const { q = '', from } = useQuery();

  useEffect(() => {
    setPlaylists([]);
    setLoading(true);
    searchApi
      .searchPlaylists(q, { offset: 0, limit: 100 })
      .then(setPlaylists)
      .finally(() => setLoading(false));
  }, [from, q, setLoading]);

  return (
    <div className="SearchPlaylists">
      {playlists.length === 0 && !loading ? (
        <SearchNotFound />
      ) : (
        <div className="SearchPlaylists__Result">
          {playlists.length > 0 && (
            <div style={{ fontSize: '15px', marginBottom: 24 }}>
              {playlists.length === 100 && 'Hơn'} {playlists.length} playlist được tìm thấy:
            </div>
          )}
          <div className="App-HorizontalPlaylistGrid">
            {(playlists.length === 0 ? generateSkeletons(7) : playlists).map((playlist) => (
              <HorizontalPlaylist
                key={isSkeleton(playlist) ? playlist.bone : playlist.id}
                playlist={playlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPlaylists;
