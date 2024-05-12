import React, { useEffect, useState } from 'react';
import './Ticket.css'
import Checkout from '../Checkout/Checkout'
import { useDispatch } from 'react-redux';
import { storeOrder } from '../../Redux/orderSlice';


// Reusable Pricing Table Component
       
const PricingTable = ({ title, price, features, selectedEventId,setopenTickets,color}) => {

  const [ticketData,setTicketData]  = useState({
    type:title,
    price:price,
    eventID:selectedEventId
  })

 const dispatch = useDispatch()



function handleBuyNow(e){
  e.preventDefault()
  setopenTickets(false)
  dispatch(storeOrder(ticketData))
}


  return (
    <div>
      
          <div className="pricing-table gprice-single">
        <div className="head">
          <h4 className="title">{title}</h4>
        </div>
        <div className="content">
          <div className="price" style={{background:color}}>
            <h1>{price}</h1>
          </div>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="sign-up">
            <a href="#" className="btn bordered radius" onClick={handleBuyNow} style={{ marginTop: '54px' }}>Buy Now</a>
          </div>
        </div>
      </div>
     
    </div>



  );
};

// Main React Component
const Ticket = ({ selectedEventId,setopenWindow,setopenTickets}) => {
  
    return (
      <div>
      {
        false ? (
         
            <div className='reserve'>
                  <Checkout/>
            </div>
       
        ):(
          <div className='ticket'>
       <div className="wrapper">
        <PricingTable
          color='#cd7f32 '
          title="Basic"
          price="299"
          features={[
            "Entry Access",
            "Standard Seating",
            "Event Materials",
            "Limited Benefits",
            ". ",
            ". ",
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
        
        />
        <PricingTable
         color='#e5e4e2'
          title="Standard"
          price="499"
          features={[
            "Enhanced Entry Access",
            "Better Seating",
            "Event Swag:",
            "Networking Opportunities",
            "Food and Beverage Vouchers",
            "Limited Premium Features"
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
         
        />
        <PricingTable
         color='#ffd700 '
          title="Premium"
          price="999"
          features={[
            "VIP Entry Access:",
            "Best Seating",
            "VIP Amenities",
            "Exclusive Event Swag",
            "VIP Parking",
            "Dedicated Support"
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
         
        />
      </div>
      </div>
        )
      }
      </div>
    );
  
}

export default Ticket;
