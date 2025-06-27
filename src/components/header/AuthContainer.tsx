import {useAuth} from "../../context/useAuth.tsx";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router";


const AuthContainer = () => {
    const { logout, isLogged, setOpenLoginDialog } = useAuth();
    const navigate = useNavigate();
    return (
        <Box sx={{display: "flex", gap: 2, margin: "5px"}}>
            {isLogged
                ?
                <>
                <Button variant={"outlined"} onClick={() => logout()}>Logout</Button>
                </>
                :
                <>
                    <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                    <Button variant={"outlined"} onClick={() => navigate("/register")}>Register</Button>
                </>
            }
        </Box>
    )
}

export default AuthContainer;