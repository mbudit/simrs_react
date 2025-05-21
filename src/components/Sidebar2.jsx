import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import {
  FaAmbulance, FaBars, FaHome, FaHospitalUser, FaMicroscope, FaNotesMedical,
  FaPills, FaProcedures, FaStethoscope, FaUserFriends, FaXRay, FaBed, FaUserInjured
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

const MenuItemWithAutoTooltip = ({ label, icon, to, collapsed }) => {
    const tooltipId = `tooltip-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <>
            <div
                data-tooltip-id={tooltipId}
                data-tooltip-content={label}
                style={{ display: 'block' }}
            >
                <MenuItem icon={icon} component={<Link to={to} />}>
                    {label}
                </MenuItem>
            </div>
            {collapsed && <Tooltip id={tooltipId} place="right" />}
        </>
    );
};

const Sidebar2 = ({ collapsed, setCollapsed }) => {
    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
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

                <SubMenu
                    label="Rawat Inap"
                    icon={<FaProcedures />}
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
                </SubMenu>

                <MenuItemWithAutoTooltip label="Radiologi" icon={<FaXRay />} to="/radiologi" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Laboratorium" icon={<FaMicroscope />} to="/laboratorium" collapsed={collapsed} />
                <MenuItemWithAutoTooltip label="Data Obat" icon={<FaPills />} to="/dataobat" collapsed={collapsed} />
            </Menu>
        </Sidebar>
    );
};

export default Sidebar2;
