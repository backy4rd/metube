import React from 'react';

import useQuery from '@hooks/useQuery';

import SearchVideos from './SearchVideos';
import SearchNotFound from './SearchNotFound';
import SearchFilter from './SearchFilter';
import SearchUsers from './SearchUsers';
import SearchPlaylists from './SearchPlaylists';

import './Search.css';

function Search() {
  const { type = 'video' } = useQuery();

  let Searcher: React.FC;
  switch (type) {
    case 'video':
      Searcher = SearchVideos;
      break;
    case 'playlist':
      Searcher = SearchPlaylists;
      break;
    case 'user':
      Searcher = SearchUsers;
      break;
    default:
      Searcher = SearchNotFound;
      break;
  }

  return (
    <div className="SearchWrapper">
      <SearchFilter />

      <div className="Search">
        <Searcher />
      </div>
    </div>
  );
}

export default Search;
