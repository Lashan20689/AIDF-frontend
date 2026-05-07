import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
    return (
        <>
            <Navigation />
            <Outlet/>
        </>
    );
}

export default MainLayout;