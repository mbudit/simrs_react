import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function ConfirmDialog({ open, onCancel, onConfirm }) {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                    <WarningAmberIcon color="warning" />
                    <Typography variant="h6" fontWeight="bold">
                        Konfirmasi Pengiriman
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" color="text.secondary">
                    Apakah Anda yakin ingin mengirim data ini? Pastikan semua informasi telah diisi dengan benar.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} variant="contained" color="error">
                    Tidak
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="success"
                >
                    Ya, Kirim
                </Button>
            </DialogActions>
        </Dialog>
    );
}