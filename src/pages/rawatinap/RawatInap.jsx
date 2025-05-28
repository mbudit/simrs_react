import React from 'react';
import { useState } from 'react';
import TableRanap from './TableRanap';
import { BackButton, ButtonDaftar } from '../../components/Buttons';
import ModalDaftarRanap from './forms/DaftarPasienRanap';
import ModalPasienLama2 from '../pasien_lama/ModalPasienLama';
import dayjs from 'dayjs';
import ModalEditRanap from './forms/FormEditRanap';
import { SnackbarProvider } from 'notistack';

const RawatInap = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openPasienLama, setOpenPasienLama] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleCloseEdit = () => {
        setOpenEdit(false);
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

    const handleSelect = (row) => {
        setForm({
            nama_lengkap: row.nama_lengkap || '',
            jenis_kelamin: row.jenis_kelamin || '',
            no_ktp: row.no_ktp || '',
            tgl_lahir: row.tanggal_lahir ? dayjs(row.tanggal_lahir) : null,
            status_pernikahan: row.status || '',
            pekerjaan: row.pekerjaan || '',
            no_telp: row.no_telp || '',
            alamat: row.alamat || '',
            tgl_daftar: null,
            payments: row.asuransi || '',
            no_kartu: row.no_asuransi || '',
            poli: '',
            dokter: '',
            jenis_rujukan: '',
            no_rujukan: '',
            tgl_rujukan: null,
            faskes: '',
            no_wa: row.no_telp || '',
            nama_wali: row.nama_orangtua_wali || '',
            telp_wali: row.no_telp_wali || '',
            alasan: '',
            status: '',
        });
        setOpen(true); // buka ModalRajal2
        setOpenPasienLama(false);
    };

    const handleSelectPasien = (row) => {
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
        setOpenEdit(true); // Buka ModalRajal2
        /* setOpenPasienLama(false); */ // Menutup modal lain jika ada
    };
    
    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Inap</h3>
                <ButtonDaftar onClick={handleOpen} />
            </div>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableRanap handleSelect={handleSelectPasien} refreshTrigger={refreshTrigger} />
                <ModalDaftarRanap
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    handleOpenNested={() => setOpenPasienLama(true)}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalEditRanap
                    open={openEdit}
                    handleCloseEdit={handleCloseEdit}
                    form={form}
                    setForm={setForm}
                    handleOpenNested={() => setOpenPasienLama(true)}
                    setRefreshTrigger={setRefreshTrigger}
                />
            </SnackbarProvider>
            <ModalPasienLama2
                open={openPasienLama}
                handleClose={() => setOpenPasienLama(false)}
                setForm={setForm}
                handleOpen={handleOpen} // <-- pastikan ini ada
                handleSelect={handleSelect}
            />
        </div>
    );
}

export default RawatInap;
