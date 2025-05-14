import React, { useState } from 'react';
import { BackButton, ButtonDaftar } from '../../components/Buttons';
import TableIRJ2 from './TablesRajal';
import TableIRJ3 from './TablesRajal2';
import ModalRajal2 from './forms/DaftarRawatJalan2';
import ModalPasienLama from './forms/PasienLama';
import dayjs from 'dayjs';

const RawatJalan = () => {
    const [open, setOpen] = useState(false);
    const [openPasienLama, setOpenPasienLama] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form, setForm] = useState({
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
    });
    setOpen(true); // buka ModalRajal2
    setOpenPasienLama(false);
};

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Jalan</h3>
                <ButtonDaftar onClick={handleOpen} />
            </div>
            <TableIRJ3 />
            <ModalRajal2
                open={open}
                handleClose={handleClose}
                form={form}
                setForm={setForm}
                handleOpenNested={() => setOpenPasienLama(true)}
            />
            <ModalPasienLama
                open={openPasienLama}
                handleClose={() => setOpenPasienLama(false)}
                setForm={setForm}
                handleOpen={handleOpen} // <-- pastikan ini ada
                handleSelect={handleSelect}
            />
        </div>
    );
};

export default RawatJalan;
