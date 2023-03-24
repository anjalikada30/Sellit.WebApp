import { Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import './styles.css';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { user } from '../../data/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { EditUserMobile, SignupStep1, SignupStep2, SignupStep3 } from "../../components";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const initialValues = (user) => {
    return {
        name: {
            value: user?.name,
            error: '',
            required: true,
            validate: 'text',
            minLength: 2,
            maxLength: 20,
            helperText: 'Custom error message'
        },
        email: {
            value: user?.email,
            error: '',
            required: true,
            validate: 'email'
        },
        mobile: {
            value: user?.mobile,
            error: '',
            required: true,
            validate: 'phone',
            maxLength: 15
        },
        identityProofNumber: {
            value: user?.identityProofNumber,
            error: '',
            required: true,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        city: {
            value: user?.city,
            error: '',
            required: true,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        state: {
            value: user?.state,
            error: '',
            required: true,
            validate: 'select'
        },
        addressLine1: {
            value: user?.addressLine1,
            error: '',
            required: true,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        landmark: {
            value: user?.landmark,
            error: '',
            required: true,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        zipCode: {
            value: user?.zipCode,
            error: '',
            required: true,
            validate: 'number',
            minLength: 3,
            maxLength: 20
        },
        country: {
            value: 'India',
            error: '',
            required: true,
            validate: 'text',
        },
        identityProofType: {
            value: user?.identityProofType,
            error: '',
            required: true,
            validate: 'select'
        },
        identityProofNumber: {
            value: user?.identityProofNumber,
            error: '',
            required: true,
            validate: 'proof'
        },
        identityProofImageUri: {
            value: '',
            error: '',
            required: true,
            validate: 'image'
        },
        bankAccountNumber: {
            value: user?.bankAccountNumber,
            error: '',
            required: false,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        ifscCode: {
            value: user?.ifscCode,
            error: '',
            required: false,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        accountHolderName: {
            value: user?.accountHolderName,
            error: '',
            required: false,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        UPI: {
            value: user?.UPI,
            error: '',
            required: false,
            validate: 'text',
            minLength: 3,
            maxLength: 20
        },


    }
}
const UserProfile = () => {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false)
    const [editKycDetails, setEditKycDetails] = useState(false)
    const [editBankDetails, setEditBankDetails] = useState(false)
    const [editMobileDetails, setEditMobileDetails] = useState(false)
    const [formValues, setFormValues] = useState(initialValues(user))
    const isText = /^([a-zA-Z0-9 ]+)$/;
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isPhone = /^[5-9]\d{9}$/gi;
    const isZip = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
    const isNumber = /^\d+$/;
    const isAadharNumber = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    const isPan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    const renderPersonalDetails = () => (
        <Grid container direction="column" spacing={1} sx={{
            display: 'flex',
            backgroundColor: '#d3d3d347',
            p: 1,
        }}>
            <Grid item>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.1rem"}>
                            Personal Details
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<BorderColorIcon />}
                            onClick={() => setEditPersonalDetails(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} className="personal-details" sx={{
                    pl: 1
                }}>
                    <Grid item >
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Name:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value" >{user.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Email:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.email}</Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Phone Number:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">Sample</Typography>
                        <IconButton>
                            <BorderColorIcon color="primary" className="edit-mobile" />
                        </IconButton>
                    </Grid> */}
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Address Line1:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.addressLine1}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Landmark:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.landmark}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Zipcode:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.zipCode}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>City:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.city}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>State:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.state}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Country:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.country}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const renderMobileDetails = () => (
        <Grid container direction="column" spacing={1} sx={{
            display: 'flex',
            backgroundColor: '#d3d3d347',
            p: 1,
        }}>
            <Grid item>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Phone Number:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.mobile}</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<BorderColorIcon />}
                            onClick={() => setEditMobileDetails(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const renderKycDetails = () => (
        <Grid container direction="column" spacing={1} sx={{
            display: 'flex',
            backgroundColor: '#d3d3d347',
            p: 1,
        }}>
            <Grid item>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.1rem"}>
                            KYC Details
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<BorderColorIcon />}
                            onClick={() => setEditKycDetails(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} className="personal-details" sx={{
                    pl: 1
                }}>
                    <Grid item >
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Proof type:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value" >Aadhar</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Aadhar Number:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.identityProofNumber}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    const renderBankDetails = () => (
        <Grid container direction="column" spacing={1} sx={{
            display: 'flex',
            backgroundColor: '#d3d3d347',
            p: 1,
        }}>
            <Grid item>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div" fontWeight='bold' fontSize={"1.1rem"}>
                            Bank Details
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<BorderColorIcon />}
                            onClick={() => setEditBankDetails(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} className="personal-details" sx={{
                    pl: 1
                }}>
                    <Grid item >
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Account Holder Name:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value" >{user.accountHolderName}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Account Number:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.bankAccountNumber}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>IFSC Code:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.ifscCode}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>UPI ID:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{user.UPI ? user.UPI : "-"}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    const handleEditPersonalClose = () => {
        setEditPersonalDetails(false)
    }
    const handleEditKycClose = () => {
        setEditKycDetails(false)
    }
    const handleEditBankClose = () => {
        setEditBankDetails(false)
    }
    const handleEditMobileClose = () => {
        setEditMobileDetails(false)
    }
    const handleChange = (event, image) => {
        let { type, name, value } = event.target;
        if (image) name = "identityProofImageUri";
        const fieldValue = !image ? value : event.target.files[0];
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

                case "email":
                    if (value && !isEmail.test(value))
                        error = helperText || "Please enter a valid email address.";
                    break;

                case "phone":
                    if (value && !isPhone.test(value))
                        error =
                            helperText ||
                            "Please enter a valid phone number.";
                    break;

                case "zip":
                    if (value && !isZip.test(value))
                        error = helperText || "Please enter a valid zip code.";
                    break;

                case "select":
                    if (!value) error = helperText || "Please select a value.";
                    break;

                case "proof":
                    if (formValues.identityProofType.value === "AA") {
                        if (value && !isAadharNumber.test(value))
                            error = helperText || "Please enter a valid aadhar number. i.e: XXXX XXXX XXXX";
                    } else {
                        if (value && !isPan.test(value))
                            error = helperText || "Please enter a valid pan number.";
                    }
                    break;

                case "image":
                    if (!value) error = helperText || "Please select an image.";
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
    const handleEditPersonalDetails = () => {
        console.log('edited')
        setEditPersonalDetails(false)
    }
    const handleEditKycDetails = () => {
        console.log('edited')
        setEditKycDetails(false)
    }
    const handleEditBankDetails = () => {
        console.log('edited')
        setEditBankDetails(false)
    }
    const handleEditMobileDetails = () => {
        console.log('edited')
        setEditMobileDetails(false)
    }
    const personalDetailsValues = {
        formValues,
        handleChange,
        action: 'edit',
        handleClose: handleEditPersonalClose,
        handleEdit: handleEditPersonalDetails
    }
    const kycDetailsValues = {
        formValues,
        handleChange,
        action: 'edit',
        handleClose: handleEditKycClose,
        handleEdit: handleEditKycDetails
    }
    const bankDetailsValues = {
        formValues,
        handleChange,
        action: 'edit',
        handleClose: handleEditBankClose,
        handleEdit: handleEditBankDetails
    }
    const mobileDetailsValues = {
        formValues,
        handleChange,
        handleClose: handleEditMobileClose,
        handleEdit: handleEditMobileDetails
    }

    return (
        <>
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
                <Grid container sx={{ mt: 2 }} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {renderPersonalDetails()}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={2} >
                            <Grid item >
                                {renderMobileDetails()}
                            </Grid>
                            <Grid item>
                                {renderKycDetails()}
                            </Grid>
                            <Grid item>
                                {renderBankDetails()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {
                editPersonalDetails ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleEditPersonalClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Edit Personal Details
                            </Typography>
                            <SignupStep1 {...personalDetailsValues} />
                        </Box>

                    </Modal> : null
            }
            {
                editKycDetails ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleEditKycClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Edit KYC Details
                            </Typography>
                            <SignupStep2 {...kycDetailsValues} />
                        </Box>

                    </Modal> : null
            }
            {
                editBankDetails ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleEditBankClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Edit Bank Details
                            </Typography>
                            <SignupStep3 {...bankDetailsValues} />
                        </Box>

                    </Modal> : null
            }
            {
                editMobileDetails ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleEditMobileClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Edit Phone Number
                            </Typography>
                            <EditUserMobile {...mobileDetailsValues} />
                        </Box>

                    </Modal> : null
            }
        </>
    )
}

export default UserProfile;