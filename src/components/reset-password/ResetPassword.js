import React from 'react';
import { Grid, Paper, Box, Avatar, TextField, Button, Typography, Link, Alert, Snackbar } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resendOtp } from '../../store/actions/auth';

const ResetPassword = ({ user, handleChange, errors, handleSubmit, setLoading, setSnackDetails }) => {
    const paperStyle = { padding: 20, width: 280, margin: "60px auto" }
    const { otpmessage } = useSelector(state => state.message);
    const dispatch = useDispatch();
    // Timer 
    const [counter, setCounter] = React.useState(59);
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const handleResendOtp = () => {
        setLoading(true)
        dispatch(resendOtp({
            userId: user.userId
        }))
            .then((response) => {
                setLoading(false)
                setSnackDetails({
                    show: true,
                    severity: 'success',
                    message: response.message
                })
                setCounter(59)
            })
            .catch((error) => {
                setLoading(false)
            })
    }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h3>Reset Password</h3>
                        <h4 style={{ color: "green" }}></h4>
                        <Box color="text.secondary">
                            <Typography variant="body2">
                                Enter OTP Sent to your mobile number XXXXXX{user.mobile?.substring(6, 11)}
                                <Link href="/forgot-password" variant="body2" sx={{ marginLeft: 2 }}>
                                    {"Change"}
                                </Link>
                            </Typography>
                        </Box>
                    </Grid><br />

                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            label="Enter 4 Digit OTP"
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            inputProps={{ maxLength: 4 }}
                            name="otp"
                            size="small"
                            type="text"
                            fullWidth
                            required
                            value={user.otp}
                            helperText={errors.otp}
                            error={errors.otp}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Password"
                            name="password"
                            placeholder="password"
                            type="password"
                            size='small'
                            value={user.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            type="text"
                            size='small'
                            value={user.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            required
                        />
                        {
                            otpmessage ?
                                <Alert severity="error" sx={{ marginTop: 1 }}>
                                    {otpmessage}
                                </Alert> : null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                    </form>
                    {
                        counter !== 0 ?
                            <Box>
                                <Typography fontWeight={500} align="center" color='textSecondary'>
                                    Resend OTP in <span style={{ color: "green", fontWeight: "bold" }}> 00:{counter}</span>
                                </Typography>
                            </Box> : null
                    }
                    {
                        counter === 0 ?
                            <Typography align="center">
                                <Button variant="text" onClick={handleResendOtp}>Resend OTP</Button>
                                {/* <Link to="Signup">
                                    <span style={{ marginLeft: "5px" }}> Resend OTP </span>
                                </Link> */}
                            </Typography> : null
                    }
                    <Grid container style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: "3px"
                    }}>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default ResetPassword