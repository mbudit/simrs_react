import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // ganti dengan path yang kamu inginkan
    };

    return (
        <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
                backgroundColor: '#000000',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#222222',
                },
            }}
        >
            Go Back
        </Button>
    );
};

export const ButtonDaftar = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            onClick={onClick}
            sx={{
                backgroundColor: '#948979',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#7c715f',
                },
            }}
        >
            Daftar
        </Button>
    );
};

export const ButtonTambahPelayanan = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            onClick={onClick}
            sx={{
                backgroundColor: '#948979',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#7c715f',
                },
            }}
        >
            Tambah Pelayanan
        </Button>
    );
};

export const ButtonTambahObat = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            onClick={onClick}
            sx={{
                backgroundColor: '#948979',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#7c715f',
                },
            }}
        >
            Tambah Obat
        </Button>
    );
};

export const ButtonSubmit = ({ onClick }) => {
    return (
        <Button type="submit" variant="contained" color="success" onClick={onClick}>
            Submit
        </Button>
    );
};

export const ButtonClose = ({ onClick }) => {
    return (
        <Button variant="contained" color="error" onClick={onClick}>
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

export const ButtonPasienLama = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            onClick={onClick} 
            sx={{ 
                    mt: 1, 
                    mr: 1,
                    backgroundColor: '#948979',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#7c715f',
                    }, 
                }}
            >
            Pasien Lama
        </Button>
    );
};

export const ButtonExportPDF = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={<PrintIcon />}
            sx={{
                backgroundColor: '#AF8260',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#8C654F',
                },
            }}
        >
            Export PDF
        </Button>
    );
};

export const ButtonHapusData = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onClick}
            startIcon={<DeleteIcon />}
        >
            Hapus
        </Button>
    );
};

export const ButtonEditData = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onClick}
            startIcon={<EditIcon />}
        >
            Edit
        </Button>
    );
};

export const ButtonKonfirmasiData = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="success"
            size="small"
            onClick={onClick}
            startIcon={<CheckIcon />}
        >
            Confirm
        </Button>
    );
};