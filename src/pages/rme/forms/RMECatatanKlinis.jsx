// src/pages/rme/forms/FormCatatanKlinis.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const FormCatatanKlinis = ({ open, onClose, onSubmit, note, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Buat Catatan Klinis Baru</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          name="date"
          label="Tanggal"
          type="date"
          value={note.date}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="diagnosis"
          label="Diagnosis"
          value={note.diagnosis}
          onChange={onChange}
        />
        <TextField
          name="doctor"
          label="Dokter"
          value={note.doctor}
          onChange={onChange}
        />
        <TextField
          name="notes"
          label="Catatan"
          multiline
          rows={3}
          value={note.notes}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={onSubmit}>Simpan</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCatatanKlinis;
