import * as React from 'react';
import './product.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import sampleProduct from '../../assets/sampleproduct.png';
import { Box, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const ProductListItem = ({ data }) => {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#d3d3d347',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={sampleProduct} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs>
                            <Box sx={{ width: '200px', height: '30px', overflow: 'hidden' }}>
                                <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold'>
                                    {data.title}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '200px', height: '30px', overflow: 'hidden' }}>
                                <Typography variant="body2" gutterBottom fontSize='0.7rem'>
                                    {data.category.name}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item >
                            <Button variant="text" component={Link} to={`/product/${data._id}`} >
                                {"View Details"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2} sx={{ mt: 1 }}>
                        {
                            data.acceptedAmount ?
                                <Button variant="outlined" color='success' sx={{ m: 1, cursor: 'default', width: '120px' }}>Completed</Button> :
                                <Button variant="outlined" color='error' sx={{ m: 1, cursor: 'default', width: '120px' }}>Pending</Button>
                        }
                        {
                            data.acceptedAmount ?
                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '0.8rem' }}>
                                    Accepted amount: {data.acceptedAmount}
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