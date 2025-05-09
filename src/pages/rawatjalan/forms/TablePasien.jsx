import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const TablePasien2 = ({ setForm, handleOpen, handleClose }) => {
    const [selectionModel, setSelectionModel] = React.useState([]);

    // Handle change of row selection
    const handleSelectionChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    };

    const handleButtonClick = (row) => {
        console.log('Button clicked', row);
        setForm({
            name: row.nama_pasien,
            email: '',
            gender: row.gender || '',
            nik: row.nik || '',
            tgl_lahir: row.tgl_lahir ? dayjs(row.tgl_lahir) : null,
            status_pernikahan: row.status_pernikahan || '',
            pekerjaan: row.pekerjaan || '',
            no_telp: row.no_telp || '',
            alamat: row.alamat || '',
            tgl_daftar: row.tgl_daftar || null,
            payment: row.payment || '',
            no_kartu: row.nomor_asuransi || '',
            poli: row.poli || '',
            dokter: row.dokter || '',
            no_rujukan: row.no_rujukan || '',
            rujukan: row.rujukan || '',
            tgl_rujukan: row.tgl_rujukan || null,
            faskes: row.faskes || '',
            pelayanan: row.pelayanan || '',
            no_wa: row.no_wa || '',
            nama_wali: row.nama_penanggung_jawab || '',
            telp_wali: row.no_telp_penanggung_jawab || '',
            alasan: row.alasan || '',
        });
        handleOpen();   // buka ModalRajal2
        handleClose();  // tutup ModalPasienLama
    };

    const columns = [
        {
        field: 'action',
        headerName: 'Action',
        headerClassName: 'super-app-theme--header',
        width: 120,
        renderCell: (params) => (
            <Button
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick(params.row)}
            sx={{ marginRight: 1 }}
            >
            Action
            </Button>
        ),
        },
        { field: 'no_rm', headerName: 'No. Rekam Medis', flex: 1 },
        { field: 'nama_pasien', headerName: 'Nama Pasien', flex: 1 },
        { field: 'umur', headerName: 'Umur', type: 'number', width: 70 },
        { field: 'tanggal_daftar', headerName: 'Tanggal Daftar', width: 150 },
        { field: 'nama_asuransi', headerName: 'Nama Asuransi', flex: 1 },
        { field: 'nomor_asuransi', headerName: 'Nomor Asuransi', flex: 1 },
        { field: 'no_telp', headerName: 'No. Telp', width: 150 },
        { field: 'nama_penanggung_jawab', headerName: 'Nama Penanggung Jawab', flex: 1 },
        { field: 'no_telp_penanggung_jawab', headerName: 'No. Telp Penanggung Jawab', width: 180 },
    ];

    const rows = [
        {
            no_rm: '37985196',
            nama_pasien: 'Sabrina Wahyudin',
            umur: 66,
            tanggal_daftar: '07-09-2024',
            nama_asuransi: 'BPJS',
            nomor_asuransi: 'BPJS-982',
            no_telp: '+62 (010) 287 3916',
            nama_penanggung_jawab: 'Hj. Cinthia Andriani, M.Ak',
            no_telp_penanggung_jawab: '(0476) 417 2454',
            nik: '123456789',
            tgl_lahir: '07-09-2000',
            gender: 'perempuan',
            status_pernikahan: 'menikah',
            pekerjaan: 'PNS',
            alamat: 'Jln. In Aja Dulu No.99',
        },
        {
            no_rm: '379851967',
            nama_pasien: 'Wahyudin',
            umur: 66,
            tanggal_daftar: '07-09-2024',
            nama_asuransi: 'BPJS',
            nomor_asuransi: 'BPJS-982',
            no_telp: '+62 (010) 287 3916',
            nama_penanggung_jawab: 'Hj. Cinthia Andriani, M.Ak',
            no_telp_penanggung_jawab: '(0476) 417 2454',
        },
        // Tambahkan data lain...
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper elevation={5}>
        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.no_rm}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            onSelectionModelChange={handleSelectionChange} // menangani perubahan seleksi
            selectionModel={selectionModel} // menyetelnya secara manual
        />
        </Paper>
    );
};

export default TablePasien2;
