import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { ModalCloseButton, ButtonSubmit, ButtonClose, ButtonPasienLama } from '../../../components/Buttons';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import dayjs from 'dayjs';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ConfirmDialog from '../../../components/ConfirmDialog';


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

export default function ModalUpdateIGD({ open, handleCloseEditIGD, form = {}, setForm, setRefreshTrigger }) {
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
            status: '',
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
            status: prevForm.status || '',
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

    const status = [
        {
            value: 'Pulang',
            label: 'Pulang',
        },
        {
            value: 'IGD',
            label: 'IGD',
        },
        {
            value: 'Rawat Inap',
            label: 'Rawat Inap',
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Handle specific case when payments is 'Tidak Ada'
        if (name === 'payments' && value === 'Tidak Ada') {
            setForm({
                ...form,
                [name]: value,
                no_kartu: 'Tidak Ada', // Set no_kartu to 'Tidak Ada' when payments is 'Tidak Ada'
            });
        }
        // Handle specific case when jenis_rujukan is 'Datang Sendiri'
        else if (name === 'jenis_rujukan' && value === 'Datang Sendiri') {
            setForm({
                ...form,
                [name]: value,
                no_rujukan: '', // Reset no_rujukan
                tgl_rujukan: null, // Reset tgl_rujukan
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error state sebelum validasi
        setErrors({});

        let isValid = true;
        let newErrors = {};

        // Daftar field yang boleh kosong
        const optionalFields = ['no_kartu', 'no_rujukan', 'tgl_rujukan'];

        // Cek setiap field dalam form
        for (const [key, value] of Object.entries(form)) {
            if (!optionalFields.includes(key) && !value) {
                isValid = false;
                newErrors[key] = 'Field ini tidak boleh kosong';
            }
        }

        // Jika ada error, tampilkan dan tidak lanjutkan ke handleConfirmSubmit
        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        setOpenDialog(true); // Menampilkan dialog konfirmasi
    };

    const handleConfirmSubmit = async () => {
        const formattedData = {
            ...form,
            no_kartu: form.payments === 'Tidak Ada' ? null : form.no_kartu,
            no_rujukan: form.jenis_rujukan === 'Datang Sendiri' ? null : form.no_rujukan,
            tgl_rujukan: form.jenis_rujukan === 'Datang Sendiri' ? null : (form.tgl_rujukan ? dayjs(form.tgl_rujukan).format("YYYY-MM-DD") : null),
            tgl_lahir: form.tgl_lahir ? dayjs(form.tgl_lahir).format("YYYY-MM-DD") : null,
            tgl_daftar: form.tgl_daftar ? dayjs(form.tgl_daftar).format("YYYY-MM-DD") : null,
        };
    
        try {
            let responsePost, responsePut;
    
            if (form.status === "Rawat Inap") {
                // Panggil API kode 1 (POST /api/rawatinap)
                responsePost = await axios.post(`${import.meta.env.VITE_API_URL}/api/rawatinap`, formattedData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                // Panggil API kode 2 (PUT /api/update_rajal/:id)
                responsePut = await axios.put(`${import.meta.env.VITE_API_URL}/api/updateStatusIGD/${form.id}`, formattedData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log('Response POST:', responsePost.data);
                console.log('Response PUT:', responsePut.data);
            } else if (form.status === "Pulang") {
                // Jika status "Pulang", hanya panggil API kode 2 (PUT)
                responsePut = await axios.put(`${import.meta.env.VITE_API_URL}/api/updateStatusIGD/${form.id}`, formattedData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Response PUT:', responsePut.data);
            } else {
                enqueueSnackbar('Status pasien tidak valid.', { variant: 'warning' });
                return;
            }
    
            enqueueSnackbar('Data berhasil diproses!', { variant: 'success', autoHideDuration: 3000 });
            setRefreshTrigger(prev => !prev);
            handleCloseEditIGD();
        } catch (error) {
            console.error('Error terjadi:', error);
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
                onClose={handleCloseEditIGD} 
                closeAfterTransition
                
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#4682A9',
                                color: '#fff',
                                px: 2,
                                py: 1.5,
                            }}
                        >
                            <h2>Update Pendaftaran IGD</h2>
                            <ModalCloseButton onClick={handleCloseEditIGD} />
                        </Box>

                        {/* <Box display="flex" justifyContent="flex-end" p={2}>
                            <ButtonPasienLama onClick={handleOpenNested} />
                        </Box> */}

                        <Box p={2}>
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl mb-2 font-bold">Data Pasien</h3>
                                <Grid container spacing={2}>
                                    <Grid columns={12} hidden>
                                        <TextField
                                        label="ID"
                                        name="id"
                                        value={form.id || ''}
                                        onChange={handleChange}
                                        fullWidth
                                        error={!!errors.id}
                                        helperText={errors.id}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                        label="Nama Lengkap"
                                        name="nama_lengkap"
                                        value={form.nama_lengkap || ''}
                                        onChange={handleChange}
                                        fullWidth
                                        error={!!errors.nama_lengkap}
                                        helperText={errors.nama_lengkap}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Jenis Kelamin"
                                            name="jenis_kelamin"
                                            value={form.jenis_kelamin || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            error={!!errors.jenis_kelamin}
                                            helperText={errors.jenis_kelamin}
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
                                        error={!!errors.no_ktp}
                                        helperText={errors.no_ktp}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Lahir"
                                                    value={form.tgl_lahir ? dayjs(form.tgl_lahir) : null}
                                                    onChange={(newValue) => setForm({ ...form, tgl_lahir: newValue })}
                                                    slotProps={{
                                                    textField: {
                                                        error: !!errors.tgl_lahir,
                                                        helperText: errors.tgl_lahir,
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

                                <Box sx={{ borderBottom: '1px solid #ccc', mb: 2, mt: 2, }} />

                                <h3 className="text-xl mb-2 mt-3 font-bold">Status Pasien</h3>
                                <Grid columns={12}>
                                    <TextField
                                        select
                                        label="Status Pasien"
                                        name="status" // tambahkan name
                                        value={form.status || ''} // kontrol oleh state
                                        onChange={handleChange} // ubah state saat berubah
                                        error={!!errors.status}
                                        helperText={errors.status || " "}
                                        fullWidth
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    <ButtonSubmit onClick={handleSubmit} />
                                    <Box sx={{ ml: 2 }}>
                                        <ButtonClose onClick={handleCloseEditIGD} />
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
}
