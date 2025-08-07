import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BackButton } from '../../../../components/Buttons';

const FormEditDokter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  // Support both route param and state passing
  const dokterId = id || (location.state && location.state.id_asli);

  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    gelar: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    nik: '',
    alamat: '',
    email: '',
    no_telp: '',
    practitioner_id: '',
    no_str: '',
    tgl_berlaku_str: '',
    tgl_kadaluarsa_str: '',
    no_sip: '',
    tgl_berlaku_sip: '',
    tgl_kadaluarsa_sip: '',
    spesialisasi: '',
    pendidikan: '',
    status_pegawai: '',
    poli: '',
    jabatan: '',
    shift: '',
    nip: '',
    tgl_mulai_kerja: '',
    jabatan_struktural: '',
    status_aktif: '',
    unit_kerja: '',
    golongan: '',
    gaji_pokok: '',
    tunjangan: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch dokter data by id
    if (dokterId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/dokter/${dokterId}`)
        .then((res) => {
          // Fill formData with fetched data
          setFormData({
            ...formData,
            ...res.data,
            tanggal_lahir: res.data.tanggal_lahir ? res.data.tanggal_lahir.split('T')[0] : '',
            tgl_berlaku_str: res.data.tgl_berlaku_str ? res.data.tgl_berlaku_str.split('T')[0] : '',
            tgl_kadaluarsa_str: res.data.tgl_kadaluarsa_str ? res.data.tgl_kadaluarsa_str.split('T')[0] : '',
            tgl_berlaku_sip: res.data.tgl_berlaku_sip ? res.data.tgl_berlaku_sip.split('T')[0] : '',
            tgl_kadaluarsa_sip: res.data.tgl_kadaluarsa_sip ? res.data.tgl_kadaluarsa_sip.split('T')[0] : '',
            tgl_mulai_kerja: res.data.tgl_mulai_kerja ? res.data.tgl_mulai_kerja.split('T')[0] : '',
          });
        })
        .catch((err) => {
          console.error('Gagal mengambil data dokter:', err);
        });
    }
    // eslint-disable-next-line
  }, [dokterId]);

  const validate = () => {
    const newErrors = {};
    if (!formData.kode) newErrors.kode = 'Kode wajib diisi';
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.jenis_kelamin) newErrors.jenis_kelamin = 'Jenis kelamin wajib diisi';
    if (!formData.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
    if (!formData.no_telp) newErrors.no_telp = 'No. Telp wajib diisi';
    if (!formData.practitioner_id) newErrors.practitioner_id = 'Practitioner ID wajib diisi';
    if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';
    if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.no_str) newErrors.no_str = 'Nomor STR wajib diisi';
    if (!formData.tgl_berlaku_str) newErrors.tgl_berlaku_str = 'Tanggal berlaku STR wajib diisi';
    if (!formData.tgl_kadaluarsa_str) newErrors.tgl_kadaluarsa_str = 'Tanggal kadaluwarsa STR wajib diisi';
    if (!formData.no_sip) newErrors.no_sip = 'Nomor SIP wajib diisi';
    if (!formData.tgl_berlaku_sip) newErrors.tgl_berlaku_sip = 'Tanggal berlaku SIP wajib diisi';
    if (!formData.tgl_kadaluarsa_sip) newErrors.tgl_kadaluarsa_sip = 'Tanggal kadaluwarsa SIP wajib diisi';
    if (!formData.spesialisasi) newErrors.spesialisasi = 'Spesialisasi wajib diisi';
    if (!formData.pendidikan) newErrors.pendidikan = 'Pendidikan wajib diisi';
    if (!formData.status_pegawai) newErrors.status_pegawai = 'Status pegawai wajib diisi';
    if (!formData.poli) newErrors.poli = 'Poli wajib diisi';
    if (!formData.jabatan) newErrors.jabatan = 'Jabatan wajib diisi';
    if (!formData.shift) newErrors.shift = 'Shift wajib diisi';
    if (formData.status_pegawai === 'Tetap') {
      if (!formData.nip) newErrors.nip = 'NIP wajib diisi';
      if (!formData.tgl_mulai_kerja) newErrors.tgl_mulai_kerja = 'Tanggal mulai kerja wajib diisi';
      if (!formData.jabatan_struktural) newErrors.jabatan_struktural = 'Jabatan struktural wajib diisi';
      if (!formData.status_aktif) newErrors.status_aktif = 'Status aktif wajib diisi';
      if (!formData.unit_kerja) newErrors.unit_kerja = 'Unit kerja wajib diisi';
      if (!formData.golongan) newErrors.golongan = 'Golongan wajib diisi';
      if (!formData.gaji_pokok) newErrors.gaji_pokok = 'Gaji pokok wajib diisi';
      if (!formData.tunjangan) newErrors.tunjangan = 'Tunjangan wajib diisi';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirm(false);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/dokter/${dokterId}`, formData);
      navigate('/data_master/data-dokter');
    } catch (error) {
      console.error('Error updating dokter:', error);
    }
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
  };

  return (
    <Container maxWidth="false" sx={{ minHeight: '100vh', py: 4 }}>
      <div className="flex justify-between items-center mb-4">
        <BackButton />
      </div>
      <Paper elevation={3} sx={{ p: 4, height: '100%', minHeight: '80vh' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Edit Data Dokter
        </Typography>
        <hr className="border-t border-gray-300" />
        <div className='mt-5'>
          <Typography variant="h6" component="h2" gutterBottom>
            Identitas Dokter
          </Typography>
        </div>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Kode"
              name="kode"
              value={formData.kode}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.kode}
              helperText={errors.kode}
            />
            <TextField
              label="Nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.nama}
              helperText={errors.nama}
            />
            <TextField
              label="Gelar Akademik"
              name="gelar"
              value={formData.gelar}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth required error={!!errors.jenis_kelamin}>
              <InputLabel id="jenis-kelamin-label">Jenis Kelamin</InputLabel>
              <Select
                labelId="jenis-kelamin-label"
                id="jenis-kelamin"
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                label="Jenis Kelamin"
              >
                <MenuItem value="">
                  <em>Pilih Jenis Kelamin</em>
                </MenuItem>
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
              {errors.jenis_kelamin && (
                <Typography color="error" variant="caption">{errors.jenis_kelamin}</Typography>
              )}
            </FormControl>
            <TextField
              label="Tempat Lahir"
              name="tempat_lahir"
              value={formData.tempat_lahir}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Tanggal Lahir"
              name="tanggal_lahir"
              type="date"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              error={!!errors.tanggal_lahir}
              helperText={errors.tanggal_lahir}
            />
            <TextField
              label="Nomor KTP / NIK"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="No. Telp"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.no_telp}
              helperText={errors.no_telp}
            />
            <TextField
              label="Practitioner ID"
              name="practitioner_id"
              value={formData.practitioner_id}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.practitioner_id}
              helperText={errors.practitioner_id}
            />
            <TextField
              label="Alamat Lengkap"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              className="md:col-span-2"
              error={!!errors.alamat}
              helperText={errors.alamat}
            />
          </div>
          {/* Label Section*/}
          <div className='mt-6'>
            <Typography variant="h6" component="h2" gutterBottom>
              Informasi Profesional & Perizinan
            </Typography>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TextField
              label="Nomor STR"
              name="no_str"
              value={formData.no_str}
              onChange={handleChange}
              fullWidth
              error={!!errors.no_str}
              helperText={errors.no_str}
            />
            <TextField
              label="Tanggal Berlaku STR"
              name="tgl_berlaku_str"
              type="date"
              value={formData.tgl_berlaku_str}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.tgl_berlaku_str}
              helperText={errors.tgl_berlaku_str}
            />
            <TextField
              label="Tanggal Kadaluwarsa STR"
              name="tgl_kadaluarsa_str"
              type="date"
              value={formData.tgl_kadaluarsa_str}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.tgl_kadaluarsa_str}
              helperText={errors.tgl_kadaluarsa_str}
            />
            <TextField
              label="Nomor SIP"
              name="no_sip"
              value={formData.no_sip}
              onChange={handleChange}
              fullWidth
              error={!!errors.no_sip}
              helperText={errors.no_sip}
            />
            <TextField
              label="Tanggal Berlaku SIP"
              name="tgl_berlaku_sip"
              type="date"
              value={formData.tgl_berlaku_sip}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.tgl_berlaku_sip}
              helperText={errors.tgl_berlaku_sip}
            />
            <TextField
              label="Tanggal Kadaluwarsa SIP"
              name="tgl_kadaluarsa_sip"
              type="date"
              value={formData.tgl_kadaluarsa_sip}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.tgl_kadaluarsa_sip}
              helperText={errors.tgl_kadaluarsa_sip}
            />
            <FormControl fullWidth error={!!errors.spesialisasi}>
              <InputLabel id="spesialisasi-label">Spesialisasi</InputLabel>
              <Select
                labelId="spesialisasi-label"
                name="spesialisasi"
                value={formData.spesialisasi}
                onChange={handleChange}
                label="Spesialisasi"
              >
                <MenuItem value=""><em>Pilih Spesialisasi</em></MenuItem>
                <MenuItem value="Umum">Umum</MenuItem>
                <MenuItem value="Anak">Anak</MenuItem>
                <MenuItem value="Penyakit Dalam">Penyakit Dalam</MenuItem>
                <MenuItem value="Bedah">Bedah</MenuItem>
              </Select>
              {errors.spesialisasi && (
                <Typography color="error" variant="caption">{errors.spesialisasi}</Typography>
              )}
            </FormControl>
            <TextField
              label="Pendidikan Terakhir"
              name="pendidikan"
              value={formData.pendidikan}
              onChange={handleChange}
              fullWidth
              error={!!errors.pendidikan}
              helperText={errors.pendidikan}
            />
            <FormControl fullWidth error={!!errors.status_pegawai}>
              <InputLabel id="status-pegawai-label">Status Pegawai</InputLabel>
              <Select
                labelId="status-pegawai-label"
                name="status_pegawai"
                value={formData.status_pegawai}
                onChange={handleChange}
                label="Status Pegawai"
              >
                <MenuItem value=""><em>Pilih Status</em></MenuItem>
                <MenuItem value="Tetap">Tetap</MenuItem>
                <MenuItem value="Kontrak">Kontrak</MenuItem>
                <MenuItem value="Magang">Magang</MenuItem>
              </Select>
              {errors.status_pegawai && (
                <Typography color="error" variant="caption">{errors.status_pegawai}</Typography>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.poli}>
              <InputLabel id="poli-label">Poli</InputLabel>
              <Select
                labelId="poli-label"
                name="poli"
                value={formData.poli}
                onChange={handleChange}
                label="Poli"
              >
                <MenuItem value=""><em>Pilih Poli</em></MenuItem>
                <MenuItem value="Poli Umum">Poli Umum</MenuItem>
                <MenuItem value="Poli Anak">Poli Anak</MenuItem>
                <MenuItem value="Poli Gigi">Poli Gigi</MenuItem>
              </Select>
              {errors.poli && (
                <Typography color="error" variant="caption">{errors.poli}</Typography>
              )}
            </FormControl>
            <TextField
              label="Jabatan Fungsional"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              fullWidth
              error={!!errors.jabatan}
              helperText={errors.jabatan}
            />
            <FormControl fullWidth error={!!errors.shift}>
              <InputLabel id="shift-label">Jadwal / Shift</InputLabel>
              <Select
                labelId="shift-label"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                label="Jadwal / Shift"
              >
                <MenuItem value=""><em>Pilih Shift</em></MenuItem>
                <MenuItem value="Pagi">Pagi</MenuItem>
                <MenuItem value="Siang">Siang</MenuItem>
                <MenuItem value="Malam">Malam</MenuItem>
              </Select>
              {errors.shift && (
                <Typography color="error" variant="caption">{errors.shift}</Typography>
              )}
            </FormControl>
          </div>
          {/* Label Section*/}
          <div className='mt-6'>
            <Typography variant="h6" component="h2" gutterBottom>
              Informasi Kepegawaian (Jika Dokter Tetap)
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <TextField
              label="Nomor Induk Pegawai (NIP)"
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              fullWidth
              error={!!errors.nip}
              helperText={errors.nip}
            />
            <TextField
              label="Tanggal Mulai Bekerja"
              name="tgl_mulai_kerja"
              type="date"
              value={formData.tgl_mulai_kerja}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.tgl_mulai_kerja}
              helperText={errors.tgl_mulai_kerja}
            />
            <TextField
              label="Jabatan Struktural"
              name="jabatan_struktural"
              value={formData.jabatan_struktural}
              onChange={handleChange}
              fullWidth
              error={!!errors.jabatan_struktural}
              helperText={errors.jabatan_struktural}
            />
            <FormControl fullWidth error={!!errors.status_aktif}>
              <InputLabel id="status-aktif-label">Status Aktif</InputLabel>
              <Select
                labelId="status-aktif-label"
                name="status_aktif"
                value={formData.status_aktif}
                onChange={handleChange}
                label="Status Aktif"
              >
                <MenuItem value=""><em>Pilih Status</em></MenuItem>
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
              </Select>
              {errors.status_aktif && (
                <Typography color="error" variant="caption">{errors.status_aktif}</Typography>
              )}
            </FormControl>
            <TextField
              label="Unit Kerja"
              name="unit_kerja"
              value={formData.unit_kerja}
              onChange={handleChange}
              fullWidth
              error={!!errors.unit_kerja}
              helperText={errors.unit_kerja}
            />
            <FormControl fullWidth error={!!errors.golongan}>
              <InputLabel id="golongan-label">Golongan</InputLabel>
              <Select
                labelId="golongan-label"
                name="golongan"
                value={formData.golongan}
                onChange={handleChange}
                label="Golongan"
              >
                <MenuItem value=""><em>Pilih Golongan</em></MenuItem>
                <MenuItem value="I/a">I/a</MenuItem>
                <MenuItem value="I/b">I/b</MenuItem>
                <MenuItem value="II/a">II/a</MenuItem>
                <MenuItem value="III/a">III/a</MenuItem>
                <MenuItem value="IV/a">IV/a</MenuItem>
              </Select>
              {errors.golongan && (
                <Typography color="error" variant="caption">{errors.golongan}</Typography>
              )}
            </FormControl>
            <TextField
              label="Gaji Pokok"
              name="gaji_pokok"
              type="number"
              value={formData.gaji_pokok}
              onChange={handleChange}
              fullWidth
              error={!!errors.gaji_pokok}
              helperText={errors.gaji_pokok}
            />
            <TextField
              label="Tunjangan"
              name="tunjangan"
              type="number"
              value={formData.tunjangan}
              onChange={handleChange}
              fullWidth
              error={!!errors.tunjangan}
              helperText={errors.tunjangan}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4 md:col-span-2">
            <Button variant="outlined" onClick={() => navigate('/data_master/data-dokter')}>
              Batal
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Simpan
            </Button>
          </div>
        </Box>
      </Paper>
      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onClose={handleCancelSave}>
        <DialogTitle>Konfirmasi Simpan Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menyimpan perubahan data dokter ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSave} color="secondary">
            Batal
          </Button>
          <Button onClick={handleConfirmSave} color="primary" variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormEditDokter;
