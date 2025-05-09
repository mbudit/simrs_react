import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';

const FormPendaftaran = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    noKtp: '',
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    umur: '',
    jenisKelamin: '',
    agama: '',
    status: '',
    goldar: '',
    rhesus: '',
    pendidikan: '',
    pekerjaan: '',
    noTelp: '',
    wargaNegara: 'WNI',
    namaOrangtuaWali: '',
    noTelpWali: '',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',
    asuransi: '',
    noAsuransi: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'noKtp', 'namaLengkap', 'tempatLahir', 'tanggalLahir', 'umur',
      'jenisKelamin', 'agama', 'status', 'goldar', 'rhesus',
      'pendidikan', 'pekerjaan', 'noTelp', 'wargaNegara',
      'namaOrangtuaWali', 'noTelpWali', 'alamat', 'rt', 'rw',
      'kelurahan', 'kecamatan', 'kabupaten', 'provinsi', 'kodePos',
      'asuransi'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Field ini wajib diisi';
      }
    });

    // KTP validation (16 digits)
    if (formData.noKtp && formData.noKtp.length !== 16) {
      newErrors.noKtp = 'No. KTP harus 16 digit';
    }

    // Phone number validation
    if (formData.noTelp && formData.noTelp.length < 10) {
      newErrors.noTelp = 'No. Telp minimal 10 digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Harap perbaiki kesalahan pada form',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Convert some fields to match backend expectations
          golongan_darah: formData.goldar,
          no_asuransi: formData.noAsuransi
        })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSnackbar({
        open: true,
        message: 'Pendaftaran pasien berhasil!',
        severity: 'success'
      });

      // Reset form after successful submission
      setFormData({
        noKtp: '',
        namaLengkap: '',
        tempatLahir: '',
        tanggalLahir: '',
        umur: '',
        jenisKelamin: '',
        agama: '',
        status: '',
        goldar: '',
        rhesus: '',
        pendidikan: '',
        pekerjaan: '',
        noTelp: '',
        wargaNegara: 'WNI',
        namaOrangtuaWali: '',
        noTelpWali: '',
        alamat: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        kodePos: '',
        asuransi: '',
        noAsuransi: ''
      });

      // Optionally close the form after delay
      setTimeout(() => {
        if (onSuccess) onSuccess(); // 👈 trigger table reload and close form
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Gagal mendaftarkan pasien: ' + error.message,
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded shadow-md w-full max-w-6xl"
      >
        <form
          className="grid grid-cols-1 md:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="md:col-span-5">
            <h3 className="text-xl font-bold">Form Pendaftaran Pasien Baru</h3>
          </div>
          <div className="md:col-span-5">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="md:col-span-5 mt-2">
            <h3 className="text-lg font-semibold mb-2">Kredensial</h3>
          </div>

          <div className="md:col-span-1">
            <TextField
              label="No. KTP"
              type="number"
              fullWidth
              required
              name="noKtp"
              value={formData.noKtp}
              onChange={handleChange}
              error={!!errors.noKtp}
              helperText={errors.noKtp}
              slotProps={{
                htmlInput: { maxLength: 16 }
              }}
            />
          </div>
          <div className="md:col-span-2">
            <TextField
              label="Nama Lengkap"
              fullWidth
              required
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              error={!!errors.namaLengkap}
              helperText={errors.namaLengkap}
            />
          </div>

          <div className="md:col-span-1">
            <TextField
              label="Tempat Lahir"
              fullWidth
              required
              name="tempatLahir"
              value={formData.tempatLahir}
              onChange={handleChange}
              error={!!errors.tempatLahir}
              helperText={errors.tempatLahir}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Tanggal Lahir"
              type="date"
              fullWidth
              required
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleChange}
              error={!!errors.tanggalLahir}
              helperText={errors.tanggalLahir}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Umur"
              type="number"
              fullWidth
              required
              name="umur"
              value={formData.umur}
              onChange={handleChange}
              error={!!errors.umur}
              helperText={errors.umur}
              slotProps={{
                htmlInput: { min: 0, max: 120 }
              }}
            />
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.jenisKelamin}>
              <InputLabel>Jenis Kelamin</InputLabel>
              <Select
                label="Jenis Kelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
              >
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.agama}>
              <InputLabel>Agama</InputLabel>
              <Select
                label="Agama"
                name="agama"
                value={formData.agama}
                onChange={handleChange}
              >
                <MenuItem value="Islam">Islam</MenuItem>
                <MenuItem value="Kristen">Kristen</MenuItem>
                <MenuItem value="Katolik">Katolik</MenuItem>
                <MenuItem value="Hindu">Hindu</MenuItem>
                <MenuItem value="Budha">Budha</MenuItem>
                <MenuItem value="Konghucu">Konghucu</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                <MenuItem value="Menikah">Menikah</MenuItem>
                <MenuItem value="Cerai">Cerai</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.goldar}>
              <InputLabel>Gol. Darah</InputLabel>
              <Select
                label="Gol. Darah"
                name="goldar"
                value={formData.goldar}
                onChange={handleChange}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="AB">AB</MenuItem>
                <MenuItem value="O">O</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.rhesus}>
              <InputLabel>Rhesus</InputLabel>
              <Select
                label="Rhesus"
                name="rhesus"
                value={formData.rhesus}
                onChange={handleChange}
              >
                <MenuItem value="+">Positif (+)</MenuItem>
                <MenuItem value="-">Negatif (-)</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.pendidikan}>
              <InputLabel>Pendidikan</InputLabel>
              <Select
                label="Pendidikan"
                name="pendidikan"
                value={formData.pendidikan}
                onChange={handleChange}
              >
                <MenuItem value="SD">SD</MenuItem>
                <MenuItem value="SMP">SMP</MenuItem>
                <MenuItem value="SMA/SMK">SMA/SMK</MenuItem>
                <MenuItem value="D3">D3</MenuItem>
                <MenuItem value="S1">S1</MenuItem>
                <MenuItem value="S2">S2</MenuItem>
                <MenuItem value="S3">S3</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <TextField
              label="Pekerjaan"
              fullWidth
              required
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleChange}
              error={!!errors.pekerjaan}
              helperText={errors.pekerjaan}
            />
          </div>

          <div className="md:col-span-1">
            <TextField
              label="No. Telp"
              type="tel"
              fullWidth
              required
              name="noTelp"
              value={formData.noTelp}
              onChange={handleChange}
              error={!!errors.noTelp}
              helperText={errors.noTelp}
              slotProps={{
                htmlInput: { maxLength: 15 }
              }}
            />
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.wargaNegara}>
              <InputLabel>Warga Negara</InputLabel>
              <Select
                label="Warga Negara"
                name="wargaNegara"
                value={formData.wargaNegara}
                onChange={handleChange}
              >
                <MenuItem value="WNI">WNI</MenuItem>
                <MenuItem value="WNA">WNA</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-2">
            <TextField
              label="Nama Orangtua / Wali"
              fullWidth
              required
              name="namaOrangtuaWali"
              value={formData.namaOrangtuaWali}
              onChange={handleChange}
              error={!!errors.namaOrangtuaWali}
              helperText={errors.namaOrangtuaWali}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="No. Telp Wali"
              type="tel"
              fullWidth
              required
              name="noTelpWali"
              value={formData.noTelpWali}
              onChange={handleChange}
              error={!!errors.noTelpWali}
              helperText={errors.noTelpWali}
              slotProps={{
                htmlInput: { maxLength: 15 }
              }}
            />
          </div>

          <div className="md:col-span-5 mt-6">
            <h3 className="text-lg font-semibold mb-2">Alamat</h3>
          </div>
          <div className="md:col-span-3">
            <TextField
              label="Alamat"
              fullWidth
              required
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              error={!!errors.alamat}
              helperText={errors.alamat}
              multiline
              rows={2}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="RT"
              type="number"
              fullWidth
              required
              name="rt"
              value={formData.rt}
              onChange={handleChange}
              error={!!errors.rt}
              helperText={errors.rt}
              slotProps={{
                htmlInput: { min: 1, max: 100 }
              }}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="RW"
              type="number"
              fullWidth
              required
              name="rw"
              value={formData.rw}
              onChange={handleChange}
              error={!!errors.rw}
              helperText={errors.rw}
              slotProps={{
                htmlInput: { min: 1, max: 100 }
              }}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Kelurahan"
              fullWidth
              required
              name="kelurahan"
              value={formData.kelurahan}
              onChange={handleChange}
              error={!!errors.kelurahan}
              helperText={errors.kelurahan}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Kecamatan"
              fullWidth
              required
              name="kecamatan"
              value={formData.kecamatan}
              onChange={handleChange}
              error={!!errors.kecamatan}
              helperText={errors.kecamatan}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Kabupaten"
              fullWidth
              required
              name="kabupaten"
              value={formData.kabupaten}
              onChange={handleChange}
              error={!!errors.kabupaten}
              helperText={errors.kabupaten}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Provinsi"
              fullWidth
              required
              name="provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              error={!!errors.provinsi}
              helperText={errors.provinsi}
            />
          </div>
          <div className="md:col-span-1">
            <TextField
              label="Kode Pos"
              type="number"
              fullWidth
              required
              name="kodePos"
              value={formData.kodePos}
              onChange={handleChange}
              error={!!errors.kodePos}
              helperText={errors.kodePos}
              slotProps={{
                htmlInput: { maxLength: 5 }
              }}
            />
          </div>

          <div className="md:col-span-5 mt-6">
            <h3 className="text-lg font-semibold mb-2">Asuransi</h3>
          </div>
          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.asuransi}>
              <InputLabel>Asuransi</InputLabel>
              <Select
                label="Asuransi"
                name="asuransi"
                value={formData.asuransi}
                onChange={handleChange}
              >
                <MenuItem value="BPJS">BPJS</MenuItem>
                <MenuItem value="Asuransi A">Asuransi A</MenuItem>
                <MenuItem value="Asuransi B">Asuransi B</MenuItem>
                <MenuItem value="Asuransi Swasta">Asuransi Swasta</MenuItem>
                <MenuItem value="Tidak Ada">Tidak Ada</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="md:col-span-2">
            <TextField
              label="Nomor Asuransi"
              fullWidth
              name="noAsuransi"
              value={formData.noAsuransi}
              onChange={handleChange}
              error={!!errors.noAsuransi}
              helperText={errors.noAsuransi}
              required={formData.asuransi !== 'Tidak Ada'}
              disabled={formData.asuransi === 'Tidak Ada'}
            />
          </div>

          <div className="md:col-span-5 flex justify-end mt-4">
            <Stack spacing={2} direction="row">
              <Button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                variant="outlined"
                disabled={isSubmitting}
              >
                Tutup
              </Button>
              <Button
                type='submit'
                variant="contained"
                className='px-4 py-2 bg-green-600 text-white rounded'
                color="success"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </Stack>
          </div>
        </form>
      </motion.div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormPendaftaran;