import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Fade, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ButtonClose, ButtonPasienLama, ButtonSubmit, ModalCloseButton } from '../../../../components/Buttons';
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
    width: '95vw',
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
export default function ModalTambahObat({ open, handleClose, form, setForm, setRefreshTrigger }) {
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!open) {
            // Reset form saat modal ditutup
            setForm({
                id: '',
                nama_obat: '',
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
                nama_obat: prevForm.nama_obat || '',
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
    
    const produksi = [
        {
            value: 'None',
            label: 'None',
        },
        {
            value: 'Material',
            label: 'Material',
        },
        {
            value: 'Paket',
            label: 'Paket',
        },
        {
            value: 'Bom',
            label: 'Bom',
        },
    ];

    const satuan = [
        {
            value: 'Ampul',
            label: 'Ampul',
        },
        {
            value: 'Box',
            label: 'Box',
        },
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'Flacon',
            label: 'Flacon',
        },
        {
            value: 'FLS',
            label: 'FLS',
        },
        {
            value: 'Kaplet',
            label: 'Kaplet',
        },
        {
            value: 'Kapsul',
            label: 'Kapsul',
        },
        {
            value: 'KOLF',
            label: 'KOLF',
        },
        {
            value: 'PCS',
            label: 'PCS',
        },
        {
            value: 'Sachet',
            label: 'Sachet',
        },
        {
            value: 'Softbag',
            label: 'Softbag',
        },
        {
            value: 'Strip',
            label: 'Strip',
        },
        {
            value: 'Supp',
            label: 'Supp',
        },
        {
            value: 'Tablet',
            label: 'Tablet',
        },
        {
            value: 'Tube',
            label: 'Tube',
        },
        {
            value: 'Vial',
            label: 'Vial',
        },
        {
            value: 'BDL',
            label: 'BDL',
        },
        {
            value: 'Galon',
            label: 'Galon',
        },
        {
            value: 'Jam',
            label: 'Jam',
        },
        {
            value: 'Kantong',
            label: 'Kantong',
        },
        {
            value: 'KG',
            label: 'KG',
        },
        {
            value: 'Lembar',
            label: 'Lembar',
        },
        {
            value: 'Meter',
            label: 'Meter',
        },
        {
            value: 'Liter',
            label: 'Liter',
        },
        {
            value: 'MG',
            label: 'MG',
        },
        {
            value: 'ML',
            label: 'ML',
        },
        {
            value: 'PAK',
            label: 'PAK',
        },
        {
            value: 'POT',
            label: 'POT',
        },
        {
            value: 'PSG',
            label: 'PSG',
        },
        {
            value: 'ROL',
            label: 'ROL',
        },
        {
            value: 'Set',
            label: 'Set',
        },
        {
            value: 'Tabung',
            label: 'Tabung',
        },
        {
            value: 'Paket',
            label: 'Paket',
        },
        {
            value: 'Gram',
            label: 'Gram',
        },
        {
            value: 'CM',
            label: 'CM',
        },
        {
            value: 'Kaleng',
            label: 'Kaleng',
        },
        {
            value: 'Flexipen',
            label: 'Flexipen',
        },
    ];

    const pabrik = [
        {
            value: '3M',
            label: '3M',
        },
        {
            value: 'Abbot',
            label: 'Abbot',
        },
        {
            value: 'Actavis',
            label: 'Actavis',
        },
    ];

    const eticket = [
        {
            value: 'Biru',
            label: 'Biru',
        },
        {
            value: 'Putih',
            label: 'Putih',
        },
    ];

    const kategori = [
        {
            value: 'Generik',
            label: 'Generik',
        },
        {
            value: 'Narkotika',
            label: 'Narkotika',
        },
        {
            value: 'Paten',
            label: 'Paten',
        },
    ];

    const jenis_obat = [
        {
            value: 'Drop',
            label: 'Drop',
        },
        {
            value: 'Injeksi',
            label: 'Injeksi',
        },
        {
            value: 'Kapsul',
            label: 'Kapsul',
        },
    ];

    const level_sakit = [
        {
            value: 'Berat',
            label: 'Berat',
        },
        {
            value: 'Gunakan dengan perhatian pasien sakit ginjal',
            label: 'Gunakan dengan perhatian pasien sakit ginjal',
        },
        {
            value: 'Ringan',
            label: 'Ringan',
        },
    ];

    const resiko = [
        {
            value: 'A',
            label: 'A',
        },
        {
            value: 'B',
            label: 'B',
        },
        {
            value: 'C',
            label: 'C',
        },
    ];

    const obat_terapi = [
        {
            value: 'Anti Epilepsi',
            label: 'Anti Epilepsi',
        },
        {
            value: 'Antimigrain',
            label: 'Antimigrain',
        },
        {
            value: 'Antimikroba',
            label: 'Antimikroba',
        },
    ];

    const obat_subterapi = [
        {
            value: 'Anti Epilepsi',
            label: 'Anti Epilepsi',
        },
        {
            value: 'Antimigrain',
            label: 'Antimigrain',
        },
        {
            value: 'Antimikroba',
            label: 'Antimikroba',
        },
    ];

    const sebelum_makan = [
        {
            value: '1 Jam',
            label: '1 Jam',
        },
        {
            value: '1,5 Jam',
            label: '1,5 Jam',
        },
        {
            value: '2 Jam',
            label: '2 Jam',
        },
    ];

    const ketika_makan = [
        {
            value: '1 Jam',
            label: '1 Jam',
        },
        {
            value: '1,5 Jam',
            label: '1,5 Jam',
        },
        {
            value: '2 Jam',
            label: '2 Jam',
        },
    ];

    const setelah_makan = [
        {
            value: '1 Jam',
            label: '1 Jam',
        },
        {
            value: '1,5 Jam',
            label: '1,5 Jam',
        },
        {
            value: '2 Jam',
            label: '2 Jam',
        },
    ];

    const keterangan = [
        {
            value: 'Barang APBD',
            label: 'Barang APBD',
        },
        {
            value: 'Barang BLUD',
            label: 'Barang BLUD',
        },
        {
            value: 'Donasi',
            label: 'Donasi',
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
            if (!value) {
                // Pengecualian untuk no_kartu
                if (key === 'no_kartu' && form.payments === 'Tidak Ada') continue;
    
                // Pengecualian untuk no_rujukan dan tgl_rujukan
                if ((key === 'no_rujukan' || key === 'tgl_rujukan') && form.jenis_rujukan === 'Datang Sendiri') continue;
    
                // Jika tidak termasuk dalam pengecualian, anggap tidak valid
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
            tgl_lahir: form.tgl_lahir ? dayjs(form.tgl_lahir).format("YYYY-MM-DD") : null,
            tgl_daftar: form.tgl_daftar ? dayjs(form.tgl_daftar).format("YYYY-MM-DD") : null,
            tgl_rujukan: form.tgl_rujukan ? dayjs(form.tgl_rujukan).format("YYYY-MM-DD") : null,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/igd`, formattedData, {
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
                            <h2 className="text-xl font-bold">Tambah Data Obat</h2>
                            <ModalCloseButton onClick={handleClose} />
                        </Box>

                        <Box sx={{ pt: 4, pl: 2, pb: 2, pr: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid columns={12} >
                                        <TextField
                                            label="Nama Obat"
                                            name="nama_obat"
                                            value={form.nama_obat || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_obat}
                                            helperText={errors.nama_obat}
                                            sx={{ minWidth: 420 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Produksi"
                                            name="produksi" // tambahkan name
                                            value={form.produksi || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.produksi}
                                            helperText={errors.produksi || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {produksi.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Isi Kemasan/Box"
                                            name="isi_kemasan"
                                            value={form.isi_kemasan || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.isi_kemasan}
                                            helperText={errors.isi_kemasan || " "}
                                            sx={{ minWidth: 400 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Satuan"
                                            name="satuan" // tambahkan name
                                            value={form.satuan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.satuan}
                                            helperText={errors.satuan || " "}
                                            fullWidth
                                            sx={{ minWidth: 390 }}
                                        >
                                            {satuan.map((option) => (
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
                                            select
                                            label="Pabrik"
                                            name="pabrik" // tambahkan name
                                            value={form.pabrik || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.pabrik}
                                            helperText={errors.pabrik || " "}
                                            fullWidth
                                            sx={{ minWidth: 420 }}
                                        >
                                            {pabrik.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="On Label"
                                            name="on_label"
                                            value={form.on_label || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.on_label}
                                            helperText={errors.on_label || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Off Label"
                                            name="off_label"
                                            value={form.off_label || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.off_label}
                                            helperText={errors.off_label || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Dagang"
                                            name="nama_dagang"
                                            value={form.nama_dagang || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_dagang}
                                            helperText={errors.nama_dagang || " "}
                                            sx={{ minWidth: 300 }}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Nama Original"
                                            name="nama_original"
                                            value={form.nama_original || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.nama_original}
                                            helperText={errors.nama_original || " "}
                                            sx={{ minWidth: 255 }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Margin"
                                            name="margin"
                                            value={form.margin || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.margin}
                                            helperText={errors.margin || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Harga Beli"
                                            name="harga_beli"
                                            value={form.harga_beli || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.harga_beli}
                                            helperText={errors.harga_beli || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="HNA + Ppn 11%"
                                            name="harga_pajak"
                                            value={form.harga_pajak || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.harga_pajak}
                                            helperText={errors.harga_pajak || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Harga Jual"
                                            name="harga_jual"
                                            value={form.harga_jual || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.harga_jual}
                                            helperText={errors.harga_jual || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Max Stock"
                                            name="max_stock"
                                            value={form.max_stock || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.max_stock}
                                            helperText={errors.max_stock || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Min Stock"
                                            name="min_stock"
                                            value={form.min_stock || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.min_stock}
                                            helperText={errors.min_stock || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="E-Ticket"
                                            name="eticket" // tambahkan name
                                            value={form.eticket || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.eticket}
                                            helperText={errors.eticket || " "}
                                            fullWidth
                                        >
                                            {eticket.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>

                                {/* <Box sx={{ borderBottom: '1px solid #ccc', mb: 2, mt: 2, }} /> */}
                                
                                <Grid container spacing={2}>
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
                                            sx={{ minWidth: 550 }}
                                        >
                                            {kategori.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Jenis"
                                            name="jenis_obat" // tambahkan name
                                            value={form.jenis_obat || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.jenis_obat}
                                            helperText={errors.jenis_obat || " "}
                                            fullWidth
                                            sx={{ minWidth: 550 }}
                                        >
                                            {jenis_obat.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Komposisi"
                                            name="komposisi"
                                            value={form.komposisi || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.komposisi}
                                            helperText={errors.komposisi || " "}
                                            sx={{ minWidth: 540 }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Level Sakit"
                                            name="level_sakit" // tambahkan name
                                            value={form.level_sakit || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.level_sakit}
                                            helperText={errors.level_sakit || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {level_sakit.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Resiko Pada Ibu Hamil"
                                            name="resiko" // tambahkan name
                                            value={form.resiko || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.resiko}
                                            helperText={errors.resiko || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {resiko.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Obat Terapi"
                                            name="obat_terapi" // tambahkan name
                                            value={form.obat_terapi || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.obat_terapi}
                                            helperText={errors.obat_terapi || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {obat_terapi.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Obat Sub Terapi"
                                            name="obat_subterapi" // tambahkan name
                                            value={form.obat_subterapi || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.obat_subterapi}
                                            helperText={errors.obat_subterapi || " "}
                                            fullWidth
                                            sx={{ minWidth: 410 }}
                                        >
                                            {obat_subterapi.map((option) => (
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
                                            select
                                            label="Aturan Sebelum Makan"
                                            name="sebelum_makan" // tambahkan name
                                            value={form.sebelum_makan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.sebelum_makan}
                                            helperText={errors.sebelum_makan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {sebelum_makan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Aturan Ketika Makan"
                                            name="ketika_makan" // tambahkan name
                                            value={form.ketika_makan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.ketika_makan}
                                            helperText={errors.ketika_makan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {ketika_makan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Aturan Setelah Makan"
                                            name="setelah_makan" // tambahkan name
                                            value={form.setelah_makan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.setelah_makan}
                                            helperText={errors.setelah_makan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {setelah_makan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Efek Hati"
                                            name="efek_hati"
                                            value={form.efek_hati || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.efek_hati}
                                            helperText={errors.efek_hati || " "}
                                            sx={{ minWidth: 410 }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid columns={12}>
                                        <TextField
                                            select
                                            label="Keterangan"
                                            name="keterangan" // tambahkan name
                                            value={form.keterangan || ''} // kontrol oleh state
                                            onChange={handleChange} // ubah state saat berubah
                                            error={!!errors.keterangan}
                                            helperText={errors.keterangan || " "}
                                            fullWidth
                                            sx={{ minWidth: 400 }}
                                        >
                                            {keterangan.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Sumber Barang"
                                            name="sumber_barang"
                                            value={form.sumber_barang || ''}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.sumber_barang}
                                            helperText={errors.sumber_barang || " "}
                                            sx={{ minWidth: 400 }}
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

