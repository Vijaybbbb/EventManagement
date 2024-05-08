import React from 'react';
import './Ticket.css'


// Reusable Pricing Table Component
const PricingTable = ({ title, price, features }) => {
  return (
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
          <a href="#" className="btn bordered radius">Buy Now</a>
        </div>
      </div>
    </div>
  );
};

// Main React Component
class Ticket extends React.Component {
  render() {
    return (
      <div className='ticket'>
       <div className="wrapper">
        <PricingTable
          title="Basic"
          price="$19"
          features={[
            "5 GB Ram",
            "40GB SSD Cloud Storage",
            "Month Subscription",
            "Responsive Framework",
            "Monthly Billing Software",
            "1 Free Website"
          ]}
        />
        <PricingTable
          title="Standard"
          price="$29"
          features={[
            "5 GB Ram",
            "40GB SSD Cloud Storage",
            "Month Subscription",
            "Responsive Framework",
            "Monthly Billing Software",
            "1 Free Website"
          ]}
        />
        <PricingTable
          title="Premium"
          price="$39"
          features={[
            "5 GB Ram",
            "40GB SSD Cloud Storage",
            "Month Subscription",
            "Responsive Framework",
            "Monthly Billing Software",
            "1 Free Website"
          ]}
        />
      </div>
      </div>
    );
  }
}

export default Ticket;
