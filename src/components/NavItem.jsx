import React from 'react';

const NavItem = ({
    icon,
    text,
    isOpen,
    setIsOpen
}) => {
    return (
        <div className='flex items-center gap-5 cursor-pointer w-full hover:text-blue-400'>
            <span
                onClick={() => setIsOpen((prev) => !prev)} 
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
    );
}

export default NavItem;
