import React, { useState } from 'react';
import { BackButton } from '../../components/Buttons';
import ButtonDaftar from '../../components/ButtonDaftar';
import { AnimatePresence } from 'framer-motion';
import TableRME from '../rme/TabelRME';
import RMEPasien from './forms/RMEPasien';

const RME = () => {

  return (
    <div>
      <BackButton />
      <div className='flex items-center justify-between mb-4 mt-5'>
        <h3 className='text-2xl font-semibold'>Data RME Pasien</h3>
      </div>
      <TableRME /> {/* 👈 re-render this when refreshKey changes */}
    </div>
  );
}

export default RME;
