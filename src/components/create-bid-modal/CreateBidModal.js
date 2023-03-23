import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

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

const CreateBidModal = ({ handleClose }) => {
    const [open, setOpen] = React.useState(false);

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
                        Create New Bid
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="newPrice"
                        label="New Price"
                        name="newPrice"
                        autoComplete="newPrice"
                        size='small'
                        type="number"
                        // value={values.mobile}
                        // onChange={handleChange("mobile")}
                        // helperText={error ? "Please enter valid phone number" : ""}
                        // error={error}
                        autoFocus
                    />
                    <TextField
                        margin={'normal'}
                        required
                        fullWidth
                        label="Reason"
                        name="notes"
                        placeholder="reason for new bid"
                        size={'small'}
                        multiline
                        rows={3}
                    // value={lastName.value}
                    // onChange={handleChange}
                    // error={!!lastName.error}
                    // helperText={lastName.error}
                    // required={lastName.required}
                    />
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item >
                            <Button variant="outlined" color="primary" size="small" startIcon={<AddIcon />}
                                onClick={handleClose}
                            >
                                Create
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

export default CreateBidModal;