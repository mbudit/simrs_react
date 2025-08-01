import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'tgl_daftar', headerName: 'Tanggal Daftar', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'status', headerName: 'Status', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'poli', headerName: 'Poli', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'no_rm', headerName: 'No RM', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'name', headerName: 'Nama Lengkap', headerClassName: 'super-app-theme--header', flex: 1 },   
    { field: 'jenis_kelamin', headerName: 'Jenis Kelamin', headerClassName: 'super-app-theme--header', width: 140 },
    {
        field: 'umur',
        headerName: 'Umur', headerClassName: 'super-app-theme--header',
        type: 'number',
        width: 70,
        align: 'left',  // Menambahkan perataan kiri
        headerAlign: 'left', // Menambahkan perataan kiri pada header
    },
    { field: 'dokter', headerName: 'Dokter', headerClassName: 'super-app-theme--header', flex: 1 },
];

const rows = [
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '12345', name: 'Pasien 1', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '21312413', name: 'Pasien 2', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '2313', name: 'Pasien 3', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '2143513513513', name: 'Pasien 4', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '3245134', name: 'Pasien 5', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '12341', name: 'Pasien 6', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '42131', name: 'Pasien 7', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '1243141', name: 'Pasien 8', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '154141', name: 'Pasien 9', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
    { tgl_daftar: '18-12-2025', status: 'Sakit', poli: 'Gigi', no_rm: '1234123', name: 'Pasien 10', jenis_kelamin: 'Laki-laki', umur: '90', dokter: 'Dr. Gadungan' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableIRJ2() {
    return (
        <Paper sx={{ 
            height: '100%', 
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: '#1975d1',
                fontSize: '16px',
            }, 
            '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1e2939',
                        fontWeight: 'bold', // Mengubah gaya font header
                        fontSize: '16px', // Ukuran font header lebih besar
                        color: '#333', // Warna font header
            },
            '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0', // Tambahkan border bawah pada data
                borderRight: '1px solid #e0e0e0',
            },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.no_rm}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                
                sx={{ 
                    border: 0,
                }}
            />
        </Paper>
    );
}