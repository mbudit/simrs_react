import React from 'react';
import { useState } from 'react';
import { BackButton, ButtonDaftar, ButtonTambahPelayanan } from '../../../components/Buttons';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { SnackbarProvider } from 'notistack';
import ModalTambahPelayananIGD from './forms/TambahTarifPelayananIGD';
import TableTarifIGD from './TableTarifIGD';
import ModalEditPelayananIGD from './forms/EditTarifPelayananIGD';

const TarifPelayananIgd = () => {
    const [open, setOpen] = useState(false);
        
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [form, setForm] = useState({
        id: '',
        jenis_layanan: '',
        nama_tindakan: '',
        kelas_perawatan: '',
        kategori: '',
        tarif: '',
        jasa_rs: '',
        jasa_pelayanan: '',
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
            jenis_layanan: row.jenis_layanan || '',
            nama_tindakan: row.nama_tindakan || '',
            kelas_perawatan: row.kelas_perawatan || '',
            kategori: row.kategori || '',
            tarif: row.tarif || '',
            jasa_rs: row.jasa_rs || '',
            jasa_pelayanan: row.jasa_pelayanan || '',
        });
        setOpenEdit(true); // Buka ModalRajal2
    };
    
    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-3 mt-5">
                <h3 className="text-2xl font-semibold">Data Tarif Pelayanan IGD</h3>
                
                <div className="flex items-center gap-2">
                    <ButtonTambahPelayanan onClick={handleOpen} />
                </div>
            </div>

            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableTarifIGD handleSelect={handleSelectLayanan} refreshTrigger={refreshTrigger} />
                <ModalTambahPelayananIGD 
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalEditPelayananIGD 
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

export default TarifPelayananIgd;
