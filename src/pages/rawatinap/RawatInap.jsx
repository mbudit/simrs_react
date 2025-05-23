import React from 'react';
import { useState } from 'react';
import TableRanap from './TableRanap';
import { BackButton, ButtonDaftar } from '../../components/Buttons';

const RawatInap = () => {
    const handleOpen = () => setOpen(true);
    
    return (
        <div>
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Inap</h3>
                <ButtonDaftar onClick={handleOpen}/>
            </div>
            <TableRanap />
        </div>
    );
}

export default RawatInap;
