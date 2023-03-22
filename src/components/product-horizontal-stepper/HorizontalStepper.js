import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const HorizontalStepper = ({ steps }) => {
    return (
        <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default HorizontalStepper;