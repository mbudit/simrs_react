import React from 'react';
import { useState } from 'react';
import { BackButton, ButtonDaftar, ButtonTambahLokasi, ButtonTambahPelayanan } from '../../../components/Buttons';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { SnackbarProvider } from 'notistack';
import TableLokasi from './TableLokasi';
import ModalTambahLokasi from './forms/TambahLokasi';
import ModalEditLokasi from './forms/EditLokasi';
/* import ModalTambahPelayananRanap from './forms/TambahTarifPelayananRanap';
import TableTarifIRI from './TableTarifRanap';
import ModalEditPelayananRanap from './forms/EditTarifPelayananRanap'; */

const ListLokasi = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [form, setForm] = useState({
        id: '',
        kode_lokasi: '',
        nama_lokasi: '',
        kode_bpjs: '',
        id_location: '',
        latitude: '',
        longitude: '',
    });

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };

    const handleSelectLayanan = (row) => {
        setForm({
            id: row.id,
            kode_lokasi: row.kode_lokasi || '',
            nama_lokasi: row.nama_lokasi || '',
            kode_bpjs: row.kode_bpjs || '',
            id_location: row.id_location || '',
            latitude: row.latitude || '',
            longitude: row.longitude || '',
        });
        setOpenEdit(true); // Buka ModalRajal2
    };
    
    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-3 mt-5">
                <h3 className="text-2xl font-semibold">Data Lokasi</h3>
                
                <div className="flex items-center gap-2">
                    <ButtonTambahLokasi onClick={handleOpen} />
                </div>
            </div>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableLokasi handleSelect={handleSelectLayanan} refreshTrigger={refreshTrigger} />
                <ModalTambahLokasi 
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalEditLokasi 
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

export default ListLokasi;
