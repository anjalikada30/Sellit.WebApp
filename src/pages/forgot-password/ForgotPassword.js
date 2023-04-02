import React from 'react';
import { Grid, Paper, Box, Avatar, TextField, Button, Typography, Link, Alert, Snackbar } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../store/actions/auth';
import { Loader, ResetPassword, Success } from '../../components';
import { NewPassword } from '../../components/newPassword';
import userService from '../../services/user.service';

const ForgotPassword = () => {
    const paperStyle = { padding: 20, height: '55vh', width: 280, margin: "60px auto" }
    const [user, setUser] = useState({
        mobile: "",
        userId: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [snackDetails, setSnackDetails] = useState({})
    const [showResetPassword, setShowResetPassword] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const isPhone = /^[5-9]\d{9}$/gi;

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const checkValidation = (name, value) => {
        let errors = {};
        if (name === 'mobile') {
            if (!value) {
                errors = {
                    ...validationErrors,
                    mobile: "This field is required."
                }
            } else if (!isPhone.test(value)) {
                errors = {
                    ...validationErrors,
                    mobile: "Please enter a valid phone number."
                }
            } else {
                errors = {
                    ...validationErrors,
                    mobile: null
                }
            }
        } else if (name === 'password') {
            if (!value) {
                errors = {
                    ...validationErrors,
                    password: "This field is required."
                }
            } else if (value.length < 6) {
                errors = {
                    ...validationErrors,
                    password: "Minimum 6 characters required."
                }
            } else if (value.length > 20) {
                errors = {
                    ...validationErrors,
                    password: "Maximum 20 characters are allowed."
                }
            } else {
                errors = {
                    ...validationErrors,
                    password: null
                }
            }
        } else if (name === 'confirmPassword') {
            if (!value) {
                errors = {
                    ...validationErrors,
                    confirmPassword: "This field is required."
                }
            } else if (value !== user.password) {
                errors = {
                    ...validationErrors,
                    confirmPassword: "Maximum 20 characters are allowed."
                }
            } else if (value.length < 6) {
                errors = {
                    ...validationErrors,
                    confirmPassword: "Minimum 6 characters required."
                }
            } else if (value.length > 20) {
                errors = {
                    ...validationErrors,
                    confirmPassword: "Maximum 20 characters are allowed."
                }
            } else {
                errors = {
                    ...validationErrors,
                    confirmPassword: null
                }
            }
        } else if (name === 'otp') {
            if (!value) {
                errors = {
                    ...validationErrors,
                    otp: "This field is required."
                }
            } else if (value.length < 4) {
                errors = {
                    ...validationErrors,
                    otp: "Minimum 4 characters required."
                }
            } else {
                errors = {
                    ...validationErrors,
                    otp: null
                }
            }
        }
        return errors;
    }

    const handleChange = e => {
        setValidationErrors(checkValidation(e.target.name, e.target.value))
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleMobileSubmit = async (event) => {
        event.preventDefault();
        if (user.mobile) {
            setLoading(true)
            try {
                const response = await userService.forgotPassword({
                    mobile: user.mobile
                })
                setLoading(false)
                setShowResetPassword(true)
                setUser({
                    ...user,
                    userId: response?.data?.response?.userId
                })
            }
            catch (err) {
                setLoading(false)
                setSnackDetails({
                    show: true,
                    severity: 'error',
                    message: err?.response?.data?.message
                })
            }
        }
    }
    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (true) {
            setLoading(true)
            try {
                const response = await userService.resetPassword({
                    userId: user.userId,
                    otp: user.otp,
                    password: user.password
                })
                setLoading(false)
                setShowResetPassword(false)
                setUser({
                    ...user,
                    userId: response?.data?.response?.userId
                })
                setShowSuccess(true)
            }
            catch (err) {
                setLoading(false)
                setSnackDetails({
                    show: true,
                    severity: 'error',
                    message: err?.response?.data?.message
                })
            }
        }
    }
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
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
    return (
        <>
            {
                !showResetPassword ?
                    <NewPassword
                        user={user}
                        errors={validationErrors}
                        handleChange={handleChange}
                        handleSubmit={handleMobileSubmit} /> : null
            }
            {
                showResetPassword ?
                    <ResetPassword
                        user={user}
                        errors={validationErrors}
                        handleChange={handleChange}
                        handleSubmit={handleResetPassword}
                        setLoading={setLoading}
                        setSnackDetails={setSnackDetails} /> : null
            }
            {
                showSuccess ?
                    <Success text={"Password reset successful!"} /> : null
            }
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

export default ForgotPassword