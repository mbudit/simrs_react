import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';

const columnsBase = [
    { field: 'tgl_daftar', headerName: 'Tanggal Daftar', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'no_rm', headerName: 'No RM', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'poli', headerName: 'Poli', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'nama_lengkap', headerName: 'Nama Lengkap', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'jenis_kelamin', headerName: 'Jenis Kelamin', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'dokter', headerName: 'Dokter', headerClassName: 'super-app-theme--header', flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

const TableRanap = React.forwardRef(({ handleSelect, refreshTrigger }, ref) => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false); // State untuk Dialog
    const [deleteId, setDeleteId] = React.useState(null); // Menyimpan id untuk dihapus
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const { enqueueSnackbar } = useSnackbar(); // Pakai notistack

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/pasien_ranap`)
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
            getFilteredRows: () => getFilteredRows()
        }));
    
    const getFilteredRows = () => {
        return rows.filter((row) => {
            const rowDate = dayjs(row.tgl_daftar);
            const isAfterStart = startDate ? rowDate.isAfter(dayjs(startDate).subtract(1, 'day')) : true;
            const isBeforeEnd = endDate ? rowDate.isBefore(dayjs(endDate).add(1, 'day')) : true;
            return isAfterStart && isBeforeEnd;
        });
    };

    const handleOpenDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true); // Buka dialog konfirmasi
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleDelete = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/pasien_ranap/${deleteId}`)
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
                            color="success"
                            size="small"
                            onClick={() => handleSelect(params.row)}
                            startIcon={<CheckIcon />} // Tambahkan ikon di sini
                        >
                            Confirm
                        </Button>
                    </div>
                </>
            )
        }
    ];

    return (
        <>
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 1,
                    mt: 2,
                    p: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <TextField
                    label="Tanggal Awal"
                    type="date"
                    size="small"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="filled"
                    fullWidth
                />
                <TextField
                    label="Tanggal Akhir"
                    type="date"
                    size="small"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="filled"
                    fullWidth
                />
                {(startDate || endDate) && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            setStartDate('');
                            setEndDate('');
                        }}
                    >
                        Reset
                    </Button>
                )}
            </Box>
        
            <Paper sx={{ 
                    height: '100%', 
                    width: '100%',
            }}>
                <DataGrid
                    rows={getFilteredRows()}
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                <DialogContent>
                    Apakah Anda yakin ingin menghapus data ini?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Tidak
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Ya, Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default TableRanap;