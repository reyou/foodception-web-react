import { ReactElement, useEffect, useRef } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import LoadingPanel from "../../../../components/loading_panel";

interface AuthenticatedViewProps {
    authenticatedView: ReactElement;
    unauthenticatedView: ReactElement;
}

export default function AuthenticatedView({
    authenticatedView,
    unauthenticatedView,
}: AuthenticatedViewProps): ReactElement {
    const { authenticated, loading, checkAuth } = useAuth();
    const hasCheckedAuth = useRef(false);

    useEffect(() => {
        if (!hasCheckedAuth.current) {
            hasCheckedAuth.current = true;
            checkAuth();
        }
    }, [checkAuth]);

    if (loading) {
        return <LoadingPanel></LoadingPanel>;
    }

    return (
        <div>
            {authenticated ? authenticatedView : unauthenticatedView}
        </div>
    );
}