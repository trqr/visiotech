import { Outlet } from "react-router";

const LayoutWithoutBar= () => {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default LayoutWithoutBar;
