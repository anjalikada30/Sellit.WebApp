import React from 'react';
import { Grid, Paper, Box, Avatar, TextField, Button, Typography, Link, Alert, Snackbar } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../../store/actions/auth';
import { Loader } from '../../components';

const VerifyOtp = () => {
    const paperStyle = { padding: 20, height: '55vh', width: 280, margin: "60px auto" }
    const [user, setUser] = useState({
        otp: "",

    });
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(false)
    const [snackDetails, setSnackDetails] = useState({})
    let navigate = useNavigate();
    const { userId, mobile } = useSelector(state => state.auth);
    const { otpmessage } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.otp) {
            setLoading(true)
            dispatch(verifyOtp({
                otp: user.otp,
                userId: userId
            }))
                .then(() => {
                    setLoading(false)
                    navigate("/home")
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }

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
            userId: userId
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
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h3>Verify OTP</h3>
                        <h4 style={{ color: "green" }}></h4>
                        <Box color="text.secondary">
                            <Typography variant="body2">
                                Enter OTP Sent to your mobile number XXXXXX{mobile?.substring(6, 11)}
                                <Link href="/" variant="body2" sx={{ marginLeft: 2 }}>
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
                            inputProps={{ maxLength: 4 }}
                            name="otp"
                            size="small"
                            type="text"
                            fullWidth
                            required
                            value={user.otp}
                            helperText={validationError ? "OTP is required" : null}
                            error={validationError}
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
                            Verify
                        </Button>
                    </form>
                    {
                        counter !== 0 ?
                            <Box mt={1} >
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
                </Paper>
            </Grid>
            {
                loading ?
                    <Loader /> : null
            }
            <Snackbar open={snackDetails.show}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity={snackDetails.severity}
                    sx={{ width: '100%' }}>
                    {snackDetails.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default VerifyOtp