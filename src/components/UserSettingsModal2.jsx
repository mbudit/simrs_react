import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Fade, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { ModalCloseButton } from './Buttons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '30vw',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: 0,
    borderRadius: '12px',
    '& .MuiTextField-root': {
        m: 1,
        width: '25ch',
    },
};
const UserSettingsModal2 = ({ isOpen, handleClose, form, setForm }) => {
    /* if (!isOpen) return null; */

    const { enqueueSnackbar } = useSnackbar();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setForm({
                id: '',
                email: '',
                password: '',
            });
            setErrors({});
        } else {
            const storedId = localStorage.getItem('id') || '';
            const storedEmail = localStorage.getItem('email') || '';
            console.log('📧 Email dari localStorage:', storedEmail);
            console.log('ID dari localStorage:', storedId);
            setForm({
                id: storedId,
                email: storedEmail,
                password: '',
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let newErrors = {};
        if (!form.email) newErrors.email = "Email wajib diisi";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) return;
    
        const storedEmail = localStorage.getItem('email') || '';
        const isEmailChanged = form.email !== storedEmail;
        const isPasswordFilled = form.password && form.password.trim() !== '';
    
        // ✅ Jika tidak ada yang berubah, langsung tutup modal saja
        if (!isEmailChanged && !isPasswordFilled) {
            handleClose();
            return;
        }
    
        // ✅ Kirim request ke backend
        axios.put('/api/updateUser', form)
            .then((res) => {
                enqueueSnackbar(res.data.message, { variant: 'success' });

                // ✅ Panggil logout ke backend (dengan route: /api/auth/logout)
                axios.post('/api/auth/logout')
                .then(() => {
                    localStorage.clear(); // Bersihkan localStorage
                    window.location.href = '/login'; // Redirect ke halaman login
                })
                .catch(() => {
                    enqueueSnackbar('Logout gagal setelah update', { variant: 'error' });
                });
            })
            .catch((err) => {
                enqueueSnackbar(err.response?.data?.error || 'Gagal update user', { variant: 'error' });
            });
    };
    

    return (
        <Modal 
            open={isOpen} 
            onClose={handleClose}
            closeAfterTransition
        >
            <Box sx={style}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#1e2838',
                        color: '#fff',
                        px: 2,
                        py: 1.5,
                    }}
                >
                    <h2 className="text-xl font-bold">User Settings</h2>
                    <ModalCloseButton onClick={handleClose} />
                </Box>

                <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid columns={12} hidden>
                            <TextField
                                label="ID"
                                name="id"
                                value={form.id}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.id}
                                helperText={errors.id}
                                sx={{ minWidth: 530 }}
                            />
                        </Grid>  
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ minWidth: 530 }}
                        />
                        <TextField
                            label="Password Baru"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{ minWidth: 530 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Simpan
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserSettingsModal2;
