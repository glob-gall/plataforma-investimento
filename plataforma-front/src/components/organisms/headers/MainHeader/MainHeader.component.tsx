import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {Avatar, Menu, MenuItem} from "@mui/material";
import {useRouter} from "next/router";
import {destroyCookie} from "nookies";
import {TOKEN_KEY} from "@constants/constants";


const MainHeaderComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const menuOpened = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout(){
        router.push('/login');
        destroyCookie(null, TOKEN_KEY, { path: '/' })
    }

    const menuOptions = [
        { name: 'Perfil', action: () => null},
        { name: 'Sair', action: () => logout()},
    ]

    return(
        <MuiAppBar position="fixed">
            <Toolbar>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <Typography variant="h6" noWrap component="div">
                        Oink!
                    </Typography>
                </Box>
                <Box>
                    <Avatar src="/static/images/avatar/1.jpg" onClick={handleClick}/>
                    <Menu
                        id="user-menu"
                        aria-labelledby="user-menu-btn"
                        anchorEl={anchorEl}
                        open={menuOpened}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {
                            menuOptions.map((option, index) => (
                                <MenuItem key={index} onClick={option.action}>{option.name}</MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </MuiAppBar>
    )
}

export default MainHeaderComponent