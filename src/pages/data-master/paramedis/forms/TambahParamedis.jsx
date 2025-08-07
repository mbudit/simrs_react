import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Fade, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ButtonClose, ButtonPasienLama, ButtonSubmit, ModalCloseButton } from '../../../../components/Buttons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ConfirmDialog from '../../../../components/ConfirmDialog';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '53vw',
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
export default function ModalTambahParamedis({ open, handleClose, form, setForm, setRefreshTrigger }) {
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!open) {
            // Reset form saat modal ditutup
            setForm({
                id: '',
                nama_lengkap: '',
                nik: '',
                area: '',
                lokasi_kerja: '',
                alamat: '',
            });
            setErrors({});
        } else {
            // Saat modal dibuka, pastikan form memiliki nilai yang valid (tidak undefined)
            setForm((prevForm) => ({
                id: prevForm.id || '',
                nama_lengkap: prevForm.nama_lengkap || '',
                nik: prevForm.nik || '',
                area: prevForm.area || '',
                lokasi_kerja: prevForm.lokasi_kerja || '',
                alamat: prevForm.alamat || '',
            }));
        }
    }, [open]);

    const area = [
        {
            value: 'Rawat Inap',
            label: 'Rawat Inap',
        },
        {
            value: 'Rawat Jalan',
            label: 'Rawat Jalan',
        },
        {
            value: 'IGD',
            label: 'IGD',
        },
    ];

    const lokasi_kerja = [
        {
            value: 'Kamar 1',
            label: 'Kamar 1',
        },
        {
            value: 'Kamar 2',
            label: 'Kamar 2',
        },
        {
            value: 'Kamar 3',
            label: 'Kamar 3',
        },
    ];
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
    
        let isValid = true;
        let newErrors = {};
    
        // Daftar field yang wajib diisi sesuai inputan form paramedis
        const requiredFields = [
            'nama_lengkap',
            'nik',
            'area',
            'lokasi_kerja',
            'alamat',
        ];
    
        for (const key of requiredFields) {
            if (!form[key]) {
                isValid = false;
                newErrors[key] = 'Field ini tidak boleh kosong';
            }
        }
    
        if (!isValid) {
            setErrors(newErrors);
            return;
        }
    
        setOpenDialog(true);
    };

    const handleConfirmSubmit = async () => {
        const formattedData = {
            ...form,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/createParamedis`, formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response:', response.data);
            
            // Menampilkan snackbar setelah berhasil submit
            enqueueSnackbar('Data berhasil disubmit!', { variant: 'success', autoHideDuration: 3000 });
            setRefreshTrigger(prev => !prev); // trigger refresh table
            handleClose();
        } catch (error) {
            console.error('Error terjadi:', error);
            
            // Menampilkan snackbar jika terjadi error
            enqueueSnackbar('Terjadi kesalahan saat mengirim data', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    const handleCancelSubmit = () => {
        setOpenDialog(false); // Menutup dialog konfirmasi tanpa submit
    };

    return (
        <Box>
            <Modal 
                open={open} 
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#4682A9', // biru MUI default
                                color: '#fff',
                                px: 2,
                                py: 1.5,
                                /* borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px', */
                                /* borderBottom: '1px solid #1565c0', */
                            }}
                            >
                            <h2 className="text-xl font-bold">Tambah Paramedis</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Lengkap"
                                            name="nama_lengkap"
                                            value={form.nama_lengkap || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_lengkap}
                                            helperText={errors.nama_lengkap || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="NIK"
                                            name="nik"
                                            value={form.nik || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nik}
                                            helperText={errors.nik || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Area"
                                            name="area" // tambahkan name
                                            value={form.area || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.area}
                                            helperText={errors.area || " "}
                                            fullWidth
                                        >
                                            {area.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Pilih Lokasi Kerja"
                                            name="lokasi_kerja" // tambahkan name
                                            value={form.lokasi_kerja || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.lokasi_kerja}
                                            helperText={errors.lokasi_kerja || " "}
                                            fullWidth
                                        >
                                            {lokasi_kerja.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Alamat"
                                            name="alamat"
                                            value={form.alamat || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.alamat}
                                            helperText={errors.alamat}
                                            multiline
                                            rows={4} // Menentukan tinggi area teks, bisa disesuaikan sesuai kebutuhan
                                            style={{ width: '600px' }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    <ButtonSubmit onClick={handleSubmit} />
                                    <Box sx={{ ml: 2 }}>
                                        <ButtonClose onClick={handleClose} />
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            <ConfirmDialog
                open={openDialog}
                onCancel={handleCancelSubmit}
                onConfirm={() => {
                    handleConfirmSubmit();
                    setOpenDialog(false);
                }}
            />
        </Box>
    );
};

