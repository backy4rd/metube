import React, { useState } from 'react';
import { FormType } from '@components/AuthForm';

const SetShowAuthFormContext = React.createContext(
  (state: React.SetStateAction<boolean | FormType>) => {}
);
const ShowAuthFormContext = React.createContext<boolean | FormType>(false);

export function useSetShowAuthForm() {
  return React.useContext(SetShowAuthFormContext);
}

export function useShowAuthForm() {
  return React.useContext(ShowAuthFormContext);
}

export function ShowAuthFormProvider(props: { children?: React.ReactNode }) {
  const [showAuthForm, setShowAuthForm] = useState<boolean | FormType>(false);

  return (
    <SetShowAuthFormContext.Provider value={setShowAuthForm}>
      <ShowAuthFormContext.Provider value={showAuthForm}>
        {props.children}
      </ShowAuthFormContext.Provider>
    </SetShowAuthFormContext.Provider>
  );
}
