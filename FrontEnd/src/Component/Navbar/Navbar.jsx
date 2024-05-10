import React, { useState } from 'react'
import { axiosRequest } from '../../../Utils/axiosRequest'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { storeUser } from '../../Redux/loginSlice'
import { faArrowUpWideShort, faFilterCircleDollar, faFilterCircleXmark, faSort, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({setSearchText,setSortOption}) => {

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

function getSearchText(e){
       e.preventDefault()
       setSearchText(e.target.value)

}

  return (
         <div>
                <header>
                       <nav className='nav-top'>
                              <div className='headings--wrapper__nav'>
                                     <div id='logo'><span>Events</span>Zo</div>
                                     <div className='section-title-in-nav'  onClick={(e)=>{
                                          e.preventDefault()
                                          navigate('/myTickets')}}
                                          ><a href="#Clothing">My Tickets</a></div>
                                     <div className='section-title-in-nav'><a href="#Accessories">Notification</a></div>
                                     <div className='section-title-in-nav'><a href="#Accessories" onClick={handleLogout}>log out</a></div>
                              </div>

                              <div id="input-wrapper__nav">
                                     <i className="fas fa-search"></i>
                                     <input id="search-box" type="text" name="search" placeholder="Search an event" onChange={getSearchText}/>
                              </div>
                              <div id="count-profile-wrapper" style={{gap:"25px"}}>
                                     
                                     <div>
                                            
                                            <div className="option-list">
                                            <FontAwesomeIcon icon={faSortAmountDown} />

                                                   <select
                                                          name=''
                                                          id="eventType"
                                                          tabIndex="1"
                                                          required
                                                          autoFocus
                                                          onChange={(e) => {
                                                               setSortOption(e.target.value)
                                                          }}
                                                   >
                                                          <option value="near">Nearest Date</option>
                                                          <option value="far">Farest Date</option>
                                                          
                                                          {/* Add more options as needed */}
                                                   </select>
                                            </div>
                                     </div>
                                     <div>
                                            
                                            <div className="option-list">
                                            <FontAwesomeIcon icon={faFilterCircleDollar} />

                                                   <select
                                                          name=''
                                                          id="eventType"
                                                          tabIndex="1"
                                                          required
                                                          autoFocus
                                                          onChange={(e) => {
                                                                 // Handle selection change here
                                                          }}
                                                   >
                                                          <option value="">Select Event Type</option>
                                                          <option value="Hotel">Science</option>
                                                          <option value="Apartment">Technology</option>
                                                          <option value="Resort">Money & Economy</option>
                                                          <option value="Villa">Foods exhibition</option>
                                                          <option value="Cabin">Education</option>
                                                          {/* Add more options as needed */}
                                                   </select>
                                            </div>
                                     </div>

                              </div>
                       </nav>
                </header>
         </div>
  )
}

export default Navbar
