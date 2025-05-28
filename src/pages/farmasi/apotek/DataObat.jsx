import React from 'react';
import { useState } from 'react';
import { BackButton, ButtonDaftar } from '../../../components/Buttons';
import TableObat from './TableObat';
import ModalTambahObat from './forms/FormTambahObat';
import { SnackbarProvider } from 'notistack';

const DataObat = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    });

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Obat</h3>
                <ButtonDaftar onClick={handleOpen} />
            </div>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableObat />
                <ModalTambahObat 
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                />
            </SnackbarProvider>
        </div>
    );
}

export default DataObat;
