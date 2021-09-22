import React from 'react';

import AuthForm from '@components/AuthForm';
import Loading from '@components/Loading';
import MessageQueue from '@components/MessageQueue';

import './PopupWrapper.css';

function PopupWrapper() {
  return (
    <div className="PopupWrapper">
      <AuthForm />
      <Loading />
      <MessageQueue />
    </div>
  );
}

export default PopupWrapper;
