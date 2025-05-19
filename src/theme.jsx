import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    // Add typography settings at the root level
    typography: {
        fontFamily: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        // Optional: Set default font sizes
        fontSize: 14,
        htmlFontSize: 16,
    },

    // Your existing component overrides
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '6px', // 👈 Makes all inputs rounded
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ccc',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4caf50',
                    },
                },
                input: {
                    padding: '12px', // 👈 Match your TextField padding
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent', // Prevents default focus bg
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 400, // Uses theme's bold weight
                    textTransform: 'none', // Disables auto-uppercase
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    '& .MuiInputBase-root': {
                        borderRadius: '6px',
                        fontFamily: 'inherit', // Inherits from theme typography
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ccc',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4caf50',
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                        fontWeight: 500, // Uses theme's medium weight
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