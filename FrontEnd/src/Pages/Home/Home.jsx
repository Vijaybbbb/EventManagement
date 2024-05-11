import React, { useState } from 'react'
import './Home.css'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import Banner from '../../Component/Banner/Banner'
import { useSelector } from 'react-redux'



const Home = () => {
  const [access,setAccess] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
console.log(userDetails.userDetails);
  if(userDetails?.userId){
    setAccess(true)
  }

  const [searchText,setSearchText] = useState()
  const [sortOption,setSortOption] = useState()
  const [filterOption,setFilterOption] = useState()




  return (
    <div>
       <div>
             <Navbar access={access} setSearchText={setSearchText} setSortOption={setSortOption} setFilterOption={setFilterOption}/>
            <section id="banner-wrapper">
                <div id="owl-carousel" className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="https://imgur.com/96OnkX7.png" alt=" pics " />
                    </div>
                    
                </div>
            </section>
            <Banner access={access} searchText={searchText} sortOption={sortOption} filterOption={filterOption}/>
            <Footer/>
            
        </div>
    </div>
  )
}

export default Home
