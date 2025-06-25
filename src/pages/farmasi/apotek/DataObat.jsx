import React from 'react';
import { useState, useRef } from 'react';
import { BackButton, ButtonDaftar, ButtonTambahObat } from '../../../components/Buttons';
import TableObat from './TableObat';
import ModalTambahObat from './forms/FormTambahObat';
import { SnackbarProvider } from 'notistack';
import ModalEditObat from './forms/FormEditObat';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';

const DataObat = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setForm({}); // opsional, kalau ingin reset form juga
    };

    const [form, setForm] = useState({
        id: '',
        nama_obat: '',
        produksi: '',
        isi_kemasan: '',
        satuan: '',
        pabrik: '',
        on_label: '',
        off_label: '',
        nama_dagang: '',
        nama_original: '',
        margin: "1.25",
        harga_beli: '',
        harga_pajak: '',
        harga_jual: '',
        max_stock: '',
        min_stock: '',
        eticket: '',
        kategori: '',
        jenis_obat: '',
        komposisi: '',
        level_sakit: '',
        resiko: '',
        obat_terapi: '',
        obat_subterapi: '',
        sebelum_makan: '',
        ketika_makan: '',
        setelah_makan: '',
        efek_hati: '',
        keterangan: '',
        sumber_barang: '',
    });

    const handleSelectObat = (row) => {
        setForm({
            id: row.id,
            nama_obat: row.nama_obat || '',
            produksi: row.produksi || '',
            isi_kemasan: row.isi_kemasan || '',
            satuan: row.satuan || '',
            pabrik: row.pabrik || '',
            on_label: row.on_label || '',
            off_label: row.off_label || '',
            nama_dagang: row.nama_dagang || '',
            nama_original: row.nama_original || '',
            margin: '1.25',
            harga_beli: row.harga_beli || '',
            harga_pajak: row.harga_pajak || '',
            harga_jual: row.harga_jual || '',
            max_stock: row.max_stock || '',
            min_stock: row.min_stock || '',
            eticket: row.eticket || '',
            kategori: row.kategori || '',
            jenis_obat: row.jenis_obat || '',
            komposisi: row.komposisi || '',
            level_sakit: row.level_sakit || '',
            resiko: row.resiko || '',
            obat_terapi: row.obat_terapi || '',
            obat_subterapi: row.obat_subterapi || '',
            sebelum_makan: row.sebelum_makan || '',
            ketika_makan: row.ketika_makan || '',
            setelah_makan: row.setelah_makan || '',
            efek_hati: row.efek_hati || '',
            keterangan: row.keterangan || '',
            sumber_barang: row.sumber_barang || ''
        });
        setOpenEdit(true); // Buka ModalRajal2
    };

    const tableRef = useRef();
            
    const handleExportPDF = () => {
        const rows = tableRef.current?.getRows() || [];
    
        const doc = new jsPDF({ orientation: 'landscape' });
        const pageWidth = doc.internal.pageSize.getWidth();
    
        // Fungsi bantu untuk center teks
        const centerText = (text, y, fontSize) => {
            doc.setFontSize(fontSize);
            const textWidth = doc.getTextWidth(text);
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        };
    
        // Header tengah
        centerText("Data Obat", 15, 16);
        centerText("Rumah Sakit A", 23, 12);
        centerText("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor", 30, 10);
    
        const tableColumn = [
            "Kode Obat", "Nama Obat", "Jenis Obat", "Kategori Obat"
        ];
    
        const tableRows = rows.map(row => [
            row.code,
            row.nama_obat,
            row.jenis_obat,
            row.kategori,
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
    
        doc.save("data_obat.pdf");
    };
    

    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Obat</h3>
                
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
                <TableObat handleSelect={handleSelectObat} refreshTrigger={refreshTrigger} ref={tableRef} />
                <ModalTambahObat 
                    open={open}
                    handleClose={handleClose}
                    form={form}
                    setForm={setForm}
                    setRefreshTrigger={setRefreshTrigger}
                />
                <ModalEditObat 
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

export default DataObat;
