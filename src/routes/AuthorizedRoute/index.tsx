import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { AccountCircleOutlined } from '@material-ui/icons';
import { Skeleton } from '@mui/material';

import { useAuth } from '@contexts/AuthContext';

import './AuthorizedRoute.css';


function Unauthorized() {
  return (
    <div className="Unauthorized">
      <div className="Unauthorized__Center">
        <AccountCircleOutlined className="Unauthorized__Center-Key" />
        <h3>Bạn cần phải đăng nhập đẻ sử dụng tính năng này</h3>
        <div>Đăng nhập để tương tác, bình luận và đăng kí những video mới nhất.</div>
      </div>
    </div>
  );
}

function AuthorizedRouteSkeleton() {
  return (
    <Skeleton
      id="AuthorizedRouteSkeleton"
      variant="rectangular"
      animation="wave"
      height="100%"
      width="100%"
    />
  );
}

function AuthorizedRoute(props: RouteProps) {
  const { user } = useAuth();

  let component;
  if (user === undefined) {
    component = AuthorizedRouteSkeleton;
  } else if (user === null) {
    component = Unauthorized;
  } else {
    component = props.component;
  }

  return <Route {...props} component={component} />;
}

export default AuthorizedRoute;
