import { Box, Typography, Grid, FormGroup, FormControlLabel, Slider, TextField, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import userService from '../../services/user.service';

const bidStatus = [
    {
        id: 1,
        name: 'Created'
    },
    {
        id: 2,
        name: 'Accepted'
    },
    {
        id: 3,
        name: 'Rejected'
    },
    {
        id: 4,
        name: 'Modified'
    }
]

function Filter({ handleChange, page, searchObject, disableBidStatus, handlePriceChange }) {
    const [categories, setCategories] = useState([])
    const [expandCategoriesMore, setExpandCategoriesMore] = useState(true);
    const minmin = 0;
    const maxmax = 100000;
    const [priceRangeValue, setPriceRangeValue] = useState([0, 0]);
    const variant = 'outlined';
    const margin = 'normal';
    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const response = await userService.getCategories();
        setCategories(response)
    }

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRangeValue(newValue);
        if (searchObject.minPrice === newValue[0]) {
            handlePriceChange('maxPrice', newValue[1])
        } else {
            handlePriceChange('minPrice', newValue[0])
        }
    };

    return (
        <>
            <Box>
                <Typography variant='h6' m={1.5}>Filters:</Typography>
                <Divider />
                <TextField
                    variant={variant}
                    margin={margin}
                    fullWidth
                    select
                    SelectProps={{
                        native: true
                    }}
                    label="Category"
                    name="categoryId"
                    size={'small'}
                    value={searchObject.category}
                    onChange={(event) => handleChange('category', event.target.value)}
                >
                    <option value=""></option>
                    {
                        categories.map(category => (
                            <option value={category._id} key={category._id}>{category.name}</option>
                        ))
                    }
                </TextField>
                <TextField
                    variant={variant}
                    margin={margin}
                    fullWidth
                    select
                    SelectProps={{
                        native: true
                    }}
                    label="Bid Status"
                    name="bidStatus"
                    size={'small'}
                    value={searchObject.bidStatus}
                    onChange={(event) => handleChange('bidStatus', event.target.value)}
                    disabled={disableBidStatus}
                >
                    <option value=""></option>
                    {
                        bidStatus.map(status => (
                            <option value={status.id} key={status.id}>{status.name}</option>
                        ))
                    }
                </TextField>
                {/* {
                    expandCategoriesMore ?
                        <FormGroup aria-label="Category" sx={{ ml: 1 }}>
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category._id}
                                    value={category.categoryEnum}
                                    control={
                                        <Checkbox />
                                    }
                                    label={category.name}
                                />
                            ))}
                        </FormGroup> : null
                } */}
                {
                    page === 'completed' ?
                        <>
                            <Grid container display={"flex"} justifyContent={"space-between"} alignItems="center">
                                <Grid item>
                                    <Typography variant='p' component="p" m={1.5} fontWeight={"bold"}>Price:</Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Slider
                                getAriaLabel={() => "Price range"}
                                value={priceRangeValue}
                                onChange={handlePriceRangeChange}
                                valueLabelDisplay="auto"
                                min={minmin}
                                max={maxmax}
                                sx={{ m: 1 }}
                            />
                            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                                <TextField
                                    label="min"
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: "90px" }}
                                    value={priceRangeValue[0]}
                                    onChange={(e) => {
                                        setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
                                        handlePriceChange('minPrice', e.target.value)
                                    }}
                                    size="small"
                                />
                                <Typography>-</Typography>
                                <TextField
                                    label="max"
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: "90px" }}
                                    value={priceRangeValue[1]}
                                    onChange={(e) => {
                                        setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
                                        handlePriceChange('maxPrice', e.target.value)
                                    }}
                                    size="small"
                                />
                            </Stack>
                        </> : null
                }
            </Box>
        </>
    )
}

export default Filter;