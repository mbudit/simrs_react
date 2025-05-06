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
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#e0e0e0',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid rgba(224, 224, 224, 1)',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: 'white',
    '&:nth-of-type(odd)': {
        backgroundColor: 'white',
    },
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
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
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
    createData('17-12-2025', 'Sakit', 'Gigi', '12346', 'Pasien 2', 'Perempuan', '85', 'Dr. Gadungan'),
    createData('16-12-2025', 'Sakit', 'Gigi', '12347', 'Pasien 3', 'Laki-laki', '70', 'Dr. Gadungan'),
    createData('15-12-2025', 'Sakit', 'Gigi', '12348', 'Pasien 4', 'Perempuan', '60', 'Dr. Gadungan'),
    createData('14-12-2025', 'Sakit', 'Gigi', '12349', 'Pasien 5', 'Laki-laki', '55', 'Dr. Gadungan'),
    createData('13-12-2025', 'Sakit', 'Gigi', '12350', 'Pasien 6', 'Perempuan', '80', 'Dr. Gadungan'),
];

const TablePasien = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (columnId) => {
        const isAsc = orderBy === columnId && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    const sortedRows = React.useMemo(() => {
        if (!orderBy) return rows;
        return [...rows].sort((a, b) => {
            const aVal = a[orderBy];
            const bVal = b[orderBy];
            if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [orderBy, orderDirection]);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;

    const visibleRows = rowsPerPage > 0
        ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedRows;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, border: '1px solid rgba(224, 224, 224, 1)' }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {[
                            { id: 'tgl_daftar', label: 'Tanggal Daftar' },
                            { id: 'status', label: 'Status' },
                            { id: 'poli', label: 'Poli' },
                            { id: 'no_rm', label: 'No. Daftar' },
                            { id: 'nama', label: 'Nama Pasien' },
                            { id: 'jenis_kelamin', label: 'Jenis Kelamin' },
                            { id: 'umur', label: 'Umur' },
                            { id: 'dokter', label: 'Dokter' },
                        ].map((column) => (
                            <StyledTableCell
                                key={column.id}
                                sortDirection={orderBy === column.id ? orderDirection : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? orderDirection : 'asc'}
                                    onClick={() => handleSortRequest(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row) => (
                        <StyledTableRow key={row.no_rm + row.nama}>
                            <StyledTableCell>{row.tgl_daftar}</StyledTableCell>
                            <StyledTableCell>{row.status}</StyledTableCell>
                            <StyledTableCell>{row.poli}</StyledTableCell>
                            <StyledTableCell>{row.no_rm}</StyledTableCell>
                            <StyledTableCell>{row.nama}</StyledTableCell>
                            <StyledTableCell>{row.jenis_kelamin}</StyledTableCell>
                            <StyledTableCell>{row.umur}</StyledTableCell>
                            <StyledTableCell>{row.dokter}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={8} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8}>
                            <Box display="flex" justifyContent="flex-end">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    count={sortedRows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    slotProps={{
                                        select: {
                                            inputProps: { 'aria-label': 'rows per page' },
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
};

export default TablePasien;
