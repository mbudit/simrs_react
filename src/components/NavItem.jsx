import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({
    routerLink,
    icon,
    text,
    isOpen,
    setIsOpen
}) => {
    return (
        <Link
            to={`${routerLink}`}
            className='w-full'

        >
            <div className='flex items-center gap-5 cursor-pointer w-full hover:text-blue-400'>
                <span
                    
                    // onClick={() => setIsOpen((prev) => !prev)}  
                    data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                    data-tooltip-content={!isOpen ? text : undefined}
                    className='text-2xl'
                >
                    {icon}
                </span>
                {isOpen && (
                    <div>
                        {text}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default NavItem;
