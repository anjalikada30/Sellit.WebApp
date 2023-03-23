import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import './styles.css';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const UserProfile = () => {
    return (
        <Box sx={{
            flexGrow: 1,
            p: 1,
            margin: 2
        }}>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: "1vw"
            }}>
                <Grid item>
                    <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.2rem"}>
                        Sample User
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" sx={{ cursor: 'none' }} color="success">
                        Earned Amount : 100000
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={1} sx={{
                display: 'flex',
                backgroundColor: '#d3d3d347',
                mt: 2
            }}>
                <Grid item>
                    <Grid container sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pl: 1,
                        pr: 1,
                        pt: 1
                    }}>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.1rem"}>
                                Personal Details
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" startIcon={<BorderColorIcon />}>
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="column" spacing={1} className="personal-details" sx={{
                        
                    }}>
                        <Grid item >
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Name:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem' >Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Email:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Phone Number:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                            <IconButton>
                                <BorderColorIcon color="primary"  className="edit-mobile" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Address Line1:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Landmark:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Zipcode:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>City:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>State:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="div" gutterBottom className="profile-item">
                                <b>Country:</b>
                            </Typography>
                            <Typography variant="span" gutterBottom fontSize='0.9rem'>Sample</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}

export default UserProfile;