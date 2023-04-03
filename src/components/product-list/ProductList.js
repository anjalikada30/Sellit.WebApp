import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { productsData } from '../../data/products';
import { sortList } from '../../data/sortList';
import { sortTypes } from '../../data/sortTypes';
import { ProductListItem } from '../product-list-item';

const backRoutes = {
    "All Bids": "/all-bids",
    "Rejected Bids": "/cancelled-bids",
    "Accepted Bids": "/completed-bids",
    "Pending Bids": "/pending-bids"
}

function ProductsList({ title, products, searchObject, handleFilterChange, categories }) {
    const variant = 'outlined';
    const margin = 'normal';

    return (
        <Box>
            <Typography variant='h6' m={1}>{title}:</Typography>
            <Grid container display={"flex"} justifyContent={"space-between"} alignItems="center">
                <Grid item>
                    <Typography variant='p' component="p" m={1} >Showing 1 - {products?.results?.length} results of {products.totalResults}</Typography>
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        {/* <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            //value={searchObject.sort}
                            label="Sort by"
                            onChange={handleSortChange}
                            name='sort'
                            size='small'
                        >
                            {
                                sortList.map(item => (
                                    <MenuItem value={item.value}>{item.name}</MenuItem>
                                ))
                            }
                        </Select> */}
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            select
                            SelectProps={{
                                native: true
                            }}
                            label="Sort by"
                            name="categoryId"
                            size={'small'}
                            value={searchObject.sort}
                            onChange={(event) => handleFilterChange('sort', event.target.value)}
                        >
                            <option value=""></option>
                            {
                                sortTypes.map(type => (
                                    <option value={type.code} key={type.code}>{type.name}</option>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {
                    products.results?.map((product, index) => (
                        <Grid item key={product._id + index}>
                            <ProductListItem data={product}
                                backRoute={backRoutes[title]}
                                categories={categories} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ProductsList;