import React, { useState, useEffect, useRef } from 'react'
import DoubleArrow from '../assests/icons/DoubleArrow'
import PreviewIcon from '../assests/icons/PreviewIcon'
import CodeIcon from '../assests/icons/CodeIcon'
import ConsoleIcon from '../assests/icons/ConsoleIcon'
import ReturnBackIcon from '../assests/icons/ReturnBackIcon'
import ReaturnForward from '../assests/icons/ReaturnForward'
import CodeBaseIcon from '../assests/icons/CodeBaseIcon'
import CopyLinkIcon from '../assests/icons/CopyLinkIcon'
import BackIcon from '../assests/icons/BackIcon'
import ForwardIcon from '../assests/icons/ForwardIcon'
import ReloadIcon from '../assests/icons/ReloadIcon'
import NewtabIcon from '../assests/icons/NewtabIcon'
import FullScreenIcon from '../assests/icons/FullScreenIcon'
import FolkIcon from '../assests/icons/FolkIcon'
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from 'react-hot-toast'
import ZipIcon from '../assests/icons/ZipIcon'
import { InfoIcon } from 'lucide-react'
import XIcon from '../assests/icons/XIcon'
import RedditIcon from '../assests/icons/RedditIcon'
import HackerNewsIcon from '../assests/icons/HackerNewsIcon'

const EditorNavbar = ({ closeCodeEditor, setCloseCodeEditor }) => {
    const [isCodebaseModalOpen, setIsCodebaseModalOpen] = useState(false);
    const [isCopyLinkModalOpen, setIsCopyLinkModalOpen] = useState(false);
    const codebaseModalRef = useRef(null);
    const copyLinkModalRef = useRef(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText('npx shadcn@latest add "https://v0.dev/chat/b/b_EFy789nUOWP"')
        toast.success('Copied to clipboard')
    }
    const handleCopyCode = () => {
        navigator.clipboard.writeText('https://v0.dev/chat/2vYManNrbrL?b=b_EFy789nUOWP')
        toast.success('Copied to clipboard')
    }

    const toggleCodebaseModal = (event) => {
        event.stopPropagation();
        setIsCodebaseModalOpen(!isCodebaseModalOpen);
        if (isCopyLinkModalOpen) setIsCopyLinkModalOpen(false);
    };

    const toggleCopyLinkModal = (event) => {
        event.stopPropagation();
        setIsCopyLinkModalOpen(!isCopyLinkModalOpen);
        if (isCodebaseModalOpen) setIsCodebaseModalOpen(false);
    };

    // Close modal when clicked outside
    const handleClickOutside = (event) => {
        // Close the codebase modal if clicked outside and not toggling it
        if (codebaseModalRef.current && !codebaseModalRef.current.contains(event.target) && isCodebaseModalOpen) {
            setIsCodebaseModalOpen(false);
        }

        // Close the copy link modal if clicked outside and not toggling it
        if (copyLinkModalRef.current && !copyLinkModalRef.current.contains(event.target) && isCopyLinkModalOpen) {
            setIsCopyLinkModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCodebaseModalOpen, isCopyLinkModalOpen]);


    return (
        <>
            <div className="relative flex flex-col bg-[#0F0F10]">

                <div
                    className={`fixed top-0 width-fill-available ${closeCodeEditor === false ? 'grow-1' : 'w-0'} 
                bg-[#0F0F10] px-1 py-2 flex justify-between `}
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <button
                                className="text-white hover:bg-[#1f1f22] p-1 rounded-lg"
                                onClick={() => setCloseCodeEditor(true)}
                            >
                                <DoubleArrow />
                            </button>
                            <div className="flex gap-1 overflow-x-scroll">
                                <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                                    <PreviewIcon />
                                    <p className="text-sm">Preview</p>
                                </button>
                                <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                                    <CodeIcon />
                                    <p className="text-sm">Code</p>
                                </button>
                                <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                                    <ConsoleIcon />
                                    <p className="text-sm">Console</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2" >
                        <span className="bg-[#042F2E] text-xs font-medium me-2 px-2.5 py-0.5 rounded-[40px] text-white" data-tooltip-id="latest">
                            latest
                        </span>
                        <div >
                            <button className="flex items-center gap-1 text-white bg-[#1f1f22] p-1 rounded-lg tex-sm" data-tooltip-id="back">
                                <ReturnBackIcon />
                            </button>
                        </div>
                        <div>
                            <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm" data-tooltip-id="forward">
                                <ReaturnForward />
                            </button>
                        </div>
                        <div className="bg-[#1f1f22] shrink-0 w-[1px] mx-1.5 h-[22px]"></div>
                        <button
                            className="text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm"
                            data-tooltip-id="Codebase"
                            onClick={toggleCodebaseModal}
                        >
                            <CodeBaseIcon />
                        </button>


                        <button
                            className="text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm"
                            data-tooltip-id="Copylink"
                            onClick={toggleCopyLinkModal}
                        >
                            <CopyLinkIcon />
                        </button>

                        <div>
                            <button className="flex items-center gap-1 px-3 text-white bg-[#1f1f22] p-1 rounded-lg tex-sm">
                                <FolkIcon />
                                <p className="text-sm">Folk</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="fixed top-12 bg-[#0F0F10] px-1 py-2 width-fill-available flex">
                    <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                        <BackIcon />
                    </button>
                    <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                        <ForwardIcon />
                    </button>
                    <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm">
                        <ReloadIcon />
                    </button>

                    <input
                        type="text"
                        className="mx-1 h-6 min-w-0 flex-1 rounded-sm border border-gray-600 bg-[#000000] px-1.5 text-white outline-none"
                        value="/"
                    />

                    <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm" data-tooltip-id="Newtab">
                        <NewtabIcon />
                    </button>
                    <button className="flex items-center gap-1 text-white hover:bg-[#1f1f22] p-1 rounded-lg tex-sm" data-tooltip-id="Fullscreen">
                        <FullScreenIcon />
                    </button>
                </div>
            </div>

            <ReactTooltip
                id="latest"
                place="bottom"
                content="This is your latest version"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="back"
                place="bottom"
                content="View previous version"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="forward"
                place="bottom"
                content="View next version"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="Codebase"
                place="bottom"
                content="Add to Codebase"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="Copylink"
                place="bottom"
                content="Copy Link"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="Newtab"
                place="bottom"
                className='z-50 !bg-white !text-black '
            >
                <p className='text-center text-base font-semibold'>
                    Open in new tab
                </p>
                <p className='text-[#29292ea8] text-center leading-none text-wrap text-sm '>
                    This link is insecure and can <br /> expose your code and data
                </p>
            </ReactTooltip>

            <ReactTooltip
                id="Fullscreen"
                place="bottom"
                content="Fullscreen"
                className='z-50 !bg-white !text-black'
            />

            {isCodebaseModalOpen && (
                <div ref={codebaseModalRef} className="bg-[#0F0F10] absolute top-10 right-28 text-white  rounded-lg shadow-lg border border-gray-700">
                    <div className='p-4'>
                        <h3 className="text-lg font-semibold mb-2">Add to Codebase</h3>
                        <p className="text-sm mb-4">
                            Run this command to add this Block to your codebase.
                        </p>
                        <div className="flex items-center bg-[#1f1f22] rounded-lg p-2 gap-2">
                            <code className="text-sm text-[#00E5FF] font-mono flex-1">
                                npx shadcn add "https://v0.de..."
                            </code>
                            <button className="text-[#00E5FF] hover:text-white" onClick={() => handleCopyLink()}>
                                <CopyLinkIcon />
                            </button>
                        </div>
                    </div>
                    <div className='bg-[#0F0F10] border-t border-gray-700 rounded-b  mt-4'>
                        <div className='p-2 w-full'>
                            <button className="text-sm w-full text-white py-1 px-3 rounded-lg flex items-center gap-2">
                                <ZipIcon />
                                Download ZIP
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCopyLinkModalOpen && (
                <div ref={copyLinkModalRef} className="bg-black absolute top-10 right-24 text-white p-4 rounded-lg w-[450px] shadow-lg border border-gray-700">
                    {/* Link Section */}
                    <div className="dropdown-content">
                        <div className="flex items-center bg-[#1f1f22] rounded-lg p-2 gap-2">
                            <code className="text-sm text-[#00E5FF] font-mono flex-1 truncate">
                                https://v0.dev/chat/2vYManNrbrL?b=b_EFy789nUOWP
                            </code>
                            <button
                                className="text-[#00E5FF] hover:text-white"
                                onClick={() => handleCopyCode()}
                            >
                                <CopyLinkIcon />
                            </button>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex items-start gap-2 p-3 bg-[#1f1f22] my-4 rounded-lg">
                        <InfoIcon className="text-[#FFA726] mt-1" />
                        <div className="text-sm leading-5">
                            Viewers will have access to all code in this chat, including API keys
                            and credentials.
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-3">Share</h4>
                        <div className="flex gap-2 w-full">
                            {/* X Platform Button */}
                            <button className="bg-[#1f1f22] w-full px-auto flex justify-center p-2 rounded-lg hover:bg-[#29292e]" data-tooltip-id="Xicon">
                                <XIcon />
                            </button>
                            {/* Reddit Button */}
                            <button className="bg-[#1f1f22] w-full px-auto flex justify-center p-2 rounded-lg hover:bg-[#29292e]" data-tooltip-id="RedditIcon">
                                <RedditIcon />
                            </button>
                            {/* Hacker News Button */}
                            <button className="bg-[#1f1f22] w-full px-auto flex justify-center p-2 rounded-lg hover:bg-[#29292e]" data-tooltip-id="HackerNewsIcon">
                                <HackerNewsIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReactTooltip
                id="Xicon"
                place="bottom"
                content="Share on X"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="RedditIcon"
                place="bottom"
                content="Share on Reddit"
                className='z-50 !bg-white !text-black'
            />
            <ReactTooltip
                id="HackerNewsIcon"
                place="bottom"
                content="Share on Hacker News"
                className='z-50 !bg-white !text-black'
            />
        </>

    )
}

export default EditorNavbar
