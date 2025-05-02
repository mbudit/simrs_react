import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // ganti dengan path yang kamu inginkan
    };

    return (
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Go Back
        </Button>
    );
}

export default BackButton;