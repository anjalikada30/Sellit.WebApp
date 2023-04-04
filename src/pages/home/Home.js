import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import allBidsLogo from '../../assets/allbidslogo.png';
import cancelledLogo from '../../assets/cancelledlogo.png';
import pendingLogo from '../../assets/pendinglogo.png';
import completedLogo from '../../assets/completedlogo.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { Loader, NoBid, ProductListItem } from '../../components';
import UserService from '../../services/user.service'
import userService from '../../services/user.service';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#a8bfed",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "14vh"
}));

const BidCard = ({ name, logo, link }) => {
    return (
        <Grid container spacing={1} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: "14vh",
            p: 1
        }}>
            <Grid item xs={4}>
                <Box
                    component="img"
                    sx={{
                        height: 64,
                    }}
                    alt="sell-it"
                    src={logo}
                />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Link to={link} state={{ back: "/home" }}>
                    <Button variant="contained">
                        <NavigateNextIcon />
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const paperStyle = { padding: 20, height: '15vh', width: "95%", margin: "5px" }

    useEffect(() => {
        fetchAllProducts()
        fetchCategories()
    }, [])
    const fetchAllProducts = async () => {
        setLoading(true)
        try {
            const response = await UserService.getAllProductsForHome()
            setLoading(false)
            setProducts(response)
        } catch (err) {
            setLoading(false)
        }
    }
    const fetchCategories = async () => {
        const response = await userService.getCategories();
        setCategories(response)
    }
    return (
        <>
            <Box sx={{
                flexGrow: 1,
                p: 1,
                margin: 2
            }}>
                <>
                    {
                        products.length ?
                            <>
                                <Box sx={{
                                    flexGrow: 1,
                                    p: 1,
                                    display: { xs: 'none', sm: 'block', md: 'block' }
                                }}>

                                    <Typography variant='h6' sx={{ mb: 2 }}>Latest Bid</Typography>
                                    {/* <Paper elevation={2} style={paperStyle} > */}
                                    <ProductListItem data={products[0]}
                                        margin={1}
                                        backRoute={"/home"}
                                        categories={categories} />
                                    {/* </Paper> */}
                                </Box>
                                <Typography variant='h6' sx={{ mt: 1 }}>All Bids</Typography>
                                <Grid container spacing={2} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <Grid item xs={12} sm={6} md={5}>
                                        <Item>
                                            <BidCard name="All Bids" logo={allBidsLogo} link="/all-bids" />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5}>
                                        <Item>
                                            <BidCard name="Pending Bids" logo={pendingLogo} link="/pending-bids" />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5}>
                                        <Item>
                                            <BidCard name="Accepted Bids" logo={completedLogo} link="/completed-bids" />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5}>
                                        <Item>
                                            <BidCard name="Rejected Bids" logo={cancelledLogo} link="/cancelled-bids" />
                                        </Item>
                                    </Grid>
                                </Grid>
                            </> : null
                    }
                    {!loading && !products.length ?
                        <NoBid title={'No products found.'} /> : null}
                </>
            </Box>
            {
                loading ?
                    <Loader /> : null
            }
        </>
    )
}

export default Home