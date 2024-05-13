import React, { useState } from 'react'
import '../Admin/css/CreateEvent.css'
import { DateRange } from 'react-date-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {axiosRequest} from '../../../Utils/axiosRequest'
import { ToastContainer, toast } from 'react-toastify';

const CreateEvent = () => {

       const [hotelData,setHotelData]  = useState()
       const [image,setImage]  = useState()
       const [openDate,setOpenDate] =  useState(false)
       const [newDate,setEventDate] =  useState()

       const [date, setDate] = useState([
              {
                startDate: new Date(),
                endDate:new Date(), 
                key: 'selection'
              }
            ]);

       let getValue = (e) => {
              setHotelData({
                  ...hotelData,
                  [e.target.name]: e.target.value,
                  date:date[0].startDate
              })
              
           console.log(hotelData);
      
       }

       async function handleCreate(e) {
              e.preventDefault();
              const formData = new FormData();
              console.log(image);
              formData.append("image",image)

              for (const key in hotelData) {
                     formData.append(key, hotelData[key]);
              }

              axiosRequest.post(`/event/create`, formData ,

                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'multipart/form-data'
                            }
                     }).then((res) => {
                            toast.success("Event Created successfully!")
                            setHotelData({
                                   eventName: '',
                                   eventType: '',
                                   time: '',
                                   location: '',
                                   date: new Date(),
                                   organizer: '',
                                   attendeesLimit: '',
                                   description: '' // Add more fields if necessary
                               });
                            
                     }).catch((error) => {
                            console.log(error);
                     })
       }

          function onInputChange(e){
             // console.log(e.target.files[0]);
              const file = e.target.files[0]; // Get only the first file
              setImage(file);
          }






       return (
              <div>
                     <ToastContainer />
                     <main className="admin__main">

                            <div className='createHotelPage'>

                                   <div className="container">
                                          <form id="contact">
                                                 <h3>Enter Event informations</h3><br />
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Event Name</label>
                                                 <fieldset>
                                                        <input
                                                               name='eventName'
                                                               type="text"
                                                               tabIndex="1"
                                                               required
                                                               autoFocus
                                                               value={hotelData?.eventName || ''}
                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Event Type</label>
                                                 <fieldset>
                                                        <select
                                                               value={hotelData?.eventType || ''}
                                                               name='eventType'
                                                               tabIndex="1"
                                                               required
                                                               autoFocus
                                                               onChange={getValue}
                                                        >
                                                               <option value="">Select Event Type</option>
                                                               <option value="Science">Science</option>
                                                               <option value="Technology">Technology</option>
                                                               <option value="Money">Money & Economy</option>
                                                               <option value="Foods">Foods exihibtion</option>
                                                               <option value="Education">Education</option>

                                                               {/* Add more options as needed */}
                                                        </select>
                                                 </fieldset>

                                                 <label htmlFor="">Date</label>
                                                 <fieldset>


                                                 </fieldset>
                                                 <br /><br />

                                                 <label htmlFor="">Time</label>
                                                 <fieldset>
                                                        <input
                                                               value={hotelData?.time || ''}
                                                               name='time'
                                                               type="tel"
                                                               tabIndex="3"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>

                                                 <label htmlFor="">location</label>
                                                 <fieldset>
                                                        <input
                                                               value={hotelData?.location || ''}

                                                               name='location'
                                                               type="url"
                                                               tabIndex="4"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>

                                                 <label htmlFor="">organizer</label>
                                                 <fieldset>
                                                        <input
                                                               value={hotelData?.organizer || ''}

                                                               name='organizer'
                                                               type="url"
                                                               tabIndex="4"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="">attendees Limit</label>
                                                 <fieldset>
                                                        <input
                                                               value={hotelData?.attendeesLimit || ''}

                                                               name='attendeesLimit'
                                                               type="tel"
                                                               tabIndex="3"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="">Description</label>
                                                 <fieldset>
                                                        <textarea
                                                               value={hotelData?.description || ''}

                                                               name='description'
                                                               tabIndex="5"
                                                               required

                                                               onChange={getValue}
                                                        ></textarea>
                                                 </fieldset>
                                                 <label htmlFor="">Images</label>
                                                 <fieldset>
                                                        <div style={{ height: '100px' }}>
                                                               <input type="file" multiple onChange={onInputChange} />
                                                        </div>
                                                 </fieldset>
                                                 <fieldset>
                                                        <button type=""
                                                               id="contact-submit"
                                                               data-submit="...Sending"
                                                               onClick={handleCreate}
                                                        >
                                                               Create Event
                                                        </button><br /><br /><br />

                                                 </fieldset>
                                          </form>
                                   </div>

                            </div>


                     </main>
                     <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <span name='date' onClick={() => {
                                   setOpenDate(!openDate)
                            }} className='headerSearchText'>
                                  <input name='date' type="text" value= {`${format(date[0].startDate, 'MM/dd/yyyy')} `} onChange={(e)=>{setEventDate(e.target.value);}}/>
                            </span>
                            {openDate && <DateRange
                                   editableDateInputs={true}
                                   onChange={item => setDate([item.selection])}
                                   moveRangeOnFirstSelection={false}
                                   ranges={date}
                                   className='date'
                                   minDate={new Date()}
                                 
                            />}
                     </div>

              </div>
       )
}

export default CreateEvent
