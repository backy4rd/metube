import React, { useState } from 'react';
import { Close } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';

import { useSetShowAuthForm, useShowAuthForm } from '@contexts/ShowAuthFormContext';

import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

import './AuthForm.css';

enum FormType {
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER,
}

function AuthForm() {
  const [title, setTitle] = useState('Đăng nhập vào Metube');
  const [form, setForm] = useState<FormType>(FormType.LOGIN);
  const showAuthForm = useShowAuthForm();
  const setShowAuthForm = useSetShowAuthForm();

  function handleClickLogin() {
    setForm(FormType.LOGIN);
    setTitle('Đăng nhập vào zootube');
  }

  function handleClickRegister() {
    setForm(FormType.REGISTER);
    setTitle('Đăng kí tài khoản');
  }

  return (
    <CSSTransition in={showAuthForm} timeout={200} classNames="AuthFormWrapper" unmountOnExit>
      <div className="AuthFormWrapper">
        <div className="AuthForm">
          <div className="AuthForm__header">
            <h3>{title}</h3>
            <Close className="closeButton" onClick={() => setShowAuthForm(false)} />
          </div>
          <div className="AuthForm__container">
            {form === FormType.LOGIN ? (
              <Login onRegisterClick={handleClickRegister} />
            ) : form === FormType.REGISTER ? (
              <Register onLoginClick={handleClickLogin} />
            ) : (
              <ForgotPassword />
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default AuthForm;
