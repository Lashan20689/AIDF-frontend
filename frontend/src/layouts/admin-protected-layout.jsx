import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const adminProtectedLayout = () => {
    const { user } = useUser();

    if (user.publicMetadata?.role !== "admin") {
        return <Navigate to = "/" />;

    }

    return<Outlet />;
}
export default adminProtectedLayout;