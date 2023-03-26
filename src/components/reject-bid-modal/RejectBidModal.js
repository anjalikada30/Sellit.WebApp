import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const initialValues = {
    reason: {
        value: '',
        error: '',
        required: true,
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    }
}
const RejectBidModal = ({ handleClose, handleReject }) => {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState(initialValues)
    const handleChange = (event) => {
        let { type, name, value } = event.target;
        const fieldValue = value;
        const fieldName = initialValues[name];
        if (!fieldName) return;

        const {
            required,
            validate,
            minLength,
            maxLength,
            helperText
        } = fieldName;

        let error = "";

        if (required && !fieldValue) error = "This field is required";
        if (minLength && value && value.length < minLength)
            error = `Minimum ${minLength} characters is required.`;
        if (maxLength && value && value.length > maxLength)
            error = "Maximum length exceeded!";
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value: fieldValue,
                error: error
            }
        })
    }
    const isError = React.useCallback(
        () =>
            Object.keys(formValues).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [formValues]
    );
    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reject Bid
                    </Typography>
                    <TextField
                        margin={'normal'}
                        fullWidth
                        label="Reason"
                        name="reason"
                        placeholder="reason for rejection"
                        size={'small'}
                        multiline
                        rows={3}
                        value={formValues.reason.value}
                        onChange={handleChange}
                        error={!!formValues.reason.error}
                        helperText={formValues.reason.error}
                        required={formValues.reason.required}
                    />
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item >
                            <Button variant="outlined" color="error" size="small"
                                startIcon={<CloseIcon />}
                                disabled={isError()}
                                onClick={!isError() ?
                                    () => handleReject(formValues.reason.value)
                                    : () => null}>
                                Reject
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="error" size="small" startIcon={<CloseIcon />}
                                onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default RejectBidModal;