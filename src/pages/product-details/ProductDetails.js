import React from 'react';
import './productdetails.css';
import { Box } from '@mui/material'
import { product } from '../../data/products'

const ProductDetails = ()=>{
    return(
        <Box sx={{m: 2}}>
            <section className="core">
                {/* <ProductImages /> */}
                {/* <MobileGallery />
                <Description
                    data={product}
                /> */}
            </section>
        </Box>
    )
}

export default ProductDetails;