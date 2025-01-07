import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '../assests/icons/SearchIcon';
import { librarydata } from '../../dummy/dummy';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../assests/icons/CommentIcon';
import MoreIcon from '../assests/icons/MoreIcon';
import ShareIcon from '../assests/icons/ShareIcon';
import RenameIcon from '../assests/icons/RenameIcon';
import FavouriteIcon from '../assests/icons/FavouriteIcon';
import DeleteIcon from '../assests/icons/DeleteIcon';

const Library = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null); // Tracks the open dropdown by ID
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null); // Close dropdown when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const data = librarydata;

  return (
    <div className="w-full bg-[#0F0F10] min-h-screen overflow-y-hidden">
      <div className="w-full flex items-center gap-2 justify-start text-white px-3 py-4">
        {/* Library Sidebar */}
        <h2 className="text-lg font-semibold">Library</h2>
        <div className="flex gap-1 justify-start">
          <button
            onClick={() => handleTabClick('chats')}
            className={`text-sm leading-3 p-2.5 rounded-lg cursor-pointer ${activeTab === 'chats' ? 'bg-[#1f1f22]' : 'bg-transparent'
              }`}
          >
            Chats
          </button>
          <button
            onClick={() => handleTabClick('blocks')}
            className={`text-sm leading-3 p-2.5 rounded-lg cursor-pointer ${activeTab === 'blocks' ? 'bg-[#1f1f22]' : 'bg-transparent'
              }`}
          >
            Blocks
          </button>
        </div>
      </div>

      <div className="mb-4 bg-[#0F0F10] ring-0 outline-none border-y-[1px]  border-solid border-[#ffffff14] flex items-center px-4">
        <SearchIcon />
        <input
          type="text"
          className="w-full bg-[#0F0F10] ring-0 outline-none text-white p-3"
          placeholder={`Search for a ${activeTab === 'chats' ? 'chat...' : 'block...'}`}
        />
      </div>

      <div className="w-full h-[80svh] overflow-y-scroll text-white p-4">
        {/* Main Content */}
        <div className="space-y-4">
          {activeTab === 'chats' && (
            // Chat List Content
            <>
              {data.map((item: any, index: number) => (
                <>
                  <div key={item.id} className="flex flex-col  bg-[#141415] p-4 rounded-xl cursor-pointer border-[#262627] border-solid border-[1px]  relative" >
                    <div>
                      <div className="flex flex-col " onClick={() => {
                        console.log('Chat clicked')
                        navigate('/')
                      }}>
                        {/* Placeholder for the user avatar */}
                        <span className="text-sm font-bold">{item.title}</span>
                        <span className="text-sm font-normal text-[#888890]">{item.note}</span>
                      </div>
                      <hr
                        className='border-[#262627] border-solid border-[1px] my-3'
                      />

                      <div className="flex items-center gap-1.5 text-gray-400 ">
                        <div className="w-[17px] h-[17px] rounded-[5px] bg-gradient-to-r from-green-400 to-blue-500"></div>
                        <span className="text-sm font-semibold text-white">{item.user}</span>
                        <span className="text-sm text-[#888890]">{item.time}</span>
                      </div>
                    </div>

                    <div
                      className={`absolute right-4 bottom-3 z-50 p-2  rounded-lg  ${openDropdownId === item.id ? 'bg-[#313133]' : 'hover:bg-[#313133] active:bg-[#313133]'
                        }`}
                      onClick={() => {
                        setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                      }}
                    >
                      <MoreIcon />
                    </div>

                    {openDropdownId === item.id && (
                      <div
                        ref={modalRef}
                        className="absolute -bottom-32  right-14  mt-2 w-48 bg-[#141415] text-white shadow-xl rounded-lg z-50 transition-all duration-200 ease-in-out opacity-100 translate-y-0"
                      >
                        <ul className="p-2">
                          <li
                            className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700  rounded-md cursor-pointer"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            <ShareIcon /> Share
                          </li>
                          <li
                            className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700  rounded-md cursor-pointer"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            <RenameIcon /> Rename
                          </li>
                          <li
                            className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700  rounded-md cursor-pointer"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            <FavouriteIcon /> Favorite
                          </li>
                          <li
                            className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700  rounded-md cursor-pointer text-red-500"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            <DeleteIcon /> Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div >
                </>
              ))}
            </>
          )}

          {activeTab === 'blocks' && (
            // Blocks List Content (you can customize this part as needed)
            <div className="w-full  text-white ">
              <div className='bg-[#141415] h-[75svh] rounded-xl flex flex-col items-center justify-center gap-5'>
                <div className='bg-[#141415] border-[#262627] border-solid border-[1px] p-3 rounded-lg'>
                  <CommentIcon />
                </div>
                <div className='text-lg font-semibold'>
                  No Blocks Created
                </div>
                <div>
                  <button className='bg-white text-black px-4 py-2 rounded-lg'>
                    New Chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Library;
