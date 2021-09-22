import React from 'react';

import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';

import './AuthButton.css';

function AuthButton() {
  const setShowAuthForm = useSetShowAuthForm();

  return (
    <div className="AuthButton" onClick={() => setShowAuthForm(true)}>
      Login / Register
    </div>
  );
}

export default AuthButton;
