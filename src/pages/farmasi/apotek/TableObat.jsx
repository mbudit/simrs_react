import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columnsBase = [
    { field: 'code', headerName: 'Kode Obat', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'nama_obat', headerName: 'Nama Obat', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'jenis_obat', headerName: 'Jenis Obat', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'kategori', headerName: 'Kategori Obat', headerClassName: 'super-app-theme--header', flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

const TableObat = React.forwardRef(({ handleSelect, refreshTrigger }, ref) => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false); // State untuk Dialog
    const [deleteId, setDeleteId] = React.useState(null); // Menyimpan id untuk dihapus
    const { enqueueSnackbar } = useSnackbar(); // Pakai notistack

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getObat`)
            .then((res) => {
                const dataWithId = res.data.map((row, index) => ({
                    id: index,
                    ...row,
                    tgl_daftar: row.tgl_daftar ? row.tgl_daftar.split('T')[0] : '',
                }));
                setRows(dataWithId);
            })
            .catch((err) => {
                console.error("Gagal mengambil data:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refreshTrigger]);

    React.useImperativeHandle(ref, () => ({
        getRows: () => rows,
        
    }));
            
        

    const handleOpenDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true); // Buka dialog konfirmasi
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleDelete = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/deleteObat/${deleteId}`)
            .then(() => {
                setRows(prev => prev.filter(row => row.id !== deleteId));
                enqueueSnackbar("Data berhasil dihapus!", { variant: 'success', autoHideDuration: 3000 });
                handleCloseDialog(); // Tutup dialog setelah penghapusan
            })
            .catch(err => {
                console.error("Gagal menghapus data:", err);
                enqueueSnackbar("Gagal menghapus data!", { variant: 'error', autoHideDuration: 3000 });
                handleCloseDialog(); // Tutup dialog jika gagal
            });
    };

    const columns = [
        ...columnsBase,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            sortable: false,
            filterable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%'  }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleOpenDialog(params.row.id)} // Buka dialog konfirmasi
                            startIcon={<DeleteIcon />}
                        >
                            Hapus
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSelect(params.row)}
                            startIcon={<EditIcon />} // Tambahkan ikon di sini
                        >
                            Edit
                        </Button>
                    </div>
                </>
            )
        }
    ];
    
    return (
        <>
            <Paper sx={{ 
                    height: '100%', 
                    width: '100%',
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    loading={loading}
                    sx={{ 
                            border: 0,
                            '& .super-app-theme--header': {
                                backgroundColor: '#1e2838',
                                fontSize: '16px',
                                fontWeight: 'bold !important',
                            }, 
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1e2838',
                                fontWeight: 'bold !important', // Mengubah gaya font header
                                fontSize: '16px', // Ukuran font header lebih besar
                                color: '#fff', // Warna font header
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold !important', // ← paling penting: ini selector internal teks header
                            },
                            '& .MuiDataGrid-sortIcon': {
                                color: '#ffffff !important', // ← Ubah warna ikon sorting di sini
                            },
                            '& .MuiDataGrid-menuIconButton': {
                                color: '#ffffff',  // ganti dengan warna yang kamu mau, misal pink cerah
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #e0e0e0', // Tambahkan border bawah pada data
                                borderRight: '1px solid #e0e0e0',
                            },
                        }}
                />
            </Paper>

            {/* Dialog Konfirmasi */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                    <WarningAmberIcon color="warning" />
                    <Typography variant="h6" fontWeight="bold">
                        Konfirmasi Penghapusan
                    </Typography>
                    </Box>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography variant="body1" color="text.secondary">
                    Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Tidak
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Ya, Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default TableObat;