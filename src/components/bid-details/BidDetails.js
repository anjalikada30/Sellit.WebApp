import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import { AcceptBidModal } from "../accept-bid-modal";
import { RejectBidModal } from "../reject-bid-modal";
import { CreateBidModal } from "../create-bid-modal";

const ProductBidStatus = {
    1: "Created",
    2: "Accepted",
    3: "Rejected",
    4: "Modified",
};
const BidDetails = ({ data }) => {
    const [acceptModalDetails, setAcceptModalDetails] = useState({})
    const [rejectModalDetails, setRejectModalDetails] = useState({})
    const [newBidModalDetails, setNewBidModalDetails] = useState({})
    const handleAcceptBid = () => {
        setAcceptModalDetails({
            show: true,
            price: 10000
        })
    }
    const handleAcceptModalClose = () => {
        setAcceptModalDetails({
            show: false
        })
    }
    const handleRejectBid = () => {
        setRejectModalDetails({
            show: true,
            price: 10000
        })
    }
    const handleRejectModalClose = () => {
        setRejectModalDetails({
            show: false
        })
    }
    const handleNewBid = () => {
        setNewBidModalDetails({
            show: true,
            price: 10000
        })
    }
    const handleNewBidModalClose = () => {
        setNewBidModalDetails({
            show: false
        })
    }
    return (
        <>
            {
                data.bidStatus === 2 || data.bidStatus === 3 ?
                    <Typography gutterBottom variant="subtitle1" component="div">
                        Bid Status:
                        <Button variant="contained" color='primary' sx={{ m: 1, cursor: 'default', width: '120px' }}>{ProductBidStatus[data.bidStatus]}</Button>
                    </Typography>
                    : null
            }
            {
                data.bidHistory.length === 0 ?
                    <>
                        <Grid container direction="row" alignItems="center" sx={{ m: 1 }}>
                            <Grid item>
                                <CloseIcon />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" component="span">
                                    No updates for the bid
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                    : null
            }
            {
                data?.bidHistory[0]?.bidCreatedBy !== "" ?
                    <Grid container direction="row" alignItems="center" sx={{ m: 1 }} spacing={1}>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1" component="span">
                                Admin Price : {data?.bidHistory[0]?.newValue}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" size="small" startIcon={<DoneIcon />}
                                onClick={handleAcceptBid}>
                                Accept
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error" size="small" startIcon={<CloseIcon />}
                                onClick={handleRejectBid}>
                                Reject
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                                onClick={handleNewBid}>
                                New bid
                            </Button>
                        </Grid>
                    </Grid> : null
            }
            {
                acceptModalDetails.show ?
                    <AcceptBidModal handleClose={handleAcceptModalClose} />
                    : null
            }
            {
                rejectModalDetails.show ?
                    <RejectBidModal handleClose={handleRejectModalClose} />
                    : null
            }
            {
                newBidModalDetails.show ?
                    <CreateBidModal handleClose={handleNewBidModalClose} />
                    : null
            }
        </>
    )
}

export default BidDetails;