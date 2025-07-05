import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./themes.tsx";
import {BrowserRouter} from "react-router";
import {FavoriteProvider} from "./context/FavoriteContext.tsx";
import {SeenProvider} from "./context/SeenContext.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <FavoriteProvider>
                        <SeenProvider>
                                <App/>
                                <CssBaseline/>
                        </SeenProvider>
                    </FavoriteProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
