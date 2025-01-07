import React from 'react'
import { chats } from '../../dummy/dummy'
import LogoIcon from '../assests/icons/LogoIcon'
import LikeIcon from '../assests/icons/LikeIcon'
import UnlikeIcon from '../assests/icons/UnlikeIcon'
import CopyIcon from '../assests/icons/CopyIcon'
import toast from 'react-hot-toast'
interface DashboardProps {
    closeCodeEditor: boolean;
};
const AllChatsShow: React.FC<DashboardProps> = ({ closeCodeEditor }) => {
    const handleCopy = (e: any) => {
        navigator.clipboard.writeText(e)
            .then(() => {
                toast.success('Copied to clipboard!');
            })
            .catch(err => {
                toast.error('Failed to copy text:');
                console.error('Failed to copy text:', err);
            });
    };
    return (
        <div className={`${closeCodeEditor == false ? " min-w-[30%]  max-w-[45%]" : "w-full"} bg-[#0F0F10] text-white`}>
            <div className='p-4 bg-[#0F0F10]'>
                Tkinter dashboard
            </div>
            <div className={`${closeCodeEditor == false ? "w-full" : "mx-auto"} px-2 h-[90svh] scrollbar overflow-y-scroll`} >
                <div className={`${closeCodeEditor == false ? "w-full" : "w-[55%] mx-auto"}`}>
                {chats.map((chat, index) => (
                    <div
                        key={index}
                        className={`mb-3 p-3 `}
                    >
                        {/* Author */}
                        <div className='flex  gap-2'>
                            <strong>
                                {chat.author === "User" ?
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-green-400 to-blue-500"></div>
                                    : (
                                        <div className='w-full'>
                                            <LogoIcon width={28} height={28} />
                                        </div>
                                    )}
                            </strong>

                            {/* Message */}
                            <div>
                                <p className=" text-sm">{chat.message}</p>
                                <div className='flex items-center gap-1 mt-2'>
                                    <button className='flex items-center gap-1 px-1.5 py-1 bg-[#1f1f22] rounded-lg cursor-pointer'
                                        onClick={() => handleCopy(chat.message)} >
                                        <div><CopyIcon /></div>
                                        <div className='text-sm'>Copy</div>
                                    </button>
                                    <div className='px-1.5 py-1 bg-[#1f1f22] cursor-pointer rounded-lg' onClick={() => toast.success("Thanks for your feedback! 🙏")}>
                                        <div className='hover:-rotate-12 transition-all duration-300'>
                                            <LikeIcon />
                                        </div>
                                    </div>
                                    <div className='px-1.5 py-1 bg-[#1f1f22] cursor-pointer rounded-lg'>
                                        <div className='hover:rotate-12 transition-all duration-300'>
                                            <UnlikeIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                ))}

                </div>
            </div>
        </div>
    )
}

export default AllChatsShow
