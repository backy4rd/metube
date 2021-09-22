import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useMessageQueue } from '@contexts/MessageQueueContext';

import './MessageQueue.css';

function MessageQueue() {
  const messageQueue = useMessageQueue();

  return (
    <TransitionGroup className="MessageQueue">
      {messageQueue.map((message) => (
        <CSSTransition key={message.id} timeout={300} classNames="Message">
          <pre className="Message">{message.text}</pre>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default MessageQueue;
