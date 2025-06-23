import React, { useState } from 'react';
import TableIGD_Ranap from './TableIGD_Ranap';
import TableIRJ_Ranap from './TableRajal_Ranap';
import { BackButton } from '../../components/Buttons';
import Button from '@mui/material/Button';
import ModalUpdateRajal from './forms/FormUpdateRajal';
import dayjs from 'dayjs';
import ModalUpdateIGD from './forms/FormUpdateIGD';
import TableRanap from './TableRanap';
import { SnackbarProvider } from 'notistack';
import ModalUpdateRanap from './forms/FormUpdateRanap';

const TerimaPasien2 = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    
    const [openEditRanap, setOpenEditRanap] = useState(false);
    const handleCloseEditRanap = () => {
        setOpenEditRanap(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };

    const [form, setForm] = useState({
        id: '',
        nama_lengkap: '',
        jenis_kelamin: '',
        no_ktp: '',
        tgl_lahir: null,
        status_pernikahan: '',
        pekerjaan: '',
        no_telp: '',
        alamat: '',
        tgl_daftar: null,
        payments: '',
        no_kartu: '',
        poli: '',
        dokter: '',
        jenis_rujukan: '',
        no_rujukan: '',
        tgl_rujukan: null,
        faskes: '',
        no_wa: '',
        telp_wali: '',
        alasan: '',
        status: '',
    });

    const handleSelectPasienRanap = (row) => {
        setForm({
            id: row.id,
            nama_lengkap: row.nama_lengkap || '',
            jenis_kelamin: row.jenis_kelamin || '',
            no_ktp: row.no_ktp || '',
            tgl_lahir: row.tgl_lahir ? dayjs(row.tgl_lahir) : null,
            status_pernikahan: row.status_pernikahan || '',
            pekerjaan: row.pekerjaan || '',
            no_telp: row.no_telp || '',
            alamat: row.alamat || '',
            tgl_daftar: row.tgl_daftar ? dayjs(row.tgl_daftar) : null,
            payments: row.payments || '',
            no_kartu: row.no_kartu || '',
            poli: row.poli || '',
            dokter: row.dokter || '',
            jenis_rujukan: row.jenis_rujukan || '',
            no_rujukan: row.no_rujukan || '',
            tgl_rujukan: row.tgl_rujukan ? dayjs(row.tgl_rujukan) : null,
            faskes: row.faskes || '',
            no_wa: row.no_telp || '',
            nama_wali: row.nama_wali || '',
            telp_wali: row.telp_wali || '',
            alasan: row.alasan || '',
            status: row.status || '',
        });
        setOpenEditRanap(true); // Buka ModalRajal2
    };

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mt-5">
                <h3 className="text-2xl font-semibold">Terima Pasien</h3>
            </div>

            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableRanap handleSelect={handleSelectPasienRanap} refreshTrigger={refreshTrigger} />
                <ModalUpdateRanap
                    open={openEditRanap}
                    handleCloseEditRanap={handleCloseEditRanap}
                    form={form}
                    setForm={setForm}
                    handleOpenNested={() => setOpenPasienLama(true)}
                    setRefreshTrigger={setRefreshTrigger}
                />
            </SnackbarProvider>
        </div>
    );
};

export default TerimaPasien2;
