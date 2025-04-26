import React from 'react';

/**
 * Props interface for the LeftOverlay component
 * @property {string[]} title - Array of text lines to display as the main heading (split across lines)
 * @property {string} tagline - Text to display in the bottom tagline box
 */
interface LeftOverlayProps {
    title?: string[];
    tagline?: string;
}

/**
 * LeftOverlay Component
 * 
 * Renders the left side overlay content for the SplitImages component.
 * Displays a multi-line heading at the top and a tagline in a semi-transparent
 * white box at the bottom.
 * 
 * The component is designed to work with the SplitImages component's overlay
 * container and uses CSS classes defined in Overlays.css.
 */
const LeftOverlay: React.FC<LeftOverlayProps> = ({
    // Default values if props aren't provided
    title = ['Discover', 'Delicious', 'ness'],
    tagline = 'Join The Food Conversation'
}) => {
    return (
        <div className="left-overlay-content">
            {/* Top section with main heading text */}
            <div>
                {/* Map each line of the title to an h1 element */}
                {title.map((line, index) => (
                    <h1
                        key={index}
                        className="left-overlay-title"
                    >
                        {line}
                    </h1>
                ))}
            </div>
            {/* Bottom section with tagline in a semi-transparent box */}
            <div className="left-overlay-tagline-container">
                <span className="left-overlay-tagline">
                    {tagline}
                </span>
            </div>
        </div>
    );
};

export default LeftOverlay;