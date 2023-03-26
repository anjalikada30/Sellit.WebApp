import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import { AcceptBidModal } from "../accept-bid-modal";
import { RejectBidModal } from "../reject-bid-modal";
import { CreateBidModal } from "../create-bid-modal";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";

const ProductBidStatus = {
    1: "Created",
    2: "Accepted",
    3: "Rejected",
    4: "Modified",
};
const ProductBidStatusId = {
    CREATED: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    MODIFIED: 4,
};
const BidDetails = ({ data, fetchProductDetails, setLoading, setSnackDetails }) => {
    const { userId } = useSelector(state => state.auth);
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
    const handleConfirmAcceptBid = async () => {
        setLoading(true)
        try {
            await userService.updateBid({
                bidId: data.bidHistory[0]._id,
                status: ProductBidStatusId['ACCEPTED']
            })
            setAcceptModalDetails({
                show: false
            })
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Accepted bid successfully!"
            })
            fetchProductDetails()
        } catch (err) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to accept. Please try again later"
            })
        }
    }
    const handleConfirmRejectBid = async (reason) => {
        setLoading(true)
        try {
            await userService.updateBid({
                bidId: data.bidHistory[0]._id,
                status: ProductBidStatusId['REJECTED'],
                notes: reason
            })
            setRejectModalDetails({
                show: false
            })
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Rejected bid successfully!"
            })
            fetchProductDetails()
        } catch (err) {
            setLoading(false)
            setRejectModalDetails({
                show: false
            })
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to reject. Please try again later"
            })
        }
    }
    const handleConfirmCreateBid = async (offeredAmount, reason) => {
        setLoading(true)
        try {
            await userService.updateBid({
                bidId: data.bidHistory[0]._id,
                status: ProductBidStatusId['MODIFIED'],
                notes: reason,
                offeredAmount: offeredAmount
            })
            setNewBidModalDetails({
                show: false
            })
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Create new bid successfully!"
            })
            fetchProductDetails()
        } catch (err) {
            setLoading(false)
            setRejectModalDetails({
                show: false
            })
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to create new bid. Please try again later"
            })
        }
    }
    return (
        <>
            {
                data.bidStatus === 2 || data.bidStatus === 3 ?
                    <Typography gutterBottom variant="subtitle1" component="div">
                        Bid Status:
                        <Button variant="contained" color={data.bidStatus === 2 ? 'success' : 'error'}
                            sx={{ m: 1, cursor: 'default', width: '120px' }}>
                            {ProductBidStatus[data.bidStatus]}
                        </Button>
                    </Typography>
                    : null
            }
            {
                data?.bidHistory?.length === 0 ?
                    <>
                        <Grid container direction="row" alignItems="center" sx={{ m: 1 }}>
                            <Grid item>
                                <CloseIcon />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1" component="span">
                                    No updates for the product
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                    : null
            }
            {
                (data.bidStatus !== 2 && data.bidStatus !== 3 && data.bidHistory) ?
                    <>
                        {
                            (data?.bidHistory?.length !== 0 &&
                                data.bidHistory[0]?.bidCreatedBy !== userId) ?
                                <Grid container direction="row" alignItems="center" sx={{ m: 1 }} spacing={1}>
                                    <Grid item>
                                        <Typography gutterBottom variant="subtitle1" component="span">
                                            Admin Price : {data?.bidHistory ? data.bidHistory[0]?.newValue : null}
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
                            (data?.bidHistory?.length !== 0 &&
                                data.bidHistory[0]?.bidCreatedBy === userId) ?
                                <>
                                    <Grid container direction="row" alignItems="center" sx={{ m: 1 }}>
                                        <Grid item>
                                            <CloseIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography gutterBottom variant="subtitle1" component="span">
                                                No updates for the your bid - {data.bidHistory[0].newValue}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </>
                                : null
                        }
                    </> : null
            }
            {
                acceptModalDetails.show ?
                    <AcceptBidModal handleClose={handleAcceptModalClose}
                        handleAccept={handleConfirmAcceptBid} />
                    : null
            }
            {
                rejectModalDetails.show ?
                    <RejectBidModal handleClose={handleRejectModalClose}
                        handleReject={handleConfirmRejectBid}
                    />
                    : null
            }
            {
                newBidModalDetails.show ?
                    <CreateBidModal handleClose={handleNewBidModalClose}
                        handleCreate={handleConfirmCreateBid} />
                    : null
            }
        </>
    )
}

export default BidDetails;