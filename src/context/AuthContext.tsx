import {createContext, useState, type ReactNode, type Dispatch, type SetStateAction} from "react";
import LoginForm from "../components/auth/LoginForm";
import {ThemeProvider} from "@mui/material";
import themes from "../themes.tsx";

type AuthProviderType = {
    isLogged: boolean;
    login: () => void;
    logout: () => void;
    setOpenLoginDialog: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthProviderType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

    const login = () => setIsLogged(true);

    const logout = () => setIsLogged(false);

    return (
        <>
            <AuthContext.Provider value={{isLogged, login, logout, setOpenLoginDialog}}>
                {children}
                    <LoginForm open={openLoginDialog} setOpen={setOpenLoginDialog}/>
            </AuthContext.Provider>
        </>
    )
}