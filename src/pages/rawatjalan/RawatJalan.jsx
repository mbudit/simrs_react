import React, { useState } from 'react';
import { BackButton, ButtonDaftar } from '../../components/Buttons';
import TableIRJ2 from './TablesRajal';
import ModalRajal2 from './forms/DaftarRawatJalan2';
import ModalPasienLama from './forms/PasienLama';

const RawatJalan = () => {
    const [open, setOpen] = useState(false);
    const [openPasienLama, setOpenPasienLama] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        gender: '',
        nik: '',
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
        no_rujukan: '',
        rujukan: '',
        tgl_rujukan: null,
        faskes: '',
        pelayanan: '',
        no_wa: '',
        telp_wali: '',
        alasan: '',
    });

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Jalan</h3>
                <ButtonDaftar onClick={handleOpen} />
            </div>
            <TableIRJ2 />
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
            />
        </div>
    );
};

export default RawatJalan;
