import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'no_rm', headerName: 'No. Rekam Medis', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'nama_pasien', headerName: 'Nama Pasien', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'umur', headerName: 'Umur', headerClassName: 'super-app-theme--header', type: 'number', width: 70, align: 'left', headerAlign: 'left' },
    { field: 'tanggal_daftar', headerName: 'Tanggal Daftar', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'nama_asuransi', headerName: 'Nama Asuransi', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'nomor_asuransi', headerName: 'Nomor Asuransi', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'no_telp', headerName: 'No. Telp', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'nama_penanggung_jawab', headerName: 'Nama Penanggung Jawab', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'no_telp_penanggung_jawab', headerName: 'No. Telp Penanggung Jawab', headerClassName: 'super-app-theme--header', width: 180 },
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
    },
    {
        no_rm: '95185989',
        nama_pasien: 'Patricia Mangunsong',
        umur: 1,
        tanggal_daftar: '11-01-2025',
        nama_asuransi: 'Mandiri',
        nomor_asuransi: 'Mandiri-798',
        no_telp: '(089) 834 0151',
        nama_penanggung_jawab: 'Ir. Mahfud Nababan',
        no_telp_penanggung_jawab: '+62 (055) 695 7189',
    },
    {
        no_rm: '48367944',
        nama_pasien: 'Estiawan Hidayat',
        umur: 100,
        tanggal_daftar: '14-03-2025',
        nama_asuransi: 'Pribadi',
        nomor_asuransi: 'Pribadi-279',
        no_telp: '+62-082-655-4741',
        nama_penanggung_jawab: 'Hj. Usyi Nasyiah',
        no_telp_penanggung_jawab: '0804425882',
    },
    {
        no_rm: '97159849',
        nama_pasien: 'Kasiyah Riyanti',
        umur: 57,
        tanggal_daftar: '24-03-2025',
        nama_asuransi: 'BPJS',
        nomor_asuransi: 'BPJS-386',
        no_telp: '+62 (769) 250 0576',
        nama_penanggung_jawab: 'Puti Tiara Rajasa, M.Pd',
        no_telp_penanggung_jawab: '+62-027-204-9578',
    },
    {
        no_rm: '32736654',
        nama_pasien: 'Ir. Nyana Mulyani, S.Ked',
        umur: 83,
        tanggal_daftar: '02-04-2025',
        nama_asuransi: 'Mandiri',
        nomor_asuransi: 'Mandiri-665',
        no_telp: '(0951) 442 2938',
        nama_penanggung_jawab: 'Citra Mahendra',
        no_telp_penanggung_jawab: '+62 (024) 837-6898',
    },
    {
        no_rm: '66760186',
        nama_pasien: 'Hj. Anita Prasasta, S.I.Kom',
        umur: 1,
        tanggal_daftar: '14-12-2024',
        nama_asuransi: 'Pribadi',
        nomor_asuransi: 'Pribadi-618',
        no_telp: '+62-093-570-6360',
        nama_penanggung_jawab: 'Puti Gina Simbolon, M.TI.',
        no_telp_penanggung_jawab: '+62-0821-520-5572',
    },
    {
        no_rm: '93093627',
        nama_pasien: 'Hj. Yani Mangunsong',
        umur: 38,
        tanggal_daftar: '22-11-2024',
        nama_asuransi: 'BPJS',
        nomor_asuransi: 'BPJS-419',
        no_telp: '081 632 5651',
        nama_penanggung_jawab: 'Sari Haryanti',
        no_telp_penanggung_jawab: '080 661 7918',
    },
    {
        no_rm: '46987019',
        nama_pasien: 'Yunita Wibowo',
        umur: 53,
        tanggal_daftar: '04-03-2025',
        nama_asuransi: 'Mandiri',
        nomor_asuransi: 'Mandiri-570',
        no_telp: '+62-0483-887-3831',
        nama_penanggung_jawab: 'Reksa Wulandari',
        no_telp_penanggung_jawab: '084 576 7854',
    },
    {
        no_rm: '49674827',
        nama_pasien: 'Eka Agustina',
        umur: 3,
        tanggal_daftar: '08-02-2025',
        nama_asuransi: 'Pribadi',
        nomor_asuransi: 'Pribadi-780',
        no_telp: '+62 (55) 741-7575',
        nama_penanggung_jawab: 'Tgk. Hana Prasasta',
        no_telp_penanggung_jawab: '+62-0706-343-2009',
    },
    {
        no_rm: '60192671',
        nama_pasien: 'Juli Palastri, M.Farm',
        umur: 98,
        tanggal_daftar: '30-07-2024',
        nama_asuransi: 'BPJS',
        nomor_asuransi: 'BPJS-212',
        no_telp: '+62 (095) 114-0748',
        nama_penanggung_jawab: 'Elma Rahmawati',
        no_telp_penanggung_jawab: '+62 (0891) 583-4118',
    },
];



const paginationModel = { page: 0, pageSize: 5 };

export default function TablePasien() {
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