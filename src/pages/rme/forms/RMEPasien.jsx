import React, { useState } from 'react';
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


const defaultPatient = {
  name: "Budi Santoso",
  age: 45,
  bloodType: "A+",
  allergies: ["Penicillin", "NSAIDs"],
  lastVisit: "2023-10-15",
  clinicalNotes: [
    { date: "2023-10-15", diagnosis: "Hypertension", doctor: "Dr. Ani", notes: "Patient advised to reduce salt intake" },
    { date: "2023-08-22", diagnosis: "Diabetes Type 2", doctor: "Dr. Rudi", notes: "Started on Metformin 500mg" }
  ],
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

  const [formOpen, setFormOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    date: '',
    diagnosis: '',
    doctor: '',
    notes: '',
  });

  const handleOpenForm = () => setFormOpen(true);
  const handleCloseForm = () => setFormOpen(false);

  const handleFormChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleSubmitNote = () => {
    console.log("Submitting note:", newNote);
    // optionally: call API or update clinicalNotes state
    handleCloseForm();
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
    bloodType,
    clinicalNotes,
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
          {/* 
          <div>
            <Typography>Alergi:</Typography>
            {allergies.map((allergy, index) => (
              <Chip
                key={index}
                label={allergy}
                color="warning"
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </div> */}
        </Box>
      </Paper>

      {/* Search and Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Cari"
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={handleOpenForm} // we'll define this next
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
                </TableRow>
              </TableHead>
              <TableBody>
                {clinicalNotes.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>
                      <Chip label={note.diagnosis} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{note.doctor}</TableCell>
                    <TableCell>{note.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <FormCatatanKlinis
            open={formOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmitNote}
            note={newNote}
            onChange={handleFormChange}
          />
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
