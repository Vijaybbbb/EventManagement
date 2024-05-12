import React, { useEffect, useState } from 'react'
import useFetch from '../../Hooks/fetchData'
import '../Admin/css/UpdateEvent.css'
import ViewEvent from './ViewEvent'
import { axiosRequest } from '../../../Utils/axiosRequest'

const UpdateEvent = () => {
  const [openWindow, setOpenWindow] = useState()
  const { data, error, loading, refetchData } = useFetch(`/admin/allTickets`)
  const [page, setPage] = useState(1)
  const [viewEvent, setViewEvent] = useState(false)
  const [eventId, setEventId] = useState()

  


  const TableRow = ({ children }) => {
    return <div className="table__row">{children}</div>;
  };
  const TableCell = ({ children }) => {
    return <div className="table__cell">{children}</div>;
  };


  //function for indicate pagination
  function selectedPage(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length &&
      selectedPage !== page
    )
      setPage(selectedPage)
  }


  function handleGoBack() {
    setViewEvent(false)
    refetchData()
  }



  function handleViewEvent(id) {
    setEventId(id)
    setViewEvent(true)
  }

  function handleDelete (e,event){
    e.preventDefault()
    axiosRequest.post(`admin/deleteEvent`,{event},{withCredentials:true}).then((res)=>{
        refetchData()
    }).catch((err)=>{
      console.log(err);
    })
  }
  function convertDate(date) {
    const newDate = new Date(date);
    // Format the date with month name and no time
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = newDate.toLocaleString('en-US', options);
    return formattedDate;
  }
  return (
    <div>
      {
        viewEvent ? (
                <div>
                   <ViewEvent  eventId={eventId} handleGoBack={handleGoBack}  />
                </div>
        ):(
          <main className="admin__main">
    
        <div className='allHotelsTable'>
          <div className="table">
            <div className="table__body" >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Event ID</TableCell>
                <TableCell></TableCell>
                <TableCell>Action</TableCell>
              </TableRow>

              {
                data && data.slice((page - 1) * 5, page * 5).map(event => (
                  <TableRow key={data._id}>
                    <TableCell>
                      <h3 className="table__crypto-name">{event?.eventName}</h3>
                    </TableCell>
                    <TableCell><input type="text" value={convertDate(event?.date)} className='detailsshowinput' readOnly /></TableCell>

                    <TableCell><input type="text" value={event?._id} className='detailsshowinput' readOnly /></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="buttons">
                        <button className="button button--outline buttons__venta" onClick={() => { handleViewEvent(event?._id) }}>Update</button>
                        <button className="button button--outline buttons__venta" onClick={(e) => { handleDelete(e,event?._id) }}>Delete</button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell colSpan="5">
                  <div style={{ alignItems: 'center' }}>
                    <div className="page-btn">
                      <span onClick={() => selectedPage(page - 1)}>{'<'}</span>
                      {[...Array(Math.ceil(data.length / 5))].map((_, i) => (
                        <span
                          key={i + 1}
                          onClick={() => selectedPage(i + 1)}
                          className={page === i + 1 ? 'pagination_selected' : ''}
                        >{i + 1}</span>
                      ))}
                      <span onClick={() => selectedPage(page + 1)}>{'>'}</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              {/* Repeat this structure for each row */}
            </div>
          </div>
        </div>
      </main>
        )
      }
    </div>
  )
}

export default UpdateEvent
