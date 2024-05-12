import React, { useEffect, useState } from 'react'
import '../Admin/css/CreateEvent.css'
import { DateRange } from 'react-date-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {axiosRequest} from '../../../Utils/axiosRequest'
import useFetch from '../../Hooks/fetchData'

const ViewEvent = ({eventId}) => {


       const { data, error, loading, refetchData } = useFetch(`/admin/getEvent?id=${eventId}`)
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
              formData.append("image",image)

              for (const key in hotelData) {
                     formData.append(key, hotelData[key]);
              }

              axiosRequest.post(`/admin/update?id=${eventId}`, formData ,

                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'multipart/form-data'
                            }
                     }).then((res) => {
                            console.log(res);         

                     }).catch((error) => {
                            console.log(error);
                     })
       }

          function onInputChange(e){
             // console.log(e.target.files[0]);
              const file = e.target.files[0]; // Get only the first file
              setImage(file);
          }


          useEffect(() => {
              if (data) {
                // Set initial values for hotelData when data is fetched
                setHotelData({
                  eventName: data.eventName,
                  eventType: data.eventType,
                  date: data.date,
                  time: data.time,
                  location: data.location,
                  organizer: data.organizer,
                  attendeesLimit: data.attendeesLimit,
                  description: data.description
                });
                // Set initial value for date when data is fetched
               // setDate([{ startDate: new Date(data.date), endDate: new Date(data.date), key: 'selection' }]);
              }
            }, [data]);



  return (
    <div>
      <div>
                     <main className="admin__main">

                            <div className='createHotelPage'>

                                   <div className="container">
                                          <form id="contact">
                                                 <h3>Update Event information</h3><br />
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Event Name</label>
                                                 <fieldset>
                                                        <input
                                                               name='eventName'
                                                               type="text"
                                                               tabIndex="1"
                                                               required
                                                               autoFocus
                                                               value={hotelData?.eventName}
                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Event Type</label>
                                                 <fieldset>
                                                        <select
                                                               value={data?.eventType}
                                                               name='eventType'
                                                               tabIndex="1"
                                                               required
                                                               autoFocus
                                                               onChange={getValue}
                                                               
                                                        >
                                                               <option value="">Select Event Type</option>
                                                               <option value="Hotel">Science</option>
                                                               <option value="Apartment">Technology</option>
                                                               <option value="Resort">Money & Economy</option>
                                                               <option value="Villa">Foods exihibtion</option>
                                                               <option value="Cabin">Education</option>

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
                                                               value={data?.time}
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
                                                               value={data?.location}
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
                                                               value={data?.organizer}
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
                                                         value={data?.attendeeesLimit}
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
                                                         value={data?.Description}
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
    </div>
  )
}

export default ViewEvent
