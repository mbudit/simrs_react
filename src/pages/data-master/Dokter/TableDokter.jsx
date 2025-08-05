// src/pages/admin/DataDokter/TableDokter.jsx
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const TableDokter = () => {
  const [dokterList, setDokterList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch doctor data from your API
    const fetchDokter = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dokter`); // adjust endpoint accordingly
        const data = response.data;

        // Add `id` for MUI DataGrid and No. index
        const formattedData = data.map((item, index) => ({
          id: index + 1,
          no: index + 1,
          kode: item.kode,
          nama: item.nama,
          no_telp: item.no_telp,
          practitioner_id: item.practitioner_id,
        }));

        setDokterList(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dokter data:', error);
        setLoading(false);
      }
    };

    fetchDokter();
  }, []);

  const columns = [
    { field: 'no', headerName: 'No.', width: 70 },
    { field: 'kode', headerName: 'Kode', width: 120 },
    { field: 'nama', headerName: 'Nama', width: 200 },
    { field: 'no_telp', headerName: 'No. Telp', width: 150 },
    { field: 'practitioner_id', headerName: 'Practitioner ID', width: 180 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {loading ? (
        <Box className="flex justify-center items-center h-full">
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={dokterList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

export default TableDokter;
