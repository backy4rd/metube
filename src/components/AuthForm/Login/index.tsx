import React, { FormEvent, useState } from 'react';

import authApi from '@api/authApi';
import { useAuth } from '@contexts/AuthContext';
import { useLoading } from '@contexts/LoadingContext';

import './Login.css';

type Props = { onRegisterClick: () => void };

function Login({ onRegisterClick }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const [, setLoading] = useLoading();

  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await authApi.login(username, password);
      setFailMessage(null);
      login(response.token);
    } catch (e) {
      const message: string = e?.data?.fail?.message;

      if (message === "username doesn't exists") {
        setFailMessage('tài khoản không tồn tại');
      } else if (message === "password don't match") {
        setFailMessage('mật khẩu không chính xác');
      } else {
        setFailMessage('lỗi máy chủ');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form className="login__wrapper" onSubmit={handleLoginSubmit}>
        {failMessage && (
          <span style={{ fontSize: 12, fontStyle: 'italic', color: 'red' }}>*{failMessage}</span>
        )}
        <input
          type="text"
          className="field"
          placeholder="Tên tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="field"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Đăng nhập" />

        <p style={{ margin: '10px 0' }}>
          Không có tài khoản?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onRegisterClick}>
            Đăng ký ngay
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
