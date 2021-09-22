import React, { useCallback, useState } from 'react';

export type Message = {
  id: number;
  text: string;
};

const MessageQueueContext = React.createContext<Array<Message>>([]);
const PushMessageContext = React.createContext<(message: string) => void>(() => {});

export function useMessageQueue() {
  return React.useContext(MessageQueueContext);
}

export function usePushMessage() {
  return React.useContext(PushMessageContext);
}

interface MessageQueueProviderProps {
  children: React.ReactNode;
  timeout: number;
}

export function MessageQueueProvider(props: MessageQueueProviderProps) {
  const [messageQueue, setMessageQueue] = useState<Array<Message>>([]);

  const pushMessage = useCallback(
    (message: string) => {
      const id = Math.random();
      setMessageQueue((_messageQueue) => [..._messageQueue, { id, text: message }]);

      setTimeout(() => {
        setMessageQueue((_messageQueue) => _messageQueue.filter((msg) => msg.id !== id));
      }, props.timeout);
    },
    [props.timeout]
  );

  return (
    <PushMessageContext.Provider value={pushMessage}>
      <MessageQueueContext.Provider value={messageQueue}>
        {props.children}
      </MessageQueueContext.Provider>
    </PushMessageContext.Provider>
  );
}
