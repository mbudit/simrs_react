import React from 'react';
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    '& .MuiInputBase-root': {
                        borderRadius: '12px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ccc',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4caf50',
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '12px',
                    },
                },
            },
        },
    },
});

export default Theme;
