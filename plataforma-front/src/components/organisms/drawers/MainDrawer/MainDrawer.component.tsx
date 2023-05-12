import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from "react";
import {AccountBalance, Home, PointOfSale} from "@mui/icons-material";
import {useRouter} from "next/router";
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const MainDrawerComponent = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);


    const drawerOptions = [
        { name: 'Início', icon: () => <Home />, action: () => router.push('/dashboard')},
        { name: 'Instituições', icon: () => <AccountBalance />, action: () => router.push('/instituicoes') },
        { name: 'Movimentações', icon: () => <PointOfSale />, action: () => router.push('/movimentacoes')},
    ]

    const handleDrawerClose = () => {
        setOpen(!open);
    };
    return(
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {drawerOptions.map(({name, icon, action}, index) => (
                    <Tooltip title={name} placement="right" arrow TransitionComponent={Zoom} disableHoverListener={open} key={name}>
                        <ListItem key={name + index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={action}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon()}
                                </ListItemIcon>
                                <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}

export default MainDrawerComponent