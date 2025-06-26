import { Outlet } from "react-router";
import Header from "../pages/A_header/Header.tsx";

const LayoutWithBar= () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
};

export default LayoutWithBar;
