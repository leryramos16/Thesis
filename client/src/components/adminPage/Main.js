import * as React from 'react';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

//Pages
import Employee from './Employee';
import Dashboard from './Dashboard';

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
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
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
        ],
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
    const [pathname, setPathname] = React.useState(initialPath);

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
            <CloudCircleIcon fontSize="large" color="primary" />
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

const Main = (props) => {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    const [session, setSession] = React.useState({
        user: {
            name: 'AAAA AAAa',
            email: 'sample@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'AAAA AAAa',
                        email: 'sample@outlook.com',
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    //const demoWindow = window ? window() : undefined;
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            session={session}
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
            </DashboardLayout>
        </AppProvider>
    );
}

export default Main;