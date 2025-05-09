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

export default function ModalRajal2({ open, handleClose, form, setForm, handleOpenNested }) {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!open) {
        setForm({
            name: '',
            email: '',
            gender: '',
            nik: '',
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
            no_rujukan: '',
            rujukan: '',
            tgl_rujukan: null,
            faskes: '',
            pelayanan: '',
            no_wa: '',
            nama_wali: '',
            telp_wali: '',
            alasan: '',
        });
            setErrors({});
        }
    }, [open]);

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(form).forEach(([key, value]) => {
            if (value === "" || value === null) {
                newErrors[key] = "Wajib diisi";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert("Form berhasil disubmit");
            setErrors({});
            handleClose();
        }
    };

    return (
        <Box>
            <Modal 
                open={open} 
                onClose={handleClose} 
                closeAfterTransition
                aria-labelledby="modal-form-title"
                aria-describedby="modal-form-description"
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#1e2838',
                                color: '#fff',
                                px: 2,
                                py: 1.5,
                            }}
                        >
                            <h2>Pendaftaran Rawat Jalan</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box display="flex" justifyContent="flex-end" p={2}>
                            <ButtonPasienLama onClick={handleOpenNested} />
                        </Box>

                        <Box p={2}>
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl mb-2 font-bold">Data Pasien</h3>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                        label="Nama"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Jenis Kelamin"
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            fullWidth
                                            error={!!errors.gender}
                                            helperText={errors.gender}
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
                                        error={!!errors.nik}
                                        helperText={errors.nik}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Lahir"
                                                    value={form.tgl_lahir}
                                                    onChange={(newValue) =>
                                                    setForm({ ...form, tgl_lahir: newValue })
                                                    }
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
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Status Pernikahan"
                                            name="status_pernikahan" // tambahkan name
                                            value={form.status_pernikahan} // kontrol oleh state
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

                                <h3 className="text-xl mb-2 mt-3 font-bold">Detail</h3>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Daftar"
                                                    value={form.tgl_daftar}
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
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Cara Bayar"
                                            name="payments" // tambahkan name
                                            value={form.payments} // kontrol oleh state
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
                                            select
                                            label="Pilih Poli"
                                            name="poli" // tambahkan name
                                            value={form.poli} // kontrol oleh state
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
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Pilih Dokter"
                                            name="dokter" // tambahkan name
                                            value={form.dokter} // kontrol oleh state
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
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Datang Sendiri/Rujukan"
                                            name="rujukan" // tambahkan name
                                            value={form.rujukan} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.rujukan}
                                            helperText={errors.rujukan || " "}
                                            fullWidth
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
                                            label="No. Rujukan"
                                            name="rujukan"
                                            value={form.no_rujukan}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.no_rujukan}
                                            helperText={errors.no_rujukan}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div style={{ marginTop: '7px' }}>
                                                <DatePicker
                                                    label="Tanggal Rujukan"
                                                    value={form.tgl_rujukan}
                                                    onChange={(newValue) =>
                                                        setForm({ ...form, tgl_rujukan: newValue })
                                                    }
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
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Pilih Pelayanan"
                                            name="pelayanan" // tambahkan name
                                            value={form.pelayanan} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.pelayanan}
                                            helperText={errors.pelayanan || " "}
                                            fullWidth
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
                                            label="Nama Wali"
                                            name="nama_wali"
                                            value={form.nama_wali}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_wali}
                                            helperText={errors.nama_wali}
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

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    <ButtonSubmit onClick={handleSubmit} />
                                    <ButtonClose onClick={handleClose} />
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
