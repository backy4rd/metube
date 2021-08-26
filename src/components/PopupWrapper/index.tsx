import React from 'react';

import AuthForm from '@components/AuthForm';
import Loading from '@components/Loading';

import './PopupWrapper.css';

function PopupWrapper() {
  return (
    <div className="PopupWrapper">
      <AuthForm />
      <Loading />
    </div>
  );
}

export default PopupWrapper;
