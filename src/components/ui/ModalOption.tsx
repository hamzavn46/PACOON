import React, { useEffect, useRef } from 'react'
import RenameIcon from '../assests/icons/RenameIcon';
import FavouriteIcon from '../assests/icons/FavouriteIcon';
import DeleteIcon from '../assests/icons/DeleteIcon';
import ShareIcon from '../assests/icons/ShareIcon';

interface ModalOptionProps {
    options: boolean;
    setOptions: (value: boolean) => void;
}

const ModalOption: React.FC<ModalOptionProps> = ({ options, setOptions }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setOptions]);

    return (
        <div
            ref={modalRef}
            className={`absolute  top-48 left-56 mt-2 w-48 bg-[#141415] text-white shadow-lg rounded-lg z-50 transition-all duration-200 ease-in-out ${options
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
        >
            <ul className="p-2">
                <li className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => setOptions(false)}>
                    <span className="material-icons-outlined mr-2"><ShareIcon /></span> Share
                </li>
                <li className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => setOptions(false)}>
                    <span className="material-icons-outlined mr-2"><RenameIcon /></span> Rename
                </li>
                <li className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => setOptions(false)}>
                    <span className="material-icons-outlined mr-2"><FavouriteIcon /></span> Favorite
                </li>
                <li className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer text-red-500" onClick={() => setOptions(false)}>
                    <span className="material-icons-outlined mr-2"><DeleteIcon /></span> Delete
                </li>
            </ul>
        </div>
    );
};

export default ModalOption
