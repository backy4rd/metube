import React, { useState } from 'react';

const SetShowAuthFormContext = React.createContext((state: React.SetStateAction<boolean>) => {});
const ShowAuthFormContext = React.createContext(false);

export function useSetShowAuthForm() {
  return React.useContext(SetShowAuthFormContext);
}

export function useShowAuthForm() {
  return React.useContext(ShowAuthFormContext);
}

export function ShowAuthFormProvider(props: { children?: React.ReactNode }) {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <SetShowAuthFormContext.Provider value={setShowAuthForm}>
      <ShowAuthFormContext.Provider value={showAuthForm}>
        {props.children}
      </ShowAuthFormContext.Provider>
    </SetShowAuthFormContext.Provider>
  );
}
