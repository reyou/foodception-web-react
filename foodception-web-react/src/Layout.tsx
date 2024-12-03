import React from 'react';
import { Outlet } from 'react-router-dom';

import DynamicBreadcrumbs from './components/core/foodception_breadcrumbs';
import { useLayout } from './contexts/layout-context';

const Layout: React.FC = () => {
  const { showBreadcrumb, showHorizontalRule } = useLayout();
  return (
    <>
      {showBreadcrumb && <DynamicBreadcrumbs />}
      <Outlet />
      {showHorizontalRule && <hr />}
    </>
  );
};

export default Layout;
