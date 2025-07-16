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
                produksi: '',
                isi_kemasan: '',
                satuan: '',
                pabrik: '',
                on_label: '',
                off_label: '',
                nama_dagang: '',
                nama_original: '',
                margin: "1.25",
                harga_beli: '',
                harga_pajak: '',
                harga_jual: '',
                max_stock: '',
                min_stock: '',
                eticket: '',
                kategori: '',
                jenis_obat: '',
                komposisi: '',
                level_sakit: '',
                resiko: '',
                obat_terapi: '',
                obat_subterapi: '',
                sebelum_makan: '',
                ketika_makan: '',
                setelah_makan: '',
                efek_hati: '',
                keterangan: '',
                sumber_barang: '',
            });
            setErrors({});
        } else {
            // Saat modal dibuka, pastikan form memiliki nilai yang valid (tidak undefined)
            setForm((prevForm) => ({
                id: prevForm.id || '',
                nama_obat: prevForm.nama_obat || '',
                produksi: prevForm.produksi || '',
                isi_kemasan: prevForm.isi_kemasan || '',
                satuan: prevForm.satuan || '',
                pabrik: prevForm.pabrik || '',
                on_label: prevForm.on_label || '',
                off_label: prevForm.off_label || '',
                nama_dagang: prevForm.nama_dagang || '',
                nama_original: prevForm.nama_original || '',
                margin: prevForm.margin || "1.25",
                harga_beli: prevForm.harga_beli || '',
                harga_pajak: prevForm.harga_pajak || '',
                harga_jual: prevForm.harga_jual || '',
                max_stock: prevForm.max_stock || '',
                min_stock: prevForm.min_stock || '',
                eticket: prevForm.eticket || '',
                kategori: prevForm.kategori || '',
                jenis_obat: prevForm.jenis_obat || '',
                komposisi: prevForm.komposisi || '',
                level_sakit: prevForm.level_sakit || '',
                resiko: prevForm.resiko || '',
                obat_terapi: prevForm.obat_terapi || '',
                obat_subterapi: prevForm.obat_subterapi || '',
                sebelum_makan: prevForm.sebelum_makan || '',
                ketika_makan: prevForm.ketika_makan || '',
                setelah_makan: prevForm.setelah_makan || '',
                efek_hati: prevForm.efek_hati || '',
                keterangan: prevForm.keterangan || '',
                sumber_barang: prevForm.sumber_barang || '',
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
    
    const calculateHarga = (hargabeli, margin) => {
        const hargaBeliNum = parseFloat(hargabeli) || 0;
        const marginNum = parseFloat(margin) || 1;
        const pajak = hargaBeliNum * 0.11;
        const hna_pajak = hargaBeliNum + pajak;
        const hja = hna_pajak * marginNum;
    
        return {
            harga_pajak: hna_pajak ? hna_pajak.toFixed(2) : '',
            harga_jual: hja ? hja.toFixed(2) : '',
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...form, [name]: value };

        // Jika harga_beli atau margin berubah, hitung otomatis harga_pajak & harga_jual
        if (name === 'harga_beli' || name === 'margin') {
            const { harga_pajak, harga_jual } = calculateHarga(
                name === 'harga_beli' ? value : form.harga_beli,
                name === 'margin' ? value : form.margin
            );
            updatedForm = {
                ...updatedForm,
                harga_pajak,
                harga_jual,
            };
        }

        setForm(updatedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
    
        let isValid = true;
        let newErrors = {};
    
        // Daftar field yang wajib diisi sesuai inputan form obat
        const requiredFields = [
            'nama_obat', 'produksi', 'isi_kemasan', 'satuan', 'pabrik',
            'on_label', 'off_label', 'nama_dagang', 'nama_original', 'margin',
            'harga_beli', 'harga_pajak', 'harga_jual', 'max_stock', 'min_stock',
            'eticket', 'kategori', 'jenis_obat', 'komposisi', 'level_sakit',
            'resiko', 'obat_terapi', 'obat_subterapi', 'sebelum_makan',
            'ketika_makan', 'setelah_makan', 'efek_hati', 'keterangan', 'sumber_barang'
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tambahObat`, formattedData, {
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
                                backgroundColor: '#2571a3', // biru MUI default
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
                                            value={form.margin || '1.25'}
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
                                            fullWidth
                                            margin="normal"
                                            slotProps={{
                                                        input: {
                                                        readOnly: true,
                                                        },
                                                    }}
                                            error={!!errors.harga_pajak}
                                            helperText={errors.harga_pajak || " "}
                                        />
                                    </Grid>
                                    <Grid columns={12}>
                                        <TextField
                                            label="Harga Jual"
                                            name="harga_jual"
                                            value={form.harga_jual || ''}
                                            fullWidth
                                            margin="normal"
                                            slotProps={{
                                                        input: {
                                                        readOnly: true,
                                                        },
                                                    }}
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
                                            label="Jenis Obat"
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

