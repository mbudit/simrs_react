import React, { useState } from 'react';
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
  IconButton
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

const RME = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample patient data
  const patient = {
    name: "Budi Santoso",
    age: 45,
    bloodType: "A+",
    allergies: ["Penicillin", "NSAIDs"],
    lastVisit: "2023-10-15"
  };

  // Clinical Notes
  const clinicalNotes = [
    { date: "2023-10-15", diagnosis: "Hypertension", doctor: "Dr. Ani", notes: "Patient advised to reduce salt intake" },
    { date: "2023-08-22", diagnosis: "Diabetes Type 2", doctor: "Dr. Rudi", notes: "Started on Metformin 500mg" }
  ];

  // Vital Signs
  const vitals = [
    { parameter: "BP", value: "130/85", unit: "mmHg", status: "normal" },
    { parameter: "Temp", value: "36.8", unit: "°C", status: "normal" },
    { parameter: "Pulse", value: "72", unit: "bpm", status: "normal" },
    { parameter: "SpO2", value: "98", unit: "%", status: "normal" }
  ];

  // Prescriptions
  const prescriptions = [
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
  ];

  // Lab Results
  const labResults = [
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
  ];

  // Filter functions
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
          Rekam Medis Elektronik
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <div>
            <Typography variant="h6">{patient.name}</Typography>
            <Typography>Usia: {patient.age} tahun</Typography>
            <Typography>Gol. Darah: {patient.bloodType}</Typography>
          </div>
          
          <div>
            <Typography>Alergi:</Typography>
            {patient.allergies.map((allergy, index) => (
              <Chip 
                key={index} 
                label={allergy} 
                color="warning" 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
              />
            ))}
          </div>
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
                    <Chip 
                      label={note.diagnosis} 
                      color="primary" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{note.doctor}</TableCell>
                  <TableCell>{note.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {vitals.map((vital, index) => (
            <Paper 
              key={index} 
              sx={{ 
                p: 2, 
                minWidth: 120,
                borderLeft: `4px solid ${
                  vital.status === 'normal' ? '#4caf50' : '#f44336'
                }`
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
            <Button 
              variant="contained" 
              startIcon={<AddCircleOutline />}
              color="success"
            >
              Resep Baru
            </Button>
          </Box>
          {filteredPrescriptions.map((prescription) => (
            <Paper key={prescription.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h6">
                  Resep #{prescription.id}
                </Typography>
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
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h6">
                  Hasil Lab #{lab.id}
                </Typography>
                <Button 
                  size="small" 
                  startIcon={<PictureAsPdf />}
                >
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

export default RME;