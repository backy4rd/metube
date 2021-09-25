import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import IToken from '@interfaces/IToken';
import IUser from '@interfaces/IUser';
import userApi from '@api/userApi';

const AuthContext = React.createContext<{
  // undefined means the app is loading user credential
  // null is unauthorize
  user: IUser | null | undefined;
  logout: () => void;
  login: (token: string) => void;
}>({
  user: null,
  logout: () => {},
  login: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: { children?: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    try {
      if (!token) throw new Error();
      const parsedToken = jwtDecode(token) as IToken;
      if (parsedToken.exp * 1000 - Date.now() < 0) throw new Error();

      userApi
        .getOwnProfile()
        .then((_user) => setUser({ ..._user, role: parsedToken.role }))
        .catch(() => setUser(null));
    } catch {
      setUser(null);
    }
  }, []);

  function login(token: string) {
    window.localStorage.setItem('token', token);
    window.location.reload();
  }

  function logout() {
    window.localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ user, logout, login }}>{props.children}</AuthContext.Provider>
  );
}
