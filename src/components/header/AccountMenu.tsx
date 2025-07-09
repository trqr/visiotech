import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {useAuth} from "../../context/useAuth.tsx";
import {useFav} from "../../context/useFav.tsx";
import {useSeen} from "../../context/useSeen.tsx";
import ThemeSwitch from "./ThemeSwitch.tsx";
import {Avatar, IconButton, useTheme} from "@mui/material";

export default function AccountMenu() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    // @ts-expect-error okk
    const {clearFavorites} = useFav()
    // @ts-expect-error okk
    const {clearSeen} = useSeen()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);



    const handleLogout = () => {
        logout()
        clearFavorites();
        clearSeen();
    }

    function stringAvatar(name: string) {
        const nameParts = name.trim().split(' ');

        return {
            sx: {
                bgcolor: `${theme.palette.primary.main}`,
            },
            children: nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : `${nameParts[0][0]}`,
        };
    }

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                    <Avatar {...stringAvatar(user!.username)}
                />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper sx={{zIndex: 20}}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem><ThemeSwitch></ThemeSwitch></MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
