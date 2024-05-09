import React from 'react'
import { axiosRequest } from '../../../Utils/axiosRequest'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { storeUser } from '../../Redux/loginSlice'

const Navbar = () => {

  const userDetails = useSelector(state => state.userDetails)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

function handleLogout(e){
       e.preventDefault()
       axiosRequest.post(`clearCookie?userId=${userDetails?.userId}`,'',{withCredentials:true}).then(()=>{
              localStorage.clear()
              dispatch(storeUser(null))
              navigate('/login')
             }).catch(err=>console.log(err))
}


  return (
         <div>
                <header>
                       <nav className='nav-top'>
                              <div className='headings--wrapper__nav'>
                                     <div id='logo'><span>Events</span>Zo</div>
                                     <div className='section-title-in-nav'><a href="#Clothing">My Events</a></div>
                                     <div className='section-title-in-nav'><a href="#Accessories">Notification</a></div>
                                     <div className='section-title-in-nav'><a href="#Accessories" onClick={handleLogout}>log out</a></div>
                              </div>

                              <div id="input-wrapper__nav">
                                     <i className="fas fa-search"></i>
                                     <input id="search-box" type="text" name="search" placeholder="Search an event" />
                              </div>
                              <div id="count-profile-wrapper">
                                     <div className='order-count-wrapper'>
                                            <p className="orders-count">1</p>
                                            <i className="fas fa-shopping-cart"></i>
                                     </div>
                                     <div className='profile-wrapper'>
                                            <div id="profile-back-screen"></div>
                                     </div>
                              </div>
                       </nav>
                </header>
         </div>
  )
}

export default Navbar
