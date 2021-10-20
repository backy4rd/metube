import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';

import useQuery from '@hooks/useQuery';

import './SearchFilter.css';

function SearchFilter() {
  const query = useQuery();
  const [type, setType] = useState<string>(query.type || 'video');
  const [from, setFrom] = useState<string | undefined>(query.from || '');

  const history = useHistory();

  useEffect(() => {
    if (type !== 'video') {
      setFrom(undefined);
    }
  }, [type]);

  useEffect(() => {
    setType(query.type || 'video');
    setFrom(query.from || '');
  }, [query.type, query.from]);

  function handleApplyChange() {
    const _query = { ...query, type, from };
    history.push('/search?' + qs.stringify(_query));
  }

  return (
    <div className="SearchFilter">
      <div className="SearchFilter-Type">
        <span>Loại: </span>
        <select className="App-TextInput" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="video">Video</option>
          <option value="playlist">Playlist</option>
          <option value="user">Channel</option>
        </select>
      </div>

      {type === 'video' && (
        <div className="SearchFilter-FromDate">
          <span>Đăng từ ngày: </span>
          <input
            className="App-TextInput"
            type="date"
            min="1/1/1970"
            max={new Date().toLocaleDateString()}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
      )}

      <div className="SearchFilter-Apply" onClick={handleApplyChange}>
        ÁP DỤNG
      </div>
    </div>
  );
}

export default SearchFilter;
