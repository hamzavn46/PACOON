import React from 'react'
import FolderIcon from '../assests/icons/FolderIcon'

const Projects = () => {
    return (
        <div className="w-full bg-[#0F0F10] min-h-screen overflow-y-hidden">
            <div className='border-b-[1px] py-3 px-4 border-solid border-[#ffffff14] '>
                <h2 className="text-lg font-semibold text-white">Projects</h2>
            </div>
            <div className="w-full p-5 text-white ">
                <div className='bg-[#141415] h-[85svh] border-[1px] border-solid border-[#ffffff14] rounded-xl flex flex-col items-center justify-center gap-4'>
                    <div className='bg-[#141415] border-[#262627] border-solid border-[1px] p-3 rounded-lg'>
                        <FolderIcon />
                    </div>
                    <div className='text-lg font-semibold'>
                        No Projects Created
                    </div>
                    <div className='text-lg text-[#888890] font-medium'>
                        Start creating a new project to chat with resources.
                    </div>
                    <div>
                        <button className='bg-white text-black px-4 py-2 rounded-lg'>
                            New Projects
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
