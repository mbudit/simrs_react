import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { menuItems } from '../data';
import NavItem from './NavItem';
import { Tooltip } from 'react-tooltip';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <motion.div
                initial={{ width: 60 }}
                animate={{ width: isOpen ? 240 : 60 }}
                transition={{ duration: 0.4 }}
                className='bg-gray-900 h-screen text-white p-4 flex flex-col gap-6'
            >
                <div className='flex'>
                    <button className='text-2xl mb-4' onClick={() => setIsOpen(prev => !prev)}>
                        <FaBars />
                    </button>
                </div>

                <nav className={`flex flex-col gap-10 h-full overflow-y-auto ${!isOpen && 'no-scrollbar'} `}>
                    {menuItems.map((item, index) => (
                        <NavItem
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    ))}
                </nav>
            </motion.div>
            {!isOpen && <Tooltip id='sidebar-tooltip' offset={40} />}
        </div>
    );
}

export default Sidebar;
