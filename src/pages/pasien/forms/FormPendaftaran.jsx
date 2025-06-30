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
import axios from 'axios'; // Add axios import

const FormPendaftaran = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    noKtp: '',
    noRme: '',
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    umur: '',
    jenisKelamin: '', // will store id only
    agama: '',
    status: '',
    goldar: '',
    pendidikan: '',
    pekerjaan: '',
    noTelp: '',
    wargaNegara: '',
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
  const [genderOptions, setGenderOptions] = useState([]);
  const [agamaOptions, setAgamaOptions] = useState([]);
  const [statusNikahOptions, setStatusNikahOptions] = useState([]);
  const [golonganDarahOptions, setGolonganDarahOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const [wargaNegaraOptions, setWargaNegaraOptions] = useState([]);
  const [asuransiOptions, setAsuransiOptions] = useState([]);
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Fetch the last RME number from the backend
    const fetchLastRme = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients/last-rme`);
        const lastRmeNumber = parseInt(response.data.lastRme.replace('RME-', ''), 10) || 0;
        console.log('Fetched last RME number:', lastRmeNumber); // Log the last RME number
        setFormData((prev) => ({
          ...prev,
          noRme: `RME-${lastRmeNumber + 1}` // Increment the last RME number
        }));
      } catch (error) {
        console.error('Failed to fetch the last RME number:', error);
      }
    };

    // Fetch gender options
    const fetchGenderOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gender-options`);
        setGenderOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch gender options:', error);
      }
    };

    // Fetch agama options
    const fetchAgamaOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/agama-options`);
        setAgamaOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch agama options:', error);
      }
    };

    // Fetch status nikah options
    const fetchStatusNikahOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status-nikah-options`);
        setStatusNikahOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch status nikah options:', error);
      }
    };

    // Fetch golongan darah options
    const fetchGolonganDarahOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/golongan-darah-options`);
        setGolonganDarahOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch golongan darah options:', error);
      }
    };

    // Fetch pendidikan options
    const fetchPendidikanOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendidikan-options`);
        setPendidikanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch pendidikan options:', error);
      }
    };

    // Fetch warga negara options
    const fetchWargaNegaraOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/warga-negara-options`);
        setWargaNegaraOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch warga negara options:', error);
      }
    };

    // Fetch asuransi options
    const fetchAsuransiOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/asuransi-options`);
        setAsuransiOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch asuransi options:', error);
      }
    };

    // Fetch pekerjaan options
    const fetchPekerjaanOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pekerjaan-options`);
        setPekerjaanOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch pekerjaan options:', error);
      }
    };

    fetchLastRme();
    fetchGenderOptions();
    fetchAgamaOptions();
    fetchStatusNikahOptions();
    fetchGolonganDarahOptions();
    fetchPendidikanOptions();
    fetchWargaNegaraOptions();
    fetchAsuransiOptions();
    fetchPekerjaanOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dropdowns with IDs
    const dropdowns = {
      jenisKelamin: genderOptions,
      agama: agamaOptions,
      status: statusNikahOptions,
      goldar: golonganDarahOptions,
      pendidikan: pendidikanOptions,
      wargaNegara: wargaNegaraOptions,
      asuransi: asuransiOptions,
      pekerjaan: pekerjaanOptions,
    };

    if (dropdowns[name]) {
      setFormData(prev => ({
        ...prev,
        [name]: value // store only the id
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    const numericFields = ['umur', 'noKtp', 'rt', 'rw', 'kodePos', 'noTelp', 'noTelpWali', 'noAsuransi'];
    const newValue = numericFields.includes(name)
      ? value.replace(/\D/g, '')
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
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
      'jenisKelamin', 'agama', 'status', 'goldar',
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

    // Add explicit check for gender_id
    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = 'Jenis Kelamin wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formattedDate = formData.tanggalLahir
    //   ? new Date(formData.tanggalLahir).toISOString().split('T')[0]
    //   : '';

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          gender_id: formData.jenisKelamin,
          agama_id: formData.agama,
          status_nikah_id: formData.status,
          golongan_darah_id: formData.goldar,
          pendidikan_id: formData.pendidikan,
          warga_negara_id: formData.wargaNegara,
          asuransi_id: formData.asuransi,
          pekerjaan_id: formData.pekerjaan,
          // tanggal_lahir: formattedDate
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
        noRme: 'RME-',
        namaLengkap: '',
        tempatLahir: '',
        tanggalLahir: '',
        umur: '',
        jenisKelamin: '',
        agama: '',
        status: '',
        goldar: '',
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
              label="No. RME"
              fullWidth
              required
              name="noRme"
              value={formData.noRme}
              disabled // Make the field read-only
              error={!!errors.noRme}
              helperText={errors.noRme}
            />
          </div>


          <div className="md:col-span-1">
            <TextField
              label="No. KTP"
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
                {genderOptions.map((option) => (
                  <MenuItem key={option.gender_id} value={option.gender_id}>
                    {option.gender_name}
                  </MenuItem>
                ))}
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
                {agamaOptions.map((option) => (
                  <MenuItem key={option.agama_id} value={option.agama_id}>
                    {option.agama_name}
                  </MenuItem>
                ))}
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
                {statusNikahOptions.map((option) => (
                  <MenuItem key={option.status_nikah_id} value={option.status_nikah_id}>
                    {option.status_nikah_name}
                  </MenuItem>
                ))}
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
                {golonganDarahOptions.map((option) => (
                  <MenuItem key={option.golongan_darah_id} value={option.golongan_darah_id}>
                    {option.golongan_darah_name}
                  </MenuItem>
                ))}
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
                {pendidikanOptions.map((option) => (
                  <MenuItem key={option.pendidikan_id} value={option.pendidikan_id}>
                    {option.pendidikan_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <FormControl fullWidth required error={!!errors.pekerjaan}>
              <InputLabel>Pekerjaan</InputLabel>
              <Select
                label="Pekerjaan"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
              >
                {pekerjaanOptions.map((option) => (
                  <MenuItem key={option.pekerjaan_id} value={option.pekerjaan_id}>
                    {option.pekerjaan_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-1">
            <TextField
              label="No. Telp"
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
                {wargaNegaraOptions.map((option) => (
                  <MenuItem key={option.warga_negara_id} value={option.warga_negara_id}>
                    {option.warga_negara_name}
                  </MenuItem>
                ))}
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
                {asuransiOptions.map((option) => (
                  <MenuItem key={option.asuransi_id} value={option.asuransi_id}>
                    {option.asuransi_name}
                  </MenuItem>
                ))}
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