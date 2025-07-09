import {useAuth} from "../../context/useAuth.tsx";
import {Box, Button} from "@mui/material";
import {useState} from "react";
import RegisterForm from "../auth/RegisterForm.tsx";
import ThemeSwitch from "./ThemeSwitch.tsx";
import {useFav} from "../../context/useFav.tsx";
import {useSeen} from "../../context/useSeen.tsx";
import AccountMenu from "./AccountMenu.tsx";


const AuthContainer = () => {
    const { logout, isLogged, setOpenLoginDialog } = useAuth();
    // @ts-expect-error okk
    const { clearFavorites } = useFav()
    // @ts-expect-error okk
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
                        <AccountMenu></AccountMenu>
                    </>
                    :
                    <>
                        <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                        <Button variant={"outlined"} onClick={() => setOpen(true)}>Register</Button>
                    </>
                }
            </Box>
            <RegisterForm open={open} setOpen={setOpen} />
        </>
    )
}

export default AuthContainer;