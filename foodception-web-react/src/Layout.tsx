import React from 'react';
import { Outlet } from 'react-router-dom';

import DynamicBreadcrumbs from './components/core/foodception_breadcrumbs';
import { useLayout } from './contexts/layout-context';

const Layout: React.FC = () => {
  const { hasHeader } = useLayout();
  return (
    <>
      {!hasHeader && <DynamicBreadcrumbs />}
      <Outlet />
      <hr />
    </>
  );
};

export default Layout;
