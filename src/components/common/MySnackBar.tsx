import * as React from 'react';
import Snackbar, {type SnackbarCloseReason} from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/material";

type SimpleSnackbarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    color: "success" | "error" | "info" | "warning";
}

export default function SimpleSnackbar({open, setOpen, message, color}: SimpleSnackbarProps) {

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity={color}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert></Snackbar>
        </div>
    );
}