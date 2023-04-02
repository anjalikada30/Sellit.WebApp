import React from 'react';
import { Grid, Paper, TextField, Button, Alert, Link } from '@mui/material'

const NewPassword = ({ user, handleChange, errors, handleSubmit, message }) => {
    const paperStyle = { padding: 20, width: 280, margin: "60px auto" }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h3>Forgot Password</h3>
                        <h4 style={{ color: "green" }}></h4>
                    </Grid>

                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            label="Enter mobile number"
                            onChange={handleChange}
                            variant="outlined"
                            name="mobile"
                            size="small"
                            type="text"
                            fullWidth
                            required
                            value={user.mobile}
                            helperText={errors.mobile}
                            error={errors.mobile}
                        />
                        {
                            message ?
                                <Alert severity="error" sx={{ marginTop: 1 }}>
                                    {message}
                                </Alert> : null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={errors.mobile}
                        >
                            Submit
                        </Button>
                    </form>
                    <Grid container style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
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
            </Grid >
        </>
    )
}

export default NewPassword