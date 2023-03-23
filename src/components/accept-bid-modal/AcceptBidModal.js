import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
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

const AcceptBidModal = ({ handleClose }) => {

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
                        Accept Bid
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to accept bid?
                    </Typography>
                    <Grid container spacing={1} sx={{mt: 2}}>
                        <Grid item >
                            <Button variant="outlined" color="success" size="small" startIcon={<DoneIcon />}
                                onClick={handleClose}
                                >
                                Yes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="error" size="small" startIcon={<CloseIcon />}
                            onClick={handleClose}>
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default AcceptBidModal;