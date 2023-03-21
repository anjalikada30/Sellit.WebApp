import React, {useState} from 'react';
import './sellproduct.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Modal, Grid, TextField, Typography} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '82vh',
  overflowY: 'scroll'
};

const SellProduct = ({ handleClose }) =>{
    const variant = 'outlined';
    const margin = 'normal';
    const size = 'small';
    const [previewImages, setPreviewImages] = useState([]);
    const handleImageChange = (event)=>{   
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]))
        }
        setPreviewImages(images)
    }
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"  
      >
        <Box sx={style}>
        <Typography variant='h6'>Sell Product:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Title"
            name="title"
            placeholder="title"
            size={size}
            // value={firstName.value}
            // onChange={handleChange}
            // error={!!firstName.error}
            // helperText={firstName.error}
            // required={firstName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Description"
            name="description"
            placeholder="description"
            size={size}
            multiline
            rows={3}
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true
            }}
            label="Category"
            name="category"
            size={size}
            // value={gender.value}
            // onChange={handleChange}
            // error={!!gender.error}
            // helperText={gender.error}
            // required={gender.required}
          >
            <option value=""> </option>
            <option value="vehicles">Vehicles</option>
            <option value="electronics">Electronics</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true
            }}
            label="Type"
            name="type"
            size={size}
            // value={gender.value}
            // onChange={handleChange}
            // error={!!gender.error}
            // helperText={gender.error}
            // required={gender.required}
          >
            <option value=""> </option>
            <option value="type1">Type1</option>
            <option value="type2">Type2</option>
            <option value="type3">Type3</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Brand"
            name="brand"
            placeholder="brand"
            size={size}
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Purchased Year"
            name="purchasedYear"
            placeholder="purchased year"
            size={size}
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Purchased Price"
            name="purchasedPrice"
            placeholder="purchased price"
            type="number"
            size={size}
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Distance Driven"
            name="distanceDriven"
            placeholder="distance driven(in KM)"
            size={size}
            type='number'
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Pickup Address"
            name="pickupAddress"
            placeholder="pickup address"
            size={size}
            multiline
            rows={4}
            // value={lastName.value}
            // onChange={handleChange}
            // error={!!lastName.error}
            // helperText={lastName.error}
            // required={lastName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{margin: "2px", paddingTop: '16px'}}/>
            {previewImages && (
                <div>
                    {previewImages.map((img, i) => {
                    return <img className="preview" src={img} alt={"image-" + i}  key={i} width="60px" height="60px" style={{margin: "5px"}}/>;
                    })}
                </div>
            )}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          //disabled={isError()}
          color="primary"
          size={size}
          //onClick={!isError() ? handleNext : () => null}
        >
          Sell Product
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 1 }}
          color="error"
          size={size}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SellProduct;