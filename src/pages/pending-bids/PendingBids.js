import { Alert, Box, Button, Grid, Paper, Snackbar, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Filter, Loader, NoBid, ProductsList } from '../../components';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import userService from '../../services/user.service';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    //height: "85vh"
}));

function PendingBids() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [snackDetails, setSnackDetails] = React.useState({})
    const [searchObject, setSearchObject] = useState({
        bidStatus: 1
    });
    useEffect(() => {
        fetchAllProducts()
    }, [])

    const fetchAllProducts = async () => {
        setLoading(true)
        try {
            const response = await userService.getProducts({
                bidStatus: 1
            })
            setLoading(false)
            setProducts(response?.data?.response?.products)
        } catch (err) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to fetch products. Please try again later"
            })
        }
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
    const handleFilterChange = async (name, value) => {
        setSearchObject({
            ...searchObject,
            [name]: value
        })
        setLoading(true)
        try {
            const response = await userService.getProducts({
                ...searchObject,
                [name]: value
            })
            setLoading(false)
            setProducts(response?.data?.response?.products)
        } catch (err) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to fetch products. Please try again later"
            })
        }
    }
    const handleFilterReset = () => {
        setSearchObject({
            category: '',
            bidStatus: 1
        })
        fetchAllProducts()
    }
    return (
        <>
            <Box sx={{
                flexGrow: 1,
                //p: 1,
                margin: 1
            }}>
                <Grid container spacing={0} sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    height: '85vh'
                }}>
                    <Grid item xs={12} sm={2} md={2}>
                        <Item>
                            <Button variant="outlined" startIcon={<ArrowBackIosNew />} component={Link} to={'/home'}>
                                Back
                            </Button>
                            <Filter page="all" handleChange={handleFilterChange}
                                handleReset={handleFilterReset}
                                searchObject={searchObject}
                                disableBidStatus={true} />
                            <Button variant="text" onClick={handleFilterReset}>
                                Reset
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        <Item>
                            {
                                products.totalResults ?
                                    <Grid item xs={12} sm={10} md={10}>
                                        <ProductsList title={'Pending Bids'}
                                            products={products}
                                            searchObject={searchObject}
                                            handleFilterChange={handleFilterChange} />
                                    </Grid> : <NoBid title={'No pending bids found.'} />
                            }
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            {
                loading ?
                    <Loader /> : null
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

export default PendingBids;