import React from 'react';

import { useAuth } from '@contexts/AuthContext';

import './ChannelInfo.css';

function ChannelInfo() {
  const { user } = useAuth();

  if (user === null) return null;
  return <div className="ChannelInfo"></div>;
}

export default ChannelInfo;
