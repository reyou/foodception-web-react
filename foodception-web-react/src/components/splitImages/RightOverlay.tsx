import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

/**
 * Props interface for the RightOverlay component
 * @property {string} description - Text description to display in the overlay box
 * @property {string} buttonText - Text to display on the call-to-action button
 * @property {string} buttonLink - URL or route path for the button link
 */
interface RightOverlayProps {
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

/**
 * RightOverlay Component
 * 
 * Renders the right side overlay content for the SplitImages component.
 * Displays a descriptive text in a semi-transparent dark box with a
 * call-to-action button below it.
 * 
 * The component is designed to work with the SplitImages component's overlay
 * container and uses CSS classes defined in Overlays.css.
 * 
 * It includes iframe-aware navigation through FrontEndUtils.handleLinkClick
 * which detects if the app is running in an iframe and adjusts navigation
 * behavior accordingly.
 */
const RightOverlay: React.FC<RightOverlayProps> = ({
    // Default values if props aren't provided
    description = 'Get inspired by our collection of cooking videos featuring the latest trends, innovative techniques, and mouth-watering recipes. From quick and easy meals to elaborate dishes, our videos have something for everyone.',
    buttonText = 'Watch Now',
    buttonLink = ''
}) => {
    return (
        <div className="right-overlay-content">
            {/* Semi-transparent box containing description and button */}
            <div className="right-overlay-box">
                {/* Descriptive text with text shadow for better readability */}
                <p className="right-overlay-description">
                    {description}
                </p>
                {/* Link wrapped around button for navigation */}
                <Link to={buttonLink}>
                    {/* 
                      * Button with onClick handler for iframe-aware navigation
                      * This ensures proper navigation behavior whether the app
                      * is running standalone or embedded in an iframe
                      */}
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