import React from 'react';
import jwtDecode from 'jwt-decode';

import IToken from '@interfaces/IToken';

interface AuthContextValue {
  user: IToken | null;
  logout: () => void;
  login: (token: string) => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  logout: () => {},
  login: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: { children?: React.ReactNode }) {
  const token = window.localStorage.getItem('token');

  let user;
  if (token) {
    try {
      user = jwtDecode(token) as IToken;
      if (user.exp * 1000 - Date.now() < 0) return null;

      user.iconPath = process.env.REACT_APP_STATIC_URL + user.iconPath;
    } catch {
      user = null;
    }
  } else {
    user = null;
  }

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
