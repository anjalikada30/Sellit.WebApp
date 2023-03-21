import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { states } from '../../data/states';
import './step1.css';

const SignupStep1 = ({
    formValues,
    handleNext,
    handleBack,
    handleChange
}) => {
    const { name, email, mobile, addressLine1, landmark, zipCode, city, state, country } = formValues;
    const margin = "normal";
    const variant = "outlined";
    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () =>
            Object.keys({ name, email, mobile, addressLine1, landmark, zipCode, city, state, country }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [name, email, mobile, addressLine1, landmark, zipCode, city, state, country]
    );
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{pt: "5px"}}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Name"
                        name="name"
                        placeholder="Your name"
                        size='small'
                        value={name.value}
                        onChange={handleChange}
                        error={!!name.error}
                        helperText={name.error}
                        required={name.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="Your email address"
                        type="email"
                        size='small'
                        value={email.value}
                        onChange={handleChange}
                        error={!!email.error}
                        helperText={email.error}
                        required={email.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Phone Number"
                        name="mobile"
                        placeholder="Your phone number"
                        type="mobile"
                        size='small'
                        value={mobile.value}
                        onChange={handleChange}
                        error={!!mobile.error}
                        helperText={mobile.error}
                        required={mobile.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Address Line1"
                        name="addressLine1"
                        placeholder="Your address"
                        type="addressLine1"
                        size='small'
                        value={addressLine1.value}
                        onChange={handleChange}
                        error={!!addressLine1.error}
                        helperText={addressLine1.error}
                        required={addressLine1.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Landmark"
                        name="landmark"
                        placeholder="Your landmark"
                        type="landmark"
                        size='small'
                        value={landmark.value}
                        onChange={handleChange}
                        error={!!landmark.error}
                        helperText={landmark.error}
                        required={landmark.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Zipcode"
                        name="zipCode"
                        placeholder="Your zipcode"
                        type="zipCode"
                        size='small'
                        value={zipCode.value}
                        onChange={handleChange}
                        error={!!zipCode.error}
                        helperText={zipCode.error}
                        required={zipCode.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="City"
                        name="city"
                        placeholder="Your city"
                        type="city"
                        size='small'
                        value={city.value}
                        onChange={handleChange}
                        error={!!city.error}
                        helperText={city.error}
                        required={city.required}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="State"
                        name="state"
                        size='small'
                        value={state.value}
                        onChange={handleChange}
                        error={!!state.error}
                        helperText={state.error}
                        required={state.required}
                    >
                        <option value="" key={"NA"}></option>
                        {
                            states.map(state => (
                                <option value={state.code} key={state.code}>{state.name}</option>
                            ))
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Country"
                        name="country"
                        size='small'
                        value={country.value}
                        onChange={handleChange}
                        error={!!country.error}
                        helperText={country.error}
                        required={country.required}
                        disabled={true}
                    >
                    </TextField>
                </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isError()}
                    color="primary"
                    onClick={!isError() ? handleNext : () => null}
                >
                    Next
                </Button>
            </Box>
        </>
    )
}

export default SignupStep1;