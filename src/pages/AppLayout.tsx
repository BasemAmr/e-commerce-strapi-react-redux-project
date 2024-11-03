import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RootLayout: React.FC = () => {

    return (
            <Box pt={16}>
                
                <NavBar />
                <Outlet />
            </Box>
    );
};

export default RootLayout;