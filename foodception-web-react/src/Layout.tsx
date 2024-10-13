import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <hr />
    </>
  );
};

export default Layout;
