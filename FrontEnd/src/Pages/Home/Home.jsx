import React from 'react'
import './Home.css'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import Banner from '../../Component/Banner/Banner'
import Checkout from '../../Component/Checkout/Checkout'


const Home = () => {

  return (
    <div>
       <div>
            <Navbar/>
            <section id="banner-wrapper">
                <div id="owl-carousel" className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="https://imgur.com/96OnkX7.png" alt=" pics " />
                    </div>
                    
                </div>
            </section>
            <Banner/>
            <Footer/>
            <Checkout/>
        </div>
    </div>
  )
}

export default Home
