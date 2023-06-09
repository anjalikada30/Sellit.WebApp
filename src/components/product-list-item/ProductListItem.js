import * as React from 'react';
import './product.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import sampleProduct from '../../assets/sampleproduct.png';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const ProductBidStatus = {
    1: 'CREATED',
    2: 'ACCEPTED',
    3: 'REJECTED',
    4: 'In progress'
};
const ProductBidColor = {
    1: 'primary',
    2: 'success',
    3: 'error',
    4: 'primary'
};
const OrderStatus = {
    1: 'Pending',
    2: 'Picked up date estimated',
    3: 'Picked up',
    4: 'Paid'
};
const ProductListItem = ({ data, margin, backRoute, categories }) => {
    const getCategoryName = () => {
        const category = categories?.find(category => category._id === data.categoryId)
        return category?.name;
    }
    return (
        <Paper
            sx={{
                p: 2,
                margin: margin ? 1 : 'auto',
                maxWidth: 470,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#d3d3d347',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="product-image" src={data.images ? data.images[0].uri : ''} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs>
                            <Box sx={{ width: '180px', height: '30px', overflow: 'hidden' }}>
                                <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold'>
                                    {data.title}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '200px', height: '30px', overflow: 'hidden' }}>
                                <Typography variant="body2" gutterBottom fontSize='0.7rem'>
                                    {getCategoryName()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item >
                            <Link to={`/product/${data._id}`}
                                state={{ back: backRoute }}
                                style={{ textDecoration: "none" }}>
                                <Button variant="text">
                                    {"View Details"}
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2} sx={{ mt: 1 }}>
                        <Button variant="text" color={ProductBidColor[data.bidStatus]}
                            sx={{ m: 1, cursor: 'default', width: '120px' }}>
                            {ProductBidStatus[data.bidStatus]}</Button>
                        {
                            data.bidStatus === 2 ?
                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '0.8rem' }}>
                                    Accepted amount: {data.acceptedAmount}
                                </Typography> : null
                        }
                        {
                            data.bidStatus !== 3 ?
                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '0.8rem' }}>
                                    Order status: {OrderStatus[data.orderStatus]}
                                </Typography> : null
                        }
                        {
                            data.bidStatus !== 2 ?
                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '0.8rem' }}>
                                    Last modified: {moment(data.updatedAt).format('DD/MM/yyyy, h:mm:ss a')}
                                </Typography> : null
                        }
                        {/* <IconButton
                            size="small"
                            aria-label="bookmark"
                            aria-controls="bookmark"
                            // onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ width: '3px', ml: 14 }}
                        >
                            {
                                data.bookmarked ?
                                    <BookmarkIcon color='primary' />
                                    : <BookmarkBorderIcon color='primary' />
                            }

                        </IconButton> */}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ProductListItem;