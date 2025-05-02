import React from 'react';
import TableIRJ from './Tables';
import BackButton from '../../components/BackButton';
import ButtonDaftar from '../../components/ButtonDaftar';

const RawatJalan = () => {
    return (
        <div >
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Jalan</h3>
                <ButtonDaftar />
            </div>
            <TableIRJ />
        </div>
    );
}

export default RawatJalan;