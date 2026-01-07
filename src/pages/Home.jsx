import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const modules = [
    {
        title: 'Rekam Medis Elektronik (RME)',
        description: 'Akses dan kelola riwayat rekam medis pasien secara digital dan terintegrasi.',
        image: '/assets/rme.webp',
        path: "/rme"
    },
    {
        title: 'Data Pasien',
        description: 'Lihat, tambah, dan kelola data lengkap pasien secara efisien.',
        image: '/assets/datapasien.jpg',
        path: "/daftarpasien"
    },
    {
        title: 'Antrian',
        description: 'Kelola antrian pasien secara online maupun offline dengan sistem terpusat.',
        image: '/assets/antrian.jpg',
        path: "/antrian"
    },
    {
        title: 'Laboratorium',
        description: 'Lihat hasil laboratorium pasien dan kelola permintaan pemeriksaan.',
        image: '/assets/lab.jpg',
        path: "/laboratorium"
    },
    {
        title: 'Radiologi',
        description: 'Akses hasil pemeriksaan radiologi dan kirim permintaan radiologi baru.',
        image: '/assets/radiologi.jpg',
        path: "/radiologi"
    },
    {
        title: 'Data Obat',
        description: 'Kelola stok obat, distribusi, dan informasi penggunaan obat di fasilitas.',
        image: '/assets/dataobat.jpg',
        path: "/dataobat"
    },
    {
        title: 'Instalasi Gawat Darurat (IGD)',
        description: 'Tangani pasien gawat darurat dengan alur pencatatan dan penanganan cepat.',
        image: '/assets/igd.jpg',
        path: "/igd"
    },
    {
        title: 'Instalasi Rawat Jalan',
        description: 'Atur jadwal dan kunjungan pasien rawat jalan dengan data yang lengkap.',
        image: '/assets/rawatjalan.jpg',
        path: "/rawatjalan"
    },
    {
        title: 'Instalasi Rawat Inap',
        description: 'Kelola pasien rawat inap, kamar, serta status harian dan laporan medis.',
        image: '/assets/rawatinap.png',
        path: "/rawatinap"
    },
];

const Home = () => {
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2}>
                {modules.map((modul, index) => (
                    <Grid key={index}>
                        <Paper elevation={5} sx={{ height: '100%' }}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea
                                    component={Link}
                                    to={modul.path}
                                    sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={modul.image}
                                        alt={modul.title}
                                        sx={{ width: '100%', height: 140, objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {modul.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {modul.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;
