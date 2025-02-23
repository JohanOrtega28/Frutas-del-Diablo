import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AuthLayout = ({ title, children, titleStyle }) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" style={titleStyle}>
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;
