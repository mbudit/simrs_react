import React, { useState, useRef } from 'react';
import { BackButton, ButtonDaftar } from '../../components/Buttons';
import TableIRJ3 from './TablesRajal2';
import ModalRajal2 from './forms/DaftarRawatJalan2';
import dayjs from 'dayjs';
import { SnackbarProvider } from 'notistack';
import ModalEditRajal from './forms/FormEditRajal';
import ModalPasienLama2 from '../pasien_lama/ModalPasienLama';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import ModalUpdateRajal from './forms/FormUpdateRajal';

const RawatJalan = () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPasienLama, setOpenPasienLama] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };
    const [refreshTrigger, setRefreshTrigger] = useState(false);

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
        });
        setOpenEdit(true); // Buka ModalRajal2
        /* setOpenPasienLama(false); */ // Menutup modal lain jika ada
    };

    const [openEditRajal, setOpenEditRajal] = useState(false);
    const handleCloseEditRajal = () => {
        setOpenEditRajal(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };
    
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
    };

    const tableRef = useRef();

    const handleExportPDF = () => {
        const filteredRows = tableRef.current?.getFilteredRows?.() || [];
    
        if (filteredRows.length === 0) {
            alert('Tidak ada data yang ditampilkan untuk diexport.');
            return;
        }
    
        const doc = new jsPDF({ orientation: 'landscape' });
        const pageWidth = doc.internal.pageSize.getWidth();
    
        const centerText = (text, y, fontSize, isBold = false) => {
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            const textWidth = doc.getTextWidth(text);
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        };
    
        // Header PDF
        centerText("Data Pasien Rawat Jalan", 15, 18, true);
        centerText("Rumah Sakit A", 24, 14, true);
        centerText("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor", 30, 11);
    
        const tableColumn = [
            "Tanggal Daftar", "No RM", "Poli", "Nama Lengkap", "Jenis Kelamin", "Dokter"
        ];
    
        const tableRows = filteredRows.map(row => [
            dayjs(row.tgl_daftar).format("DD/MM/YYYY"), // Format tanggal
            row.no_rm || '-',
            row.poli || '-',
            row.nama_lengkap || '-',
            row.jenis_kelamin || '-',
            row.dokter || '-'
        ]);
    
        autoTable(doc, {
            startY: 35,
            head: [tableColumn],
            body: tableRows,
            styles: {
                fontSize: 9,
                lineWidth: 0.1, // Menambahkan garis border
                lineColor: [0, 0, 0], // Warna hitam
            },
            headStyles: {
                fillColor: [30, 40, 56],
                textColor: 255,
                lineWidth: 0.1, // Border untuk header
                lineColor: [0, 0, 0],
            },
            bodyStyles: {
                lineWidth: 0.1, // Border untuk isi tabel
                lineColor: [0, 0, 0],
            },
        });
    
        doc.save("data_pasien_rajal.pdf");
    };
    
    

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-3 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Jalan</h3>
                
                <div className="flex items-center gap-2">
                    <ButtonDaftar onClick={handleOpen} />
                    <Button
                        variant="contained"
                        onClick={handleExportPDF}
                        startIcon={<PrintIcon />}
                    >
                        Export PDF
                    </Button>
                </div>
            </div>

            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <TableIRJ3 handleSelect={handleSelectPasien} handleSelectConfirm={handleSelectPasienRajal} refreshTrigger={refreshTrigger} ref={tableRef} />
                <ModalEditRajal
                    open={openEdit}
                    handleCloseEdit={handleCloseEdit}
                    form={form}
                    setForm={setForm}
                    handleOpenNested={() => setOpenPasienLama(true)}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalRajal2
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    handleOpenNested={() => setOpenPasienLama(true)}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalUpdateRajal
                    open={openEditRajal}
                    handleCloseEditRajal={handleCloseEditRajal}
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
};

export default RawatJalan;
