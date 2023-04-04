import { Alert, Box, Button, Grid, IconButton, Modal, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './styles.css';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { user } from '../../data/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { EditPassword, EditUserMobile, Loader, SignupStep1, SignupStep2, SignupStep3, VerifyMobileOtp } from "../../components";
import userService from "../../services/user.service";

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
const otpStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 260,
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
            //validate: 'text',
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
            //validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        landmark: {
            value: user?.landmark,
            error: '',
            required: true,
            //validate: 'text',
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
            value: user?.identityProofImageUri,
            error: '',
            required: true,
            validate: 'image'
        },
        bankAccountNumber: {
            value: user?.bankAccountNumber,
            error: '',
            required: true,
            validate: 'bankacc',
            minLength: 3,
            maxLength: 20
        },
        ifscCode: {
            value: user?.ifscCode,
            error: '',
            required: true,
            validate: 'ifsc',
            minLength: 3,
            maxLength: 20
        },
        accountHolderName: {
            value: user?.accountHolderName,
            error: '',
            required: true,
            //validate: 'text',
            minLength: 3,
            maxLength: 20
        },
        UPI: {
            value: user?.UPI,
            error: '',
            required: true,
            validate: 'upi',
            minLength: 3,
            maxLength: 20
        },
        bankType: {
            value: user?.UPI ? "2" : "1",
            error: '',
            required: true,
            validate: 'select'
        },
        currentPassword: {
            value: '',
            error: '',
            required: true,
            validate: 'password',
            minLength: 6,
            maxLength: 20
        },
        newPassword: {
            value: '',
            error: '',
            required: true,
            validate: 'password',
            minLength: 6,
            maxLength: 20
        },
        confirmNewPassword: {
            value: '',
            error: '',
            required: true,
            validate: 'confirmPassword',
            minLength: 6,
            maxLength: 20
        }

    }
}
const UserProfile = () => {
    const [editPersonalDetails, setEditPersonalDetails] = useState(false)
    const [editKycDetails, setEditKycDetails] = useState(false)
    const [editBankDetails, setEditBankDetails] = useState(false)
    const [editMobileDetails, setEditMobileDetails] = useState(false)
    const [formValues, setFormValues] = useState(initialValues({}))
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [snackDetails, setSnackDetails] = useState({})
    const [showVerifyOtp, setShowVerifyOtp] = useState(false)
    const [otpMessage, setOtpMessage] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState(null)
    const [showKycImage, setShowKycImage] = useState(false)
    const isText = /^([a-zA-Z0-9 ]+)$/;
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isPhone = /^[5-9]\d{9}$/gi;
    const isZip = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
    const isNumber = /^\d+$/;
    const isAadharNumber = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    const isPan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    const isBankAccNum = /^\d{9,18}$/;
    const isIfsccode = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
    const isUpi = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        setLoading(true)
        try {
            const response = await userService.getUserProfile()
            setLoading(false)
            setUserDetails(response?.data?.response)
            setFormValues(initialValues(response?.data?.response?.user))
        } catch (err) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to fetch user profile. Please try again later"
            })
        }
    }

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
                        <Button variant="outlined" startIcon={<BorderColorIcon />}
                            onClick={() => setEditPassword(true)}
                            sx={{ ml: 1 }}>
                            Edit Password
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
                        <Typography variant="span" gutterBottom className="profile-value" >{userDetails?.user?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Email:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.email}</Typography>
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
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.addressLine1}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Landmark:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.landmark}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Zipcode:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.zipCode}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>City:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.city}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>State:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.state}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>Country:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.country}</Typography>
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
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.mobile}</Typography>
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

    const handleViewIdentityImage = () => {
        setShowKycImage(true)
    }

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
                        <Typography variant="span" gutterBottom className="profile-value" >
                            {Number(userDetails?.user?.identityProofType) === 2 ? "Aadhar Number" :
                                "Permanent Account Number(PAN)"}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="div" gutterBottom className="profile-item">
                            <b>{Number(userDetails?.user?.identityProofType) === 2 ? "Aadhar Number" :
                                "Permanent Account Number(PAN)"}:</b>
                        </Typography>
                        <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.identityProofNumber}</Typography>
                        <IconButton aria-label="view" sx={{ ml: 2 }} onClick={handleViewIdentityImage}>
                            <VisibilityIcon />
                        </IconButton>
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
                    {
                        userDetails?.user?.UPI ?
                            <Grid item>
                                <Typography variant="div" gutterBottom className="profile-item">
                                    <b>UPI ID:</b>
                                </Typography>
                                <Typography variant="span" gutterBottom className="profile-value">{userDetails?.user?.UPI}</Typography>
                            </Grid> : null
                    }
                    {
                        !userDetails?.user?.UPI ?
                            <Grid item >
                                <Typography variant="div" gutterBottom className="profile-item">
                                    <b>Account Holder Name:</b>
                                </Typography>
                                <Typography variant="span" gutterBottom className="profile-value" >{user.accountHolderName}</Typography>
                            </Grid> : null
                    }
                    {
                        !userDetails?.user?.UPI ?
                            <Grid item>
                                <Typography variant="div" gutterBottom className="profile-item">
                                    <b>Account Number:</b>
                                </Typography>
                                <Typography variant="span" gutterBottom className="profile-value">{user.bankAccountNumber}</Typography>
                            </Grid> : null
                    }
                    {
                        !userDetails?.user?.UPI ?
                            <Grid item>
                                <Typography variant="div" gutterBottom className="profile-item">
                                    <b>IFSC Code:</b>
                                </Typography>
                                <Typography variant="span" gutterBottom className="profile-value">{user.ifscCode}</Typography>
                            </Grid> : null
                    }
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
    const handleVerifyOtpClose = () => {
        setShowVerifyOtp(false)
        setOtpMessage(null)
    }
    const handleEditpasswordClose = () => {
        setShowVerifyOtp(false)
        setPasswordMessage(null)
    }
    const handleKycImageClose = () => {
        setShowKycImage(false)
    }
    const handleChange = (event, image, imageUri) => {
        let name, value;
        if (imageUri) name = "identityProofImageUri";
        else {
            name = event.target.name;
            value = event.target.value;
        }
        const fieldValue = !imageUri ? value : imageUri;
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
                    if (!imageUri) error = helperText || "Please select an image.";
                    break;

                case "bankacc":
                    if (value && !isBankAccNum.test(value))
                        error = helperText || "Please enter a valid account number.";
                    break;

                case "ifsc":
                    if (value && !isIfsccode.test(value))
                        error = helperText || "Please enter a valid ifsc code.";
                    break;

                case "upi":
                    if (value && !isUpi.test(value))
                        error = helperText || "Please enter a valid upi id.";
                    break;

                case "confirmPassword":
                    if (value !== formValues.newPassword.value)
                        error =
                            helperText ||
                            "Password Mismatch!";
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
    const handleEditPersonalDetails = async () => {
        const data = {
            "name": formValues.name.value,
            "email": formValues.email.value,
            "identityProofType": formValues.identityProofType.value,
            "identityProofNumber": formValues.identityProofNumber.value,
            "identityProofImageUri": formValues.identityProofImageUri.value,
            "addressLine1": formValues.addressLine1.value,
            "landmark": formValues.landmark.value,
            "city": formValues.city.value,
            "state": formValues.state.value,
            "zipCode": formValues.zipCode.value,
            "country": formValues.country.value
        }
        setEditPersonalDetails(false)
        setLoading(true)
        try {
            await userService.editPersonalDetails(data)
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Edited personal details successfully!"
            })
            fetchUserProfile()
        } catch (error) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to edit personal details. Please try again later."
            })
        }
    }
    const handleEditKycDetails = async () => {
        const data = {
            "name": formValues.name.value,
            "email": formValues.email.value,
            "identityProofType": formValues.identityProofType.value,
            "identityProofNumber": formValues.identityProofNumber.value,
            "identityProofImageUri": formValues.identityProofImageUri.value,
            "addressLine1": formValues.addressLine1.value,
            "landmark": formValues.landmark.value,
            "city": formValues.city.value,
            "state": formValues.state.value,
            "zipCode": formValues.zipCode.value,
            "country": formValues.country.value
        }
        setEditKycDetails(false)
        setLoading(true)
        try {
            await userService.editPersonalDetails(data)
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Edited kyc details successfully!"
            })
            fetchUserProfile()
        } catch (error) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to edit kyc details. Please try again later."
            })
        }
    }
    const handleEditBankDetails = async () => {
        let data = {}
        if (formValues.bankType.value === "1") {
            data = {
                "bankAccountNumber": formValues.bankAccountNumber.value,
                "ifscCode": formValues.ifscCode.value,
                "accountHolderName": formValues.accountHolderName.value,
            }
        } else {
            data = {
                "UPI": formValues.UPI.value
            }
        }
        setEditBankDetails(false)
        setLoading(true)
        try {
            await userService.editBankDetails(data)
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Edited bank details successfully!"
            })
            fetchUserProfile()
        } catch (error) {
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'error',
                message: "Unable to edit bank details. Please try again later."
            })
        }
    }
    const handleEditMobileDetails = async () => {
        if (userDetails?.user.mobile !== formValues?.mobile?.value) {
            const data = {
                "mobile": formValues.mobile.value
            }
            setEditMobileDetails(false)
            setLoading(true)
            try {
                await userService.editMobileDetails(data)
                setLoading(false)
                setShowVerifyOtp(true)
            } catch (error) {
                setLoading(false)
                setSnackDetails({
                    show: true,
                    severity: 'error',
                    message: error?.response?.data?.message
                })
            }
        }
    }
    const handleVerifyOtpDetails = async (otp) => {
        setLoading(true)
        const data = {
            otp: otp
        }
        try {
            await userService.verifyMobileOtp(data)
            setLoading(false)
            setShowVerifyOtp(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Edited mobile number successfully!"
            })
            fetchUserProfile()
        } catch (error) {
            setLoading(false)
            setOtpMessage(error?.response?.data?.message)
        }
    }
    const handleEditPassword = async () => {
        setLoading(true)
        const data = {
            currentPassword: formValues.currentPassword.value,
            newPassword: formValues.newPassword.value
        }
        try {
            await userService.updatePassword(data)
            setEditPassword(false)
            setLoading(false)
            setSnackDetails({
                show: true,
                severity: 'success',
                message: "Edited password successfully!"
            })
            fetchUserProfile()
        } catch (error) {
            setLoading(false)
            setPasswordMessage(error?.response?.data?.message)
        }
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
    const verifyOtpValues = {
        formValues,
        handleClose: handleVerifyOtpClose,
        handleSubmit: handleVerifyOtpDetails,
        otpmessage: otpMessage
    }
    const passwordDetailsValues = {
        formValues,
        handleClose: handleEditpasswordClose,
        handleEdit: handleEditPassword,
        handleChange: handleChange,
        passwordMessage: passwordMessage
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackDetails({});
    };
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
                            {userDetails?.user?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" sx={{ cursor: 'none' }} color="success">
                            Earned Amount : {userDetails?.totalEarning}
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
            {
                showVerifyOtp ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleVerifyOtpClose}
                    >
                        <Box sx={otpStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Verify Otp
                            </Typography>
                            <VerifyMobileOtp {...verifyOtpValues} />
                        </Box>

                    </Modal> : null
            }
            {
                editPassword ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleEditpasswordClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ mb: 1.5 }}>
                                Edit Password
                            </Typography>
                            <EditPassword {...passwordDetailsValues} />
                        </Box>

                    </Modal> : null
            }
            {
                showKycImage ?
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleKycImageClose}
                    >
                        <Box sx={style}>
                            <Grid container spacing={1} direction={'column'}>
                                <Grid item>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 400,
                                            width: 250
                                        }}
                                        alt="kyc image"
                                        src={userDetails?.user?.identityProofImageUri}
                                    />
                                </Grid>
                                <Grid item display={'flex'} justifyContent={'center'}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleKycImageClose}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Modal> : null
            }
            {
                loading ?
                    <Loader /> : null
            }
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
        </>
    )
}

export default UserProfile;