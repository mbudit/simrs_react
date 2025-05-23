import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import {
    FaAmbulance, FaBars, FaHome, FaHospitalUser, FaMicroscope, FaNotesMedical,
    FaPills, FaProcedures, FaStethoscope, FaUserFriends, FaXRay, FaBed, FaUserInjured
} from 'react-icons/fa';

const MenuItemWithAutoTooltip = ({ label, icon, to, collapsed }) => {
    const tooltipId = `tooltip-${label.toLowerCase().replace(/\s+/g, '-')}`;
    return (
        <>
            <div data-tooltip-id={tooltipId} data-tooltip-content={label} style={{ display: 'block' }}>
                <MenuItem icon={icon} component={<Link to={to} />}>
                    {label}
                </MenuItem>
            </div>
            {collapsed && <Tooltip id={tooltipId} place="right" />}
        </>
    );
};

const SubMenuWithTooltip = ({ label, icon, collapsed, open, onToggle, children }) => {
    const tooltipId = `tooltip-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <>
            <div
                data-tooltip-id={tooltipId}
                data-tooltip-content={label}
                style={{ display: 'block' }}
            >
                <SubMenu
                    label={label}
                    icon={icon}
                    open={open} // kontrol buka/tutup
                    onClick={onToggle} // toggle saat klik
                    rootStyles={{
                        [`& > .${menuClasses.button}`]: {
                            backgroundColor: '#1e2939',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#112d4e',
                            },
                        },
                        [`.${menuClasses.subMenuContent}`]: {
                            backgroundColor: '#1e2939',
                            minWidth: '270px',
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            zIndex: 9999,
                            position: 'absolute',
                            left: '100%',
                            top: 0,
                            display: open ? 'block' : 'none',
                        },
                        [`& .${menuClasses.menuItem}`]: {
                            backgroundColor: '#1e2939',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#112d4e',
                            },
                        },
                    }}
                >
                    {children}
                </SubMenu>
            </div>
            {collapsed && <Tooltip id={tooltipId} place="right" />}
        </>
    );
};

const Sidebar2 = ({ collapsed, setCollapsed }) => {
    // State untuk open/close submenu
    const [openSubMenus, setOpenSubMenus] = useState({
        rawatInap: false,
    });

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);

        // Reset semua submenu tutup ketika toggle sidebar
        setOpenSubMenus({
            rawatInap: false,
        });
    };

    // Toggle open/close submenu 'Rawat Inap'
    const toggleRawatInap = () => {
        setOpenSubMenus(prev => ({
            ...prev,
            rawatInap: !prev.rawatInap,
        }));
    };

    return (
        <Sidebar
            collapsed={collapsed}
            rootStyles={{
                '.ps-sidebar-container': {
                    width: collapsed ? '80px' : '270px',
                    backgroundColor: '#1e2939',
                    color: '#fff',
                    height: '100vh',
                    transition: 'width 0.3s',
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: 10,
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
                <MenuItem icon={<FaBars />} onClick={toggleSidebar} />

                <MenuItemWithAutoTooltip label="Home" icon={<FaHome />} to="/" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="RME" icon={<FaNotesMedical />} to="/rme" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Data Pasien" icon={<FaHospitalUser />} to="/daftarpasien" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Antrian" icon={<FaUserFriends />} to="/antrian" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="IGD" icon={<FaAmbulance />} to="/igd" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Rawat Jalan" icon={<FaStethoscope />} to="/rawatjalan" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Rawat Inap" icon={<FaProcedures />} to="/rawatinap" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Terima Pasien" icon={<FaUserInjured />} to="/terima_pasien" collapsed={collapsed} />

                {/* <SubMenuWithTooltip
                    label="Rawat Inap"
                    icon={<FaProcedures />}
                    collapsed={collapsed}
                    open={openSubMenus.rawatInap}
                    onToggle={toggleRawatInap}
                >
                    <MenuItem
                        style={{ paddingLeft: '40px' }}
                        component={<Link to="/rawatinap/terima_pasien" />}
                        icon={<FaBed />}
                    >
                        Terima Pasien Ranap
                    </MenuItem>
                    <MenuItem
                        style={{ paddingLeft: '40px' }}
                        component={<Link to="/rawatinap/data_pasien_ranap" />}
                        icon={<FaUserInjured />}
                    >
                        Data Pasien Ranap
                    </MenuItem>
                </SubMenuWithTooltip> */}

                <MenuItemWithAutoTooltip label="Radiologi" icon={<FaXRay />} to="/radiologi" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Laboratorium" icon={<FaMicroscope />} to="/laboratorium" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Data Obat" icon={<FaPills />} to="/dataobat" collapsed={collapsed} />
            </Menu>
        </Sidebar>
    );
};

export default Sidebar2;
