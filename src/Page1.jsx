
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
const Page1 = () => {
  const [popup, setPopup] = useState(false);
  const [groupname, setGroupname] = useState('');
  const [grouplist, setGrouplist] = useState([]);
  const [selectcolor, setColor] = useState('#B38BFA');
  const popupRef = useRef(null);
  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
  const navi = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const storedgroups = localStorage.getItem('grouplist')
    if (storedgroups) {
      setGrouplist(JSON.parse(storedgroups))
    }
  }, [])
  useEffect(() => {
    if (grouplist.length > 0) {
      localStorage.setItem('grouplist', JSON.stringify(grouplist))
    }
  }, [grouplist])
  const openpopup = () => {
    setPopup(true);
  };

  const OutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopup(false);
    }
  };

  const handlegroup = () => {
    if (groupname) {
      setGrouplist([...grouplist, { name: groupname, color: selectcolor }]);
      setGroupname('');
      setColor('#B38BFA');
      setPopup(false);
    }
  };

  const getInitials = (name) => {
    const dispname = name.trim().split(' ');
    if (dispname.length === 1) {
      return dispname[0][0].toUpperCase();
    }
    return `${dispname[0][0].toUpperCase()}${dispname[1][0].toUpperCase()}`;
  };

  useEffect(() => {
    if (popup) {
      document.addEventListener('mousedown', OutsideClick);
    } else {
      document.removeEventListener('mousedown', OutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', OutsideClick);
    };
  }, [popup]);

  const direct = (group) => {
    if (isMobile) {
      // Redirect to notes page directly on mobile
      navi(`/notes/${encodeURIComponent(group.name)}/${encodeURIComponent(group.color)}`);
    }

    navi(`/notes/${encodeURIComponent(group.name)}/${encodeURIComponent(group.color)}`); // Pass the group name dynamically
  };
  const isNotesPage = location.pathname.startsWith('/notes');
  return (
    <div className="mainpage">
      <div className="p" style={{ marginTop: isNotesPage ? '-65px' : '40px' }}>Pocket Notes</div>
      <div>
        <ul
          style={{
            maxHeight: '600px', // Set a maximum height
            overflowY: 'auto', // Enable vertical scrollbar
            padding: '0',
            margin: '0',
            listStyleType: 'none', // Remove bullet points
            border: '0px solid #ccc', // Optional: Add border for better UI
            paddingRight: '10px', // Prevent content from hiding under the scrollbar
            marginTop: isNotesPage ? '-5px' : '100px',
            position: 'fixed',
          }}
        >
          {grouplist.map((group, index) => (
            <li onClick={() => direct(group)}
              key={index}
              style={{
                margin: '20px 0', // Add vertical gap between items
                display: 'flex',
                alignItems: 'center',
              }}
              className="groups"
            >
              <div
                style={{
                  backgroundColor: group.color,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '25px',
                  marginRight: '10px', // Add some space between the circle and name
                  padding: '16px'
                }}
              >
                {getInitials(group.name)}
              </div>
              <div className='grouper' style={{ fontSize: '20px', fontWeight: 'bold' }} onClick={() => direct(group)}>{group.name}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="adder" onClick={openpopup}>
        <button className="add">+</button>
      </div>

      {popup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <h3 className="create">Create New Group</h3>
            <input
              type="text"
              value={groupname}
              onChange={(e) => setGroupname(e.target.value)}
              placeholder="Enter Group Name"
              className="textbox1"
            />
            <h3 className="groupname">Group Name</h3>
            <h3 className="choose">Choose Color</h3>
            <div className="color-picker">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setColor(color)}
                  style={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    margin: '5px',
                    cursor: 'pointer',
                    border: selectcolor === color ? '1px solid black' : 'none',
                  }}
                />
              ))}
            </div>
            <button onClick={handlegroup} className="createbtn">Create</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page1