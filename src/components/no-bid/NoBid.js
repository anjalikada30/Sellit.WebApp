import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import nobidlogo from "../../assets/nobid.png";

const NoBid = ({title}) => {
    return (
        <Box sx={{
            flexGrow: 1,
            p: 1,
            margin: 2
        }}>
            <Grid container spacing={2} sx={{
                display: 'flex',
                direction: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh'
            }}
            >
                <Grid item>
                    <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.4rem"}>
                        {title}
                    </Typography>
                    <Box
                        component="img"
                        sx={{
                            height: '30vh',
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        src={nobidlogo}
                        alt={"No bid found"}
                    />

                </Grid>
            </Grid>
        </Box>
    )
}

export default NoBid;