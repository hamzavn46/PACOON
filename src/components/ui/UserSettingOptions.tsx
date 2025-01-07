import React, { useEffect, useRef, useState } from 'react'
import CardIcon from '../assests/icons/CardIcon';
import SettingIcon from '../assests/icons/SettingIcon';
import LogoutIcon from '../assests/icons/LogoutIcon';
import ChevronIcon from '../assests/icons/ChevronIcon';
import SystemIcon from '../assests/icons/SystemIcon';
import LightTheme from '../assests/icons/LightTheme';
import DarkThemIcon from '../assests/icons/DarkThemIcon';

type ThemeType = 'system' | 'light' | 'dark';

interface ModalOptionProps {
    userSetting: boolean;
    setUserSetting: (value: boolean) => void;
}

const UserSettingOptions: React.FC<ModalOptionProps> = ({ userSetting, setUserSetting }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', name: 'English' });
    const languageRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<ThemeType>('system');
    const themeRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'Arabic' }
    ];

    const themes: ThemeType[] = ['system', 'light', 'dark'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setUserSetting(false);
            }
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setIsLanguageOpen(false);
            }
            if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
                // setIsThemeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setUserSetting]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-transparent ${userSetting ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                onClick={() => setUserSetting(false)}
            />
            <div
                ref={modalRef}
                className={`absolute bottom-20 left-2 mt-2 w-80 bg-[#141415] text-white shadow-lg rounded-lg transition-all duration-300 ease-in-out z-50 ${userSetting
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className=''>
                    <div className='mb-1 px-3 py-2'>
                        <p className='text-sm text-gray-400'>ranazyanak47@gmail.com</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center mb-2 px-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-blue-500"></div>
                        <div className="ml-3">
                            <p className="text-sm font-bold">zaini47</p>
                            <p className="text-xs text-gray-400">Free</p>
                        </div>
                    </div>
                    {/* Button */}
                    <div className='px-3'>
                        <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 ">
                            Switch Team
                        </button>

                    </div>
                    {/* Options */}
                    <ul className="space-y-1 border-y-[1px] my-2 border-solid px-3 py-2 border-[#27282d]">
                        <li className="flex items-center cursor-pointer text-sm hover:bg-gray-800 p-2 rounded-md">
                            <span className="mr-2">
                                <CardIcon />
                            </span> Billing
                        </li>
                        <li className="flex items-center cursor-pointer text-sm hover:bg-gray-800 p-2 rounded-md">
                            <span className="mr-2">
                                <SettingIcon />
                            </span> Settings
                        </li>
                        <li className="flex items-center cursor-pointer text-sm hover:bg-gray-800 p-2 rounded-md">
                            <span className="mr-2">
                                <LogoutIcon />
                            </span> Sign Out
                        </li>
                    </ul>
                    {/* Preferences */}
                    <div className="mt-4 px-3 py-2 pt-4">
                        <p className="text-sm text-gray-400 mb-2">Preferences</p>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm">Theme</span>
                            <div className="flex bg-[#1f1f22] p-0.5 rounded-full">
                                {themes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`py-1 px-1.5  rounded-full transition-all duration-200 text-sm ${theme === t
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <span>
                                            {t === 'system' && (<SystemIcon />)}
                                            {t === 'light' && (<LightTheme />)}
                                            {t === 'dark' && (<DarkThemIcon />)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Language */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Language</span>
                            <div className="relative" ref={languageRef}>
                                <button
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className="bg-[#1f1f22] text-white text-sm p-2 rounded-md flex items-center justify-between min-w-[100px]"
                                >
                                    <span>{selectedLanguage.name}</span>
                                    <span className={`transform transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}>
                                        <ChevronIcon />
                                    </span>
                                </button>

                                {isLanguageOpen && (
                                    <div className="absolute right-0 mt-1 w-full bg-[#1f1f22] rounded-md shadow-lg z-50">
                                        {languages.map((lang) => (
                                            <div
                                                key={lang.code}
                                                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-700 ${selectedLanguage.code === lang.code ? 'bg-gray-700' : ''
                                                    }`}
                                                onClick={() => {
                                                    setSelectedLanguage(lang);
                                                    setIsLanguageOpen(false);
                                                }}
                                            >
                                                {lang.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Upgrade Plan */}
                <div className='p-2 border-[1px] border-t border-[#27282d] rounded-b-lg'>
                    <button className="w-full bg-white text-black py-2 mt-4 rounded-md ">
                        Upgrade Plan
                    </button>

                </div>
            </div>
        </>
    );
}

export default UserSettingOptions
