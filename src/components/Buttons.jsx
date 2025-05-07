import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

export const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // ganti dengan path yang kamu inginkan
    };

    return (
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Go Back
        </Button>
    );
};

export const ButtonDaftar = ({ onClick }) => {
    return (
        <Button variant="contained" color="success" onClick={onClick}>
            Daftar
        </Button>
    );
};

export const ButtonSubmit = ({ onClick }) => {
    return (
        <Button type="submit" variant="contained" color="primary" onClick={onClick}>
            Submit
        </Button>
    );
};

export const ButtonClose = ({ onClick }) => {
    return (
        <Button variant="contained" color="secondary" onClick={onClick}>
            Close
        </Button>
    );
};

export const ModalCloseButton = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color="error"
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                minWidth: 'unset',
                padding: 1,
                borderRadius: '50%',
            }}
        >
            <CloseIcon />
        </Button>
    );
};