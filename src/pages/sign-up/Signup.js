import { Container, Paper } from '@mui/material';
import React from 'react';
import { SignupForm } from '../../components';

const Signup = () => {
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
                elevation={10}
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <SignupForm />
            </Paper>
        </Container>
    )
}

export default Signup;