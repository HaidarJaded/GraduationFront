import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { BarChart, Devices } from "@mui/icons-material";
import DevicesIcon from "@mui/icons-material/Devices";
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { Handshake } from "lucide-react";
import { Logout } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { MdOutlineSendToMobile } from "react-icons/md";
import { authServices } from '../Routes/api/auth/auth-service';
import { useRouter } from "next/router";
import { Notify} from "/utils";



//=====================================================

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

export function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const router = useRouter();

    const handleLogout = async () => {
        const response = await authServices.logout()

        if (response?.status == 200) {
            Notify("colored", 'You have been logged out successfully.', "success");
            await router.push('/auth/login');
        }
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        <Image
                            src="/assets/images/svg/logo-no-background.png"

                            alt="Description of the image"
                            width={145}
                            height={58}
                            fill={0}
                            loading='lazy'
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '90%',
                                transform: 'translate(-50%,-50%)',
                                zIndex: '-1',
                                maxWidth: '737px',
                                margin: 5

                            }}
                        />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ direction: 'rlt' }}>
                    {[
                        { text: 'الصفحة الرئيسية', link: '/Dashboard', icon: <HomeIcon color="#442d5d" /> }, // Example icon for the homepage
                        { text: 'الأجهزة', link: '/devices', icon: <DevicesIcon sx={{ color: "#442d5d" }} /> },
                        { text: 'الأجهزة التي تم تسليمها', link: '/completedDevices', icon: <MdOutlineSendToMobile style={{ color: "#442d5d" }} size={30} /> },
                        { text: 'عمّال التوصيل', link: '/deliveries', icon: <GroupsIcon sx={{ color: "#442d5d" }} /> }, // Example icon for devices
                        { text: 'الفنيين', link: '/technicians', icon: <EngineeringRoundedIcon sx={{ color: "#442d5d" }} /> }, // Example icon for technicians
                        { text: 'العملاء', link: '/clients', icon: <Handshake color="#442d5d" /> },
                        { text: 'الخدمات', link: '/services', icon: <MiscellaneousServicesIcon sx={{ color: "#442d5d" }} /> },
                        { text: 'الطلبات', link: '/orders', icon: <RoomServiceIcon sx={{ color: "#442d5d" }}/> },// Example icon for customers
                        { text: 'البريد', link: '/mail', icon: <MailIcon sx={{ color: "#442d5d" }} /> }, // Example icon for mail
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <Link href={item.link} passHref>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        textDecoration: 'none', // Ensure no default text decoration
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon} {/* Render the icon component */}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{

                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                bgcolor: open ? 'rgb(60 57 85 / 60%)' : 'white'
                            }}
                            onClick={handleLogout}
                        >

                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#442d5d'

                            }}>
                                <Logout />
                            </ListItemIcon>

                            <ListItemText primary='تسجيل الخروج' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}