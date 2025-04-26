import React from 'react';

interface LeftOverlayProps {
    title?: string[];
    tagline?: string;
}

const LeftOverlay: React.FC<LeftOverlayProps> = ({
    title = ['Discover', 'Delicious', 'ness'],
    tagline = 'Join The Food Conversation'
}) => {
    return (
        <div className="left-overlay-content">
            <div>
                {title.map((line, index) => (
                    <h1
                        key={index}
                        className="left-overlay-title"
                    >
                        {line}
                    </h1>
                ))}
            </div>
            <div className="left-overlay-tagline-container">
                <span className="left-overlay-tagline">
                    {tagline}
                </span>
            </div>
        </div>
    );
};

export default LeftOverlay;