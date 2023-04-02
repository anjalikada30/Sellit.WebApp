import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Success = ({text}) => {
    return (
        <>
            <Typography variant="h5" align="center" sx={{ py: 4 }}>
                {text}
            </Typography>
            <Typography component="p" align="center">
                Please login to continue
                <Link href="/" variant="body2" sx={{ marginLeft: 2 }}>
                    {"Login"}
                </Link>
            </Typography>
        </>
    );
}

export default Success;
