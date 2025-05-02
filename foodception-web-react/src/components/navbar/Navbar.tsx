import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { WebRoutes } from '../../constants/WebRoutes';
import { ApiRoutes } from '../../constants/ApiRoutes';
import SmartNavLink from './SmartNavLink';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../contexts/AuthContext';

// Define types for menu items
interface MenuItem {
    link: string;
    target: string;
    label: string;
    selected: boolean;
    menuItems: MenuItem[];
}

const FoodceptionNavbar: React.FC = () => {
    // Use the useFetch hook to fetch menu items
    const { data, loading, error } = useFetch(ApiRoutes.UserInterface.MENU.ITEMS);

    // Use the auth context to get authentication status
    const { authenticated, logout, user } = useAuth();

    // Extract menuItems from the response data
    const menuItems: MenuItem[] = data?.menuItems || [];

    // Render dropdown items (different from main items)
    const renderDropdownItems = (items: MenuItem[]) => {

        return items.map((item, index) => {
            const adjustedUrl = FrontEndUtils.getAdjustedUrl(item.link);
            return <SmartNavLink
                to={adjustedUrl}
                key={`${item.label}-${index}`}
                isDropdownItem={true}
            >
                {item.label}
            </SmartNavLink>
        });
    };

    // Function to render top-level menu with one level of nesting
    const renderMenu = (items: MenuItem[]) => {

        return items.map((item, index) => {
            const adjustedUrl = FrontEndUtils.getAdjustedUrl(item.link);
            if (item.menuItems && item.menuItems.length > 0) {
                return (
                    <NavDropdown title={item.label} id={`nav-dropdown-${index}`} key={`${item.label}-${index}`}>
                        {renderDropdownItems(item.menuItems)}
                    </NavDropdown>
                );
            }

            return (
                <SmartNavLink
                    to={adjustedUrl}
                    key={`${item.label}-${index}`}
                >
                    {item.label}
                </SmartNavLink>
            );
        });
    };

    // Handle logout click
    const handleLogout = async () => {
        try {
            await logout();
            FrontEndUtils.redirectToHome();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Navbar expand="lg" className="mb-3">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {loading ? (
                            // Show loading placeholders or fallback
                            <>
                                <SmartNavLink to={WebRoutes.Home.Base}>Home</SmartNavLink>
                                <SmartNavLink to={WebRoutes.Recipes.Base}>Recipes</SmartNavLink>
                            </>
                        ) : error ? (
                            // Show fallback navigation on error
                            <>
                                <SmartNavLink to={WebRoutes.Home.Base}>Home</SmartNavLink>
                                <SmartNavLink to={WebRoutes.Recipes.Base}>Recipes</SmartNavLink>
                            </>
                        ) : (
                            // Render dynamic menu
                            renderMenu(menuItems)
                        )}
                    </Nav>
                    <Nav>
                        <SmartNavLink to={WebRoutes.Search.Base}>Search</SmartNavLink>
                        {authenticated ? (
                            <>
                                {user && (
                                    <Nav.Link className="nav-link">
                                        {user.firstName || user.email}
                                    </Nav.Link>
                                )}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <SmartNavLink to={WebRoutes.User.Login}>Login</SmartNavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FoodceptionNavbar;