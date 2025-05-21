import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack, Modal, Paper } from '@mui/material';
import RMEPasien from './forms/RMEPasien';

const rows = [
    { id: 1, nama: 'Ahmad Yusuf', noRM: 'RM001', tanggal: '2025-05-20', keluhan: 'Demam' },
    { id: 2, nama: 'Siti Aminah', noRM: 'RM002', tanggal: '2025-05-19', keluhan: 'Batuk' },
    { id: 3, nama: 'Budi Santoso', noRM: 'RM003', tanggal: '2025-05-18', keluhan: 'Sakit kepala' },
];

const TabelRME = () => {
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

    const columns = [
        { field: 'noRM', headerName: 'No. Rekam Medis', width: 150 },
        { field: 'nama', headerName: 'Nama Pasien', flex: 1 },
        { field: 'tanggal', headerName: 'Tanggal', flex: 1 },
        { field: 'keluhan', headerName: 'Keluhan', flex: 1 },
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
                <DataGrid
                    rows={rows}
                    columns={columns}
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
                    {/* Pass the selected row data into the modal form */}
                    <RMEPasien data={selectedRow} onClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
};

export default TabelRME;
