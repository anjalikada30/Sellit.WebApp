import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { proofTypes } from '../../data/proofTypes';

const EditUserMobile = ({
    formValues,
    handleChange,
    handleClose,
    handleEdit
}) => {
    const { mobile } = formValues;
    const margin = "normal";
    const variant = "outlined";
    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () =>
            Object.keys({ mobile }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [mobile]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item >
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
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isError()}
                    color="primary"
                    onClick={!isError() ? handleEdit : () => null}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    sx={{ mt: 3, ml: 1 }}
                    color="error"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Box>
        </>
    )
}

export default EditUserMobile;