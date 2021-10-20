import React, { useEffect, useState } from 'react';

import searchApi from '@api/searchApi';
import { useLoading, useSetLoading } from '@contexts/LoadingContext';
import useQuery from '@hooks/useQuery';
import IUser from '@interfaces/IUser';
import generateSkeletons from '@utils/generateSkeleton';

import SearchNotFound from '../SearchNotFound';
import Users from '@components/Users';

import './SearchUsers.css';

function SearchUsers() {
  const [users, setUsers] = useState<Array<IUser>>([]);

  const setLoading = useSetLoading();
  const loading = useLoading();
  const { q = '' } = useQuery();

  useEffect(() => {
    setUsers([]);
    setLoading(true);
    searchApi
      .searchUsers(q, { offset: 0, limit: 100 })
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [q, setLoading]);

  return (
    <div className="SearchUser">
      {users.length === 0 && !loading ? (
        <SearchNotFound />
      ) : (
        <div className="SearchUser__Result">
          {users.length > 0 && (
            <div style={{ fontSize: '15px', marginBottom: 32 }}>
              {users.length === 100 && 'Hơn'} {users.length} channel được tìm thấy:
            </div>
          )}
          <Users users={users.length === 0 ? generateSkeletons(8) : users} />
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
