import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack, Modal, Paper } from '@mui/material';
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

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/patients`)
      .then((res) => setRows(res.data))
      .catch((err) => console.error('Error fetching patients:', err));
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
              onClick={() => handleOpen(params.row)} // ✅ Pass full row
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
        <DataGrid
          rows={rows}
          columns={columns}
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

      <Modal open={open} onClose={handleClose}>
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
            <RMEPasien data={selectedRow} onClose={handleClose} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default TabelRME;
