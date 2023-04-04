import { Alert, Box, Button, Grid, Paper, Snackbar, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Filter, Loader, NoBid, ProductsList, ScrollButton } from '../../components';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import userService from '../../services/user.service';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    //height: "85vh"
}));

function CancelledBids() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [snackDetails, setSnackDetails] = React.useState({})
    const [searchObject, setSearchObject] = useState({
        bidStatus: 3
    });
    const [lastElement, setLastElement] = useState(null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchProducts({ ...searchObject })
        fetchCategories()
    }, [])

    useEffect(() => {
        if (pageNum <= totalPages) {
            fetchProducts({
                ...searchObject,
                page: pageNum
            }, 'scrolling')
        }
    }, [pageNum]);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPageNum((no) => no + 1);
                }
            })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    const fetchCategories = async () => {
        const response = await userService.getCategories();
        setCategories(response)
    }

    const fetchProducts = async (data, scrolling) => {
        setLoading(true)
        try {
            const response = await userService.getProducts(data)
            setLoading(false)
            if (scrolling)
                setProducts({
                    ...products,
                    results: [...products.results, ...response?.data?.response?.products?.results]
                })
            else setProducts(response?.data?.response?.products)
            setTotalPages(response?.data?.response?.products?.totalPages)
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
        setTotalPages(0)
        setPageNum(1)
        fetchProducts({
            ...searchObject,
            [name]: value
        })
    }

    const handleFilterReset = () => {
        setSearchObject({
            category: '',
            bidStatus: 3
        })
        setTotalPages(0)
        setPageNum(1)
        fetchProducts({})
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
                            <Button variant="outlined" startIcon={<ArrowBackIosNew />} component={Link} to={"/home"}>
                                Back
                            </Button>
                            <Filter page="all"
                                handleChange={handleFilterChange}
                                handleReset={handleFilterReset}
                                searchObject={searchObject}
                                disableBidStatus={true} />
                            <Button variant="text" onClick={handleFilterReset}>
                                Reset
                            </Button>
                        </Item>
                    </Grid>
                    {
                        products.totalResults ?
                            <Grid item xs={12} sm={10} md={10}>
                                <Item>
                                    <ProductsList title={'Rejected Bids'} products={products}
                                        searchObject={searchObject}
                                        handleFilterChange={handleFilterChange}
                                        categories={categories} />
                                    {
                                        !loading &&
                                            pageNum <= totalPages ? (
                                            <div
                                                ref={setLastElement}
                                            ></div>) : null
                                    }
                                </Item>
                            </Grid>
                            : null
                    }
                    {!loading && !products?.results?.length ?
                        <NoBid title={'No products found.'} /> : null}
                </Grid>
                <ScrollButton />
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

export default CancelledBids;