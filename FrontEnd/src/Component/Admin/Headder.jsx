import React from 'react'
import {storeAdmin} from '../../Redux/adminLoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


const Headder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()



  function handleLogout(e){
    e.preventDefault()
    dispatch(storeAdmin(null))
    localStorage.clear()
    navigate('/adminLogin')
  }

  

  return (

      <header className="admin__header">
        <a href="#" className="logo">
          <h1>Eventszo Admin</h1>
        </a>
        <div className="toolbar" onClick={handleLogout}>
         log out 
        </div>
      </header>
   
  )
}

export default Headder
