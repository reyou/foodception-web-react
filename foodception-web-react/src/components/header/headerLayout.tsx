import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/components/HeaderLayout.css';

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
  return (
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
  );
};

export default HeaderLayout;
