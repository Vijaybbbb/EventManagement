import React, { useState } from 'react'
import './Home.css'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import Banner from '../../Component/Banner/Banner'



const Home = () => {
  const [searchText,setSearchText] = useState()
  return (
    <div>
       <div>
             <Navbar setSearchText={setSearchText}/>
            <section id="banner-wrapper">
                <div id="owl-carousel" className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="https://imgur.com/96OnkX7.png" alt=" pics " />
                    </div>
                    
                </div>
            </section>
            <Banner searchText={searchText}/>
            <Footer/>
            
        </div>
    </div>
  )
}

export default Home
