import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {Avatar, Menu, MenuItem} from "@mui/material";
import {useAuth} from "@hooks/auth/use-auth.hook";
import { useRouter } from 'next/router';


const MainHeaderComponent = () => {
    const router = useRouter();
    const { actions } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpened = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout(){
        actions?.logout();
    }

    const menuOptions = [
        { name: 'Perfil', action: () => router.push('/profile')},
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
                    <Avatar src="" onClick={handleClick}/>
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