import React, { ReactNode } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './SplitImages.css';
import './Overlays.css';

interface SplitImagesProps {
    leftImage: string;
    rightImage: string;
    leftOverlay?: ReactNode;
    rightOverlay?: ReactNode;
}

const SplitImages: React.FC<SplitImagesProps> = ({
    leftImage,
    rightImage,
    leftOverlay,
    rightOverlay
}) => {
    return (
        <Container fluid className="p-0 foodception-split-images">
            <Row className="g-0">
                <Col xs={12} md={6} className="p-0 split-image-col">
                    <div className="image-wrapper">
                        <Image
                            src={leftImage}
                            alt="Left image"
                            fluid
                            className="split-image"
                        />
                        {leftOverlay && (
                            <div className="overlay-container left-overlay">
                                {leftOverlay}
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={12} md={6} className="p-0 split-image-col">
                    <div className="image-wrapper">
                        <Image
                            src={rightImage}
                            alt="Right image"
                            fluid
                            className="split-image"
                        />
                        {rightOverlay && (
                            <div className="overlay-container right-overlay">
                                {rightOverlay}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SplitImages;