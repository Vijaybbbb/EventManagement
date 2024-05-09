import React from 'react';
import './Admin.css'
import CreateEvent from '../../Component/Admin/CreateEvent';
import AdminFooter from '../../Component/Admin/AdminFooter';
import Headder from '../../Component/Admin/Headder';

const Admin = () => {
  return (
    <div className="admin">
      <Headder/>
      <nav className="admin__nav">
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#">Create Event</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">Update Event</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">Delete Event</a>
          </li>
          
        </ul>
      </nav>
      <CreateEvent/>
    
    </div>
  );
};

export default Admin;
