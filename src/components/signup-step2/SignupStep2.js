import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { proofTypes } from '../../data/proofTypes';

const SignupStep2 = ({
    formValues,
    handleNext,
    handleBack,
    handleChange,
    action,
    handleClose,
    handleEdit
}) => {
    const { identityProofType, identityProofNumber, identityProofImageUri } = formValues;
    const margin = "normal";
    const variant = "outlined";
    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () =>
            Object.keys({ identityProofType, identityProofNumber, identityProofImageUri }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [identityProofType, identityProofNumber, identityProofImageUri]
    );
    
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} sx={{ pt: "5px" }}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Identity Proof Type"
                        name="identityProofType"
                        size='small'
                        value={identityProofType.value}
                        onChange={handleChange}
                        error={!!identityProofType.error}
                        helperText={identityProofType.error}
                        required={identityProofType.required}
                    >
                        <option value="" key={"NA"}></option>
                        {
                            proofTypes.map(proof => (
                                <option value={proof.code} key={proof.code}>{proof.name}</option>
                            ))
                        }
                    </TextField>
                </Grid>
                {
                    identityProofType.value ?
                        <Grid item xs={12} sm={9}>
                            <TextField
                                variant={variant}
                                margin={margin}
                                fullWidth
                                label={identityProofType.value === "AA" ? "Aadhar Number" : "Permanent Account Number(PAN)"}
                                name="identityProofNumber"
                                placeholder="Your proof number"
                                type="text"
                                size='small'
                                value={identityProofNumber.value}
                                onChange={handleChange}
                                error={!!identityProofNumber.error}
                                helperText={identityProofNumber.error}
                                required={identityProofNumber.required}
                            />
                        </Grid> : null
                }
                {
                    identityProofType.value ?
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleChange(event, "identityProofImageUri")}
                                    hidden
                                />
                            </Button>
                            <Typography variant='span' sx={{ ml: 1 }}>
                                {formValues.identityProofImageUri.value?.name}
                            </Typography>
                        </Grid> : null
                }
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
                            disabled={isError()}
                            color="primary"
                            onClick={!isError() ? handleNext : () => null}
                        >
                            Next
                        </Button> : null
                }

            </Box>
        </>
    )
}

export default SignupStep2;