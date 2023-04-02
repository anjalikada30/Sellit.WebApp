import React, { useEffect, useState } from 'react';
import './productdetails.css';
import { Alert, Box, Button, Grid, Snackbar, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { ProductImages } from '../../components/product-images'
import { HorizontalStepper, Loader, ProductDescription, VerticalStepper } from '../../components';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';
import BidDetails from '../../components/bid-details/BidDetails';
import userService from '../../services/user.service';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import EditIcon from '@mui/icons-material/Edit';
import { SellProduct } from '../../components/sell-product';

const OrderStatus = [
    'Pick up date estimated',
    'Picked up',
    'Paid',
];
const ProductDetails = () => {
    const [productdetails, setProductdetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [snackDetails, setSnackDetails] = React.useState({})
    const [bidStepperDetails, setBidStepperDetails] = useState({
        steps: [],
        activeStep: 0
    })
    const [acceptedStepperDetails, setAcceptedStepperDetails] = useState({
        steps: [],
        activeStep: 0
    })
    const [openSellModal, setOpenSellModal] = React.useState(false)
    const { userId } = useSelector(state => state.auth);

    //retrieving back route details from route props
    const location = useLocation()
    const backRoute = location?.state?.back;

    useEffect(() => {
        fetchProductDetails();
    }, [])
    const fetchProductDetails = async () => {
        setLoading(true)
        try {
            const id = window.location.href.split('/')[4]
            const response = await userService.getProductDetails(id)
            setLoading(false)
            setProductdetails(response?.data?.response?.product)
            if (response?.data?.response?.product?.bidStatus !== 2)
                updateBidStepperDetails(response?.data?.response?.product)
            else updateacceptedStepperDetails(response?.data?.response?.product)
        }
        catch (err) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to fetch product details. Please try again later"
            })
        }
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
    const getImages = () => {
        return productdetails.images ? productdetails.images.map(image => {
            return {
                ...image,
                label: 'Sell your product anytime'
            }
        }) : []
    }
    console.log(productdetails.createdAt ?
        moment(productdetails.createdAt).format('MMMM Do YYYY, h:mm:ss a') : null)
    const updateBidStepperDetails = (details) => {
        let steps = [
            'Order created'
            //createdAt: moment(details.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        ]
        let activeStep;
        if (!details.bidHistory.length) {
            steps.push('Bidding is not started')
            steps.push('Bidding in progress')
            steps.push('Bid Accepted')
            activeStep = 1;
        } else {
            let bids = [...details.bidHistory];
            bids.reverse();
            console.log(bids)
            bids.map(bid => {
                if (bid.bidCreatedBy !== userId) {
                    steps.push(`Admin bid-${bid.newValue}`)
                    if (bid.bidStatus === 3) {
                        steps.push(`User Rejected bid-${bid.newValue}`)
                    }
                } else {
                    steps.push(`Your bid-${bid.newValue}`)
                    if (bid.bidStatus === 3) {
                        steps.push(`Admin Rejected bid-${bid.newValue}`)
                    }
                }

            })
            activeStep = steps.length - 1;
            if (details.bidHistory[0].bidStatus !== 3) {
                steps.push('Bid Accepted')
            }
        }
        setBidStepperDetails({
            steps,
            activeStep: activeStep
        })
    }
    const updateacceptedStepperDetails = (details) => {
        setAcceptedStepperDetails({
            steps: [`Accepted bid - ${details.acceptedAmount}`, ...OrderStatus],
            activeStep: productdetails.orderStatus - 1
        })
    }
    const handleEditProduct = () => {
        setOpenSellModal(true)
    }
    const handleSellModalClose = (message) => {
        setOpenSellModal(false)
        if (message === 'success') {
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Product edited successfully!"
            })
            fetchProductDetails();
        }
    }
    return (
        <>
            <Box sx={{ m: 2, pb: 4, backgroundColor: "#d3d3d347" }}>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pl: "1vw"
                }}>
                    <Grid item>
                        <Button variant="outlined" startIcon={<ArrowBackIosNew />} component={Link} to={backRoute}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <BidDetails data={productdetails}
                            fetchProductDetails={fetchProductDetails}
                            setLoading={setLoading}
                            setSnackDetails={setSnackDetails} />
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{
                    pl: "2vw", pb: 2
                }}>
                    <Grid item>
                        {
                            productdetails.images ?
                                <>
                                    <ProductImages images={[...getImages()]} currentImage={getImages()[0]} />
                                    <Carousel images={[...getImages()]} className="hide-in-desktop" width={"80%"} />
                                </> : null
                        }
                    </Grid>
                    <Grid item >
                        <ProductDescription data={productdetails} />
                        {
                            !productdetails?.bidHistory?.length ?
                                <Button variant="outlined" startIcon={<EditIcon />}
                                    onClick={handleEditProduct} sx={{ mt: 1 }}>
                                    Edit Product Details
                                </Button> : null
                        }
                    </Grid>
                </Grid>
                <Box sx={{ width: '100%', m: 2 }}>
                    {
                        productdetails.bidStatus !== 2 ?
                            <HorizontalStepper steps={bidStepperDetails.steps}
                                activeStep={bidStepperDetails.activeStep} /> :
                            <HorizontalStepper steps={acceptedStepperDetails.steps}
                                activeStep={productdetails.orderStatus - 1} />
                    }
                    {/* <VerticalStepper steps={steps} /> */}
                </Box>
            </Box>
            {
                loading ?
                    <Loader /> : null
            }
            {
                openSellModal ?
                    <SellProduct handleClose={handleSellModalClose} action="edit" details={productdetails} />
                    : null
            }
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

export default ProductDetails;