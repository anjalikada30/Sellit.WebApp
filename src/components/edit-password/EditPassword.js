import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { proofTypes } from '../../data/proofTypes';

const EditPassword = ({
    formValues,
    handleChange,
    handleClose,
    handleEdit,
    passwordMessage
}) => {
    const { currentPassword, newPassword, confirmNewPassword } = formValues;
    const margin = "normal";
    const variant = "outlined";
    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () =>
            Object.keys({ currentPassword, newPassword, confirmNewPassword }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [currentPassword, newPassword, confirmNewPassword]
    );

    return (
        <>
            <Grid container spacing={2}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    placeholder="current password"
                    type="password"
                    size='small'
                    value={currentPassword.value}
                    onChange={handleChange}
                    error={!!currentPassword.error}
                    helperText={currentPassword.error}
                    required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    placeholder="new password"
                    type="password"
                    size='small'
                    value={newPassword.value}
                    onChange={handleChange}
                    error={!!newPassword.error}
                    helperText={newPassword.error}
                    required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    placeholder="confirm new password"
                    type="text"
                    size='small'
                    value={confirmNewPassword.value}
                    onChange={handleChange}
                    error={!!confirmNewPassword.error}
                    helperText={confirmNewPassword.error}
                    required
                />
            </Grid>
            {
                passwordMessage ?
                    <Alert severity="error" sx={{ marginTop: 1 }}>
                        {passwordMessage}
                    </Alert> : null
            }
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

export default EditPassword;