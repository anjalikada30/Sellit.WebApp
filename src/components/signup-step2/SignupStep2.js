import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { proofTypes } from '../../data/proofTypes';
import UploadIcon from '@mui/icons-material/Upload';
import userService from '../../services/user.service';
import { Loader } from '../loader';

const SignupStep2 = ({
    formValues,
    handleNext,
    handleBack,
    handleChange,
    action,
    handleClose,
    handleEdit
}) => {
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [snackDetails, setSnackDetails] = useState({})
    const [previewImage, setPreviewImage] = useState(formValues.identityProofImageUri.value)
    const { identityProofType, identityProofNumber, identityProofImageUri } = formValues;
    const margin = "normal";
    const variant = "outlined";
    const url = 'https://sell-it-bucket.s3.ap-northeast-1.amazonaws.com/'
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
    const handleImageChange = (event) => {
        setFile(event.target.files[0])
        setPreviewImage('')
    }
    const handleUpload = async () => {
        let formData = new FormData()
        formData.append('files', file)
        setLoading(true)
        try {
            const response = await userService.uploadImage(formData)
            const imageuri = url + response?.data?.response?.files[0].key;
            handleChange(null, null, imageuri)
            setPreviewImage(imageuri)
            setFile()
            setLoading(false)
        } catch (error) {
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Couldn't upload image try again later."
            })
            setLoading(false)
        }
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
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
                                label={Number(identityProofType.value) === 2 ? "Aadhar Number" :
                                    "Permanent Account Number(PAN)"}
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
                            <Grid container direction={'row'}>
                                <Grid item>
                                    <input type="file" accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ margin: "2px", paddingTop: '16px', height: '25px' }} />
                                </Grid>
                                {
                                    !previewImage ?
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                size='small'
                                                startIcon={<UploadIcon />}
                                                disabled={file ? false : true}
                                                onClick={handleUpload}
                                            >
                                                Upload
                                            </Button>
                                        </Grid> : null
                                }
                                {
                                    previewImage ?
                                        <img className="preview" src={previewImage} alt={"identity proof"}
                                            width="60px" height="60px" style={{ margin: "5px" }} />
                                        : null
                                }
                            </Grid>
                            {/* <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleChange(event, "identityProofImageUri")}
                                    hidden
                                />
                            <Typography variant='span' sx={{ ml: 1 }}>
                                {formValues.identityProofImageUri.value?.name}
                            </Typography> */}
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
                {
                    loading ?
                        <Loader /> : null
                }
            </Box>
            <Snackbar open={snackDetails.show}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity={snackDetails.severity}
                    sx={{ width: '100%' }}>
                    {snackDetails.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SignupStep2;