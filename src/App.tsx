
import React from 'react';
import './index.scss';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDashboard from './components/MainDashboard/MainDashboard';
import Library from './components/Library/Library';
import Projects from './components/Projects/Projects';


const App: React.FC = () => {


  return (
    <BrowserRouter>
      <div className='flex items-start'>
        <Sidebar />

        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/chat/history" element={<Library />} />
          <Route path="/chat/projects" element={<Projects />} />
        </Routes>
        <Toaster />
      </div >
    </BrowserRouter>

  );
};

export default App;