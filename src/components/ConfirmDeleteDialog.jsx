import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmDeleteDialog = ({ open, onClose, onDelete }) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
                <WarningAmberIcon color="warning" />
                <Typography variant="h6" fontWeight="bold">
                    Konfirmasi Penghapusan
                </Typography>
            </Box>
        </DialogTitle>
        <DialogContent dividers>
            <Typography variant="body1" color="text.secondary">
                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} variant="contained" color="error">
                Tidak
            </Button>
            <Button onClick={onDelete} variant="contained" color="success">
                Ya, Hapus
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDeleteDialog;