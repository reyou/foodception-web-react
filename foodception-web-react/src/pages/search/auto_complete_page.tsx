import { useEffect } from 'react';
import { useLayout } from '../../contexts/layout-context';
import { Col, Row } from 'react-bootstrap';
import SearchAutoComplete from '../../components/search_auto_complete';
import { ApiRoutes } from '../../constants/ApiRoutes';

export default function SearchAutoCompletePage() {
  const { setShowNavigation, setShowBreadcrumb, setShowHorizontalRule } = useLayout();
  useEffect(() => {
    setShowNavigation(false);
    setShowBreadcrumb(false);
    setShowHorizontalRule(false);
    return () => {
      setShowBreadcrumb(true);
      setShowHorizontalRule(true);
    };
  }, [setShowNavigation, setShowBreadcrumb, setShowHorizontalRule]);

  return (
    <div>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={4} xl={3}>
          <SearchAutoComplete
            initialSearchTerm={''}
            onSearch={() => { }}
            apiEndpoint={ApiRoutes.Search.Suggestions}
            baseUrl='/search'
          />
        </Col>
      </Row>
    </div>
  );
}
