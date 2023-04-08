import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const Notifications = ({ anchorEl, handleClose }) => {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
    )
}

export default Notifications;