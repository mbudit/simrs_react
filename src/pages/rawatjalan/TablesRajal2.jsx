import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import { ButtonEditData, ButtonHapusData, ButtonKonfirmasiData } from '../../components/Buttons';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';

const columnsBase = [
    { field: 'tgl_daftar', headerName: 'Tanggal Daftar', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'no_rm', headerName: 'No RM', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'poli', headerName: 'Poli', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'nama_lengkap', headerName: 'Nama Lengkap', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'jenis_kelamin', headerName: 'Jenis Kelamin', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'dokter', headerName: 'Dokter', headerClassName: 'super-app-theme--header', flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

const TableIRJ3 = React.forwardRef(({ handleSelect, handleSelectConfirm, refreshTrigger }, ref) => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/pasien_rajal`)
            .then((res) => {
                const dataWithId = res.data.map((row, index) => ({
                    id: index,
                    ...row,
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
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleDelete = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/api/pasien_rajal/${deleteId}`)
            .then(() => {
                setRows(prev => prev.filter(row => row.id !== deleteId));
                enqueueSnackbar("Data berhasil dihapus!", { variant: 'success', autoHideDuration: 3000 });
                handleCloseDialog();
            })
            .catch(err => {
                console.error("Gagal menghapus data:", err);
                enqueueSnackbar("Gagal menghapus data!", { variant: 'error', autoHideDuration: 3000 });
                handleCloseDialog();
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
                    <ButtonHapusData onClick={() => handleOpenDialog(params.row.id)} />
                    <ButtonEditData onClick={() => handleSelect(params.row)} />
                    <ButtonKonfirmasiData onClick={() => handleSelectConfirm(params.row)} />
                </div>
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
                    mb: 2,
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


            <Paper sx={{ height: '100%', width: '100%' }}>
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
                            backgroundColor: '#000000',
                            fontSize: '16px',
                            fontWeight: 'bold !important',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#000000',
                            fontWeight: 'bold !important',
                            fontSize: '16px',
                            color: '#fff',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold !important',
                        },
                        '& .MuiDataGrid-sortIcon': {
                            color: '#ffffff !important',
                        },
                        '& .MuiDataGrid-menuIconButton': {
                            color: '#ffffff',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #e0e0e0',
                            borderRight: '1px solid #e0e0e0',
                        },
                    }}
                />
            </Paper>

            <ConfirmDeleteDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onDelete={handleDelete}
            />
        </>
    );
});

export default TableIRJ3;
