import Router from "./routers/Router.tsx";
import {useEffect} from "react";
import {useAuth} from "./context/useAuth.tsx";

const App = () => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        isLoggedIn()
    })

    return (
        <>
            <Router/>
        </>
    );
}

export default App;
