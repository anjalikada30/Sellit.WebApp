import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
const Success = ({text}) => {
    return (
        <>
            <Typography variant="h5" align="center" sx={{ py: 4 }}>
                {text}
            </Typography>
            <Typography component="p" align="center">
                Please login to continue
                <Link to="/"  style={{ marginLeft: 2 }}>
                    {"Login"}
                </Link>
            </Typography>
        </>
    );
}

export default Success;
