import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUser, FaWheelchair } from 'react-icons/fa';
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
                <MenuItem icon={<FaUser />} component={<Link to="/daftarpasien" />}>
                    Profile
                </MenuItem>
                <MenuItem icon={<FaWheelchair />} component={<Link to="/rawatjalan" />}>
                    Rawat Jalan
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default Sidebar2;