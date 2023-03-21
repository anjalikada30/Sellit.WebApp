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

function Bookmarks() {
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
                <Grid item xs={12}>
                    <Item>
                        <ProductsList title='Bookmarks'/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Bookmarks;