import React from 'react';

import IUser from '@interfaces/IUser';
import { numberWithCommas } from '@utils/number';

import Avatar from '@components/Avatar';
import SubscribeButton from '@components/SubscribeButton';

import './ChannelHeader.css';

interface ChannelHeaderProps {
  user: IUser;
}

const defaultBanner =
  'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-b-01e-ksh6q0x4.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7aebfd284fa04554a075332af142cdca';

function ChannelHeader({ user }: ChannelHeaderProps) {
  if (!user.bannerPath) user.bannerPath = defaultBanner;

  return (
    <div
      className="ChannelHeader"
      style={{
        backgroundImage: `linear-gradient(to right, #0009, #0007, #0000, #0000), url("${user.bannerPath}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Avatar className="ChannelHeader-Avatar" user={user} size="96px" />
      <div className="ChannelHeader__Info">
        <div className="CHI-Username">
          {user.username} ({user.firstName + ' ' + user.lastName})
        </div>
        <div className="CHI-Subscribers">
          {numberWithCommas(user.totalSubscribers)} người đăng ký
        </div>
        <SubscribeButton className="CHI-SubscribeButton" targetUser={user} />
      </div>
    </div>
  );
}

export default ChannelHeader;
