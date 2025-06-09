import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack, Modal, Paper, Alert } from '@mui/material';
import RMEPasien from './forms/RMEPasien';
import axios from 'axios';

const columnsBase = [
  { field: 'no_rme', headerName: 'No. RME', width: 150 },
  { field: 'nama_lengkap', headerName: 'Nama Pasien', flex: 1 },
  { field: 'asuransi', headerName: 'Nama Asuransi', flex: 1 },
  { field: 'no_asuransi', headerName: 'Nomor Asuransi', flex: 1 },
  { field: 'no_telp', headerName: 'No. Telp', flex: 1 },
];

const TabelRME = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setError(null);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients`);
      setRows(res.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    ...columnsBase,
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleOpen(params.row)}
            >
              RME
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Paper>
        {error && <Alert severity="error">{error}</Alert>}
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.no_ktp}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f1f5f9',
              fontWeight: 'bold',
            },
          }}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="RME"
        aria-describedby="RME PASIEN"

      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedRow && (
            <RMEPasien
              data={selectedRow}
              onClose={handleClose} // Ensure modal closes on form submission
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default TabelRME;
