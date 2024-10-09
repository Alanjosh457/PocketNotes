import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import img3 from './images/send.png';
import img8 from './images/Mask group.png';

const NotesPage = () => {
  const { groupname, groupcolor } = useParams();
  const [note, setNote] = useState('');
  const [submittedNotes, setSubmittedNotes] = useState([]);

  const handleSendClick = () => {
    if (note.trim() !== '') {
      const now = new Date();
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = now.toLocaleDateString('en-GB', options); 
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); 
      

      setSubmittedNotes([...submittedNotes, { text: note, date,time}]); 
      setNote(''); // 
    }
  };

  const getInitials = (name) => {
    const dispname = name.trim().split(' ');
    if (dispname.length === 1) {
      return dispname[0][0].toUpperCase();
    }
    return `${dispname[0][0].toUpperCase()}${dispname[1][0].toUpperCase()}`;
  };

  const loadNotes = () => {
    const storedNotes = localStorage.getItem(groupname);
    return storedNotes ? JSON.parse(storedNotes) : [];
  };

  useEffect(() => {
    setSubmittedNotes(loadNotes());
  }, [groupname]);

  useEffect(() => {
    if (submittedNotes.length > 0) {
      localStorage.setItem(groupname, JSON.stringify(submittedNotes));
    }
  }, [submittedNotes, groupname]);

  return (
    <div className='notesContainer'>
      <div className='headcon'>
        <div
          style={{
            backgroundColor: groupcolor,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: '500',
            fontSize: '30px',
            marginRight: '10px',
            padding: '15px'
          }}
        >
          {getInitials(groupname)}
        </div>
        <h1 className='gn'>{groupname}</h1>
      </div>

      <div className='messages'>
        {submittedNotes.map((submittedNote, index) => (
          <div key={index} className='messageContainer'>
            <p className='messageText'>{submittedNote.text}</p>
            <div className='timestamp'>
            <p className='date'>{submittedNote.date}</p>
            <p className='dot'>●</p>
            <p className='time'>{submittedNote.time}</p> 
            </div>
          </div>
        ))}
      </div>

      <div className='txbox'>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className='txtarea'
          placeholder="Type your message..."
        ></textarea>
      </div>

      <div className='bcon'>
        <button onClick={handleSendClick} className='sendBtn'>
        <img src={note.trim() !== '' ? img8 : img3} className='img5' alt="Send"></img>
        
        </button>
      </div>
    </div>
  );
};

export default NotesPage;
