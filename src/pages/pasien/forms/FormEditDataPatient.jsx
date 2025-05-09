import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function FormEditDataPatient({ open, patientData, onClose, onUpdate }) {
  // Initialize formData with patientData, but ensure it has default values in case it's undefined
  const [formData, setFormData] = useState({
    no_ktp: '',
    nama_lengkap: '',
    umur: '',
    tanggal_lahir: '',
    asuransi: '',
    no_asuransi: '',
    no_telp: '',
    nama_orangtua_wali: '',
    no_telp_wali: '',
  });

  useEffect(() => {
    // If patientData exists, update formData with the data
    if (patientData) {
      setFormData(patientData);
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
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
        {/* Ensure formData is defined */}
        <TextField
          label="No. KTP"
          value={formData.no_ktp}
          onChange={handleChange}
          name="no_ktp"
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Nama Lengkap"
          value={formData.nama_lengkap}
          onChange={handleChange}
          name="nama_lengkap"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Umur"
          value={formData.umur}
          onChange={handleChange}
          name="umur"
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tanggal Lahir"
          value={formData.tanggal_lahir}
          onChange={handleChange}
          name="tanggal_lahir"
          type="date"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Asuransi"
          value={formData.asuransi}
          onChange={handleChange}
          name="asuransi"
          fullWidth
          margin="normal"
        />
        <TextField
          label="No. Asuransi"
          value={formData.no_asuransi}
          onChange={handleChange}
          name="no_asuransi"
          fullWidth
          margin="normal"
        />
        <TextField
          label="No. Telp"
          value={formData.no_telp}
          onChange={handleChange}
          name="no_telp"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nama Penanggung Jawab"
          value={formData.nama_orangtua_wali}
          onChange={handleChange}
          name="nama_orangtua_wali"
          fullWidth
          margin="normal"
        />
        <TextField
          label="No. Telp Penanggung Jawab"
          value={formData.no_telp_wali}
          onChange={handleChange}
          name="no_telp_wali"
          fullWidth
          margin="normal"
        />

        {/* Add other form fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
