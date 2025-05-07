import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextField, MenuItem, FormControl, Select, InputLabel, Button, Stack } from '@mui/material';

const FormPendaftaran = ({ onClose }) => {
    useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = 'hidden';

        // Re-enable scroll on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const [jenisKelamin, setJenisKelamin] = React.useState('');
    const [agama, setAgama] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [goldar, setGoldar] = React.useState('');
    const [rhesus, setRhesus] = React.useState('');
    const [pendidikan, setPendidikan] = React.useState('');
    const [asuransi, setAsuransi] = React.useState('');
    const [wargaNegara, setWargaNegara] = React.useState('');

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded shadow-md w-full max-w-6xl"
            >
                <form className="grid grid-cols-1 md:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2">
                    <div className="md:col-span-5">
                        <h3 className="text-xl font-bold">Form Pendaftaran Pasien Baru</h3>
                    </div>
                    <div className="md:col-span-5">
                        <hr className=" border-t border-gray-300" />
                    </div>

                    <div className="md:col-span-5 mt-2">
                        <h3 className="text-lg font-semibold mb-2">Kredensial</h3>
                    </div>

                    <div className="md:col-span-1">
                        <TextField label="No. KTP" type="number" fullWidth required />
                    </div>
                    <div className="md:col-span-2">
                        <TextField label="Nama Lengkap" fullWidth required />
                    </div>

                    <div className="md:col-span-1">
                        <TextField label="Tempat Lahir" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Tanggal Lahir" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Umur" type="number" fullWidth required />
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Jenis Kelamin</InputLabel>
                            <Select
                                label="Jenis Kelamin"
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                            >
                                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                                <MenuItem value="Perempuan">Perempuan</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Agama</InputLabel>
                            <Select
                                label="Agama"
                                value={agama}
                                onChange={(e) => setAgama(e.target.value)}
                            >
                                <MenuItem value="Islam">Islam</MenuItem>
                                <MenuItem value="Kristen">Kristen</MenuItem>
                                <MenuItem value="Katolik">Katolik</MenuItem>
                                <MenuItem value="Hindu">Hindu</MenuItem>
                                <MenuItem value="Budha">Budha</MenuItem>
                                <MenuItem value="Konghucu">Konghucu</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                                <MenuItem value="Menikah">Menikah</MenuItem>
                                <MenuItem value="Cerai">Cerai</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Gol. Darah</InputLabel>
                            <Select
                                label="Gol. Darah"
                                value={goldar}
                                onChange={(e) => setGoldar(e.target.value)}
                            >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="AB">AB</MenuItem>
                                <MenuItem value="O">O</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Rhesus</InputLabel>
                            <Select
                                label="Rhesus"
                                value={rhesus}
                                onChange={(e) => setRhesus(e.target.value)}
                            >
                                <MenuItem value="+">Positif (+)</MenuItem>
                                <MenuItem value="-">Negatif (-)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Pendidikan</InputLabel>
                            <Select
                                label="Pendidikan"
                                value={pendidikan}
                                onChange={(e) => setPendidikan(e.target.value)}
                            >
                                <MenuItem value="SD">SD</MenuItem>
                                <MenuItem value="SMP">SMP</MenuItem>
                                <MenuItem value="SMA/SMK">SMA/SMK</MenuItem>
                                <MenuItem value="D3">D3</MenuItem>
                                <MenuItem value="S1">S1</MenuItem>
                                <MenuItem value="S2">S2</MenuItem>
                                <MenuItem value="S3">S3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-1">
                        <TextField label="Pekerjaan" fullWidth required />
                    </div>

                    <div className="md:col-span-1">
                        <TextField label="No. Telp" type="number" fullWidth required />
                    </div>

                    <div className="md:col-span-1">
                        <FormControl fullWidth>
                            <InputLabel>Warga Negara</InputLabel>
                            <Select
                                label="Warga Negara"
                                value={wargaNegara}
                                onChange={(e) => setWargaNegara(e.target.value)}
                                required
                            >
                                <MenuItem value="WNI">WNI</MenuItem>
                                <MenuItem value="WNA">WNA</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="md:col-span-2">
                        <TextField label="Nama Orangtua / Wali" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="No. Telp Wali" type="number" fullWidth required />
                    </div>

                    <div className="md:col-span-5 mt-6">
                        <h3 className="text-lg font-semibold mb-2">Alamat</h3>
                    </div>
                    <div className="md:col-span-3">
                        <TextField label="Alamat" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="RT" type="number" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="RW" type="number" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Kelurahan" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Kecamatan" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Kabupaten" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Provinsi" fullWidth required />
                    </div>
                    <div className="md:col-span-1">
                        <TextField label="Kode Pos" type="number" fullWidth required />
                    </div>

                    <div className="md:col-span-5 mt-6">
                        <h3 className="text-lg font-semibold mb-2">Asuransi</h3>
                    </div>
                    <div className="md:col-span-1">
                        <FormControl fullWidth required>
                            <InputLabel>Asuransi</InputLabel>
                            <Select
                                label="Asuransi"
                                value={asuransi}
                                onChange={(e) => setAsuransi(e.target.value)}
                            >
                                <MenuItem value="BPJS">BPJS</MenuItem>
                                <MenuItem value="Asuransi A">Asuransi A</MenuItem>
                                <MenuItem value="Asuransi B">Asuransi B</MenuItem>
                                <MenuItem value="Asuransi Swasta">Asuransi Swasta</MenuItem>
                                <MenuItem value="Tidak Ada">Tidak Ada</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="md:col-span-2">
                        <TextField
                            label="Nomor Asuransi"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="md:col-span-5 flex justify-end mt-4">
                        <Stack spacing={2} direction="row">
                            <Button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded" variant="outlined">Tutup</Button>
                            <Button type='submit' variant="contained" className='px-4 py-2 bg-green-600 text-white rounded' color="success">Simpan</Button>
                        </Stack>

                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default FormPendaftaran;
