import React, { useState } from 'react'
import '../Admin/css/CreateEvent.css'
import { DateRange } from 'react-date-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file



const CreateEvent = () => {

       const [hotelData,setHotelData]  = useState()
       const [images,setImages]  = useState([])
       const [openDate,setOpenDate] =  useState(false)
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
                  [e.target.name]: e.target.value
              })
      
          }

       async function handleCreate(e) {
              e.preventDefault();
              const formData = new FormData();

              images.forEach((image) => {
                     formData.append('images', image);
              });
              for (const key in hotelData) {
                     formData.append(key, hotelData[key]);
                   }

              await axios.post(`${baseUrl}/hotels`, formData ,

                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'multipart/form-data'
                            }
                     }).then((res) => {

                            setShow(false)

                     }).catch((error) => {
                            console.log(error);
                     })
       }

          function onInputChange(e){
            //  console.log(e.target.files);
            const files = Array.from(e.target.files);
            setImages([...images, ...files]);
             
          }






       return (
              <div>
                     <main className="admin__main">

                            <div className='createHotelPage'>

                                   <div className="container">
                                          <form id="contact">
                                                 <h3>Hotel information</h3><br />
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Hotel Name</label>
                                                 <fieldset>
                                                        <input
                                                               name='name'
                                                               type="text"
                                                               tabIndex="1"
                                                               required
                                                               autoFocus

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="" style={{ marginBottom: '10px' }}>Hotel Type</label>
                                                 <fieldset>
                                                        <select
                                                               name='type'
                                                               tabIndex="1"
                                                               required
                                                               autoFocus
                                                               onChange={getValue}
                                                        >
                                                               <option value="">Select Hotel Type</option>
                                                               <option value="Hotel">Hotel</option>
                                                               <option value="Apartment">Apartment</option>
                                                               <option value="Resort">Resort</option>
                                                               <option value="Villa">Villa</option>
                                                               <option value="Cabin">Cabin</option>

                                                               {/* Add more options as needed */}
                                                        </select>
                                                 </fieldset>

                                                 <label htmlFor="">City</label>
                                                 <fieldset>


                                                 </fieldset>
                                                 <label htmlFor="">Address</label>

                                                 <fieldset>
                                                        <input
                                                               name='address'
                                                               type="tel"
                                                               tabIndex="3"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="">Distance</label>
                                                 <fieldset>
                                                        <input
                                                               name='distance'
                                                               type="url"
                                                               tabIndex="4"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>

                                                 <label htmlFor="">Cheapest Price</label>
                                                 <fieldset>
                                                        <input
                                                               name='cheapestPrice'
                                                               type="url"
                                                               tabIndex="4"
                                                               required

                                                               onChange={getValue}
                                                        />
                                                 </fieldset>
                                                 <label htmlFor="">Description</label>
                                                 <fieldset>
                                                        <textarea
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
                                                               Create Hotel
                                                        </button><br /><br /><br />

                                                 </fieldset>
                                          </form>
                                   </div>

                            </div>


                     </main>
                     <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <span onClick={() => {
                                   setOpenDate(!openDate)
                            }} className='headerSearchText'>
                                   {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')} `}
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
