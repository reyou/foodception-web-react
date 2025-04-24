import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface SmartNavLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    isDropdownItem?: boolean;
}

const SmartNavLink: React.FC<SmartNavLinkProps> = ({
    to,
    children,
    className,
    isDropdownItem = false
}) => {
    const adjustedUrl = FrontEndUtils.getAdjustedUrl(to);
    const isIframe = FrontEndUtils.isInsideIframe();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isIframe) {
            event.preventDefault();
            FrontEndUtils.handleLinkClick(event, adjustedUrl);
        }
    };

    // For dropdown items
    if (isDropdownItem) {
        return (
            <NavDropdown.Item
                as={Link}
                to={to}
                onClick={handleClick}
                className={className}
            >
                {children}
            </NavDropdown.Item>
        );
    }

    // For regular nav links
    return (
        <Nav.Link
            as={Link}
            to={to}
            onClick={handleClick}
            className={className}
        >
            {children}
        </Nav.Link>
    );
};

export default SmartNavLink;