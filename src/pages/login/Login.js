import React, { useState } from 'react';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3L.jpg';
import image4 from '../../assets/image4L.jpg';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Loader, SwipeableTextMobileCarousel } from '../../components';
import { Alert, AlertTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/auth'
import { Home } from '../home'

const images = [
    {
        id: 1,
        label: 'Sell your product anytime',
        uri: image1,
    },
    {
        id: 2,
        label: 'Sell your product anytime',
        uri: image2,
    },
    {
        id: 3,
        label: 'Sell your product anytime',
        uri: image3,
    },
    {
        id: 4,
        label: 'Sell your product anytime',
        uri: image4,
    },
];
const paperStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    //color: theme.palette.text.secondary,
    height: "72vh"
}
function Login() {
    const [values, setValues] = useState({
        mobile: ""
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const mobileregex = /^[5-9]\d{9}$/gi;
    const numberregex = /^[0-9]+$/i;
    const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        height: "72vh"
    }));

    const handleChange = event => {
        if (event.target.name === 'mobile')
            if (!numberregex.test(event.target.value))
                setError({
                    ...error,
                    mobile: !emailregex.test(event.target.value) ? 'Please enter valid email address' : false
                })
            else setError({
                ...error,
                mobile: !mobileregex.test(event.target.value) ? 'Please enter valid phone number' : false
            })
        else if (event.target.name === 'password')
            setError({
                ...error,
                password: !event.target.value || event.target.value.length < 6
            })
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!error.mobile && !error.password) {
            const data = {
                password: values.password
            }
            if (numberregex.test(values.mobile))
                data.mobile = values.mobile
            else data.email = values.mobile
            setLoading(true)
            dispatch(login(data))
                .then(() => {
                    console.log('login success')
                    setLoading(false)
                    navigate("/home")
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            {
                isLoggedIn ?
                    <Home /> :
                    <div className='page-container'>
                        <Grid container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '88vh' }}>
                            <Grid item md={4} display={{ xs: "none", lg: "block", md: "block" }} >
                                <Paper style={paperStyle}>
                                    <SwipeableTextMobileCarousel images={images} />
                                </Paper>
                            </Grid>
                            <Grid item xs={11} sm={6} md={3} >
                                <Paper style={paperStyle}>
                                    <Grid item align='center'>
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h6" variant="h6">
                                            Sign in
                                        </Typography>
                                    </Grid>
                                    {
                                        message ?
                                            <Alert severity="error">
                                                {message}
                                            </Alert> : null
                                    }
                                    <form onSubmit={handleSubmit} noValidate>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Email/Phone Number"
                                            onChange={handleChange}
                                            variant="outlined"
                                            name="mobile"
                                            size="small"
                                            type="text"
                                            fullWidth
                                            value={values.mobile}
                                            helperText={error.mobile ? error.mobile : ""}
                                            error={error.mobile}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type='password'
                                            autoComplete="password"
                                            size='small'
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={error.password ? (!values.password ? "This field is required"
                                                : "Password must be atleast 6 characters") : ""}
                                            error={error.password}
                                        />
                                        <Link to="/forgot-password">
                                            {"Forgot Password"}
                                        </Link>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign in
                                        </Button>
                                    </form>
                                    <Grid container>
                                        <Grid item>
                                            <Link to="/sign-up">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
            }
            {
                loading ?
                    <Loader /> : null
            }
        </>
    )
}

export default Login;