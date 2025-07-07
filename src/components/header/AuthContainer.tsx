import {useAuth} from "../../context/useAuth.tsx";
import {Box, Button} from "@mui/material";
import {useState} from "react";
import RegisterForm from "../auth/RegisterForm.tsx";
import ThemeSwitch from "./ThemeSwitch.tsx";
import {useFav} from "../../context/useFav.tsx";
import {useSeen} from "../../context/useSeen.tsx";


const AuthContainer = () => {
    const { logout, isLogged, setOpenLoginDialog } = useAuth();
    const { clearFavorites } = useFav()
    const { clearSeen } = useSeen()
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout()
        clearFavorites();
        clearSeen();
    }

    return (
        <>
            <Box sx={{display: "flex", gap: 2, margin: "5px", padding: "10px", justifyContent: "space-between", alignItems: "center"}}>
                {isLogged
                    ?
                    <>
                        <ThemeSwitch></ThemeSwitch>
                        <Button variant={"outlined"} onClick={() => handleLogout()}>Logout</Button>
                    </>
                    :
                    <>
                        <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                        <Button variant={"outlined"} onClick={() => setOpen(true)}>Register</Button>
                        <ThemeSwitch></ThemeSwitch>
                    </>
                }
            </Box>
            <RegisterForm open={open} setOpen={setOpen} />
        </>
    )
}

export default AuthContainer;