import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/components/HeaderLayout.css';
import DynamicBreadcrumbs from '../core/foodception_breadcrumbs';
import { useLayout } from '../../contexts/layout-context';

interface HeaderLayoutProps {
  backgroundImage: string;
  title: JSX.Element;
  subTitle: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  title,
  subTitle,
  backgroundImage
}) => {
  const { setShowBreadcrumb } = useLayout();
  useEffect(() => {
    setShowBreadcrumb(false);
    return () => {
      setShowBreadcrumb(true);
    };
  }, [setShowBreadcrumb]);
  return (
    <>
      <header
        className='header'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Container>
          <Row>
            <Col>
              <div className='content'>
                <div className='title-overlay'>{title}</div>
                <div className='subtitle-overlay'>
                  <h4>{subTitle}</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <DynamicBreadcrumbs></DynamicBreadcrumbs>
    </>
  );
};

export default HeaderLayout;
