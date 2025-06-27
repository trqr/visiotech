import {Box, Button, Dialog, TextField} from "@mui/material";
import {useAuth} from "../../context/useAuth.tsx";
import { useSeen } from "../../context/useSeen.tsx";
import { useFav } from "../../context/useFav.tsx";

type LoginFormProps = {
    open: boolean,
    setOpen: (open: boolean) => void
}

const LoginForm= ({open, setOpen}: LoginFormProps) => {
    const {login} = useAuth();
/*    const {getFavoriteFilms} = useFav();
    const {getSeenFilms} = useSeen();*/

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box sx={{p: 3, display: "flex", flexDirection: "column", gap: 2}}>
                    <TextField placeholder={"Email"}></TextField>
                    <TextField placeholder={"Password"}></TextField>
                </Box>
                <Button variant={"contained"} onClick={() => {
                    login();
                    setOpen(false);
                    }}>
                    Login
                </Button>
            </Dialog>
        </>
    );
};

export default LoginForm;
