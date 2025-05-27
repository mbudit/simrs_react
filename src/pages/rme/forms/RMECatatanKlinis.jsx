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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>Form Catatan Klinis (SOAP)</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-8 md:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2">

          {/* === Subjective === */}
          <div className="md:col-span-5 text-lg font-semibold">Subjective</div>

          <TextField
            className="md:col-span-1"
            name="tanggal_pemeriksaan"
            label="Tanggal Pemeriksaan"
            type="date"
            value={note.tanggal_pemeriksaan}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            className="md:col-span-2"
            name="keluhan_utama"
            label="Keluhan Utama"
            value={note.keluhan_utama}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-5"
            name="riwayat_penyakit_sekarang"
            label="Riwayat Penyakit Sekarang"
            value={note.riwayat_penyakit_sekarang}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-3"
            name="riwayat_penyakit_dahulu"
            label="Riwayat Penyakit Dahulu"
            value={note.riwayat_penyakit_dahulu}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-3"
            name="riwayat_penyakit_keluarga"
            label="Riwayat Penyakit Keluarga"
            value={note.riwayat_penyakit_keluarga}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-2"
            name="riwayat_alergi"
            label="Riwayat Alergi"
            value={note.riwayat_alergi}
            onChange={onChange}
          />

          {/* === Objective === */}
          <div className="md:col-span-5 text-lg font-semibold mt-4">Objective</div>

          <TextField
            className="md:col-span-2"
            name="tekanan_darah"
            label="Tekanan Darah"
            value={note.tekanan_darah}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-1"
            name="nadi"
            label="Nadi"
            value={note.nadi}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-1"
            name="suhu"
            label="Suhu"
            value={note.suhu}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-1"
            name="pernapasan"
            label="Pernapasan"
            value={note.pernapasan}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-5"
            name="pemeriksaan_fisik"
            label="Pemeriksaan Fisik"
            multiline
            rows={3}
            value={note.pemeriksaan_fisik}
            onChange={onChange}
          />

          {/* === Assessment === */}
          <div className="md:col-span-5 text-lg font-semibold mt-4">Assessment</div>

          <TextField
            className="md:col-span-3"
            name="diagnosis_kerja"
            label="Diagnosis Kerja"
            value={note.diagnosis_kerja}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-2"
            name="diagnosis_banding"
            label="Diagnosis Banding"
            value={note.diagnosis_banding}
            onChange={onChange}
          />

          {/* === Plan === */}
          <div className="md:col-span-5 text-lg font-semibold mt-4">Plan</div>

          <TextField
            className="md:col-span-5"
            name="rencana_terapi"
            label="Rencana Terapi"
            multiline
            rows={3}
            value={note.rencana_terapi}
            onChange={onChange}
          />
          <TextField
            className="md:col-span-5"
            name="rencana_tindak_lanjut"
            label="Rencana Tindak Lanjut"
            multiline
            rows={2}
            value={note.rencana_tindak_lanjut}
            onChange={onChange}
          />

        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={onSubmit}>Simpan</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCatatanKlinis;
