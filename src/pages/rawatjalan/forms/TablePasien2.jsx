import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormEditDataPatient from '../../pasien/forms/FormEditDataPatient';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const columnsBase = [
    { field: 'no_ktp', headerName: 'No. KTP', width: 150 },
    { field: 'nama_lengkap', headerName: 'Nama Pasien', flex: 1 },
    { field: 'umur', headerName: 'Umur', type: 'number', width: 70 },
    {
        field: 'tanggal_lahir',
        headerName: 'Tanggal Lahir',
        width: 150,
        valueFormatter: (params) => {
            if (!params.value) return '';
            return params.value.split('T')[0]; // Extract only the date part
        }
    },
    { field: 'asuransi', headerName: 'Nama Asuransi', width: 120 },
    { field: 'no_asuransi', headerName: 'Nomor Asuransi', flex: 1 },
    { field: 'no_telp', headerName: 'No. Telp', width: 150 },
    { field: 'nama_orangtua_wali', headerName: 'Nama Penanggung Jawab', flex: 1 },
    { field: 'no_telp_wali', headerName: 'No. Telp Penanggung Jawab', width: 180 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TablePasien({ handleSelect }) {
    const [rows, setRows] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' | 'error'
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/patients`)
            .then((res) => setRows(res.data))
            .catch((err) => console.error('Error fetching patients:', err));
    };

    const handleDelete = (no_ktp) => {
        if (!window.confirm('Apakah anda yakin untuk menghapus data pasien ini??')) return;

        axios.delete(`${import.meta.env.VITE_API_URL}/api/patients/${no_ktp}`)
            .then(() => {
                setRows(prev => prev.filter(row => row.no_ktp !== no_ktp));
                setSnackbar({
                    open: true,
                    message: 'Data pasien berhasil dihapus.',
                    severity: 'success',
                });
            })
            .catch(err => {
                console.error('Delete failed:', err);
                setSnackbar({
                    open: true,
                    message: 'Data pasien gagal dihapus.',
                    severity: 'error',
                });
            });
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient); // Set the patient data to edit
        setOpenEditForm(true); // Open the edit form dialog
    };

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
    };

    const columns = [
        ...columnsBase,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleSelect(params.row)}
                    >
                        <CheckCircleOutlineIcon />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.no_ktp)}
                    >
                        Hapus
                    </Button>
                </>
            )
        }
    ];

    return (
        <Paper elevation={5}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.no_ktp}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <FormEditDataPatient
                open={openEditForm}
                patientData={selectedPatient}
                onClose={handleCloseEditForm}
                onUpdate={(updatedData) => {
                    setRows(prev => prev.map(row => row.no_ktp === updatedData.no_ktp ? updatedData : row));
                }}
            />
        </Paper>
    );
}
