import { useSelector } from 'react-redux';
import useFetch from '../../Hooks/fetchData';
import './Checkout.css'
import React, { useState } from 'react';
import { axiosRequest } from '../../../Utils/axiosRequest';
import useRazorpay from "react-razorpay";



const Checkout = ({selectedEventId,setopenWindow,refetchData,onPaymentSucces}) => {

       const {data} =  useFetch(`event/${selectedEventId}`)
       const ticket = useSelector(state => state.ticketDetails)
       const {userId} = useSelector(state => state.userDetails)
       const [total,setTotal] = useState(Number(ticket?.ticket?.price) + 25.50)
       const [Razorpay] = useRazorpay();

       const [userData,setUserData] = useState({
              name:null,
              phone:null
       })

       const getvalue = (e)=>{
              e.preventDefault()
              setUserData({
                     ...userData,
                     [e.target.name]:e.target.value
              })
              console.log(userData);
       }




       function verifyPaymentSucess(response,ticketId,eventId){

        axiosRequest.post(`user/verifyPayment`,
        { response: response,
          ticketId: ticketId ,
          userId:userId,
          eventId,eventId
       
         }, { withCredentials: true }).then((res) => {
            onPaymentSucces()
          
            
       }).catch((err) => {
           
            console.log(err);
       })
       }





       function handleClick(e){
              e.preventDefault() 
              setopenWindow(false)
              axiosRequest.post(`/user/checkout`,{userData,data,total,ticket,userId},{withCredentials:true}).then((res)=>{

                if(res){
                    const options = {
                      key: "rzp_test_9QHYCj7luW7qlw", // Enter the Key ID generated from the Dashboard
                      amount:res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: "INR",
                      name: "Eventszo",
                      description: "Test Transaction",
                      image: "https://example.com/your_logo",
                      order_id: res.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                      handler: function (response) {
                        //success transaction
                        verifyPaymentSucess(response,res.data.lastDataId,res.data.eventId)
                      },
                      prefill: {
                        name: "vijay ram ",
                        email: "Eventszo@example.com",
                        contact: "9999999999",
                      },
                      notes: {
                        address: "Razorpay Corporate Office",
                      },
                      theme: {
                        color: "#3399cc",
                      },
                    };
                  
                    const rzp1 = new Razorpay(options);
                    //failed transaction
                    rzp1.on("payment.failed", function (response) {
            
                        toast.error("Booking Failed!");
            
                    });
                  
                    rzp1.open();
                  }
                 
              }).catch((err)=>{
                     console.log(err);
              })
              
       }





    return (
        <div>
       <div className='checkoutForm'>
         
        <div className='container'>
            <div className='window'>
                <div className='order-info'>
                    <div className='order-info-content'>
                        <h2>Ticket Details</h2>
                        <div className='line'></div>
                        <table className='order-table'>   
                            <tbody>
                                <tr>
                                    <td><img src={`../src/assets/uploads/${data.images}`} className='full-width' alt='Image' /></td>
                                    <td>
                                        <br /><span className='thin'>{ticket?.ticket?.type}</span>
                                        <br />{data?.eventName}<br /><span className='thin small'>Free Cancelation<br /><br /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className='price'>{ticket?.ticket?.price}</div></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='line'></div>
                        
                      
                        
                        <div className='total'>
                            <span style={{ float: 'left' }}>
                                <div className='thin dense'>subtotal </div>
                                <div className='thin dense'>Tax</div>
                                TOTAL
                            </span>
                            <span style={{ float: 'right', textAlign: 'right' }}>
                                <div className='thin dense'>{ticket?.order?.price}</div>
                                <div className='thin dense'>25.50</div>
                                {total}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='credit-info'>
                    <div className='credit-info-content'>
                        <table className='half-input-table'>
                            <tbody>
                                {/* <tr>
                                    <td>Please select your card:</td>
                                    <td>
                                        <div className='dropdown' id='card-dropdown'>
                                            <div className='dropdown-btn' id='current-card'>Visa</div>
                                            <div className='dropdown-select'>
                                                <ul>
                                                    <li>Master Card</li>
                                                    <li>American Express</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                        <img src='https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png' height='80' className='credit-card-image' id='credit-card-image' alt='Visa Logo' />
                        Name
                        <input className='input-field' name='name' onChange={getvalue}/>
                        Contact
                        <input className='input-field' name='phone' onChange={getvalue} />
                        <table className='half-input-table'>
                            <tbody>
                                <tr>
                                    <td>Ticke Type
                                        <input className='input-field' disabled value={ticket?.ticket?.type} readOnly/>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        <button className='pay-btn' onClick={handleClick}>Proceed</button>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
        </div>
    );
};

export default Checkout;
