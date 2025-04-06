import React, { useState, useEffect, useContext } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

//Pages
import Login from './Login';
import Employee from './Employee';
import Dashboard from './Dashboard';
import Users from './User';
import Booking from './Booking';
import Inventory from './Inventory';

//Context
import UserContext from '../context/UserContext';

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Manage People',
    },
    {
        segment: 'employees',
        title: 'Employees',
        icon: <GroupIcon />,
    },
    {
        segment: 'users',
        title: 'Users',
        icon: <SupervisedUserCircleIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reservation',
        title: 'Reservation',
        icon: <BookOnlineIcon />,
    },
    {
        segment: 'Employee Monitoring',
        title: 'Employee Monitoring',
        icon: <ListAltIcon />,
    },
    {
        segment: 'inventory',
        title: 'Inventory',
        icon: <InventoryIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

function CustomAppTitle() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <AdminPanelSettingsIcon fontSize="large" color="primary" />
            <Typography variant="h6">Celebrity Styles Hair Salon</Typography>
            <Chip size="small" label="Admin" color="info" />
            <Tooltip title="Connected to production">
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip>
        </Stack>
    );
}

function SidebarFooter({ mini }) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© CHS' : `© ${new Date().getFullYear()} Celebrity Styles Hair Salon`}
        </Typography>
    );
}

const Content = (props) => {
    const { window } = props;
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [loader, setLoader] = useState(true);
    //const { userData, setUserData } = useContext(UserContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [pageName, setPageName] = useState("Employee");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const router = useDemoRouter('/dashboard');

    const [session, setSession] = useState({
        user: {
            name: '',
            email: '',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: name,
                        email: role,
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                setSession(null);
                setUserData({
                    token: undefined,
                    user: undefined
                });
                sessionStorage.setItem("auth-token", "");
                sessionStorage.setItem("userData", "");
                sessionStorage.setItem("user", "");
                sessionStorage.setItem("page", "Employee");
                navigate("/");
            },
        };
    }, []);

    useEffect(() => {
        const data = sessionStorage.getItem("userData");
        if (data) setUserData(JSON.parse(data));
    }, []);


    useEffect(() => {
        const data = sessionStorage.getItem('page');
        if (data) setPageName(data);

        const user = JSON.parse(sessionStorage.getItem('user'));
        setRole(user.role);
        setName(user.Name);
        setSession({
            user: {
                name: name,
                email: role,
                image: 'https://avatars.githubusercontent.com/u/19550456',
            },
        });
    }, []);

    useEffect(() => {
        sessionStorage.setItem('page', pageName);
    });

    //const demoWindow = window ? window() : undefined;
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            session={{
                user: {
                    name: name,
                    email: role,
                    image: <AdminPanelSettingsIcon/>,
                }
            }}
            authentication={authentication}
        //window={demoWindow}
        >
            <DashboardLayout defaultSidebarCollapsed
                slots={{
                    appTitle: CustomAppTitle,
                    sidebarFooter: SidebarFooter,
                }}
            >
                {router.pathname === "/employees" &&
                    <Employee />
                }

                {router.pathname === "/dashboard" &&
                    <Dashboard />
                }

                {router.pathname === "/users" &&
                    <Users />
                }

                {router.pathname === "/reservation" &&
                    <Booking />
                }

                {router.pathname === "/inventory" &&
                    <Inventory />
                }
            </DashboardLayout>
        </AppProvider>

    );
}

export default Content;