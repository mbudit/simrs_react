import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Fade, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ButtonClose, ButtonPasienLama, ButtonSubmit, ModalCloseButton } from '../../../components/Buttons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '80vw',
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
export default function ModalDaftarRanap({ open, handleClose, form, setForm, handleOpenNested, setRefreshTrigger }) {
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!open) {
            // Reset form saat modal ditutup
            setForm({
                id: '',
                nama_lengkap: '',
                jenis_kelamin: '',
                no_ktp: '',
                tgl_lahir: null,
                status_pernikahan: '',
                pekerjaan: '',
                no_telp: '',
                alamat: '',
                tgl_daftar: null,
                payments: '',
                no_kartu: '',
                poli: '',
                dokter: '',
                jenis_rujukan: '',
                no_rujukan: '',
                tgl_rujukan: null,
                faskes: '',
                no_wa: '',
                nama_wali: '',
                telp_wali: '',
                alasan: '',
            });
            setErrors({});
        } else {
            // Saat modal dibuka, pastikan form memiliki nilai yang valid (tidak undefined)
            setForm((prevForm) => ({
                id: prevForm.id || '',
                nama_lengkap: prevForm.nama_lengkap || '',
                jenis_kelamin: prevForm.jenis_kelamin || '',
                no_ktp: prevForm.no_ktp || '',
                tgl_lahir: prevForm.tgl_lahir || null,
                status_pernikahan: prevForm.status_pernikahan || '',
                pekerjaan: prevForm.pekerjaan || '',
                no_telp: prevForm.no_telp || '',
                alamat: prevForm.alamat || '',
                tgl_daftar: prevForm.tgl_daftar || null,
                payments: prevForm.payments || '',
                no_kartu: prevForm.no_kartu || '',
                poli: prevForm.poli || '',
                dokter: prevForm.dokter || '',
                jenis_rujukan: prevForm.jenis_rujukan || '',
                no_rujukan: prevForm.no_rujukan || '',
                tgl_rujukan: prevForm.tgl_rujukan || null,
                faskes: prevForm.faskes || '',
                no_wa: prevForm.no_wa || '',
                nama_wali: prevForm.nama_wali || '',
                telp_wali: prevForm.telp_wali || '',
                alasan: prevForm.alasan || '',
            }));
        }
    }, [open]);
    
    const genders = [
        {
            value: 'Laki-laki',
            label: 'Laki-laki',
        },
        {
            value: 'Perempuan',
            label: 'Perempuan',
        },
    ];

    const status_pernikahan = [
        {
            value: 'Menikah',
            label: 'Sudah Menikah',
        },
        {
            value: 'Belum Menikah',
            label: 'Belum Menikah',
        },
        {
            value: 'Cerai',
            label: 'Cerai',
        },
    ];

    const payments = [
        {
            value: 'Tidak Ada',
            label: 'Tidak Ada',
        },
        {
            value: 'BPJS',
            label: 'BPJS',
        },
        {
            value: 'Asuransi A',
            label: 'Asuransi A',
        },
        {
            value: 'Asuransi B',
            label: 'Asuransi B',
        },
        {
            value: 'Asuransi Swasta',
            label: 'Asuransi Swasta',
        },
    ];

    const poli = [
        {
            value: 'Poli Gigi',
            label: 'Poli Gigi',
        },
        {
            value: 'Poli Anak',
            label: 'Poli Anak',
        },
    ];

    const dokter = [
        {
            value: 'Dr. Beneran',
            label: 'Dr. Beneran',
        },
        {
            value: 'Dr. Placeholder',
            label: 'Dr. Placeholder',
        },
    ];

    const jenis_rujukan = [
        {
            value: 'Datang Sendiri',
            label: 'Datang Sendiri',
        },
        {
            value: 'Rujukan',
            label: 'Rujukan',
        },
    ];

    const faskes = [
        {
            value: 'Spesialis',
            label: 'Spesialis',
        },
        {
            value: 'Konsul',
            label: 'Konsul',
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
        // Reset error state sebelum validasi
        setErrors({});
    
        let isValid = true;
        let newErrors = {};
    
        // Cek setiap field dalam form
        for (const [key, value] of Object.entries(form)) {
            // Pengecualian
            if (key === 'no_kartu' && form.payments === 'Tidak Ada') continue;
            if ((key === 'no_rujukan' || key === 'tgl_rujukan') && form.jenis_rujukan === 'Datang Sendiri') continue;
            if (key === 'status') continue; // skip validasi status karena diisi backend
        
            // Validasi Dayjs dan lainnya seperti biasa
            if (value && value.isDayjsObject) {
                if (!value.isValid()) {
                    isValid = false;
                    newErrors[key] = 'Tanggal tidak valid';
                }
            } else {
                if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
                    isValid = false;
                    newErrors[key] = 'Field ini tidak boleh kosong';
                }
            }
        }
    
        // Jika ada error, tampilkan dan tidak lanjutkan ke handleConfirmSubmit
        if (!isValid) {
            setErrors(newErrors);
            enqueueSnackbar('Harap isi semua field yang wajib!', { 
                variant: 'error',
                autoHideDuration: 3000 
            });
            return;
        }
    
        setOpenDialog(true); // Menampilkan dialog konfirmasi
    };

    const handleConfirmSubmit = async () => {
        const formattedData = {
            ...form,
            tgl_lahir: form.tgl_lahir ? dayjs(form.tgl_lahir).format("YYYY-MM-DD") : null,
            tgl_daftar: form.tgl_daftar ? dayjs(form.tgl_daftar).format("YYYY-MM-DD") : null,
            tgl_rujukan: form.tgl_rujukan ? dayjs(form.tgl_rujukan).format("YYYY-MM-DD") : null,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/rawatinap`, formattedData, {
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
                                backgroundColor: '#1e2838', // biru MUI default
                                color: '#fff',
                                px: 2,
                                py: 1.5,
                                /* borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px', */
                                /* borderBottom: '1px solid #1565c0', */
                            }}
                            >
                            <h2 className="text-xl font-bold">Pendaftaran Rawat Inap</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box display="flex" justifyContent="flex-end">
                            <ButtonPasienLama onClick={handleOpenNested} />
                        </Box>

                        <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl mb-2 font-bold">Data Pasien</h3>
                                <Grid container spacing={2}>
                                    <Grid columns={12} >
                                        <TextField
                                            label="Nama Lengkap"
                                            name="nama_lengkap"
                                            value={form.nama_lengkap || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_lengkap}
                                            helperText={errors.nama_lengkap}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Jenis Kelamin"
                                            name="jenis_kelamin" // tambahkan name
                                            value={form.jenis_kelamin || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.jenis_kelamin}
                                            helperText={errors.jenis_kelamin || " "}
                                            fullWidth
                                        >
                                            {genders.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. KTP"
                                            name="no_ktp"
                                            value={form.no_ktp || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_ktp}
                                            helperText={errors.no_ktp || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Lahir"
                                                    value={form.tgl_lahir ? dayjs(form.tgl_lahir) : null}
                                                    onChange={(newValue) =>
                                                        setForm({ ...form, tgl_lahir: newValue })
                                                    }
                                                    slotProps={{
                                                        textField: {
                                                        error: !!errors.tgl_lahir,
                                                        helperText: errors.tgl_lahir || " ",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Status Pernikahan"
                                            name="status_pernikahan" // tambahkan name
                                            value={form.status_pernikahan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.status_pernikahan}
                                            helperText={errors.status_pernikahan || " "}
                                            fullWidth
                                        >
                                            {status_pernikahan.map((option) => (
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
                                            label="Pekerjaan"
                                            name="pekerjaan"
                                            value={form.pekerjaan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.pekerjaan}
                                            helperText={errors.pekerjaan}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. Telp"
                                            name="no_telp"
                                            value={form.no_telp || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_telp}
                                            helperText={errors.no_telp}
                                        />
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

                                <Box sx={{ borderBottom: '1px solid #ccc', mb: 2, mt: 2, }} />
                                
                                <h3 className="text-xl mb-2 mt-3 font-bold">Detail</h3>
                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Daftar"
                                                    value={form.tgl_daftar ? dayjs(form.tgl_daftar) : null}
                                                    onChange={(newValue) =>
                                                        setForm({ ...form, tgl_daftar: newValue })
                                                    }
                                                    slotProps={{
                                                        textField: {
                                                        error: !!errors.tgl_daftar,
                                                        helperText: errors.tgl_daftar || " ",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Cara Bayar"
                                            name="payments" // tambahkan name
                                            value={form.payments || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.payments}
                                            helperText={errors.payments || " "}
                                            fullWidth
                                        >
                                            {payments.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. Kartu BPJS/Asuransi"
                                            name="no_kartu"
                                            value={form.payments === 'Tidak Ada' ? '' : form.no_kartu || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_kartu}
                                            helperText={errors.no_kartu}
                                            disabled={form.payments === 'Tidak Ada'}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Pilih Poli"
                                            name="poli" // tambahkan name
                                            value={form.poli || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.poli}
                                            helperText={errors.poli || " "}
                                            fullWidth
                                        >
                                            {poli.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Pilih Dokter"
                                            name="dokter" // tambahkan name
                                            value={form.dokter || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.dokter}
                                            helperText={errors.dokter || " "}
                                            fullWidth
                                        >
                                            {dokter.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Datang Sendiri/Rujukan"
                                            name="jenis_rujukan" // tambahkan name
                                            value={form.jenis_rujukan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.jenis_rujukan}
                                            helperText={errors.jenis_rujukan || " "}
                                            fullWidth
                                        >
                                            {jenis_rujukan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. Rujukan"
                                            name="no_rujukan"
                                            value={form.jenis_rujukan === 'Datang Sendiri' ? '' : form.no_rujukan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_rujukan}
                                            helperText={errors.no_rujukan}
                                            disabled={form.jenis_rujukan === 'Datang Sendiri'}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Rujukan"
                                                    value={form.jenis_rujukan === 'Datang Sendiri' ? null : form.tgl_rujukan ? dayjs(form.tgl_rujukan) : null}
                                                    onChange={(newValue) =>
                                                        setForm({ ...form, tgl_rujukan: newValue })
                                                    }
                                                    disabled={form.jenis_rujukan === 'Datang Sendiri'}
                                                    slotProps={{
                                                        textField: {
                                                        error: !!errors.tgl_rujukan,
                                                        helperText: errors.tgl_rujukan || " ",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Pilih Pelayanan"
                                            name="faskes" // tambahkan name
                                            value={form.faskes || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.faskes}
                                            helperText={errors.faskes || " "}
                                            fullWidth
                                        >
                                            {faskes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. Whatsapp"
                                            name="no_wa"
                                            value={form.no_wa || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_wa}
                                            helperText={errors.no_wa}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Wali"
                                            name="nama_wali"
                                            value={form.nama_wali || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_wali}
                                            helperText={errors.nama_wali}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="No. Telpon Wali"
                                            name="telp_wali"
                                            value={form.telp_wali || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.telp_wali}
                                            helperText={errors.telp_wali}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Alasan Berobat"
                                            name="alasan"
                                            value={form.alasan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.alasan}
                                            helperText={errors.alasan}
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

            <Dialog open={openDialog} onClose={handleCancelSubmit}>
                <DialogTitle>Konfirmasi Pengiriman</DialogTitle>
                <DialogContent>
                    <p>Apakah data yang dimasukkan sudah benar?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelSubmit} color="error">
                        Tidak
                    </Button>
                    <Button
                        onClick={() => {
                            handleConfirmSubmit();
                            setOpenDialog(false); // Menutup dialog setelah submit
                        }}
                        color="primary"
                    >
                        Ya
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

