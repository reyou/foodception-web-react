import { useLocation } from "react-router-dom";

// HideOnRoutes component that conditionally renders children based on current route
interface HideOnRoutesProps {
    routes: string[];
    children: React.ReactNode;
}

export const HideOnRoutes: React.FC<HideOnRoutesProps> = ({ routes, children }) => {
    const location = useLocation();

    // Check if current path matches any of the filtered routes
    const shouldHide = routes.some(route =>
        location.pathname.startsWith(route)
    );

    // Don't render children if we're on a filtered route
    if (shouldHide) {
        return null;
    }

    // Otherwise, render the children
    return <>{children}</>;
};