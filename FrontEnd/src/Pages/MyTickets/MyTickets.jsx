import React from 'react'


const MyTickets = () => {
  return (
    <div className='myTicket'>
       <div id="multi-ticket-layout">
            <div className="mobile-ticket__page-header">
                <div className="mobile-ticket__page-container">
                    <span className="mobile-ticket__header-count">
                        Tickets (6)
                        <a href="tel:123-456-7890">123-456-7890</a>
                        <a className="mobile-ticket__header-print" href="https://www.dpalladino.test/my-tickets/print/order/468/dcdcce5d72b01760ac5888c6a2360cb19f5cb3809a4fd937efe7fcbf3381ea31" target="_blank">
                            <span>PDF</span>
                            <i className="">
                                <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
                                </svg>
                            </i>
                        </a>
                    </span>
                </div>
            </div>
            <div className="mobile-ticket__page">
                <div className="mobile-ticket__ticket">
                    <div className="card">
                        <div className="card__header ticket__count">
                            Ticket <span className="ticket-count--current">1</span> of 6
                        </div>
                        <div className="mobile-ticket__ticket-container">
                            {/* Your ticket content goes here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyTickets
