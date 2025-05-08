import React, { useState } from 'react';
import { BackButton } from '../../components/Buttons';
import ButtonDaftar from '../../components/ButtonDaftar';
import TablePasien from './TablePasien';
import FormPendaftaran from './forms/FormPendaftaran';
import { AnimatePresence } from 'framer-motion';

const DaftarPasien = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 👈 used to trigger re-renders

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleFormSuccess = () => {
    setRefreshKey(prev => prev + 1); // 👈 change this to reload TablePasien
    handleCloseForm();
  };

  return (
    <div>
      <BackButton />
      <div className='flex items-center justify-between mb-4 mt-5'>
        <h3 className='text-2xl font-semibold'>Data Pasien</h3>
        <ButtonDaftar onClick={handleOpenForm} />
      </div>
      <TablePasien key={refreshKey} /> {/* 👈 re-render this when refreshKey changes */}
      <AnimatePresence>
        {showForm && <FormPendaftaran onClose={handleCloseForm} onSuccess={handleFormSuccess} />}
      </AnimatePresence>
    </div>
  );
};

export default DaftarPasien;
