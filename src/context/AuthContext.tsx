import {createContext, useState, type ReactNode, type Dispatch, type SetStateAction} from "react";
import LoginForm from "../components/auth/LoginForm";
import {Add, getUserByEmail} from "../db/indexedDb.service.tsx";
import bcrypt from "bcryptjs";
import type {User} from "../@types/User.ts";
import MySnackBar from "../components/common/MySnackBar.tsx";

type AuthProviderType = {
    isLogged: boolean;
    user: User | null;
    login: (email: string, rawPassword: string) => void;
    logout: () => void;
    register: (username: string, email: string, password: string) => void;
    setOpenLoginDialog: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthProviderType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState<"success" | "error" | "info" | "warning">("info");

    const [token, setToken] = useState('');


    function base64url(source: string) {
        return btoa(source)
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    function generateFakeJWT(payloadObj: object): string {
        const header = {
            alg: 'HS256',
            typ: 'JWT',
        };

        const headerEncoded = base64url(JSON.stringify(header));
        const payloadEncoded = base64url(JSON.stringify(payloadObj));
        const signature = 'fake-signature';

        return `${headerEncoded}.${payloadEncoded}.${signature}`;
    }

    const handleGenerateToken = (username: string) => {
        const payload = {
            username: username,
            role: 'user',
            exp: Math.floor(Date.now() / 1000) + 3 * 60
        };

        const token = generateFakeJWT(payload);
        console.log("JWT :", token);
        setToken(token);
        localStorage.setItem('token', token);
    };

    const decodedToken: string = () => {
        const currentToken = localStorage.getItem('token');
        const [, payloadPart] = currentToken!.split('.');
        const decoded = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
        console.log("Decoded payload :", decoded);
        return decoded;
    }

    const login = async (email: string, rawPassword: string) => {
        const user = await getUserByEmail(email)
       if (!user) {
           setSnackMessage("Wrong User or password");
           setSnackStatus("error");
           setOpenSnack(true);
           return;
       }

       if (await bcrypt.compare(rawPassword, user.passwordHash)){
           setUser(user)
           setIsLogged(true);
           handleGenerateToken(user.username);
           setSnackMessage(`Welcome ${user.username} !`);
           setSnackStatus("success");
           setOpenSnack(true);
           return;
       }
        setSnackMessage("Wrong User or password");
        setSnackStatus("error");
        setOpenSnack(true);
        return;
    }

    const logout = () => {
        setUser(null);
        setIsLogged(false);
        setSnackMessage(`Goodbye !`);
        setSnackStatus("info");
        setOpenSnack(true);
        return;
    }

    const register = async (username: string, email: string, password: string) => {
        if (await getUserByEmail(email)) {
            setSnackMessage("Email already used!");
            setSnackStatus("error");
            setOpenSnack(true);
            return;
        }
        const hash = await bcrypt.hash(password, 10);

        const newUser: Omit<User, "id"> = {
            username: username,
            email: email,
            passwordHash: hash,
        };
        const inserted = await Add("users", newUser);
        console.log("Utilisateur ajouté :", inserted);
        setSnackMessage("Registration successful");
        setSnackStatus("success");
        setOpenSnack(true);
        return;
    };

    return (
        <>
            <AuthContext.Provider value={{isLogged, user, login, logout, register, setOpenLoginDialog}}>
                {children}
                    <LoginForm open={openLoginDialog} setOpen={setOpenLoginDialog}/>
                    <MySnackBar open={openSnack} setOpen={setOpenSnack} color={snackStatus}
                            message={snackMessage}></MySnackBar>
            </AuthContext.Provider>
        </>
    )
}