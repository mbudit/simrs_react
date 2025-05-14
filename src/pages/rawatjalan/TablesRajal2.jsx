import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
    { field: 'tgl_daftar', headerName: 'Tanggal Daftar', headerClassName: 'super-app-theme--header', flex: 1 },
    /* { field: 'status', headerName: 'Status', headerClassName: 'super-app-theme--header', width: 130 }, */
    { field: 'poli', headerName: 'Poli', headerClassName: 'super-app-theme--header', width: 130 },
    /* { field: 'no_rm', headerName: 'No RM', headerClassName: 'super-app-theme--header', flex: 1 }, */
    { field: 'nama_lengkap', headerName: 'Nama Lengkap', headerClassName: 'super-app-theme--header', flex: 1 },   
    { field: 'jenis_kelamin', headerName: 'Jenis Kelamin', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'dokter', headerName: 'Dokter', headerClassName: 'super-app-theme--header', flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableIRJ3() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get("http://localhost:5000/api/pasien_rajal")
            .then((res) => {
                const dataWithId = res.data.map((row, index) => ({
                    id: index,
                    ...row,
                    tgl_daftar: row.tgl_daftar ? row.tgl_daftar.split('T')[0] : '', // ambil hanya tanggal
                }));
                setRows(dataWithId);
            })
            .catch((err) => {
                console.error("Gagal mengambil data:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                getRowId={(row) => row.no_rm || row.id}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                loading={loading}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
