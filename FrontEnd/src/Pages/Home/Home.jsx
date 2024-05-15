import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import Banner from '../../Component/Banner/Banner'
import { useSelector } from 'react-redux'
import Notify from '../../Component/Notify/Notify'
import img from '../../assets/images/us.png'


const Home = () => {
  const [access,setAccess] = useState(false)

  const userDetails = useSelector(state => state.userDetails)

useEffect(()=>{
 if( userDetails.userId){
  setAccess(true)
 }
},[ userDetails.userId])

  const [searchText,setSearchText] = useState()
  const [sortOption,setSortOption] = useState()
  const [filterOption,setFilterOption] = useState()




  return (
    <div>
       <div>
             <Navbar access={access} setSearchText={setSearchText} setSortOption={setSortOption} setFilterOption={setFilterOption}/>
            <section id="banner-wrapper">
                <div id="owl-carousel" className="owl-carousel owl-theme">
                        <img src={img}/>
                    <div className="item">
                    </div>
                    
                </div>
            </section>
            <Banner access={access} searchText={searchText} sortOption={sortOption} filterOption={filterOption}/>
            <Footer/>
            <Notify/>
        </div>
    </div>
  )
}

export default Home
