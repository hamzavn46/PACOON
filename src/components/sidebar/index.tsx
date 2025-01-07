import React, { useState } from 'react';
import PlusIcon from '../assests/icons/PlusIcon';
import ArrowRight from '../assests/icons/ArrowRight';
import MoreIcon from '../assests/icons/MoreIcon';
import ModalOption from '../ui/ModalOption';
import CollapseIcon from '../assests/icons/CollapseIcon';
import UserSettingOptions from '../ui/UserSettingOptions';
import LibraryIcon from '../assests/icons/LibraryIcon';
import FileIcon from '../assests/icons/FileIcon';
import FlagIcon from '../assests/icons/FlagIcon';
import AddProjectModal from '../ui/AddProjectModal';
import OpenSidebarIcon from '../assests/icons/OpenSidebarIcon';
import CloseSidebarIcon from '../assests/icons/CloseSidebarIcon';
import LogoIcon from '../assests/icons/LogoIcon';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dotsVisible, setDotsVisible] = useState(false);
    const [options, setOptions] = useState(false);
    const [userSetting, setUserSetting] = useState(false);
    const [plusModal, setPlusModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleUserSettingClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUserSetting(!userSetting);
    };

    const handleClickLibrary = () => {
        navigate('/chat/history');
    }
    const handleClickProjects = () => {
        navigate('/chat/projects');
    }

    return (
        <div
            className={`min-h-screen bg-[#0A0A0A] text-white transition-all duration-300 ease-in-out  ${isOpen ? 'w-[20%]' : 'w-[51px]'
                }`}
        >
            <div className="flex items-center justify-between px-1 py-2">
                <div className={`transition-all duration-300 ease-in-out ${!isOpen ? 'scale-90' : ''}`}>
                    <LogoIcon />
                </div>
                <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {isOpen && (
                        <button
                            className="  text-white p-2 focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <CloseSidebarIcon />
                        </button>
                    )}

                </div>
            </div>
            <div className="px-2 mt-5">
                <button className={`text-white text-sm ring-blue-600 rounded-lg py-2 px-2 bg-[#1F1F22] transition-all duration-300 ease-in-out ${isOpen ? 'w-full' : 'w-full'}`}>
                    <span className={`transition-all duration-300 ease-in-out ${!isOpen ? 'scale-90 ' : ''}`}>
                        {!isOpen ? (<PlusIcon />) : 'New Chats'}
                    </span>
                </button>
            </div>
            <div className='flex flex-col justify-between min-h-[83svh]'>
                <div className={`transition-all duration-300 ease-in-out scrollbar`}>
                    <div className={`flex flex-col py-2 ${!isOpen ? "gap-0.5 " : "gap-1 border-dashed border-b-[1px] border-gray-800 mx-2"}`}>
                        <div className='mx-2 text-center'>
                            <button className={`flex items-center px-2 hover:bg-[#1F1F22] cursor-pointer rounded-lg transition-all w-full duration-300 ease-in-out text-sm ${isOpen ? 'p-2 ' : 'p-3'}`} onClick={() => handleClickLibrary()}>
                                <span className="mr-2 transition-transform duration-300 ease-in-out">
                                    <LibraryIcon />
                                </span>
                                <span className={`ms-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                    Library
                                </span>
                            </button>
                        </div>
                        <div className='mx-2 text-center'>
                            <div className={`flex items-center justify-between px-2 hover:bg-[#1F1F22] cursor-pointer rounded-lg transition-all duration-300 ease-in-out text-sm ${isOpen ? 'p-2' : 'p-3'}`} onMouseEnter={() => setPlusModal(true)}
                                onMouseLeave={() => setPlusModal(false)}
                            >
                                <div className='flex items-center' onClick={() =>
                                    handleClickProjects()}>

                                    <span className="mr-2 transition-transform duration-300 ease-in-out">
                                        <FileIcon />
                                    </span>
                                    <span className={`ms-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                        Projects
                                    </span>
                                </div>
                                <div className='hover:bg-gray-800 py-0.5 px-1 rounded-lg'>
                                    {(plusModal && isOpen) && (
                                        <div onClick={() => setOpenModal(true)}>
                                            <PlusIcon />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {
                            openModal && (
                                <AddProjectModal
                                    isOpen={openModal}
                                    onClose={() => setOpenModal(false)}
                                    onSubmit={(name: string) => {
                                        console.log(name);
                                        setOpenModal(false)
                                    }}
                                />
                            )
                        }


                        <div className='mx-2 text-center'>
                            <div className={`flex items-center px-2 hover:bg-[#1F1F22] cursor-pointer rounded-lg transition-all duration-300 ease-in-out text-sm ${isOpen ? 'p-2' : 'p-3'}`}>
                                <span className="mr-2 transition-transform duration-300 ease-in-out">
                                    <FlagIcon />
                                </span>
                                <span className={`ms-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                    Feedback
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`px-2 mt-2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                        <div>
                            <p className='text-gray-500 text-sm'>
                                Recent Chats
                            </p>
                        </div>
                        <div className={`flex justify-between items-center relative my-1  cursor-pointer  ${options ? 'bg-[#1F1F22]' : ''
                            } hover:bg-[#1F1F22]  rounded-lg ${isOpen ? 'p-2' : 'p-3'} `} onMouseEnter={() => setDotsVisible(true)} onMouseLeave={() => setDotsVisible(false)}>
                            <span className="text-sm">
                                alert-demo
                            </span>
                            <div
                                className={`py-0.5 px-1  rounded-lg  ${options ? 'bg-[#313133]' : 'hover:bg-[#313133] active:bg-[#313133]'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOptions(!options);
                                    setDotsVisible(false);
                                }}
                            >
                                {(dotsVisible || options) &&
                                    <MoreIcon />
                                }
                            </div>
                        </div>

                        <div className='flex items-center text-gray-500 gap-2 px-0.5'>
                            <a href="#" className='hover:underline hover:text-white text-sm'>
                                View all
                            </a>
                            <div>
                                <ArrowRight />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {options && (
                        <ModalOption options={options} setOptions={setOptions} />
                    )}


                    <div className=' flex flex-col gap-1'>
                        <div className='w-full'>
                            {!isOpen && (
                                <button
                                    className="px-4 text-white rounded-md focus:outline-none"
                                    onClick={toggleSidebar}
                                >
                                    <OpenSidebarIcon />
                                </button>
                            )}
                        </div>
                        <div className=''>
                            <div
                                className={`flex items-center justify-between hover:bg-[#1D1D1D] mx-1 px-1 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${isOpen ? 'py-1' : ''}`}
                                onClick={handleUserSettingClick}
                            >
                                <div className='flex items-center gap-2 '>
                                    <img src="https://vercel.com/api/www/avatar/fOOEVzSeJjS9WQrevoIGnHzH?s=64" className='w-9 h-9 rounded-lg transition-transform duration-300 ease-in-out' />
                                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                        <p className='text-sm'>John Doe</p>
                                        <p className='text-xs text-gray-500'>Free</p>
                                    </div>
                                </div>
                                {isOpen &&
                                    <div className='pe-2'>
                                        <CollapseIcon />
                                    </div>
                                }
                            </div>

                            {userSetting && (
                                <UserSettingOptions
                                    userSetting={userSetting}
                                    setUserSetting={setUserSetting}
                                />
                            )}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Sidebar;
