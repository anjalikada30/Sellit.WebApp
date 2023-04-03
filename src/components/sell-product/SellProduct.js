import React, { useCallback, useEffect, useState } from 'react';
import './sellproduct.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import userService from '../../services/user.service';
import { Loader } from '../loader';
import { useNavigate } from 'react-router-dom';

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

const initialValues = (details) => {
  return {
    title: {
      value: details?.title,
      error: '',
      required: true,
      //validate: 'text',
      minLength: 2,
      maxLength: 1000,
      helperText: 'Custom error message'
    },
    description: {
      value: details?.description,
      error: '',
      required: true,
      //validate: 'text',
      minLength: 2,
      maxLength: 1000
    },
    type: {
      value: details?.type,
      error: '',
      required: true,
      validate: 'select',
    },
    categoryId: {
      value: details?.categoryId,
      error: '',
      required: true,
      validate: 'select',
    },
    brand: {
      value: details?.brand,
      error: '',
      required: true,
      validate: 'text',
      minLength: 3,
      maxLength: 1000
    },
    purchasedYear: {
      value: details?.purchasedYear,
      error: '',
      required: true,
      validate: 'number',
      minLength: 3,
      maxLength: 20
    },
    distanceDriven: {
      value: details?.distanceDriven,
      error: '',
      required: true,
      validate: 'text',
      minLength: 3,
      maxLength: 20
    },
    pickupAddress: {
      value: details?.pickupAddress,
      error: '',
      required: true,
      //validate: 'text',
      minLength: 3,
      maxLength: 1000
    },
    images: {
      value: details?.images ?
        details.images.map(image => image.uri) : [],
      error: '',
      required: true
    }
  }
}

const SellProduct = ({ handleClose, action, details }) => {
  const variant = 'outlined';
  const margin = 'normal';
  const size = 'small';
  const [previewImages, setPreviewImages] = useState(details?.images ?
    details.images.map(image => image.uri) : []);
  const [formValues, setFormValues] = useState(initialValues(details));
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState()
  const [snackDetails, setSnackDetails] = useState({})
  const [categories, setCategories] = useState([])
  const [types, setTypes] = useState([])
  const isText = /^([a-zA-Z0-9 ]+)$/;
  const isNumber = /^\d+$/;
  const url = 'https://sell-it-bucket.s3.ap-northeast-1.amazonaws.com/'
  const navigate = useNavigate();
  useEffect(() => {
    fetchProductCategories()
  }, [])

  const fetchProductCategories = async () => {
    setLoading(true)
    try {
      const response = await userService.getCategories();
      setCategories(response)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const isError = useCallback(
    () => {
      let values = { ...formValues }
      if (formValues.categoryId.value !== "641fe3d2ef2615d31e0fc238") {
        delete values.distanceDriven;
      }
      Object.keys(values).some(
        (name) =>
          (values[name].required && !values[name].value) ||
          values[name].error
      )
    },
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
    const fieldName = initialValues()[name];
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

        case "number":
          if (value && !isNumber.test(value))
            error = helperText || "This field accepts numbers only.";
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
    if (name === 'categoryId') {
      const category = categories.find(category => category._id === value)
      setTypes(category.subCategories)
    }
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
    for (const file of files) {
      formData.append('files', file)
    }
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
      "pickupAddress": formValues.pickupAddress.value,
      "images": formValues.images.value.map((image, i) => {
        return {
          uri: image,
          isDefault: i == 0 ? true : false
        }
      })
    }
    if (formValues.categoryId.value === "641fe3d2ef2615d31e0fc238") {
      data = {
        ...data,
        "distanceDriven": formValues.distanceDriven.value
      }
    }
    setLoading(true)
    try {
      if (action !== 'edit') {
        await userService.sellProduct(data)
        navigate(`/${window.location.href.split('/')[3]}`)
      }
      else {
        data.productId = details._id;
        await userService.updateProduct(data)
      }
      setLoading(false)
      handleClose('success')
    } catch (error) {
      setLoading(false)
      setSnackDetails({
        show: true,
        severity: 'error',
        message: "Unable to add product. Please try again later."
      })
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
                {
                  categories.map(category => (
                    <option value={category._id} key={category._id}>{category.name}</option>
                  ))
                }
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
                {
                  types.map(type => (
                    <option value={type._id} key={type._id}>{type.name}</option>
                  ))
                }
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
            {
              formValues.categoryId.value === "641fe3d2ef2615d31e0fc238" ?
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
                </Grid> : null
            }
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
                  <input type="file" multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: "2px", paddingTop: '16px' }}
                  />
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
                    disabled={files ? false : true}
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
              {action ? 'Edit' : 'Sell Product'}
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