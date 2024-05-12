import React, { useEffect, useState } from 'react'
import './MyTickets.css'
import Navbar from '../../Component/Navbar/Navbar'
import useFetch from '../../Hooks/fetchData'
import { useSelector } from 'react-redux'
import Footer from '../../Component/Footer/Footer'

const MyTickets = () => {
       const userDetails = useSelector(state => state.userDetails)
       const {data,refetchData} =  useFetch(`user/allTickets?id=${userDetails?.userId}`)
       const [access,setAccess] = useState(false)

       useEffect(()=>{
              if( userDetails.userId){
               setAccess(true)
              }
             },[ userDetails.userId])

             function convertDate(date) {
              const newDate = new Date(date);
              // Format the date with month name and no time
              const options = { month: 'long', day: 'numeric', year: 'numeric' };
              const formattedDate = newDate.toLocaleString('en-US', options);
              return formattedDate;
            }

       return (
              <>                
              {
                     access ? (
                            <div>
                            <Navbar access={access} ticketPage={true}/>
                             <div id="multi-ticket">
                                 <div id="multi-ticket-layout">
                                        <div className="mobile-ticket__page-header">
                                               <div className="mobile-ticket__page-container">
            
            
            
                                                      <a className="mobile-ticket__header-print" href="https://www.dpalladino.test/my-tickets/print/order/468/dcdcce5d72b01760ac5888c6a2360cb19f5cb3809a4fd937efe7fcbf3381ea31" target="_blank">
            
                                                             <i className="">
                                                                    <svg viewBox="0 0 24 24">
                                                                           <path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
                                                                    </svg>
                                                             </i>
                                                      </a>
                                                   </div>
                                                 </div>
                                                  < div className="mobile-ticket__page">
            
            
                                                   <div className="mobile-ticket__ticket">
                                                      {
                                                         data && data.map((ticket)=>(
            
                                                         
                                                         <div className="card">
                                                             <div className="card__header ticket__count">
                                                                    Ticket <span className="ticket-count--current">1</span> of 6                                </div>
            
                                                             <div className="mobile-ticket__ticket-container">
                                                                    <div className="mobile-ticket__ticket-info">
                                                                           <div className="card__content ticket-info__individual">
                                                                                  <div className="mobile-ticket__header">
                                                                                         <div className="mobile-ticket__name">{ticket.eventName}</div>
                                                                                  </div>
                                                                                  <div className="mobile-ticket__level-container">
                                                                                         <div className="mobile-ticket__price-level">{ticket.ticketType} Ticket </div>
                                                                                         <div className="mobile-ticket__level-info">
                                                                                                <div className="mobile-ticket__face-value">
                                                                                                       <span className="desktop-only">Price:</span>
                                                                                                       {ticket.price}                                              </div>
                                                                                                <div className="mobile-ticket__number ticket-number--mobile">3957556896</div>
                                                                                         </div>
                                                                                  </div>
                                                                           </div>
                                                                           <div className="card__content ticket-info__event">
                                                                                  <div className="mobile-ticket__event-info">
                                                                                         <span className="event-info__name">{ticket.organizer}</span>
                                                                                         <span className="event-info__time">{convertDate(ticket.expires)} </span>
                                                                                        <textarea name="" id="" style={{color:'black',border:'none',width:'300px',textDecoration:'none'}}>{ticket.des}</textarea>
                                                                                  </div>
                                                                           </div>
                                                                    </div>
                                                                    <div className="mobile-ticket__ticket-images">
                                                                           <div className="card__content">
                                                                                  <div className="mobile-ticket__number ticket-number--desktop">{ticket._id}</div>
                                                                                  <div className="mobile-ticket__barcode">
                                                                                         <div className="mobile-ticket__barcode-image">
                                                                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
                                                                                         </div>
                                                                                  </div>
                                                                                  <div className="mobile-ticket__add-to-wallet">
                                                                                         <div className="mobile-ticket__add-to-wallet-image">
                                                                                                <a href="https://www.dpalladino.test/mobile/S7Y36T11U468/wallet/683" alt="Add to Apple Wallet">
                                                                                                       <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/add-to-apple-wallet-logo.png" alt="Add to Apple Wallet" />
                                                                                                </a>
                                                                                         </div>
                                                                                  </div>
            
                                                                           </div>
                                                                           <div className="card__footer">
            
                                                                                  <a href="https://www.dpalladino.test/my-tickets/print/order/468/dcdcce5d72b01760ac5888c6a2360cb19f5cb3809a4fd937efe7fcbf3381ea31?item_id=683" className="mobile-ticket__button mobile-ticket__copy-link copy_link" data-clipboard-text="Url for link goes here.">
                                                                                         <span>Copy Link</span>
                                                                                         <i className="mobile-ticket__button-icon">
                                                                                                <svg viewBox="0 0 24 24">
                                                                                                       <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                                                                                </svg>
                                                                                         </i>
                                                                                  </a>
            
                                                                                  <a href="https://www.dpalladino.test/my-tickets/print/order/468/dcdcce5d72b01760ac5888c6a2360cb19f5cb3809a4fd937efe7fcbf3381ea31?item_id=683" alt="PDF" className="mobile-ticket__button" target="_blank">
                                                                                         <span>PDF</span>
                                                                                         <i className="mobile-ticket__button-icon">
                                                                                                <svg viewBox="0 0 24 24">
                                                                                                       <path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
                                                                                                </svg>
                                                                                         </i>
                                                                                  </a>
                                                                           </div>
                                                                    </div>
                                                             </div>
                                                      </div>
                                                      ))    
                                               }
                                               </div>
                                        </div>
                                 </div>
                          </div>
                                               <Footer/>
                          </div>
                     ):(
                            <div></div>
                     )
                            
              }
     </> 

       )
}

export default MyTickets
