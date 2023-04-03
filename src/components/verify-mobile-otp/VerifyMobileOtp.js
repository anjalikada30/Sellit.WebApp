import React from 'react';
import { Grid, Paper, Box, Avatar, TextField, Button, Typography, Alert, Snackbar, ButtonBase } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const VerifyMobileOtp = ({ formValues, handleSubmit, otpmessage, handleResendOtp, handleClose }) => {
    const [user, setUser] = useState({
        otp: "",

    });
    const [validationError, setValidationError] = useState();

    const handleChange = e => {
        if (!e.target.value) {
            setValidationError("This field is required.")
        } else if (e.target.value.length < 4) {
            setValidationError("Minimum 4 characters required.")
        } else {
            setValidationError(null)
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Timer 
    const [counter, setCounter] = React.useState(59);
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    // const handleResendOtp = () => {
    //     setLoading(true)
    //     dispatch(resendOtp({
    //         userId: userId
    //     }))
    //         .then((response) => {
    //             setLoading(false)
    //             setSnackDetails({
    //                 show: true,
    //                 severity: 'success',
    //                 message: response.message
    //             })
    //             setCounter(59)
    //         })
    //         .catch((error) => {
    //             setLoading(false)
    //         })
    // }

    return (
        <>
            <Grid align='center'>
                <Box color="text.secondary">
                    <Typography variant="body2">
                        Enter OTP Sent to your mobile number XXXXXX{formValues?.mobile?.value?.substring(6, 11)}
                        <Button variant='text' style={{ marginLeft: 2 }}>
                            {"Change"}
                        </Button>
                    </Typography>
                </Box>
            </Grid><br />

            <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(user.otp)
            }} noValidate>
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
                    helperText={validationError}
                    error={validationError}
                />
                {
                    otpmessage ?
                        <Alert severity="error" sx={{ marginTop: 1 }}>
                            {otpmessage}
                        </Alert> : null
                }
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={validationError}
                        onClick={() => handleSubmit(user.otp)}
                        style={{ height: "35px" }}
                    >
                        Verify
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mt: 3, ml: 1 }}
                        color="error"
                        onClick={handleClose}
                        style={{ height: "35px" }}
                    >
                        Close
                    </Button>
                </Box>
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
                    </Typography> : null
            }

        </>
    )
}

export default VerifyMobileOtp