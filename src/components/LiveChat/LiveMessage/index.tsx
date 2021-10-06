import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import { randomPercentage } from '@utils/number';

import './LiveMessage.css';

export interface ILiveMessage {
  user: {
    id: number;
    username: string;
  };
  timestamp: number;
  message: string;
}

interface LiveMessageProps {
  message: ILiveMessage | ISkeleton;
  className?: string;
}

const colors = [
  'rgb(230, 209, 97)',
  'rgb(226, 71, 71)',
  'rgb(75, 197, 126)',
  'rgb(239, 98, 130)',
  'rgb(54, 136, 77)',
  'rgb(90, 151, 221)',
  '#800080',
];

function getColor(username: string): string {
  const sumCharCode = username.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  return colors[sumCharCode % colors.length];
}

function LiveMessage({ message, className }: LiveMessageProps) {
  if (isSkeleton(message))
    return (
      <div className={`LiveMessage ${className || ''}`}>
        <Skeleton width={randomPercentage(30, 100)} height="16px" />
      </div>
    );

  const timestamp = new Date(message.timestamp);

  const hour_minute =
    timestamp.getHours().toString().padStart(2, '0') +
    ':' +
    timestamp.getMinutes().toString().padStart(2, '0');

  return (
    <div className={`LiveMessage ${className || ''}`}>
      <div className="LiveMessage__Info">
        <span className="LiveMessage-Timestamp">{hour_minute}</span>
        <span className="LiveMessage-Separator" style={{ color: 'var(--main-grey-2)' }}>
          -
        </span>
        <Link
          className="LiveMessage-Username"
          to={'/channel/' + message.user.username}
          style={{ color: getColor(message.user.username) }}
        >
          {message.user.username}
        </Link>
        <span className="LiveMessage-Separator">:</span>
      </div>
      <span className="LiveMessage-Message">{message.message}</span>
    </div>
  );
}

export default LiveMessage;
