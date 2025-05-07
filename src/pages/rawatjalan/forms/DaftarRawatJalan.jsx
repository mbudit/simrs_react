import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { ModalCloseButton, ButtonSubmit, ButtonClose } from '../../../components/Buttons';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '80vw',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    '& .MuiTextField-root': {
        m: 1,
        width: '25ch',
    },
};

export default function ModalComponent({ open, handleClose }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        gender: '', 
        nik: '',
        tgl_lahir: '',
        status: '',
        pekerjaan: '',
        no_telp: '',
        alamat: '',
        tgl_daftar: '',
        payments: '',
        no_kartu: '',
        poli: '',
        dokter: '',
        rujukan: '',
        tgl_rujukan: '',
        faskes: '',
        pelayanan: '',
        no_wa: '',
        telp_wali: '',
        alasan: '',
    });

    const genders = [
        {
            value: 'laki-laki',
            label: 'Laki-laki',
        },
        {
            value: 'perempuan',
            label: 'Perempuan',
        },
    ];

    const status_pernikahan = [
        {
            value: 'menikah',
            label: 'Sudah Menikah',
        },
        {
            value: 'belum_menikah',
            label: 'Belum Menikah',
        },
    ];

    const payments = [
        {
            value: 'tunai',
            label: 'Tunai',
        },
        {
            value: 'non_tunai',
            label: 'Non Tunai',
        },
    ];

    const poli = [
        {
            value: 'gigi',
            label: 'Poli Gigi',
        },
        {
            value: 'anak',
            label: 'Poli Anak',
        },
    ];

    const dokter = [
        {
            value: 'dr_beneran',
            label: 'Dr. Beneran',
        },
        {
            value: 'dr_gadungan',
            label: 'Dr. Gadungan',
        },
    ];

    const rujukan = [
        {
            value: 'sendiri',
            label: 'Datang Sendiri',
        },
        {
            value: 'rujukan',
            label: 'Rujukan',
        },
    ];

    const pelayanan = [
        {
            value: 'spesialis',
            label: 'Spesialis',
        },
        {
            value: 'konsul',
            label: 'konsul',
        },
    ];

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name) newErrors.name = 'Nama wajib diisi';
        if (!form.email) newErrors.email = 'Email wajib diisi';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert(`Form Submitted!\nName: ${form.name}\nEmail: ${form.email}`);
            setErrors({});
            handleClose(); // tutup modal setelah submit
        }
    };

    const [value, setValue] = React.useState(null);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-form-title"
            aria-describedby="modal-form-description"
        >
            <Box sx={style}>
                <ModalCloseButton onClick={handleClose} />
                <h2 className="text-xl font-bold mb-7 mt-7">Pendaftaran Rawat Jalan</h2>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl mb-1">Data Pasien</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nama"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-genders"
                                select
                                label="Jenis Kelamin"
                                defaultValue=""
                                helperText=" "
                                >
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="NIK"
                                name="nik"
                                value={form.nik}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.nik}
                                helperText={errors.nik || " "}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ marginTop: '7px' }}>
                                        <DatePicker
                                            label="Tanggal Lahir"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </div>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-status_pernikahan"
                                select
                                label="Status Pernikahan"
                                defaultValue=""
                                helperText=" "
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
                        <Grid item xs={12}>
                            <TextField
                                label="Pekerjaan"
                                name="pekerjaan"
                                value={form.pekerjaan}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.pekerjaan}
                                helperText={errors.pekerjaan}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="No. Telp"
                                name="no_telp"
                                value={form.no_telp}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.no_telp}
                                helperText={errors.no_telp}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Alamat"
                                name="alamat"
                                value={form.alamat}
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

                    <h3 className="text-xl mb-1 mt-3">Detail</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ marginTop: '7px' }}>
                                        <DatePicker
                                            label="Tanggal Daftar"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </div>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-payment"
                                select
                                label="Cara Bayar"
                                defaultValue=""
                                helperText=" "
                            >
                                {payments.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="No. Kartu BPJS/Asuransi"
                                name="no_kartu"
                                value={form.no_kartu}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.no_kartu}
                                helperText={errors.no_kartu}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-poli"
                                select
                                label="Pilih Poli"
                                defaultValue=""
                                helperText=" "
                            >
                                {poli.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-dokter"
                                select
                                label="Pilih Dokter"
                                defaultValue=""
                                helperText=" "
                            >
                                {dokter.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="No. Rujukan"
                                name="rujukan"
                                value={form.rujukan}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.rujukan}
                                helperText={errors.rujukan}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ marginTop: '7px' }}>
                                        <DatePicker
                                            label="Tanggal Rujukan"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </div>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-rujukan"
                                select
                                label="Datang Sendiri/Rujukan"
                                defaultValue=""
                                helperText=" "
                            >
                                {rujukan.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Pelayanan"
                                name="pelayanan"
                                value={form.pelayanan}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.pelayanan}
                                helperText={errors.pelayanan}
                            />
                            <TextField
                                id="outlined-select-pelayanan"
                                select
                                label="Pilih Pelayanan"
                                defaultValue=""
                                helperText=" "
                            >
                                {pelayanan.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="No. Whatsapp"
                                name="no_wa"
                                value={form.no_wa}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.no_wa}
                                helperText={errors.no_wa}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="No. Telpon Wali"
                                name="telp_wali"
                                value={form.telp_wali}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.telp_wali}
                                helperText={errors.telp_wali}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Alasan Berobat"
                                name="alasan"
                                value={form.alasan}
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
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 6 }}>
                        <ButtonSubmit onClick={handleSubmit} />
                        <ButtonClose onClick={handleClose} />
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}