import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';

export default function FormEditDataPatient({ open, patientData, onClose, onUpdate }) {
  // Initialize formData with patientData, but ensure it has default values in case it's undefined
  const [formData, setFormData] = useState({
    no_ktp: '',
    nama_lengkap: '',
    umur: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    golongan_darah: '',
    rhesus: '',
    agama: '',
    status: '',
    pendidikan: '',
    pekerjaan: '',
    warga_negara: '',
    asuransi: '',
    no_asuransi: '',
    no_telp: '',
    nama_orangtua_wali: '',
    no_telp_wali: '',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kode_pos: '',
  });

  useEffect(() => {
    // If patientData exists, update formData with the data
    if (patientData) {
      setFormData(patientData);
    }
  }, [patientData]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const handleSubmit = () => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Harap perbaiki kesalahan pada form',
        severity: 'error'
      });
      return;
    }

    axios.put(`http://localhost:5000/api/patients/${formData.no_ktp}`, formData)
      .then((res) => {
        onUpdate(formData); // Update the data in the table
        onClose(); // Close the dialog
      })
      .catch((err) => console.error('Error updating patient data:', err));


  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Data Pasien</DialogTitle>
      <DialogContent>
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded shadow-md w-full max-w-6xl"
          >
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2'>
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold">Form Edit Pasien</h3>
              </div>
              <div className="md:col-span-5">
                <hr className="border-t border-gray-300" />
              </div>
              <div className="md:col-span-5 mt-2">
                <h3 className="text-lg font-semibold mb-2">Kredensial</h3>
              </div>
              <div className='md:col-span-1'>
                <TextField
                  label="No. KTP"
                  value={formData.no_ktp}
                  onChange={handleChange}
                  name="no_ktp"
                  fullWidth
                  margin="normal"
                  disabled
                />
              </div>

              <div className='md:col-span-2'>
                <TextField
                  label="Nama Lengkap"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  name="nama_lengkap"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Tempat Lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  name="tempat_lahir"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Tanggal Lahir"
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  name="tanggal_lahir"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Umur"
                  value={formData.umur}
                  onChange={handleChange}
                  name="umur"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <FormControl fullWidth required error={!!errors.jenisKelamin}>
                  <InputLabel>Jenis Kelamin</InputLabel>
                  <Select
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                  >
                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Agama"
                  value={formData.agama}
                  onChange={handleChange}
                  name="agama"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Status"
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Golongan Darah"
                  value={formData.golongan_darah}
                  onChange={handleChange}
                  name="golongan_darah"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Rhesus"
                  value={formData.rhesus}
                  onChange={handleChange}
                  name="rhesus"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Pendidikan"
                  value={formData.pendidikan}
                  onChange={handleChange}
                  name="pendidikan"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  name="pekerjaan"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="No. Telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  name="no_telp"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Warga Negara"
                  value={formData.warga_negara}
                  onChange={handleChange}
                  name="warga_negara"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-2'>
                <TextField
                  label="Nama Penanggung Jawab"
                  value={formData.nama_orangtua_wali}
                  onChange={handleChange}
                  name="nama_orangtua_wali"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="No. Telp Penanggung Jawab"
                  value={formData.no_telp_wali}
                  onChange={handleChange}
                  name="no_telp_wali"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className="md:col-span-5 mt-6">
                <h3 className="text-lg font-semibold mb-2">Alamat</h3>
              </div>

              <div className='md:col-span-3'>
                <TextField
                  label="Alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  name="alamat"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="RT"
                  value={formData.rt}
                  onChange={handleChange}
                  name="rt"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="RW"
                  value={formData.rw}
                  onChange={handleChange}
                  name="rw"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Kelurahan"
                  value={formData.kelurahan}
                  onChange={handleChange}
                  name="kelurahan"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  name="kecamatan"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Kabupaten"
                  value={formData.kabupaten}
                  onChange={handleChange}
                  name="kabupaten"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  name="provinsi"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-1'>
                <TextField
                  label="Kode Pos"
                  value={formData.kode_pos}
                  onChange={handleChange}
                  name="kode_pos"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className="md:col-span-5 mt-6">
                <h3 className="text-lg font-semibold mb-2">Asuransi</h3>
              </div>

              <div className='md:col-span-2'>
                <TextField
                  label="Asuransi"
                  value={formData.asuransi}
                  onChange={handleChange}
                  name="asuransi"
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className='md:col-span-2'>
                <TextField
                  label="No. Asuransi"
                  value={formData.no_asuransi}
                  onChange={handleChange}
                  name="no_asuransi"
                  fullWidth
                  margin="normal"
                />
              </div>
            </div>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
            {/* Add other form fields as needed */}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
