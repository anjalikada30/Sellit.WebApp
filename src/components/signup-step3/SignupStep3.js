import { Box, Button, Divider, Grid, TextField } from '@mui/material';
import React from 'react';

const SignupStep3 = ({
    formValues,
    handleSignup,
    handleBack,
    handleChange
}) => {
    const { bankAccountNumber, ifscCode, accountHolderName, UPI } = formValues;
    const margin = "normal";
    const variant = "outlined";
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Account Holder Name"
                        name="accountHolderName"
                        placeholder="Your account name"
                        type="text"
                        size='small'
                        value={accountHolderName.value}
                        onChange={handleChange}
                        error={!!accountHolderName.error}
                        helperText={accountHolderName.error}
                        required={accountHolderName.required}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Account Number"
                        name="bankAccountNumber"
                        placeholder="Your account number"
                        type="text"
                        size='small'
                        value={bankAccountNumber.value}
                        onChange={handleChange}
                        error={!!bankAccountNumber.error}
                        helperText={bankAccountNumber.error}
                        required={bankAccountNumber.required}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="IFSC Code"
                        name="ifscCode"
                        placeholder="Your ifsc code"
                        type="text"
                        size='small'
                        value={ifscCode.value}
                        onChange={handleChange}
                        error={!!ifscCode.error}
                        helperText={ifscCode.error}
                        required={ifscCode.required}
                    />
                </Grid>
            </Grid>
            <Divider>OR</Divider>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="UPI ID"
                        name="UPI"
                        placeholder="Your UPI"
                        type="text"
                        size='small'
                        value={UPI.value}
                        onChange={handleChange}
                        error={!!UPI.error}
                        helperText={UPI.error}
                        required={UPI.required}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignup}
                >
                    Signup 
                </Button>
            </Box>
        </>
    )
}

export default SignupStep3;