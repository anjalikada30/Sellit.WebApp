import { Box, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../store/actions/auth';
import { Loader } from '../loader';
import { SignupStep1 } from '../signup-step1';
import SignupStep2 from '../signup-step2/SignupStep2';
import { SignupStep3 } from '../signup-step3';
import { Success } from '../success';


const labels = ["Personal details", "KYC details", "Bank details"];

const initialValues = {
    name: {
        value: '',
        error: '',
        required: true,
        //validate: 'text',
        minLength: 2,
        //maxLength: 20,
        helperText: 'Custom error message'
    },
    email: {
        value: '',
        error: '',
        required: true,
        validate: 'email'
    },
    mobile: {
        value: '',
        error: '',
        required: true,
        validate: 'phone',
        maxLength: 15
    },
    password: {
        value: '',
        error: '',
        required: true,
        validate: 'password',
        minLength: 6,
        maxLength: 20
    },
    confirmPassword: {
        value: '',
        error: '',
        required: true,
        validate: 'confirmPassword',
        minLength: 6,
        maxLength: 20
    },
    identityProofNumber: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    city: {
        value: '',
        error: '',
        required: true,
        //validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    state: {
        value: '',
        error: '',
        required: true,
        validate: 'select'
    },
    addressLine1: {
        value: '',
        error: '',
        required: true,
        //validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    landmark: {
        value: '',
        error: '',
        required: true,
        //validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    zipCode: {
        value: '',
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
        //validate: 'text',
    },
    identityProofType: {
        value: '',
        error: '',
        required: true,
        validate: 'select'
    },
    identityProofNumber: {
        value: '',
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
    bankType: {
        value: '',
        error: '',
        required: true,
        validate: 'select'
    },
    bankAccountNumber: {
        value: '',
        error: '',
        required: false,
        validate: 'bankacc',
        minLength: 3,
        maxLength: 20
    },
    ifscCode: {
        value: '',
        error: '',
        required: false,
        validate: 'ifsc',
        minLength: 3,
        maxLength: 20
    },
    accountHolderName: {
        value: '',
        error: '',
        required: false,
        //validate: 'text',
        minLength: 3,
        maxLength: 20
    },
    UPI: {
        value: '',
        error: '',
        required: false,
        validate: 'upi',
        minLength: 3,
        maxLength: 20
    },
}


const SignupForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState(initialValues)
    const [loading, setLoading] = useState(false)

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

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

    // Proceed to next step
    const handleNext = useCallback(() => setActiveStep(activeStep + 1), [activeStep]);
    // Go back to prev step
    const handleBack = useCallback(() => setActiveStep(activeStep - 1), [activeStep]);

    const handleChange = (event, image, imageurl) => {
        if (imageurl) {
            setFormValues({
                ...formValues,
                identityProofImageUri: {
                    ...formValues['identityProofImageUri'],
                    value: imageurl
                }
            })
            return;
        }
        let { type, name, value } = event.target;
        if (image) name = "identityProofImageUri";
        const fieldValue = !image ? value : event.target.files[0];
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

                case "confirmPassword":
                    if (value !== formValues.password.value)
                        error =
                            helperText ||
                            "Password Mismatch!";
                    break;

                case "zip":
                    if (value && !isZip.test(value))
                        error = helperText || "Please enter a valid zip code.";
                    break;

                case "select":
                    if (!value) error = helperText || "Please select a value.";
                    break;

                case "proof":
                    if (Number(formValues.identityProofType.value) === 2) {
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

    const handleSignup = () => {
        let data = {
            "name": formValues.name.value,
            "email": formValues.email.value,
            "mobile": formValues.mobile.value,
            "password": formValues.password.value,
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
        if (formValues.bankType?.value === "1") {
            if (formValues.bankAccountNumber.value &&
                formValues.ifscCode.value &&
                formValues.accountHolderName.value)
                data = {
                    ...data,
                    "bankAccountNumber": formValues.bankAccountNumber.value,
                    "ifscCode": formValues.ifscCode.value,
                    "accountHolderName": formValues.accountHolderName.value
                }
        } else if (formValues.UPI.value) {
            if (formValues.UPI.value)
                data = {
                    ...data,
                    "UPI": formValues.UPI.value,
                }
        }
        setLoading(true)
        dispatch(register({ ...data }))
            .then(() => {
                setLoading(false)
                handleNext()
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const values = {
        formValues,
        handleNext,
        handleBack,
        handleChange,
        handleSignup
    }

    const handleSteps = () => {
        switch (activeStep) {
            case 0:
                return <SignupStep1 {...values} />;
            case 1:
                return <SignupStep2 {...values} />;
            case 2:
                return <SignupStep3 {...values} />;
            default:
                throw new Error("Unknown step");
        }
    };

    return (
        <>
            {activeStep === labels.length ? (
                <Success text={"Thank you!"} />
            ) : (
                <>
                    <Box sx={{ my: 1 }}>
                        <Typography variant="h5" align="center">
                            Signup
                        </Typography>
                    </Box>
                    <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
                        {labels.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {handleSteps()}
                    <Grid container>
                        <Grid item>
                            <Link to="/" >
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </>
            )}
            {
                loading ?
                    <Loader /> : null
            }
        </>
    )
}

export default SignupForm;