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
export default function ModalTambahPelayananIGD({ open, handleClose, form, setForm, setRefreshTrigger }) {
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!open) {
            // Reset form saat modal ditutup
            setForm({
                id: '',
                jenis_layanan: '',
                nama_tindakan: '',
                kelas_perawatan: '',
                kategori: '',
                tarif: '',
                jasa_rs: '',
                jasa_pelayanan: '',
            });
            setErrors({});
        } else {
            // Saat modal dibuka, pastikan form memiliki nilai yang valid (tidak undefined)
            setForm((prevForm) => ({
                id: prevForm.id || '',
                jenis_layanan: prevForm.jenis_layanan || '',
                nama_tindakan: prevForm.nama_tindakan || '',
                kelas_perawatan: prevForm.kelas_perawatan || '',
                kategori: prevForm.kategori || '',
                tarif: prevForm.tarif || '',
                jasa_rs: prevForm.jasa_rs || '',
                jasa_pelayanan: prevForm.jasa_pelayanan || '',
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
    
        // Daftar field yang wajib diisi sesuai inputan form obat
        const requiredFields = [
            'jenis_layanan', 'nama_tindakan', 'kelas_perawatan', 'kategori', 'tarif', 'jasa_rs', 'jasa_pelayanan'
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tarif_pelayanan_igd`, formattedData, {
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
                                backgroundColor: '#000000', // biru MUI default
                                color: '#fff',
                                px: 2,
                                py: 1.5,
                                /* borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px', */
                                /* borderBottom: '1px solid #1565c0', */
                            }}
                            >
                            <h2 className="text-xl font-bold">Tambah Tarif Pelayanan IGD</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid columns={12} >
                                        <TextField
                                            select
                                            label="Jenis Layanan Medis"
                                            name="jenis_layanan" // tambahkan name
                                            value={form.jenis_layanan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.jenis_layanan}
                                            helperText={errors.jenis_layanan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {jenis_layanan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Tindakan"
                                            name="nama_tindakan"
                                            value={form.nama_tindakan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_tindakan}
                                            helperText={errors.nama_tindakan || " "}
                                            sx={{ minWidth: 400 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Kelas Perawatan"
                                            name="kelas_perawatan" // tambahkan name
                                            value={form.kelas_perawatan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.kelas_perawatan}
                                            helperText={errors.kelas_perawatan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {kelas_perawatan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Kategori"
                                            name="kategori" // tambahkan name
                                            value={form.kategori || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.kategori}
                                            helperText={errors.kategori || " "}
                                            fullWidth
                                            sx={{ minWidth: 390 }}
                                        >
                                            {kategori.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Tarif"
                                            name="tarif"
                                            value={form.tarif || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.tarif}
                                            helperText={errors.tarif || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Jasa Rumah Sakit"
                                            name="jasa_rs"
                                            value={form.jasa_rs || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.jasa_rs}
                                            helperText={errors.jasa_rs || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Jasa Pelayanan"
                                            name="jasa_pelayanan"
                                            value={form.jasa_pelayanan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.jasa_pelayanan}
                                            helperText={errors.jasa_pelayanan || " "}
                                            sx={{ minWidth: 300 }}
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

