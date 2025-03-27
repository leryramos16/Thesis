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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import axios from "axios";

//Pages
import Login from './Login';
import Content from './Content';

//Context
import UserContext from '../context/UserContext';

const Main = (props) => {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoader(false), 2000)
    }, [loader, setLoader]);

    useEffect(() => {
        const data = sessionStorage.getItem("userData");
        if (data) setUserData(JSON.parse(data));
    }, []);

    useEffect(() => {
        var route = "login/tokenIsValid";
        var url = window.apihost + route;
        const checkLogin = async () => {
            let token = sessionStorage.getItem("auth-token");
            if (token === null) {
                sessionStorage.setItem("auth-token", "");
                token = "";
                setUserData({
                    token: undefined,
                    user: undefined,
                });
            }
            const response = await axios.post(url,
                null,
                { headers: { "x-auth-token": token } }
            );
            if (response.data) {
                console.log(response.data);
                const user = await axios.get(url,
                    {
                        headers: { "x-auth-token": token },
                    });
                setUserData({
                    token,
                    user: response.data,
                });
            }
        };

        checkLogin();
    }, []);

    //const demoWindow = window ? window() : undefined;
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {loader === false && userData.user &&
                <Content />
            }

            {loader === false && !userData.user &&
                <Login />
            }
        </UserContext.Provider>
    );
}

export default Main;