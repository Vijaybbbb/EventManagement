import React, { useState } from 'react';
import './Admin.css'
import CreateEvent from '../../Component/Admin/CreateEvent';
import UpdateEvent from '../../Component/Admin/UpdateEvent';
import DeleteEvent from '../../Component/Admin/DeleteEvent';

import AdminFooter from '../../Component/Admin/AdminFooter';
import Headder from '../../Component/Admin/Headder';

const Admin = () => {

 const [showCreate,setShowCreate] = useState(false)
 const [showUpdate,setShowUpdate] = useState(false)
 const [showDelete,setShowDelete] = useState(false)


  return (
    <div className='adminPage'>
    <div className="admin">
      <Headder/>
      <nav className="admin__nav">
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#" onClick={()=>{
              setShowCreate(true)
              setShowUpdate(false)
              setShowDelete(false)
              }}>Create Event</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#" onClick={()=>{
              setShowCreate(false)
              setShowUpdate(true)
              setShowDelete(false)
              
              }}>Update Event</a>
          </li>
          
          
        </ul>
      </nav>

    {
      showCreate ? (
        <CreateEvent/>
      ):

      showUpdate ? (
        <UpdateEvent/>
      ):

      showDelete ? (
        <DeleteEvent/>
      ):
      (
        <CreateEvent/>
      )
    }

    
    
    </div>
    </div>
  );
};

export default Admin;
