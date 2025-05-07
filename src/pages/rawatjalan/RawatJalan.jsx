import React from 'react';
import { BackButton, ButtonDaftar } from '../../components/Buttons';
import TableIRJ from './Tables';
import TableIRJ2 from './TablesRajal';
import ModalRajal from './forms/DaftarRawatJalan';
import { useState } from "react";

const RawatJalan = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div >
            <BackButton />
            <div className="flex items-center justify-between mb-4 mt-5">
                <h3 className="text-2xl font-semibold">Data Pasien Rawat Jalan</h3>
                <ButtonDaftar onClick={handleOpen} />
            </div>
            <TableIRJ2 />
            <ModalRajal open={open} handleClose={handleClose} />
        </div>
    );
}

export default RawatJalan;