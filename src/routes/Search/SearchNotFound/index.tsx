import React from 'react';
import useQuery from '@hooks/useQuery';
import { SearchOffRounded } from '@mui/icons-material';

import './SearchNotFound.css';

function SearchNotFound() {
  const { q = '' } = useQuery();

  return (
    <div className="SearchNotFound">
      <SearchOffRounded className="SearchNotFound-Icon" />
      <div className="SearchNotFound-Text1">Không có kết quả tìm kiếm với từ khóa '{q}'</div>
      <div className="SearchNotFound-Text2">Hãy thử với từ khóa khác</div>
    </div>
  );
}

export default SearchNotFound;
