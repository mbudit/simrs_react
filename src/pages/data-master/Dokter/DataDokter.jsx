import React, { useState } from 'react';
import { BackButton } from '../../../components/Buttons';
import ButtonDaftar from '../../../components/ButtonDaftar';
import TableDokter from './TableDokter';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
