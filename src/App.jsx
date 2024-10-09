
import './App.css';
import img1 from './images/notes.png';
import img2 from './images/lock.png';
import { Routes, Route, Navigate,useLocation } from 'react-router-dom';
import Page1 from './Page1'; // Ensure the correct case
import NotesPage from './NotesPage';
import React from 'react';


function App() {
 
  const location = useLocation();
  return (
    <div className='bg'> 
   
      <div className='msg'>
      {location.pathname === '/mainpage' && (
        <div className='content'>
          <img src={img1} className='img1'></img>
          <h1 className='pn'>Pocket Notes</h1>
          <p className='p1'>Send and receive messages without keeping your phone online.</p>
          <p className='p2'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
          <img src={img2} className='img2'></img>
          <p className='p3'>end-to-end encrypted</p>
        </div>
            )}
            
      <div className='bg2'></div>
   
      </div>   <div className="main-content">
        <Page1 /> {/* Always render MainPage */}
        <Routes>
          <Route path="/" element={<Navigate to="/mainpage" replace />} /> {/* Redirect root to /mainpage */}
          <Route path="/notes/:groupname/:groupcolor" element={<NotesPage />} />
{/* Dynamic route */}
        </Routes>
      </div>
    </div>
  );
  
}

export default App
