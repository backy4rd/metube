import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';
import { Search } from '@mui/icons-material';

import useQuery from '@hooks/useQuery';

import './SearchBar.css';

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className = '' }: SearchBarProps) {
  const queryParams = useQuery();
  const [query, setQuery] = useState(queryParams.q || '');

  const history = useHistory();

  useEffect(() => {
    setQuery(queryParams.q || '');
  }, [queryParams.q]);

  return (
    <form
      className={'SearchBar ' + className}
      onSubmit={(e) => {
        e.preventDefault();
        const _query = { ...queryParams, q: query };
        history.push('/search?' + qs.stringify(_query));
      }}
    >
      <input
        className="SearchBar-SearchBox"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search video/channel"
      />
      <label>
        <input type="submit" hidden />
        <Search className="SearchBar-SearchIcon" />
      </label>
    </form>
  );
}

export default SearchBar;
