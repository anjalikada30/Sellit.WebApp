import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import dayjs from 'dayjs';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Notifications = ({ anchorEl, handleClose, closeNotification,
    removeAllNotifications, notifications, showMoreNotifications }) => {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const NotificationItem = ({ text, time, sender, id, title, productId }) => {
        const someDate = dayjs(time);
        const relativeTime = moment(time).format('DD/MM/yyyy, h:mm:ss a');
        return (
            <Box
                sx={{
                    marginX: 1,
                    paddingX: 1,
                    backgroundColor: "#ecedf3",
                    borderBottom: "1px solid #c9b3b3",
                    display: "flex",
                    flexDirection: "column",
                    p: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography fontSize={14} fontWeight={700}>
                            {title}
                        </Typography>
                        <Typography fontSize={12}>{text}</Typography>
                    </Box>
                    <Typography fontSize={10} color={"gray"}>
                        {relativeTime}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Chip label={sender} size="small" />
                    <Box>
                        <IconButton onClick={() => closeNotification(id)}>
                            <CloseIcon fontSize="1" />
                        </IconButton>
                    </Box>
                </Box>
                <Link to={`/product/${productId}`}
                    style={{ textDecoration: "none" }}>
                    {/* <Button variant="text" > */}
                    {"View Details"}
                    {/* </Button> */}
                </Link>
            </Box>
        );
    };
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ p: 2, fontWeight: "700" }}>
                    Notifications
                </Typography>
                {notifications.length > 0 ?
                    <Button
                        size="small"
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={removeAllNotifications}
                    >
                        Clear all
                    </Button> : null}
            </Box>
            {notifications.length > 0
                ? notifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        text={notification?.description}
                        time={notification?.updatedAt}
                        sender={notification?.senderDetail?.email}
                        title={notification?.title}
                        id={notification?._id}
                        productId={notification?.productId}
                    />
                ))
                : <div style={{ margin: "2px" }}>No Notifications found</div>}
            {notifications.length > 0 ?
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        size="small"
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={showMoreNotifications}
                    >
                        Show more
                    </Button>
                </Box> : null
            }
        </Popover>
    )
}

export default Notifications;