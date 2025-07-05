import {createContext, useState, type ReactNode, type Dispatch, type SetStateAction} from "react";
import LoginForm from "../components/auth/LoginForm";
import {Add, getUserByEmail} from "../db/indexedDb.service.tsx";
import bcrypt from "bcryptjs";
import type {User} from "../@types/User.ts";
import {useFav} from "./useFav.tsx";

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

    const login = async (email: string, rawPassword: string) => {
        const user = await getUserByEmail(email)
       if (!user) { return console.log("Wrong User or password") }

       if (await bcrypt.compare(rawPassword, user.passwordHash)){
           setIsLogged(true);
           setUser(user)
           return console.log(`Welcome ${user.username} !`)
       }
        return console.log("Wrong User or password");
    }

    const logout = () => {
        setUser(null);
        setIsLogged(false);
    }

    const register = async (username: string, email: string, password: string) => {
        if (await getUserByEmail(email)) {
            return console.log("Email already used");
        }
        const hash = await bcrypt.hash(password, 10);

        const newUser: Omit<User, "id"> = {
            username: username,
            email: email,
            passwordHash: hash,
        };
        const inserted = await Add("users", newUser);
        console.log("Utilisateur ajouté :", inserted);
    };

    return (
        <>
            <AuthContext.Provider value={{isLogged, user, login, logout, register, setOpenLoginDialog}}>
                {children}
                    <LoginForm open={openLoginDialog} setOpen={setOpenLoginDialog}/>
            </AuthContext.Provider>
        </>
    )
}