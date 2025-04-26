import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface RightOverlayProps {
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

const RightOverlay: React.FC<RightOverlayProps> = ({
    description = 'Get inspired by our collection of cooking videos featuring the latest trends, innovative techniques, and mouth-watering recipes. From quick and easy meals to elaborate dishes, our videos have something for everyone.',
    buttonText = 'Watch Now',
    buttonLink = ''
}) => {
    return (
        <div className="right-overlay-content">
            <div className="right-overlay-box">
                <p className="right-overlay-description">
                    {description}
                </p>
                <Link to={buttonLink}>
                    <Button
                        variant="danger"
                        onClick={(event) => FrontEndUtils.handleLinkClick(event, buttonLink)}
                        size="lg"
                        className="right-overlay-button"
                    >
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default RightOverlay;