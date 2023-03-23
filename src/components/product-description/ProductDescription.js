import { Grid, Typography } from "@mui/material";
import React from "react";

const ProductDescription = ({ data }) => {
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"2rem"}>
                    {data.title}
                </Typography>
                <Typography variant="body2" gutterBottom fontSize='0.9rem' width={"40vw"}>
                    {data.description}
                </Typography>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item >
                <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                    <b>Category:&nbsp;&nbsp;&nbsp;</b>
                    <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.category.name}</Typography>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                    <b>Brand:&nbsp;&nbsp;&nbsp;</b>
                    <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.category.name}</Typography>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                    <b>Type:&nbsp;&nbsp;&nbsp;</b>
                    <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.type}</Typography>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                    <b>Purchased Year:&nbsp;&nbsp;&nbsp;</b>
                    <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.category.name}</Typography>
                </Typography>
            </Grid>
            {
                data.distanceDriven ?
                    <Grid item >
                        <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                            <b>Distance driven:&nbsp;&nbsp;&nbsp;</b>
                            <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.category.name}</Typography>
                        </Typography>
                    </Grid> : null
            }
            <Grid item >
                <Typography variant="body2" gutterBottom fontSize='0.8rem'>
                    <b>Pickup Address:&nbsp;&nbsp;&nbsp;</b>
                    <Typography variant="span" gutterBottom fontSize='0.8rem'>{data.pickupAddress}</Typography>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProductDescription;