import { useSelector } from 'react-redux';
import useFetch from '../../Hooks/fetchData';
import './Checkout.css'
import React, { useState } from 'react';
import { axiosRequest } from '../../../Utils/axiosRequest';

const Checkout = ({selectedEventId}) => {

       const {data} =  useFetch(`event/${selectedEventId}`)
       //console.log(data);
       const ticket = useSelector(state => state.orderDetails)
       const [total,setTotal] = useState(Number(ticket?.order?.price) + 25.50)

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

       function handleClick(e){
              e.preventDefault()  
              axiosRequest.post(`/user/checkout`,{userData,data},{withCredentials:true}).then((res)=>{
                     console.log(res);
              }).catch((err)=>{
                     console.log(err);
              })
              
       }





    return (
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
                                    <td><img src='https://dl.dropboxusercontent.com/s/sim84r2xfedj99n/%24_32.JPG' className='full-width' alt='Nike Shoes' /></td>
                                    <td>
                                        <br /><span className='thin'>{ticket?.order?.type}</span>
                                        <br />{data?.eventName}<br /><span className='thin small'>Color: Grey/Orange, Size: 10.5<br /><br /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className='price'>{ticket?.order?.price}</div></td>
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
                                        <input className='input-field' disabled value={ticket?.order?.type} readOnly/>
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
    );
};

export default Checkout;
