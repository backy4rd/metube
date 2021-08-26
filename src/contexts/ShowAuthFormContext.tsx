import React, { useState } from 'react';

const ShowAuthFormContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (state: React.SetStateAction<boolean>) => {}]);

export function useShowAuthForm() {
  return React.useContext(ShowAuthFormContext);
}

export function ShowAuthFormProvider(props: { children?: React.ReactNode }) {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <ShowAuthFormContext.Provider value={[showAuthForm, setShowAuthForm]}>
      {props.children}
    </ShowAuthFormContext.Provider>
  );
}
