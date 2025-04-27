import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import DynamicBreadcrumbs from './components/core/foodception_breadcrumbs';
import { useLayout } from './contexts/layout-context';
import FoodceptionNavbar from './components/navbar/Navbar';
import SearchAutoComplete from './components/search_auto_complete';
import { HideOnRoutes } from './components/core/HideOnRoutes';



const Layout: React.FC = () => {
  const { showNavigation, showBreadcrumb, showHorizontalRule } = useLayout();

  return (
    <>
      {showNavigation && <FoodceptionNavbar />}
      <HideOnRoutes routes={['/search', '/user/login', '/user/signup']}>
        <Container fluid>
          <Row className="justify-content-center g-0 mb-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <SearchAutoComplete
                initialSearchTerm={''}
                onSearch={() => { }}
                apiEndpoint='/search/autocomplete'
                baseUrl='/search'
              />
            </Col>
          </Row>
        </Container>
      </HideOnRoutes>
      {showBreadcrumb && <DynamicBreadcrumbs />}
      <Outlet />
      {showHorizontalRule && <hr />}
    </>
  );
};


export default Layout;
