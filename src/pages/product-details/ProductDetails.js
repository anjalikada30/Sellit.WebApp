import React, { useEffect, useState } from 'react';
import './productdetails.css';
import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { product } from '../../data/products'
import { ProductImages } from '../../components/product-images'
import { HorizontalStepper, ProductDescription, VerticalStepper } from '../../components';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import BidDetails from '../../components/bid-details/BidDetails';
import userService from '../../services/user.service';


const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
];

const images = [
    {
        id: 1,
        label: 'Sell your product anytime',
        imgPath: image1,
    },
    {
        id: 2,
        label: 'Sell your product anytime',
        imgPath: image2,
    },
    {
        id: 3,
        label: 'Sell your product anytime',
        imgPath: image3,
    },
    {
        id: 4,
        label: 'Sell your product anytime',
        imgPath: image4,
    },
];

const ProductDetails = () => {
    const data = { ...product };
    const [productdetails, setProductdetails] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        fetchProductDetails();
    }, [])
    const fetchProductDetails = async ()=>{
        setLoading(true)
        try {
            const id = window.location.href.split('/')[4]
            const response = await userService.getProductDetails(id)
            setLoading(false)
            console.log('productDetails-', response)
            //setProducts(response?.data?.response?.products?.results)
        } catch (err) {
            setLoading(false)
        }
    }
    return (
        <Box sx={{ m: 2, pb: 4, backgroundColor: "#d3d3d347" }}>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: "1vw"
            }}>
                <Grid item>
                    <Button variant="outlined" startIcon={<ArrowBackIosNew />} component={Link} to={'/all-bids'}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <BidDetails data={data} />
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{
                pl: "2vw", pb: 2
            }}>
                <Grid item>
                    <ProductImages />
                    <Carousel images={[...images]} className="hide-in-desktop" width={"80%"} />
                </Grid>
                <Grid item >
                    <ProductDescription data={data} />
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', m: 2 }}>
                <HorizontalStepper steps={steps} />
                {/* <VerticalStepper steps={steps} /> */}
            </Box>
        </Box>
    )
}

export default ProductDetails;