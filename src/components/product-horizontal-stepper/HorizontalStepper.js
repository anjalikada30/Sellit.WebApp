import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const HorizontalStepper = ({ steps, activeStep }) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default HorizontalStepper;