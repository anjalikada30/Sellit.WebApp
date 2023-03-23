import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import React from 'react';
import allBidsLogo from '../../assets/allbidslogo.png';
import cancelledLogo from '../../assets/cancelledlogo.png';
import pendingLogo from '../../assets/pendinglogo.png';
import completedLogo from '../../assets/completedlogo.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { NoBid } from '../../components';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#a8bfed",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "15vh"
}));

const Home = () => {
    const paperStyle = { padding: 20, height: '15vh', width: "95%", margin: "5px" }
    const BidCard = ({name, logo, link}) => {
        return (
            <Grid container spacing={1} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: "15vh",
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
                    <Button variant="contained" component={Link} to={link}>
                        <NavigateNextIcon />
                    </Button>
                </Grid>
            </Grid>
        )
    }
    return (
        <>
            <Box sx={{
                flexGrow: 1,
                p: 1,
                margin: 2
            }}>
                {/* <Box sx={{
                    flexGrow: 1,
                    p: 1,
                    display: { xs: 'none', sm: 'block', md: 'block' }
                }}>

                    <Typography variant='h6' sx={{ mb: 4 }}>Latest Bid</Typography>
                    <Paper elevation={2} style={paperStyle} >

                    </Paper>
                </Box>
                <Typography variant='h6' sx={{ mt: 2 }}>All Bids</Typography>
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 4
                }}
                >
                    <Grid item xs={12} sm={6} md={5}>
                        <Item>
                            <BidCard name="All Bids" logo={allBidsLogo} link="/all-bids"/>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Item>
                            <BidCard name="Pending Bids" logo={pendingLogo} link="/pending-bids"/>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Item>
                            <BidCard name="Completed Bids" logo={completedLogo} link="/completed-bids"/>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Item>
                            <BidCard name="Cancelled Bids" logo={cancelledLogo} link="/cancelled-bids"/>
                        </Item>
                    </Grid>
                </Grid> */}
                <NoBid />
            </Box>
        </>
    )
}

export default Home