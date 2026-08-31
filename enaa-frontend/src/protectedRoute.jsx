import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem('token');
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (e) {
        user = {};
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    const userRole = user.role?.toLowerCase();
    const allowed = allowedRoles.map(r => r.toLowerCase());
    if (!allowed.includes(userRole)) {
        if (userRole === 'admin_rh') {
            return <Navigate to="/Admin_RH" replace />;
        } else if (userRole === 'manager') {
            return <Navigate to="/manager" replace />;
        } else if (userRole === 'formateur') {
            return <Navigate to="/formateur" replace />;
        } 
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

