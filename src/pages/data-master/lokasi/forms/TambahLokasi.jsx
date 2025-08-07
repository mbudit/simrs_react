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
export default function ModalTambahLokasi({ open, handleClose, form, setForm, setRefreshTrigger }) {
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // State untuk loading lokasi
    const [lokasiLoading, setLokasiLoading] = useState(false);
    // Fungsi untuk mengisi otomatis latitude dan longitude
    const handleIsiOtomatisLokasi = () => {
        if (!navigator.geolocation) {
            enqueueSnackbar('Geolocation tidak didukung browser Anda', { variant: 'error' });
            return;
        }
        setLokasiLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setForm((prevForm) => ({
                    ...prevForm,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                }));
                setLokasiLoading(false);
                enqueueSnackbar('Lokasi berhasil diambil!', { variant: 'success' });
            },
            (err) => {
                setLokasiLoading(false);
                enqueueSnackbar('Gagal mengambil lokasi: ' + err.message, { variant: 'error' });
            }
        );
    };

    useEffect(() => {
        if (!open) {
            // Reset form saat modal ditutup
            setForm({
                id: '',
                kode_lokasi: '',
                nama_lokasi: '',
                kode_bpjs: '',
                id_location: '',
                latitude: '',
                longitude: '',
            });
            setErrors({});
        } else {
            // Saat modal dibuka, pastikan form memiliki nilai yang valid (tidak undefined)
            setForm((prevForm) => ({
                id: prevForm.id || '',
                kode_lokasi: prevForm.kode_lokasi || '',
                nama_lokasi: prevForm.nama_lokasi || '',
                kode_bpjs: prevForm.kode_bpjs || '',
                id_location: prevForm.id_location || '',
                latitude: prevForm.latitude || '',
                longitude: prevForm.longitude || '',
            }));
        }
    }, [open]);
    
    const jenis_layanan = [
        {
            value: 'Mata',
            label: 'Mata',
        },
        {
            value: 'Mulut',
            label: 'Mulut',
        },
        {
            value: 'Psikoterapi',
            label: 'Psikoterapi',
        },
    ];

    const kategori = [
        {
            value: 'None',
            label: 'None',
        },
        {
            value: 'Tindakan Medik Operatif',
            label: 'Tindakan Medik Operatif',
        },
        {
            value: 'Tindakan Medik Non Operatif',
            label: 'Tindakan Medik Non Operatif',
        },
    ];

    const kelas_perawatan = [
        {
            value: 'None',
            label: 'None',
        },
        {
            value: 'Kelas 1',
            label: 'Kelas 1',
        },
        {
            value: 'Kelas 2',
            label: 'Kelas 2',
        },
        {
            value: 'Kelas 3',
            label: 'Kelas 3',
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
    

        // Daftar field yang wajib diisi
        const requiredFields = [
            'kode_lokasi',
            'nama_lokasi',
            'kode_bpjs',
            'latitude',
            'longitude',
        ];

        for (const key of requiredFields) {
            if (!form[key] || form[key].toString().trim() === '') {
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/createLokasi`, formattedData, {
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
                            <h2 className="text-xl font-bold">Tambah Lokasi</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Kode Lokasi"
                                            name="kode_lokasi"
                                            value={form.kode_lokasi || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.kode_lokasi}
                                            helperText={errors.kode_lokasi || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Lokasi"
                                            name="nama_lokasi"
                                            value={form.nama_lokasi || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_lokasi}
                                            helperText={errors.nama_lokasi || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Kode BPJS"
                                            name="kode_bpjs"
                                            value={form.kode_bpjs || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.kode_bpjs}
                                            helperText={errors.kode_bpjs || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ borderBottom: '1px solid #ccc', mb: 2, mt: 2, }} />
                                <h3 className="text-xl mb-2 mt-3 font-bold">Detail Lokasi</h3>

                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Latitude"
                                            name="latitude"
                                            value={form.latitude || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.latitude}
                                            helperText={errors.latitude || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Longitude"
                                            name="longitude"
                                            value={form.longitude || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.longitude}
                                            helperText={errors.longitude || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleIsiOtomatisLokasi}
                                            disabled={lokasiLoading}
                                            sx={{ mt: 1, minWidth: 300 }}
                                        >
                                            {lokasiLoading ? 'Mengambil Lokasi...' : 'Isi Otomatis Lokasi'}
                                        </Button>
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

