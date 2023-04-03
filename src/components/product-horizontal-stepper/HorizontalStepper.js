import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';

const HorizontalStepper = ({ steps, activeStep }) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
                <Step key={step.label}>
                    <StepLabel>
                        {step.label}
                        {
                            step.date ?
                                <Typography component="div" sx={{ fontSize: '0.7rem' }}>
                                    {step.date}
                                </Typography> : null
                        }
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default HorizontalStepper;