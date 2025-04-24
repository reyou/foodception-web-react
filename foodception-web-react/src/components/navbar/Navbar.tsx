import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { WebRoutes } from '../../constants/WebRoutes';
import { ApiRoutes } from '../../constants/ApiRoutes';
import HttpProvider from '../../providers/HttpProvider';
import SmartNavLink from './SmartNavLink';

// Define types for menu items
interface MenuItem {
    link: string;
    target: string;
    label: string;
    selected: boolean;
    menuItems: MenuItem[];
}

interface MenuResponse {
    menuItems: MenuItem[];
}

const FoodceptionNavbar: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await HttpProvider.get(ApiRoutes.UserInterface.MENU.ITEMS);
                const menuData = response as MenuResponse;
                setMenuItems(menuData.menuItems || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching menu:', err);
                setError('Failed to load menu');
                // Fallback to empty menu
                setMenuItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Render dropdown items (different from main items)
    const renderDropdownItems = (items: MenuItem[]) => {
        return items.map((item, index) => (
            <SmartNavLink
                to={item.link}
                key={`${item.label}-${index}`}
                isDropdownItem={true}
            >
                {item.label}
            </SmartNavLink>
        ));
    };

    // Function to render top-level menu with one level of nesting
    const renderMenu = (items: MenuItem[]) => {
        return items.map((item, index) => {
            if (item.menuItems && item.menuItems.length > 0) {
                return (
                    <NavDropdown title={item.label} id={`nav-dropdown-${index}`} key={`${item.label}-${index}`}>
                        {renderDropdownItems(item.menuItems)}
                    </NavDropdown>
                );
            }

            return (
                <SmartNavLink
                    to={item.link}
                    key={`${item.label}-${index}`}
                >
                    {item.label}
                </SmartNavLink>
            );
        });
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
                                <SmartNavLink to={WebRoutes.Recipe.Base}>Recipes</SmartNavLink>
                            </>
                        ) : error ? (
                            // Show fallback navigation on error
                            <>
                                <SmartNavLink to={WebRoutes.Home.Base}>Home</SmartNavLink>
                                <SmartNavLink to={WebRoutes.Recipe.Base}>Recipes</SmartNavLink>
                            </>
                        ) : (
                            // Render dynamic menu
                            renderMenu(menuItems)
                        )}
                    </Nav>
                    <Nav>
                        <SmartNavLink to={WebRoutes.Search.Base}>Search</SmartNavLink>
                        <SmartNavLink to={WebRoutes.User.Login}>Login</SmartNavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FoodceptionNavbar;