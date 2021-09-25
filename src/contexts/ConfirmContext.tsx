import React, { useMemo, useState } from 'react';

interface Confirm {
  message: string;
  handler?: () => any;
  level: 'error' | 'warning';
}

const ConfirmContext = React.createContext<Confirm | null>(null);
const ShowConfirmContext = React.createContext<{
  showConfirm: (message: string, handler?: () => any, level?: 'error' | 'warning') => void;
  closeConfirm: () => void;
}>({
  showConfirm: () => {},
  closeConfirm: () => {},
});

export function useConfirm() {
  return React.useContext(ConfirmContext);
}

export function useShowConfirm() {
  return React.useContext(ShowConfirmContext);
}

interface ConfirmProviderProps {
  children: React.ReactNode;
}

export function ConfirmProvider(props: ConfirmProviderProps) {
  const [message, setMessage] = useState<Confirm | null>(null);

  const showConfirmValue = useMemo(
    () => ({
      showConfirm: (message: string, handler?: () => any, level?: 'error' | 'warning') =>
        setMessage({ message, handler, level: level || 'error' }),
      closeConfirm: () => setMessage(null),
    }),
    []
  );

  return (
    <ShowConfirmContext.Provider value={showConfirmValue}>
      <ConfirmContext.Provider value={message}>{props.children}</ConfirmContext.Provider>
    </ShowConfirmContext.Provider>
  );
}
