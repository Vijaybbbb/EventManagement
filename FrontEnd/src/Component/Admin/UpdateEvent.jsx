import React, { useState } from 'react'
import useFetch from '../../Hooks/fetchData'
import '../Admin/css/UpdateEvent.css'

const UpdateEvent = () => {
  const [openWindow,setOpenWindow] = useState()
  const {data,error,loading,refetchData} = useFetch(`/admin/allTickets`)
  const [page, setPage] = useState(1)
  const [viewEvent,setViewEvent] = useState(false) 
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
    setViewHotel(false)
    refetchData()
  }



  function handleViewHotel(id) {
    setHotelId(id)
    setViewHotel(true)
  }

  return (
<div>
                     <main className="admin__main">
                            <h2>Upadte</h2>
                            <div className='allHotelsTable'>
            <div className="table">
              <div className="table__body" >
                <TableRow>  
                  <TableCell>Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>HotelID</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
                
                {
                  data && data.slice((page - 1) * 5, page * 5).map(hotel=>(
                    <TableRow key={data._id}>
                    <TableCell>
                    <h3 className="table__crypto-name">{hotel?.name}</h3>
                  </TableCell>
                  <TableCell><input type="text" value={hotel?.city} className='detailsshowinput' readOnly /></TableCell>
                    
                  <TableCell><input type="text" value={hotel?._id} className='detailsshowinput' readOnly /></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewHotel(hotel?._id)}}>Update</button>
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewHotel(hotel?._id)}}>Delete</button>
                    
                    </div>
                  </TableCell>
                </TableRow>
                  ))
                }
                 <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                <TableCell colSpan="5">
                  <div style={{alignItems:'center'}}>
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
              </div>
  )
}

export default UpdateEvent
