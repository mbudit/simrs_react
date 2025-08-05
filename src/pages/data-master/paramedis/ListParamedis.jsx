import React from 'react';
import { useState } from 'react';
import { BackButton, ButtonDaftar, ButtonTambahLokasi, ButtonTambahParamedis, ButtonTambahPelayanan } from '../../../components/Buttons';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { SnackbarProvider } from 'notistack';
import ModalTambahParamedis from './forms/TambahParamedis';
import TableParamedis from './TableParamedis';
import ModalEditParamedis from './forms/EditParamedis';


const ListParamedis = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [form, setForm] = useState({
        id: '',
        nama_lengkap: '',
        nik: '',
        area: '',
        lokasi_kerja: '',
        alamat: '',
    });

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };

    const handleSelectParamedis = (row) => {
        setForm({
            id: row.id,
            nama_lengkap: row.nama_lengkap || '',
            nik: row.nik || '',
            area: row.area || '',
            lokasi_kerja: row.lokasi_kerja || '',
            alamat: row.alamat || '',
        });
        setOpenEdit(true); // Buka ModalRajal2
    };
    
    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-3 mt-5">
                <h3 className="text-2xl font-semibold">Data Paramedis</h3>
                
                <div className="flex items-center gap-2">
                    <ButtonTambahParamedis onClick={handleOpen} />
                </div>
            </div>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableParamedis handleSelect={handleSelectParamedis} refreshTrigger={refreshTrigger} />
                <ModalTambahParamedis 
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalEditParamedis 
                    open={openEdit}
                    handleCloseEdit={handleCloseEdit}
                    form={form}
                    setForm={setForm}
                    setRefreshTrigger={setRefreshTrigger}
                />
            </SnackbarProvider>
        </div>
    );
}

export default ListParamedis;
