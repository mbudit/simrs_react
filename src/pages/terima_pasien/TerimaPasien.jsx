import React, { useState } from 'react';
import TableIGD_Ranap from './TableIGD_Ranap';
import TableIRJ_Ranap from './TableRajal_Ranap';
import { BackButton } from '../../components/Buttons';
import Button from '@mui/material/Button';
import ModalUpdateRajal from './forms/FormUpdateRajal';
import dayjs from 'dayjs';
import ModalUpdateIGD from './forms/FormUpdateIGD';

const TerimaPasien = () => {
    const [activeTab, setActiveTab] = useState('igd');

    const [openEditRajal, setOpenEditRajal] = useState(false);
    const handleCloseEditRajal = () => {
        setOpenEditRajal(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };

    const [openEditIGD, setOpenEditIGD] = useState(false);
    const handleCloseEditIGD = () => {
        setOpenEditIGD(false);
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

    const handleSelectPasienRajal = (row) => {
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
        setOpenEditRajal(true); // Buka ModalRajal2
        /* setOpenPasienLama(false); */ // Menutup modal lain jika ada
    };

    const handleSelectPasienIGD = (row) => {
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
        setOpenEditIGD(true); // Buka ModalRajal2
        /* setOpenPasienLama(false); */ // Menutup modal lain jika ada
    };

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Terima Pasien</h3>
            </div>

            <div className="flex mb-4">
                <Button
                    variant={activeTab === 'igd' ? 'contained' : 'outlined'}
                    color={activeTab === 'igd' ? 'primary' : 'inherit'}
                    style={{
                        backgroundColor: activeTab === 'igd' ? undefined : '#ccc',
                        border: activeTab === 'igd' ? undefined : 'none', // hilangkan border kalau gak aktif
                        marginRight: '10px',
                    }}
                    onClick={() => setActiveTab('igd')}
                >
                    IGD
                </Button>
                <Button
                    variant={activeTab === 'rajal' ? 'contained' : 'outlined'}
                    color={activeTab === 'rajal' ? 'primary' : 'inherit'}
                    style={{
                        backgroundColor: activeTab === 'rajal' ? undefined : '#ccc',
                        border: activeTab === 'rajal' ? undefined : 'none', // hilangkan border kalau gak aktif
                    }}
                    onClick={() => setActiveTab('rajal')}
                >
                    Rawat Jalan
                </Button>
            </div>

            {activeTab === 'igd' && <TableIGD_Ranap handleSelect={handleSelectPasienIGD} />}
            {activeTab === 'rajal' && <TableIRJ_Ranap handleSelect={handleSelectPasienRajal} />}

            <ModalUpdateRajal
                open={openEditRajal}
                handleCloseEditRajal={handleCloseEditRajal}
                form={form}
                setForm={setForm}
                handleOpenNested={() => setOpenPasienLama(true)}
            />
            <ModalUpdateIGD
                open={openEditIGD}
                handleCloseEditIGD={handleCloseEditIGD}
                form={form}
                setForm={setForm}
                handleOpenNested={() => setOpenPasienLama(true)}
            />
        </div>
    );
};

export default TerimaPasien;
