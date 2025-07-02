import {createTheme} from "@mui/material";

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#d67e28',
                },
                secondary: {
                    main: '#a65709',
                },
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