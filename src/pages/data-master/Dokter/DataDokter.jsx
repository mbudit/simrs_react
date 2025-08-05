import React, { useState } from 'react';
import { BackButton } from '../../../components/Buttons';
import ButtonDaftar from '../../../components/ButtonDaftar';
import TableDokter from './TableDokter';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Placeholder for the doctor registration form
const FormPendaftaranDokter = ({ onClose, onSuccess }) => (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h3 className="text-xl font-bold mb-4">Form Pendaftaran Dokter (Coming Soon)</h3>
      <button
        className="px-4 py-2 bg-gray-300 rounded"
        onClick={onClose}
      >
        Tutup
      </button>
    </div>
  </div>
);

const DataDokter = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleFormSuccess = () => {
    setRefreshKey(prev => prev + 1);
    handleCloseForm();
  };

  const handleOpenFormPage = () => {
    navigate('/data_master/tambah-dokter');
  };

  return (
    <div>
      <BackButton />
      <div className='flex items-center justify-between mb-4 mt-5'>
        <h3 className='text-2xl font-semibold'>Data Dokter</h3>
        <ButtonDaftar onClick={handleOpenFormPage}>Tambah Dokter</ButtonDaftar>
      </div>
      <TableDokter key={refreshKey} />
      <AnimatePresence>
        {showForm && (
          <FormPendaftaranDokter onClose={handleCloseForm} onSuccess={handleFormSuccess} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataDokter;
