import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {

    let location = useLocation();

    const auth = useSelector((state) => state.auth);

    return (
        auth.isAuthenticated ? <Outlet /> : <Navigate to="/user/login" state={{ from: location }} replace />
    )

};

export default ProtectedRoute