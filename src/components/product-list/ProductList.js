import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { productsData } from '../../data/products';
import { sortList } from '../../data/sortList';
import { ProductListItem } from '../product-list-item';

function ProductsList({title}) {
    const [products, setProducts] = useState({ ...productsData })
    const [searchObject, setSearchObject] = useState({
        sort: 10
    })
    const handleFilterChange = (event) => {
        setSearchObject({
            ...searchObject,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Box>
            <Typography variant='h6' m={1}>{title}:</Typography>
            <Grid container display={"flex"} justifyContent={"space-between"} alignItems="center">
                <Grid item>
                    <Typography variant='p' component="p" m={1} >Showing 1 - {products.totalResults} results of {products.totalResults}</Typography>
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="sortby-label">Sort by</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={searchObject.sort}
                            label="Sort by"
                            onChange={handleFilterChange}
                            name='sort'
                            size='small'
                        >
                            {
                                sortList.map(item => (
                                    <MenuItem value={item.value}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {
                    products.results?.map(product => (
                        <Grid item>
                            <ProductListItem data={product} />
                        </Grid>
                    ))
                }
                {
                    products.results?.map(product => (
                        <Grid item>
                            <ProductListItem data={product} />
                        </Grid>
                    ))
                }
                {
                    products.results?.map(product => (
                        <Grid item>
                            <ProductListItem data={product} />
                        </Grid>
                    ))
                }
                {
                    products.results?.map(product => (
                        <Grid item>
                            <ProductListItem data={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ProductsList;