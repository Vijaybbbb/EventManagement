import React, { useState } from 'react';
import './Ticket.css'
import Checkout from '../Checkout/Checkout'


// Reusable Pricing Table Component
       
const PricingTable = ({ title, price, features, selectedEventId,setopenWindow,setopenTickets}) => {

  const [showCheckout,setShowCheckout] = useState(false)
  const [ticketData,setTicketData]  = useState({
    type:title,
    price:price,
    eventID:selectedEventId
  })





function handleBuyNow(e){
  e.preventDefault()
  setShowCheckout(true)
  setopenTickets(false)
}


  return (
    <div>
    <div className="pricing-table gprice-single">
      <div className="head">
        <h4 className="title">{title}</h4>
      </div>
      <div className="content">
        <div className="price">
          <h1>{price}</h1>
        </div>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="sign-up">
          <a href="#" className="btn bordered radius" onClick={handleBuyNow} style={{marginTop:'54px'}}>Buy Now</a>
        </div>
      </div>
    </div>
    
    
    

    {
      showCheckout && (
        <div>
          
        </div>
      )
    }
    

      </div>



  );
};

// Main React Component
const Ticket = ({ selectedEventId,setopenWindow,setopenTickets}) => {

    return (
      <div className='ticket'>
       <div className="wrapper">
        <PricingTable
          title="Basic"
          price="299"
          features={[
            "Free Cancelation",
            "kfnglkdgl",
            "Month Subscription",
            ".",
            ". ",
            ". ",
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
        />
        <PricingTable
          title="Standard"
          price="499"
          features={[
            "5 GB Ram",
            "40GB SSD Cloud Storage",
            "Month Subscription",
            "Responsive Framework",
            "Monthly Billing Software",
            "1 Free Website"
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
        />
        <PricingTable
          title="Premium"
          price="999"
          features={[
            "5 GB Ram",
            "40GB SSD Cloud Storage",
            "Month Subscription",
            "Responsive Framework",
            "Monthly Billing Software",
            "1 Free Website"
          ]}
          selectedEventId={selectedEventId}
          setopenWindow={setopenWindow}
          setopenTickets={setopenTickets}
        />
      </div>
      </div>
    );
  
}

export default Ticket;
