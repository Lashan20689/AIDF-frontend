import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProyectedLayout = () => {
    const {isLoaded, isSignedIn, user} = useUser();

    if(!isSignedIn) {
        return<Navigate to="/sign-in" />;   
    }

    return<Outlet />;
}

export default ProyectedLayout;
