
import React from 'react';
import './index.scss';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './components/sidebar/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Library from './components/library';
import Projects from './components/projects';
import Dashboard from './components/Dashboard';


const App: React.FC = () => {


  return (
    <BrowserRouter>
      <div className='flex items-start'>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard emotions={[]} transcription="" llmResponse="" />} />
          <Route path="/chat/history" element={<Library />} />
          <Route path="/chat/projects" element={<Projects />} />
        </Routes>
        <Toaster />
      </div >
    </BrowserRouter>

  );
};

export default App;