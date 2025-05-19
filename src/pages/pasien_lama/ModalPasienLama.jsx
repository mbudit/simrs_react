import { Box, Fade, Modal, Button } from '@mui/material';
import { ModalCloseButton } from '../../components/Buttons';
import TablePasienLama from './TablePasienLama';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '80vw',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: 0,
    borderRadius: '12px',
    '& .MuiTextField-root': {
        m: 1,
        width: '25ch',
    },
};

export default function ModalPasienLama2({ open, handleClose, setForm, handleOpen, handleSelect }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#1e2838',
                            color: '#fff',
                            px: 2,
                            py: 1.5,
                        }}
                    >
                        <h2 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '24px' }}>Data Pasien Lama</h2>
                        <ModalCloseButton onClick={handleClose} />
                    </Box>
                    
                    {/* <TablePasien2
                        setForm={setForm}
                        handleOpen={handleOpen}
                        handleClose={handleClose} // <-- Tambahkan ini
                    /> */}
                    <TablePasienLama
                        handleSelect={handleSelect}
                    />
                </Box>
            </Fade>
        </Modal>
    );
}
