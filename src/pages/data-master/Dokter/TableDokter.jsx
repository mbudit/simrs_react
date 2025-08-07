// src/pages/admin/DataDokter/TableDokter.jsx
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TableDokter = () => {
  const [dokterList, setDokterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctor data from your API
    const fetchDokter = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dokter`); // adjust endpoint accordingly
        const data = response.data;

        // Add `id` for MUI DataGrid and No. index
        const formattedData = data.map((item, index) => ({
          id: index + 1, // for DataGrid only
          id_asli: item.id, // actual DB ID
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

  const handleEdit = (dokter) => {
    // You can navigate to an edit page or open a modal
    console.log('Edit clicked:', dokter);
    navigate(`/data_master/edit-dokter/${dokter.id_asli}`);
  };

  const handleDelete = async (dokter) => {
    if (confirm(`Yakin ingin menghapus dokter ${dokter.nama}?`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/dokter/${dokter.id_asli}`);
        setDokterList(prev => prev.filter(d => d.id_asli !== dokter.id_asli));
      } catch (error) {
        console.error('Gagal menghapus dokter:', error);
      }
    }
  };

  const columns = [
    { field: 'no', headerName: 'No.', flex: 0.5 },
    { field: 'kode', headerName: 'Kode', flex: 1 },
    { field: 'nama', headerName: 'Nama', flex: 1 },
    { field: 'no_telp', headerName: 'No. Telp', flex: 1 },
    { field: 'practitioner_id', headerName: 'Practitioner ID', flex: 1 },
    {
      field: 'actions',
      headerName: 'Aksi',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box className="flex gap-2 mt-2.5">
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            Hapus
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 'auto', minHeight: 400, width: '100%' }}>
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
