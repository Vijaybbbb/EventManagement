import React, { useState } from 'react'
import './Home.css'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import Banner from '../../Component/Banner/Banner'



const Home = () => {
  const [searchText,setSearchText] = useState()
  const [sortOption,setSortOption] = useState()
  const [filterOption,setFilterOption] = useState()




  return (
    <div>
       <div>
             <Navbar setSearchText={setSearchText} setSortOption={setSortOption} setFilterOption={setFilterOption}/>
            <section id="banner-wrapper">
                <div id="owl-carousel" className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="https://imgur.com/96OnkX7.png" alt=" pics " />
                    </div>
                    
                </div>
            </section>
            <Banner searchText={searchText} sortOption={sortOption}/>
            <Footer/>
            
        </div>
    </div>
  )
}

export default Home
