import React, { useState } from 'react';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Loader, SwipeableTextMobileCarousel } from '../../components';
import { Alert, AlertTitle, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/auth'

const images = [
    {
        id: 1,
        label: 'Sell your product anytime',
        imgPath: image1,
    },
    {
        id: 2,
        label: 'Sell your product anytime',
        imgPath: image2,
    },
    {
        id: 3,
        label: 'Sell your product anytime',
        imgPath: image3,
    },
    {
        id: 4,
        label: 'Sell your product anytime',
        imgPath: image4,
    },
];

function Login() {
    const [values, setValues] = useState({
        mobile: ""
    });
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const mobileregex = /^[5-9]\d{9}$/gi;
    const error = !mobileregex.test(values.mobile);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        height: "65vh"
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!error) {
            setLoading(true)
            dispatch(login(values.mobile))
                .then(() => {
                    setLoading(false)
                    navigate("/verify-otp")
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }
    return (
        <>
            <div className='page-container'>
                <Grid container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '88vh' }}>
                    <Grid item md={4} display={{ xs: "none", lg: "block", md: "block" }} >
                        <Item><SwipeableTextMobileCarousel images={images} /></Item>
                    </Grid>
                    <Grid item xs={11} sm={6} md={3}>
                        <Item>
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h6" variant="h6">
                                    Sign in
                                </Typography>
                                {
                                    message ?
                                        <Alert severity="error">
                                            {message}
                                        </Alert> : null
                                }
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Phone Number"
                                        name="mobile"
                                        autoComplete="mobile"
                                        size='small'
                                        value={values.mobile}
                                        onChange={handleChange("mobile")}
                                        helperText={error ? "Please enter valid phone number" : ""}
                                        error={error}
                                        autoFocus
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send otp
                                    </Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link href="/sign-up" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </div>
            {
                loading ?
                    <Loader /> : null
            }
        </>
    )
}

export default Login;