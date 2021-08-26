import React from 'react';

import { useShowAuthForm } from '@contexts/ShowAuthFormContext';

import './AuthButton.css';

function AuthButton() {
  const [, setShowAuthForm] = useShowAuthForm();

  return (
    <div className="AuthButton" onClick={() => setShowAuthForm(true)}>
      Login / Register
    </div>
  );
}

export default AuthButton;
