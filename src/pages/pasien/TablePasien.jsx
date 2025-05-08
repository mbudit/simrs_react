import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
    { field: 'no_ktp', headerName: 'No. KTP', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'nama_lengkap', headerName: 'Nama Pasien', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'umur', headerName: 'Umur', headerClassName: 'super-app-theme--header', type: 'number', width: 70, align: 'left', headerAlign: 'left' },
    { field: 'tanggal_lahir', headerName: 'Tanggal Lahir', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'asuransi', headerName: 'Nama Asuransi', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'no_asuransi', headerName: 'Nomor Asuransi', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'no_telp', headerName: 'No. Telp', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'nama_orangtua_wali', headerName: 'Nama Penanggung Jawab', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'no_telp_wali', headerName: 'No. Telp Penanggung Jawab', headerClassName: 'super-app-theme--header', width: 180 },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function TablePasien() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients')
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    return (
        <Paper elevation={5} sx={{
            height: '100%',
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: '#1975d1',
                fontSize: '16px',
            },
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1e2939',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#333',
            },
            '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0',
            },
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.no_ktp}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
