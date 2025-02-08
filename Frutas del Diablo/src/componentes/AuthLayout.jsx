import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const AuthLayout = ({ title, children }) => {
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
                {children}
            </Paper>
        </Container>
    );
};

export default AuthLayout;
