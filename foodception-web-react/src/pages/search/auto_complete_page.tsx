import { useEffect } from 'react';
import { useLayout } from '../../contexts/layout-context';
import { Col, Row } from 'react-bootstrap';
import SearchAutoComplete from '../../components/search_auto_complete';

export default function SearchAutoCompletePage() {
  const { setShowBreadcrumb, setShowHorizontalRule } = useLayout();
  useEffect(() => {
    setShowBreadcrumb(false);
    setShowHorizontalRule(false);
    return () => {
      setShowBreadcrumb(true);
      setShowHorizontalRule(true);
    };
  }, [setShowBreadcrumb, setShowHorizontalRule]);

  return (
    <div>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={4} xl={3}>
          <SearchAutoComplete
            initialSearchTerm={''}
            onSearch={() => {}}
            apiEndpoint='/search/autocomplete'
            baseUrl='/search'
          />
        </Col>
      </Row>
    </div>
  );
}
