import React, { useCallback, useState } from 'react';
import './sellproduct.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import userService from '../../services/user.service';
import { Loader } from '../loader';

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
  overflowY: 'scroll',
  overflowX: 'hidden'
};

const initialValues = {
  title: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20,
    helperText: 'Custom error message'
  },
  description: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20
  },
  type: {
    value: '',
    error: '',
    required: true,
    validate: 'select',
  },
  categoryId: {
    value: '',
    error: '',
    required: true,
    validate: 'select',
  },
  brand: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  purchasedYear: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  distanceDriven: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  pickupAddress: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  images: {
    value: '',
    error: '',
    required: true
  },
}

const SellProduct = ({ handleClose }) => {
  const variant = 'outlined';
  const margin = 'normal';
  const size = 'small';
  const [previewImages, setPreviewImages] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState()
  const [snackDetails, setSnackDetails] = useState({})
  const isText = /^([a-zA-Z0-9 ]+)$/;
  const url = 'https://sell-it-bucket.s3.ap-northeast-1.amazonaws.com/'

  const isError = useCallback(
    () =>
      Object.keys(formValues).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues]
  );

  const handleChange = (event, imageUris) => {
    if (imageUris) {
      setFormValues({
        ...formValues,
        images: {
          ...formValues['images'],
          value: imageUris
        }
      })
      return;
    }
    let { type, name, value } = event.target;
    const fieldValue = value;
    const fieldName = initialValues[name];
    if (!fieldName) return;

    const {
      required,
      validate,
      minLength,
      maxLength,
      helperText
    } = fieldName;

    let error = "";

    if (required && !fieldValue) error = "This field is required";
    if (minLength && value && value.length < minLength)
      error = `Minimum ${minLength} characters is required.`;
    if (maxLength && value && value.length > maxLength)
      error = "Maximum length exceeded!";
    if (validate) {
      switch (validate) {
        case "text":
          if (value && !isText.test(value))
            error = helperText || "This field accepts alphanumeric only.";
          break;

        case "select":
          if (!value) error = helperText || "Please select a value.";
          break;

        default:
          break;
      }
    }
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: fieldValue,
        error: error
      }
    })
  }
  const handleImageChange = (event) => {
    let images = [];
    setFiles(event.target.files)
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
    }
    setPreviewImages(images)
  }
  const handleUploadImages = async () => {
    let formData = new FormData()
    formData.append('files', files[0])
    setLoading(true)
    try {
      const response = await userService.uploadImage(formData)
      const imageuris = response?.data?.response?.files.map((file) => url + file.key);
      handleChange(null, imageuris)
      setPreviewImages(imageuris)
      setFiles()
      setLoading(false)
    } catch (error) {
      setSnackDetails({
        show: true,
        severity: 'error',
        message: "Couldn't upload image try again later."
      })
      setLoading(false)
    }
  }
  const handleSellProduct = async () => {
    let data = {
      "categoryId": formValues.categoryId.value,
      "type": formValues.type.value,
      "title": formValues.title.value,
      "description": formValues.description.value,
      "brand": formValues.brand.value,
      "purchasedYear": formValues.purchasedYear.value,
      "distanceDriven": formValues.distanceDriven.value,
      "pickupAddress": formValues.pickupAddress.value,
      "images": formValues.images.value.map((image, i) => {
        return {
          uri: image,
          isDefault: i == 0 ? true : false
        }
      })
    }
    setLoading(true)
    try {
      const response = await userService.sellProduct(data)
      console.log(response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackDetails({});
  };

  return (
    <div>
      <Modal
        open={true}
        //onClose={handleClose}
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
                value={formValues.title.value}
                onChange={handleChange}
                error={!!formValues.title.error}
                helperText={formValues.title.error}
                required={formValues.title.required}
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
                value={formValues.description.value}
                onChange={handleChange}
                error={!!formValues.description.error}
                helperText={formValues.description.error}
                required={formValues.description.required}
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
                name="categoryId"
                size={size}
                value={formValues.categoryId.value}
                onChange={handleChange}
                error={!!formValues.categoryId.error}
                helperText={formValues.categoryId.error}
                required={formValues.categoryId.required}
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
                value={formValues.type.value}
                onChange={handleChange}
                error={!!formValues.type.error}
                helperText={formValues.type.error}
                required={formValues.type.required}
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
                value={formValues.brand.value}
                onChange={handleChange}
                error={!!formValues.brand.error}
                helperText={formValues.brand.error}
                required={formValues.brand.required}
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
                value={formValues.purchasedYear.value}
                onChange={handleChange}
                error={!!formValues.purchasedYear.error}
                helperText={formValues.purchasedYear.error}
                required={formValues.purchasedYear.required}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant={variant}
                margin={margin}
                fullWidth
                label="Purchased Price"
                name="purchasedPrice"
                placeholder="purchased price"
                type="number"
                size={size}
                value={lastName.value}
                onChange={handleChange}
                error={!!lastName.error}
                helperText={lastName.error}
                required={lastName.required}
              />
            </Grid> */}
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
                value={formValues.distanceDriven.value}
                onChange={handleChange}
                error={!!formValues.distanceDriven.error}
                helperText={formValues.distanceDriven.error}
                required={formValues.distanceDriven.required}
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
                value={formValues.pickupAddress.value}
                onChange={handleChange}
                error={!!formValues.pickupAddress.error}
                helperText={formValues.pickupAddress.error}
                required={formValues.pickupAddress.required}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ margin: "2px", paddingTop: '16px' }} />
                  {previewImages && (
                    <div>
                      {previewImages.map((img, i) => {
                        return <img className="preview" src={img} alt={"image-" + i} key={i} width="60px" height="60px" style={{ margin: "5px" }} />;
                      })}
                    </div>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    component="label"
                    size='small'
                    startIcon={<UploadIcon />}
                    disabled={previewImages.length ? false : true}
                    onClick={handleUploadImages}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              disabled={isError()}
              color="primary"
              size={size}
              onClick={!isError() ? handleSellProduct : () => null}
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
          {
            loading ?
              <Loader /> : null
          }
        </Box>
      </Modal>
      <Snackbar open={snackDetails.show}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity={snackDetails.severity}
          sx={{ width: '100%' }}>
          {snackDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SellProduct;