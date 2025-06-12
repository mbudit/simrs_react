import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Tooltip
} from '@mui/material';

const RMECatatanKlinisEdit = ({ open, onClose, noteId, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog

    useEffect(() => {
        if (noteId) {
            const fetchNote = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/rme/clinical-note/${noteId}`); // Correct endpoint
                    const fetchedData = response.data;
                    fetchedData.tanggal_pemeriksaan = format(new Date(fetchedData.tanggal_pemeriksaan), 'yyyy-MM-dd'); // Format date to MM-dd-yyyy
                    setFormData(fetchedData); // Set the fetched data directly to formData
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch clinical note:", error);
                    setLoading(false);
                }
            };
            fetchNote();
        }
    }, [noteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleConfirmSave = async () => {
        setConfirmOpen(false); // Close confirmation dialog
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/rme/clinical-notes/${noteId}`, formData);
            console.log("Updated note data:", formData);
            onSubmit(); // Refresh clinical notes
            onClose(); // Close the edit form
        } catch (error) {
            console.error("Failed to update clinical note:", error);
        }
    };

    const handleSave = () => {
        setConfirmOpen(true); // Open confirmation dialog
    };

    if (loading) {
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
                <DialogTitle>Loading...</DialogTitle>
                <DialogContent>Fetching clinical note data...</DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
            <DialogTitle>Edit Catatan Klinis</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-10 gap-4 pr-2">

                    {/* === Subjective === */}
                    <div className="col-span-10 text-lg font-semibold mt-6">Subjective</div>
                    <div className="col-span-10">
                        <hr className="border-t border-gray-300" />
                    </div>

                    <Tooltip title="Nomor RME pasien">
                        <TextField
                            className="col-span-2"
                            name="no_rme"
                            label="No. RME"
                            placeholder="Masukkan No. RME"
                            value={formData.no_rme || ''}
                            error={!!errors.no_rme}
                            helperText={errors.no_rme || "Diisi otomatis dari data pasien"}
                            slotProps={{
                                input: { readOnly: true }
                            }}
                        >
                        </TextField>
                    </Tooltip>

                    <Tooltip title="Tanggal pemeriksaan pasien">
                        <TextField
                            className="col-span-2"
                            name="tanggal_pemeriksaan"
                            label="Tanggal Pemeriksaan"
                            type="date" // Change type to text for formatted date
                            value={formData.tanggal_pemeriksaan || ''}
                            onChange={handleChange}
                            error={!!errors.tanggal_pemeriksaan}
                            helperText={errors.tanggal_pemeriksaan}
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Dokter">
                        <TextField
                            className="col-span-2"
                            name="dokter"
                            label="Nama Dokter Pemeriksa"
                            placeholder="Masukkan nama dokter"
                            value={formData.dokter || ''}
                            onChange={handleChange}
                            error={!!errors.dokter}
                            helperText={errors.dokter}
                        />
                    </Tooltip>

                    <Tooltip title="Keluhan utama pasien">
                        <TextField
                            className="col-span-10"
                            name="keluhan_utama"
                            label="Keluhan Utama"
                            placeholder="Masukkan keluhan utama pasien"
                            value={formData.keluhan_utama}
                            onChange={handleChange}
                            error={!!errors.keluhan_utama}
                            helperText={errors.keluhan_utama}
                        />
                    </Tooltip>

                    <Tooltip title="Riwayat penyakit yang dialami pasien saat ini">
                        <TextField
                            className="col-span-5"
                            name="riwayat_penyakit_sekarang"
                            label="Riwayat Penyakit Sekarang"
                            placeholder="Masukkan riwayat penyakit sekarang"
                            value={formData.riwayat_penyakit_sekarang}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    <Tooltip title="Riwayat penyakit yang pernah dialami pasien">
                        <TextField
                            className="col-span-5"
                            name="riwayat_penyakit_dahulu"
                            label="Riwayat Penyakit Dahulu"
                            placeholder="Masukkan riwayat penyakit dahulu"
                            value={formData.riwayat_penyakit_dahulu}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    <Tooltip title="Riwayat penyakit dalam keluarga pasien">
                        <TextField
                            className="col-span-5"
                            name="riwayat_penyakit_keluarga"
                            label="Riwayat Penyakit Keluarga"
                            placeholder="Masukkan riwayat penyakit keluarga"
                            value={formData.riwayat_penyakit_keluarga}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    <Tooltip title="Riwayat alergi pasien">
                        <TextField
                            className="col-span-5"
                            name="riwayat_alergi"
                            label="Riwayat Alergi"
                            placeholder="Masukkan riwayat alergi"
                            value={formData.riwayat_alergi}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    {/* === Objective === */}
                    <div className="col-span-10 text-lg font-semibold mt-6">Objective</div>

                    <Tooltip title="Tekanan darah pasien (contoh: 120/80 mmHg)">
                        <TextField
                            className="col-span-3"
                            name="tekanan_darah"
                            label="Tekanan Darah"
                            placeholder="Contoh: 120/80 mmHg"
                            value={formData.tekanan_darah}
                            onChange={handleChange}
                            error={!!errors.tekanan_darah}
                            helperText={errors.tekanan_darah || "Satuan: mmHg"}
                        />
                    </Tooltip>

                    <Tooltip title="Jumlah denyut nadi pasien per menit (bpm)">
                        <TextField
                            className="col-span-2"
                            name="nadi"
                            label="Nadi"
                            placeholder="Contoh: 80 bpm"
                            value={formData.nadi}
                            onChange={handleChange}
                            error={!!errors.nadi}
                            helperText={errors.nadi || "Satuan: bpm"}
                        />
                    </Tooltip>

                    <Tooltip title="Suhu tubuh pasien dalam derajat Celsius (°C)">
                        <TextField
                            className="col-span-2"
                            name="suhu"
                            label="Suhu"
                            placeholder="Contoh: 36.5 °C"
                            value={formData.suhu}
                            onChange={handleChange}
                            error={!!errors.suhu}
                            helperText={errors.suhu || "Satuan: °C"}
                        />
                    </Tooltip>

                    <Tooltip title="Frekuensi pernapasan pasien per menit">
                        <TextField
                            className="col-span-3"
                            name="pernapasan"
                            label="Pernapasan"
                            placeholder="Contoh: 16 kali/min"
                            value={formData.pernapasan}
                            onChange={handleChange}
                            helperText="Satuan: kali/min"
                        />
                    </Tooltip>

                    <Tooltip title="Hasil pemeriksaan fisik pasien">
                        <TextField
                            className="col-span-10"
                            name="pemeriksaan_fisik"
                            label="Pemeriksaan Fisik"
                            placeholder="Masukkan hasil pemeriksaan fisik"
                            multiline
                            rows={3}
                            value={formData.pemeriksaan_fisik}
                            onChange={handleChange}
                            error={!!errors.pemeriksaan_fisik}
                            helperText={errors.pemeriksaan_fisik}
                        />
                    </Tooltip>

                    {/* === Assessment === */}
                    <div className="col-span-10 text-lg font-semibold mt-6">Assessment</div>

                    <Tooltip title="Diagnosis utama pasien">
                        <TextField
                            className="col-span-6"
                            name="diagnosis_kerja"
                            label="Diagnosis Kerja"
                            placeholder="Masukkan diagnosis kerja"
                            value={formData.diagnosis_kerja}
                            onChange={handleChange}
                            error={!!errors.diagnosis_kerja}
                            helperText={errors.diagnosis_kerja}
                        />
                    </Tooltip>

                    <Tooltip title="Diagnosis alternatif pasien">
                        <TextField
                            className="col-span-4"
                            name="diagnosis_banding"
                            label="Diagnosis Banding"
                            placeholder="Masukkan diagnosis banding"
                            value={formData.diagnosis_banding}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    {/* === Plan === */}
                    <div className="col-span-10 text-lg font-semibold mt-6">Plan</div>

                    <Tooltip title="Rencana terapi untuk pasien">
                        <TextField
                            className="col-span-10"
                            name="rencana_terapi"
                            label="Rencana Terapi"
                            placeholder="Masukkan rencana terapi"
                            multiline
                            rows={3}
                            value={formData.rencana_terapi}
                            onChange={handleChange}
                            error={!!errors.rencana_terapi}
                            helperText={errors.rencana_terapi}
                        />
                    </Tooltip>

                    <Tooltip title="Rencana tindak lanjut untuk pasien">
                        <TextField
                            className="col-span-10"
                            name="rencana_tindak_lanjut"
                            label="Rencana Tindak Lanjut"
                            placeholder="Masukkan rencana tindak lanjut"
                            multiline
                            rows={2}
                            value={formData.rencana_tindak_lanjut}
                            onChange={handleChange}
                        />
                    </Tooltip>

                    {/* === Catatan === */}
                    <div className="col-span-10 text-lg font-semibold mt-6">Catatan</div>

                    <Tooltip title="Catatan tambahan untuk pasien">
                        <TextField
                            className="col-span-4"
                            name="catatan"
                            label="Catatan"
                            placeholder="Masukkan catatan tambahan"
                            value={formData.catatan}
                            onChange={handleChange}
                        />
                    </Tooltip>

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Batal</Button>
                <Button variant="contained" onClick={handleSave}>Simpan</Button>
            </DialogActions>

            {/* Confirmation Dialog */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Konfirmasi</DialogTitle>
                <DialogContent>
                    Apakah Anda yakin ingin menyimpan perubahan ini?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Batal</Button>
                    <Button variant="contained" onClick={handleConfirmSave}>Ya, Simpan</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};

export default RMECatatanKlinisEdit;
