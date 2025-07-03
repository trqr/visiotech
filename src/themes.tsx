import {createTheme} from "@mui/material";

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#a82626',
                },
                secondary: {
                    main: '#c32581',
                },
                background: {
                    default: '#f5f5f5',
                },
                text: {
                    primary: '#000000',
                    secondary: '#000000',
                },
                divider: '#d67e28',
                action: {}
            },
        },
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#d67e28',
                },
                secondary: {
                    main: '#a65709',
                },
            },
        },
    },
});

export default theme;