import React from 'react';
import { motion } from 'framer-motion';

const FormPendaftaran = ({ onClose }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
            >
                <h2 className="text-xl font-bold mb-4">Form Pendaftaran</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2">
                    <div>
                        <label className="block mb-1">No. KTP:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Nama Lengkap:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Tempat Lahir:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Tanggal Lahir:</label>
                        <input type="date" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Umur:</label>
                        <input type="number" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Jenis Kelamin:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Agama:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Budha">Budha</option>
                            <option value="Konghucu">Konghucu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Status Pernikahan:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="Belum Menikah">Belum Menikah</option>
                            <option value="Menikah">Menikah</option>
                            <option value="Cerai">Cerai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Golongan Darah:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Rhesus:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="+">Positif (+)</option>
                            <option value="-">Negatif (-)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Pendidikan:</label>
                        <select className="w-full border px-3 py-2 rounded">
                            <option value="">-- Pilih --</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA/SMK">SMA/SMK</option>
                            <option value="D3">D3</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Pekerjaan:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">No. Telp:</label>
                        <input type="tel" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Warga Negara:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Nama Orangtua/Penanggung Jawab:</label>
                        <input type="text" className="w-full border px-3 py-2 rounded" />
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default FormPendaftaran;
