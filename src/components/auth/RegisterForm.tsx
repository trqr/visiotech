import {Box, Button, Dialog, TextField} from "@mui/material";
import {useAuth} from "../../context/useAuth.tsx";
import {useState} from "react";

type RegisterProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RegisterForm = ({open, setOpen}: RegisterProps) => {
    const {register} = useAuth();
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        register(userName, email, password);
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box sx={{p: 3, display: "flex", flexDirection: "column", gap: 2, margin: "5px", padding: "10px"}}>
                    <TextField
                        placeholder={"Username"}
                        onChange={(e) => setuserName(e.target.value)}
                        required={true}
                    ></TextField>
                    <TextField
                        placeholder={"Email"}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    ></TextField>
                    <TextField
                        type={"password"}
                        placeholder={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    ></TextField>
                </Box>
                <Button sx={{margin: "10px"}} variant={"contained"} onClick={handleSubmit}>
                    Register
                </Button>
            </Dialog>
        </>
    );
};

export default RegisterForm;
