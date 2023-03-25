import { Box, Typography, Grid, FormGroup, FormControlLabel, Slider, TextField, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import userService from '../../services/user.service';

function Filter() {
    const [categories, setCategories] = useState([])
    const [expandCategoriesMore, setExpandCategoriesMore] = useState(true);
    const minmin = 0;
    const maxmax = 100000;
    const [priceRangeValue, setPriceRangeValue] = useState([0, 50000]);

    useEffect(() => {
        fetchCategories()
    }, [])
    
    const fetchCategories = async () => {
        const response = await userService.getCategories();
        setCategories(response?.data?.response?.categories)
    }
    
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRangeValue(newValue);
    };
    return (
        <>
            <Box>
                <Typography variant='h6' m={1.5}>Filters:</Typography>
                <Divider />
                <Grid container display={"flex"} justifyContent={"space-between"} alignItems="center">
                    <Grid item>
                        <Typography variant='p' component="p" m={1.5} fontWeight={"bold"}>Categories:</Typography>
                    </Grid>
                    {
                        !expandCategoriesMore ?
                            <Grid item>
                                <ExpandLessIcon onClick={() => setExpandCategoriesMore(!expandCategoriesMore)} sx={{ cursor: 'pointer' }} />
                            </Grid> : null
                    }
                    {
                        expandCategoriesMore ?
                            <Grid item>
                                <ExpandMoreIcon onClick={() => setExpandCategoriesMore(!expandCategoriesMore)} sx={{ cursor: 'pointer' }} />
                            </Grid> : null
                    }
                </Grid>
                <Divider />
                {
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
                }
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
                        }}
                        size="small"
                    />
                </Stack>
            </Box>
        </>
    )
}

export default Filter;