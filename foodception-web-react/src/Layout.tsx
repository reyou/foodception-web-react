// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <Outlet />
      <hr />
    </div>
  );
};

export default Layout;
