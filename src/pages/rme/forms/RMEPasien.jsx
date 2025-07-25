import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  AccessTime,
  LocalHospital,
  Medication,
  Science,
  Timeline,
  Search,
  PictureAsPdf,
  Print,
  AddCircleOutline
} from '@mui/icons-material';
import FormCatatanKlinis from './RMECatatanKlinis'
import RMECatatanKlinisEdit from './RMECatatanKlinisEdit';
import axios from 'axios';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const defaultPatient = {
  vitals: [
    { parameter: "BP", value: "130/85", unit: "mmHg", status: "normal" },
    { parameter: "Temp", value: "36.8", unit: "°C", status: "normal" },
    { parameter: "Pulse", value: "72", unit: "bpm", status: "normal" },
    { parameter: "SpO2", value: "98", unit: "%", status: "normal" }
  ],
  prescriptions: [
    {
      id: "RX-2023-001",
      date: "2023-10-15",
      medications: [
        { name: "Amlodipine", dosage: "5mg", frequency: "1x daily", duration: "30 days" },
        { name: "Losartan", dosage: "50mg", frequency: "1x daily", duration: "30 days" }
      ],
      doctor: "Dr. Ani",
      status: "active"
    },
    {
      id: "RX-2023-002",
      date: "2023-08-22",
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "2x daily", duration: "90 days" }
      ],
      doctor: "Dr. Rudi",
      status: "completed"
    }
  ],
  labResults: [
    {
      id: "LAB-2023-001",
      date: "2023-10-10",
      tests: [
        { name: "Complete Blood Count", result: "Normal", flag: "normal" },
        { name: "Blood Glucose", result: "126 mg/dL", flag: "high" }
      ],
      lab: "Lab Prodia",
      attachment: "hemogram_2023.pdf"
    },
    {
      id: "LAB-2023-002",
      date: "2023-08-15",
      tests: [
        { name: "HbA1c", result: "7.2%", flag: "high" },
        { name: "Cholesterol", result: "210 mg/dL", flag: "high" }
      ],
      lab: "Lab Kimia Farma",
      attachment: "metabolic_panel.pdf"
    }
  ]
};

const RMEPasien = ({ patientData = defaultPatient, data }) => {
  if (!data) return null;
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState([]);

  const fetchClinicalNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/rme/clinical-notes/${data.no_rme}`);
      console.log('Fetched clinical notes:', response.data); // Log the fetched data
      setClinicalNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch clinical notes:", error);
    }
  };

  useEffect(() => {
    fetchClinicalNotes();
  }, [data.no_rme]);

  const [formState, setFormState] = useState({
    isFormOpen: false,
    isEditFormOpen: false,
    selectedNoteId: null,
    isDeleteConfirmationOpen: false,
  });

  const handleOpenForm = () => setFormState((prev) => ({ ...prev, isFormOpen: true }));
  const handleCloseForm = () => setFormState((prev) => ({ ...prev, isFormOpen: false }));

  const handleOpenEditForm = (note) => setFormState((prev) => ({
    ...prev,
    isEditFormOpen: true,
    selectedNoteId: note.id,
  }));

  const handleCloseEditForm = () => setFormState((prev) => ({
    ...prev,
    isEditFormOpen: false,
    selectedNoteId: null,
  }));

  const handleOpenDeleteConfirmation = (noteId) => setFormState((prev) => ({
    ...prev,
    isDeleteConfirmationOpen: true,
    selectedNoteId: noteId,
  }));

  const handleCloseDeleteConfirmation = () => setFormState((prev) => ({
    ...prev,
    isDeleteConfirmationOpen: false,
    selectedNoteId: null,
  }));

  const handleConfirmDelete = async () => {
    if (!formState.selectedNoteId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/rme/clinical-notes/${formState.selectedNoteId}`);
      setClinicalNotes((prevNotes) => prevNotes.filter((note) => note.id !== formState.selectedNoteId));
      console.log(`Deleted note ID: ${formState.selectedNoteId}`);
    } catch (error) {
      console.error(`Failed to delete note ID: ${formState.selectedNoteId}`, error);
    }
    handleCloseDeleteConfirmation();
  };

  const generatePDF = (note) => {
    const doc = new jsPDF();
    console.log('Data passed to generatePDF:', note); // Log the note data

    // Format the tanggal_pemeriksaan field
    const formattedDate = format(new Date(note.tanggal_pemeriksaan), 'yyyy-MM-dd');

    // Add main title (centered)
    doc.setFontSize(16);
    doc.text('Detail Catatan Klinis', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Add subtitle with dokter, no_rme, and formatted tanggal_pemeriksaan (centered)
    doc.setFontSize(12);
    doc.text(
      `Dokter: ${note.dokter} | No. RME: ${note.no_rme} | Tanggal: ${formattedDate}`,
      doc.internal.pageSize.getWidth() / 2,
      30,
      { align: 'center' }
    );

    // Add table data dynamically based on the selected row
    const tableData = [
      ['Field', 'Value'],
      ['Tanggal Pemeriksaan', formattedDate],
      ['Diagnosis Kerja', note.diagnosis_kerja],
      ['Dokter', note.dokter],
      ['No. RME', note.no_rme],
      ['Keluhan Utama', note.keluhan_utama || 'N/A'],
      ['Riwayat Penyakit Sekarang', note.riwayat_penyakit_sekarang || 'N/A'],
      ['Riwayat Penyakit Dahulu', note.riwayat_penyakit_dahulu || 'N/A'],
      ['Riwayat Penyakit Keluarga', note.riwayat_penyakit_keluarga || 'N/A'],
      ['Riwayat Alergi', note.riwayat_alergi || 'N/A'],
      ['Tekanan Darah', note.tekanan_darah || 'N/A'],
      ['Nadi', note.nadi || 'N/A'],
      ['Suhu', note.suhu || 'N/A'],
      ['Pernapasan', note.pernapasan || 'N/A'],
      ['Pemeriksaan Fisik', note.pemeriksaan_fisik || 'N/A'],
      ['Diagnosis Banding', note.diagnosis_banding || 'N/A'],
      ['Rencana Terapi', note.rencana_terapi || 'N/A'],
      ['Rencana Tindak Lanjut', note.rencana_tindak_lanjut || 'N/A'],
      ['Catatan', note.catatan || 'N/A'],
    ];

    autoTable(doc, {
      startY: 40,
      head: [tableData[0]],
      body: tableData.slice(1),
      margin: { top: 10 },
      styles: { fontSize: 9, lineWidth: 0.1 }, // Add borders with lineWidth
      headStyles: { fillColor: [30, 40, 56] },
      tableLineColor: [0, 0, 0], // Black border color
      tableLineWidth: 0.1, // Border thickness
    });

    // Save the PDF with a dynamic filename
    doc.save(`Catatan_Klinis_${note.id}_${note.no_rme}.pdf`);
  };

  const nama = data.nama_lengkap;
  const umur = data.umur;
  const no_rme = data.no_rme;
  const golongandarah = data.golongan_darah;
  const rhesus = data.rhesus;
  const asuransi = data.asuransi;
  const no_asuransi = data.no_asuransi;
  const no_telp = data.no_telp;

  const {
    vitals,
    prescriptions,
    labResults
  } = patientData;

  const filteredPrescriptions = prescriptions.filter(pres =>
    pres.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pres.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLabResults = labResults.filter(lab =>
    lab.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.lab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableRow = (note) => (
    <TableRow key={note.id}>
      <TableCell>{format(new Date(note.tanggal_pemeriksaan), 'yyyy-MM-dd')}</TableCell>
      <TableCell>
        <Chip label={note.diagnosis_kerja} color="primary" size="small" />
      </TableCell>
      <TableCell>{note.dokter}</TableCell>
      <TableCell>{note.catatan}</TableCell>
      <TableCell>
        <Button variant="contained" color="info" onClick={() => generatePDF(note)}>
          PDF
        </Button>
        <Button variant="contained" color="success" onClick={() => handleOpenEditForm(note)} sx={{ ml: 1 }}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => handleOpenDeleteConfirmation(note.id)} sx={{ ml: 1 }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Patient Header */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
          Rekam Medis Elektronik | {no_rme}
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <div>
            <Typography variant="h6">{nama}</Typography>
            <Typography>Usia: {umur} tahun</Typography>
          </div>

          <div>
            <Typography>Asuransi: {asuransi}</Typography>
            <Typography>No. Asuransi: {no_asuransi}</Typography>
          </div>

          <div>
            <Typography>Gol. Darah: {golongandarah}{rhesus}</Typography>
            <Typography>No. Telp: {no_telp}</Typography>
          </div>
        </Box>
      </Paper>
      {/* Search and Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Cari"
          size="small"
          sx={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }
          }}
        />
        <div>
          <Button variant="outlined" startIcon={<Print />} sx={{ mr: 1 }}>
            Cetak
          </Button>
          <Button variant="contained" startIcon={<PictureAsPdf />}>
            Ekspor PDF
          </Button>
        </div>
      </Box>
      {/* Navigation Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Catatan Klinis" icon={<AccessTime />} />
        <Tab label="Tanda Vital" icon={<Timeline />} />
        <Tab label="Resep Obat" icon={<Medication />} />
        <Tab label="Hasil Lab" icon={<Science />} />
      </Tabs>
      <Divider sx={{ mb: 3 }} />
      {/* Tab Content */}
      {activeTab === 0 && (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              onClick={handleOpenForm}
            >
              Buat RME Baru
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: 'background.paper' }}>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Dokter</TableCell>
                  <TableCell>Catatan</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clinicalNotes.length > 0 ? (
                  clinicalNotes.map(renderTableRow)
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Tidak ada data tersedia
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <FormCatatanKlinis
            open={formState.isFormOpen}
            onClose={handleCloseForm}
            onSubmit={fetchClinicalNotes}
            patientData={data}
          />

          <RMECatatanKlinisEdit
            open={formState.isEditFormOpen}
            onClose={handleCloseEditForm}
            noteId={formState.selectedNoteId}
            onSubmit={fetchClinicalNotes}
          />

          {/* Confirmation Delete Dialog */}
          <Dialog
            open={formState.isDeleteConfirmationOpen}
            onClose={handleCloseDeleteConfirmation}
          >
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogContent>
              <Typography>Apakah Anda yakin ingin menghapus catatan ini?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirmation} color="primary">
                Batal
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                Hapus
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      )}
      {activeTab === 1 && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {vitals.map((vital, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                minWidth: 120,
                borderLeft: `4px solid ${vital.status === 'normal' ? '#4caf50' : '#f44336'}`
              }}
            >
              <Typography variant="subtitle2">{vital.parameter}</Typography>
              <Typography variant="h4">{vital.value}</Typography>
              <Typography color="text.secondary">{vital.unit}</Typography>
            </Paper>
          ))}
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" startIcon={<AddCircleOutline />} color="success">
              Resep Baru
            </Button>
          </Box>
          {filteredPrescriptions.map((prescription) => (
            <Paper key={prescription.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Resep #{prescription.id}</Typography>
                <Chip
                  label={prescription.status === 'active' ? 'Aktif' : 'Selesai'}
                  color={prescription.status === 'active' ? 'success' : 'default'}
                />
              </Box>

              <Typography color="text.secondary" gutterBottom>
                Tanggal: {prescription.date} | Dokter: {prescription.doctor}
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nama Obat</TableCell>
                      <TableCell>Dosis</TableCell>
                      <TableCell>Frekuensi</TableCell>
                      <TableCell>Durasi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescription.medications.map((med, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{med.name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{med.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </Box>
      )}
      {activeTab === 3 && (
        <Box>
          {filteredLabResults.map((lab) => (
            <Paper key={lab.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Hasil Lab #{lab.id}</Typography>
                <Button size="small" startIcon={<PictureAsPdf />}>
                  Lihat Lampiran
                </Button>
              </Box>

              <Typography color="text.secondary" gutterBottom>
                Tanggal: {lab.date} | Laboratorium: {lab.lab}
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pemeriksaan</TableCell>
                      <TableCell>Hasil</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lab.tests.map((test, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{test.name}</TableCell>
                        <TableCell>{test.result}</TableCell>
                        <TableCell>
                          <Chip
                            label={test.flag === 'normal' ? 'Normal' : 'Tidak Normal'}
                            color={test.flag === 'normal' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RMEPasien;
