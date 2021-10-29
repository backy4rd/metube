import React, { useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';

import { useSetShowAuthForm, useShowAuthForm } from '@contexts/ShowAuthFormContext';

import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

import './AuthForm.css';

export type FormType = 'LOGIN' | 'REGISTER' | 'RESET_PASSWORD';

function AuthForm() {
  const [title, setTitle] = useState('Đăng nhập vào Zootube');
  const [form, setForm] = useState<FormType>('LOGIN');

  const showAuthForm = useShowAuthForm();
  const setShowAuthForm = useSetShowAuthForm();

  useEffect(() => {
    if (typeof showAuthForm === 'boolean') return;
    setForm(showAuthForm);
  }, [showAuthForm]);

  useEffect(() => {
    switch (form) {
      case 'LOGIN':
        setTitle('Đăng nhập vào Zoo');
        break;
      case 'REGISTER':
        setTitle('Đăng kí tài khoản');
        break;
      case 'RESET_PASSWORD':
        setTitle('Đổi mật khẩu');
        break;
      default:
        setTitle('undefined');
        break;
    }
  }, [form]);

  function handleClickLogin() {
    setForm('LOGIN');
  }

  function handleClickRegister() {
    setForm('REGISTER');
  }

  return (
    <CSSTransition in={!!showAuthForm} timeout={200} classNames="AuthFormWrapper" unmountOnExit>
      <div className="AuthFormWrapper">
        <div className="AuthForm">
          <div className="AuthForm__header">
            <h3>{title}</h3>
            <Close className="closeButton" onClick={() => setShowAuthForm(false)} />
          </div>
          <div className="AuthForm__container">
            {form === 'LOGIN' ? (
              <Login onRegisterClick={handleClickRegister} />
            ) : form === 'REGISTER' ? (
              <Register onLoginClick={handleClickLogin} />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default AuthForm;
