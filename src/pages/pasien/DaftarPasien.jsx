import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import ButtonDaftar from '../../components/ButtonDaftar';
import TablePasien from './TablePasien';
import DataTable from './TablePasien';
import FormPendaftaran from './forms/FormPendaftaran';
import { AnimatePresence } from 'framer-motion';

const DaftarPasien = () => {
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    return (
        <div>
            <BackButton />
            <div className='flex items-center justify-between mb-4 mt-5'>
                <h3 className='text-2xl font-semibold'>Data Pasien</h3>
                <ButtonDaftar onClick={handleOpenForm} />
            </div>
            <TablePasien />
            <AnimatePresence>
                {showForm && <FormPendaftaran onClose={() => setShowForm(false)} />}
            </AnimatePresence>
        </div>
    );
}

export default DaftarPasien;
