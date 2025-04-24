import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

interface SplitImagesProps {
    leftImage: string;
    rightImage: string;
}

const SplitImages: React.FC<SplitImagesProps> = ({
    leftImage,
    rightImage
}) => {
    return (
        <Container fluid className="p-0">
            <Row className="g-0">
                <Col xs={12} md={6} className="p-0">
                    <Image
                        src={leftImage}
                        alt="Left image"
                        fluid
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Col>
                <Col xs={12} md={6} className="p-0">
                    <Image
                        src={rightImage}
                        alt="Right image"
                        fluid
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default SplitImages;