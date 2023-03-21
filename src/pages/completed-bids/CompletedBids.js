import { Box, Button, Grid, Paper, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Filter, ProductsList } from '../../components';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    //height: "85vh"
}));

function CompletedBids() {
    useEffect(() => {
        fetchAllProducts()
    }, [])

    const fetchAllProducts = async () => {
        const response = await axios.get('https://sell-it.onrender.com/api/v1/users/products?category=1', {
            headers: {
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ZjZjYwNWEzODFlYWY4MWVlOWNiYmEiLCJyb2xlIjoyLCJpYXQiOjE2NzkyMjAzNTYsImV4cCI6MTY3OTgyNTE1Nn0.1ke2VBz2mp877MYO27VnyhjnE10smSP3EoHW7_9ck0k'
            }
        })
        console.log(response)
    }
    return (
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
                        <Filter />
                    </Item>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                    <Item>
                        <ProductsList title='Completed Bids'/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CompletedBids;