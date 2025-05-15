import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaAmbulance, FaBars, FaHome, FaHospitalUser, FaMicroscope, FaNotesMedical, FaPills, FaPrescriptionBottle, FaProcedures, FaStethoscope, FaUserFriends, FaXRay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar2 = ({ collapsed, setCollapsed }) => {
    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <Sidebar
            collapsed={collapsed}
            rootStyles={{
                '.ps-sidebar-container': {
                    backgroundColor: '#1e2939',
                    color: '#fff',
                    height: '100vh',
                    transition: 'width 0.3s', // agar transisi halus
                },
            }}
        >
            <Menu
                menuItemStyles={{
                    button: {
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#112d4e',
                            color: '#fff',
                        },
                    },
                    icon: {
                        color: '#fff',
                        fontSize: '24px',
                    },
                    label: {
                        fontSize: '18px',
                    },
                }}
            >
                <MenuItem
                    icon={<FaBars />}
                    onClick={toggleSidebar}
                />
                <MenuItem icon={<FaHome />} component={<Link to="/" />}>
                    Home
                </MenuItem>
                <MenuItem icon={<FaNotesMedical />} component={<Link to="/rme" />}>
                    RME
                </MenuItem>
                <MenuItem icon={<FaHospitalUser />} component={<Link to="/daftarpasien" />}>
                    Data Pasien
                </MenuItem>
                <MenuItem icon={<FaUserFriends />} component={<Link to="/antrian" />}>
                    Antrian
                </MenuItem>
                <MenuItem icon={<FaAmbulance />} component={<Link to="/igd" />}>
                    IGD
                </MenuItem>
                <MenuItem icon={<FaStethoscope />} component={<Link to="/rawatjalan" />}>
                    Rawat Jalan
                </MenuItem>
                <MenuItem icon={<FaProcedures />} component={<Link to="/rawatinap" />}>
                    Rawat Inap
                </MenuItem>
                <MenuItem icon={<FaXRay />} component={<Link to="/radiologi" />}>
                    Radiologi
                </MenuItem>
                <MenuItem icon={<FaMicroscope />} component={<Link to="/laboratorium" />}>
                    Laboratorium
                </MenuItem>
                <MenuItem icon={<FaPills />} component={<Link to="/dataobat" />}>
                    Data Obat
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default Sidebar2;