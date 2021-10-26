import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import BlockedVideos from './BlockedVideos';
import Reports from './Reports';
import BlockedChannels from './BlockedChannels';

import './Admin.css';

function Admin() {
  return (
    <div className="Admin">
      <div className="ChannelTabs">
        <NavLink activeClassName="active" className="ChannelTabs-Tab" to="/admin" exact>
          BÁO CÁO
        </NavLink>
        <NavLink activeClassName="active" className="ChannelTabs-Tab" to="/admin/videos" exact>
          VIDEO ĐÃ BỊ CHẶN
        </NavLink>
        <NavLink activeClassName="active" className="ChannelTabs-Tab" to="/admin/users" exact>
          CHANNEL ĐÃ BỊ CHẶN
        </NavLink>
      </div>

      <div className="Admin__Main">
        <Switch>
          <Route exact path="/admin/videos" component={BlockedVideos} />
          <Route exact path="/admin/users" component={BlockedChannels} />
          <Route exact path="/admin" component={Reports} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
