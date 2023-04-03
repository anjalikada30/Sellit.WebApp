import { Alert, Box, Button, Divider, Grid, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { bankTypes } from '../../data/bankTypes';

const SignupStep3 = ({
    formValues,
    handleSignup,
    handleBack,
    handleChange,
    action,
    handleClose,
    handleEdit
}) => {
    const { bankAccountNumber, ifscCode, accountHolderName, UPI, bankType } = formValues;
    const { signupmessage } = useSelector(state => state.message);
    const margin = "normal";
    const variant = "outlined";

    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () => {
            if (bankType.value === "1") {
                return Object.keys({ bankAccountNumber, ifscCode, accountHolderName, bankType }).some(
                    (name) =>
                        (formValues[name].required && !formValues[name].value) ||
                        formValues[name].error
                )
            } else return Object.keys({ UPI, bankType }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            )
        },
        [bankAccountNumber, ifscCode, accountHolderName, UPI, bankType]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Bank Type"
                        name="bankType"
                        size='small'
                        value={bankType?.value}
                        onChange={handleChange}
                        error={!!bankType?.error}
                        helperText={bankType?.error}
                        required={bankType?.required}
                    >
                        <option value="" key={"NA"}></option>
                        {
                            bankTypes.map(proof => (
                                <option value={proof.code} key={proof.code}>{proof.name}</option>
                            ))
                        }
                    </TextField>
                </Grid>
                {
                    bankType?.value === "1" ?
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
                        </Grid> : null
                }
                {
                    bankType?.value === "1" ?
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
                        </Grid> : null
                }
                {
                    bankType?.value === "1" ?
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
                        </Grid> : null
                }
            </Grid>
            {
                bankType?.value === "2" ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ pt: "5px" }}>
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
                    </Grid> : null
            }
            {
                signupmessage ?
                    <Alert severity="error" sx={{ marginTop: 1 }}>
                        {signupmessage}
                    </Alert> : null
            }
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                {
                    action !== 'edit' ?
                        <Button onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button> : null
                }
                {
                    action !== 'edit' ?
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignup}
                        >
                            Signup
                        </Button> : null
                }

                {
                    action === 'edit' ?
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={isError()}
                            color="primary"
                            onClick={!isError() ? handleEdit : () => null}
                        >
                            Edit
                        </Button> : null
                }
                {
                    action === 'edit' ?
                        <Button
                            variant="outlined"
                            sx={{ mt: 3, ml: 1 }}
                            color="error"
                            onClick={handleClose}
                        >
                            Close
                        </Button> : null
                }
            </Box>
        </>
    )
}

export default SignupStep3;