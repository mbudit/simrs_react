import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#e0e0e0', // abu-abu muda
        color: theme.palette.common.black,
        fontWeight: 'bold',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid rgba(224, 224, 224, 1)', // border untuk body
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: 'white', // semua baris data berwarna putih
    '&:nth-of-type(odd)': {
        backgroundColor: 'white', // hilangkan highlight abu-abu
    },
    // hide last border
    /* '&:last-child td, &:last-child th': {
        border: 0,
    }, */
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(tgl_daftar, status, poli, no_rm, nama, jenis_kelamin, umur, dokter) {
    return { tgl_daftar, status, poli, no_rm, nama, jenis_kelamin, umur, dokter };
}

const rows = [
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 1', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 2', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 3', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 4', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 5', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 6', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 7', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 8', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 9', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 10', 'Laki-laki', '90', 'Dr. Gadungan'),
    createData('18-12-2025', 'Sakit', 'Gigi', '12345', 'Pasien 11', 'Laki-laki', '90', 'Dr. Gadungan'),
];

const TableIRJ = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, border: '1px solid rgba(224, 224, 224, 1)' }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Tanggal Daftar</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Poli</StyledTableCell>
                        <StyledTableCell>No. RM</StyledTableCell>
                        <StyledTableCell>Nama Pasien</StyledTableCell>
                        <StyledTableCell>Jenis Kelamin</StyledTableCell>
                        <StyledTableCell>Umur</StyledTableCell>
                        <StyledTableCell>Dokter</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <StyledTableRow key={row.nama}>
                            <StyledTableCell component="th" scope="row">
                                {row.tgl_daftar}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.status}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.poli}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.no_rm}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.nama}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.jenis_kelamin}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.umur}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 160 }} >
                                {row.dokter}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8}>
                        <Box display="flex" justifyContent="flex-end">
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            slotProps={{
                                select: {
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                                },
                            }}
                            />
                        </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default TableIRJ;