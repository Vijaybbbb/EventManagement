import React, { useEffect, useState } from 'react'
import './Banner.css'
import useFetch from '../../Hooks/fetchData'
import Ticket from '../Ticket/Ticket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Checkout from '../Checkout/Checkout'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

const Banner = ({access,searchText,sortOption,filterOption}) => {
console.log(sortOption,filterOption);

const {data,refetchData} =  useFetch(`event/allEvents?searchText=${searchText || ''}&sortOption=${sortOption || ''}&filterOption=${filterOption || ''}`)
const [openWindow,setopenWindow]   = useState(false)
const [openTickets,setopenTickets]   = useState(false)
const [page, setPage] = useState(1)
const [selectedEventId, setSelectedEventId] = useState()    
const navigate = useNavigate()


useEffect(()=>{
 refetchData()
},[searchText])



//function for indicate pagination
function selectedPage(selectedPage) {
  if (
    selectedPage >= 1 &&
    selectedPage <= data.length &&
    selectedPage !== page
  )
    setPage(selectedPage)
    window.scrollTo(0, 0);
}

function convertDate(date) {
  const newDate = new Date(date);
  // Format the date with month name and no time
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = newDate.toLocaleString('en-US', options);
  return formattedDate;
}

function onPaymentSucces(){
  toast.success("Booking successfull!")
}


  return (
    <div>
    
    <div className='banner'>
    <ToastContainer />
        <div className="arlo">
        <div className="arlo-page-title arlo-font-primary">
          <h2>Upcoming Events </h2>
        </div>
        <div id="upcoming-events-list1">
          {/* Render list items */}
          {data && data.slice((page - 1) * 4, page * 4).map(event => (
            <div key={event.id} className="upcoming-event">
              <div className="left" style={{minWidth:'240px'}}>
                <div className="date">{convertDate(event.date)}</div>
                <div className="time">
                {event.time}
                </div>
                <div className="location">
                {event.location}
                </div>
              </div>
             


              <div className="middle">
                <div style={{display:'flex',gap:10}}>
                <div>
                  <img src={`../src/assets/uploads/${event.images}`} alt="" className='imageInfo' />

                </div>
                <div>
                    <h3>{event.eventName}</h3>
                    <div className="summary"></div>
                    <textarea
                      name="description"
                      tabIndex="5"
                      required
                      style={{
                        border: 'none',
                        resize: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        width: '200%',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        padding: '0',
                        margin: '0',
                        overflow: 'hidden',
                      }}
                      value={event.description}

                    ></textarea>
                  </div>
                </div>
              </div>





              <div className="right">
                <div className="duration">
                  <span className="label"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                  <span className="content">{event.Duration}</span>
                </div>
                <div className="offers">Starting from <b>299</b></div><br />
                <div className="offers"></div>
                <div className="registration">
                    {
                      event.bookedUsers.length < event.attendeesLimit ? (
                        <button className='bookingbtn' onClick={(e)=>{
                          e.preventDefault()
                          if(access){
                            setopenWindow(true)
                          setopenTickets(true)
                          setSelectedEventId(event._id)
                          }
                          else{
                            navigate('/login')
                          }
                       
                         }}>Book Now</button>
                      ):(
                        <button className='bookingbtn' disabled>Ticket not Avilable</button>
                      )
                    }
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {
        openWindow && (
          <div>
            <div className="reserve">
              
              {
                openTickets ? (
                  <div>
                    <div style={{ marginLeft: "270px", marginTop: '114px' }}>
                      <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() =>
                                                                       setopenWindow(false)
                                                                       } />
                      <Ticket  selectedEventId={selectedEventId} setopenTickets={setopenTickets} setopenWindow={setopenWindow} />
                    </div>
                  </div>
                ):(
                  <div>
                    <FontAwesomeIcon icon={faCircleXmark} className="rClose2" onClick={() =>
                                                                       setopenWindow(false)
                                                                       } />
                    <Checkout 
                    refetchData={refetchData}
                     selectedEventId={selectedEventId} 
                     setopenWindow={setopenWindow}
                     onPaymentSucces={onPaymentSucces}
                     />
                  </div>
                )
              }
            </div>
          </div>
        )
      }


      <div>
      <div className='listPagePagination'>
          <div style={{alignItems:'center'}}>
                  <div className="page-btn">
                    <span onClick={() => selectedPage(page - 1)}>{'<'}</span>
                    {[...Array(Math.ceil(data.length / 4))].map((_, i) => (
                      <span
                        key={i + 1}
                        onClick={() => selectedPage(i + 1)}
                        className={page === i + 1 ? 'pagination_selected' : ''}
                      >{i + 1}</span>
                    ))}
                    <span onClick={() => selectedPage(page + 1)}>{'>'}</span>
                  </div>
                  </div>
       </div>
      </div>


    </div>
    </div>
    
  )
}

export default Banner
