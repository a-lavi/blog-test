import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
console.log(allowedRoles)
console.log(auth.roles)
console.log('here is the auth user',auth.username)
 /* if (!auth.username){
    return (
        <Navigate to="/blog_project/login" state={{ from: location }} replace />
    )
 }
    return(
        <Outlet/>
    ) */
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default RequireAuth;
/* 
return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.username
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/blog_project/login" state={{ from: location }} replace />
); */