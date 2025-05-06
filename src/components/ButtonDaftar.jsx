import React from 'react';
import Button from '@mui/material/Button';

const ButtonDaftar = ({ onClick }) => {
    return (
        <Button variant="contained" color="success" onClick={onClick}>
            Daftar
        </Button>
    );
}

export default ButtonDaftar;