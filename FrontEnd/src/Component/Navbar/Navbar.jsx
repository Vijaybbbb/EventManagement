import React from 'react'

const Navbar = () => {
  return (
         <div>
                <header>
                       <nav className='nav-top'>
                              <div className='headings--wrapper__nav'>
                                     <div id='logo'><span>Events</span>Zoo</div>
                                     <div className='section-title-in-nav'><a href="#Clothing">CLOTHING</a></div>
                                     <div className='section-title-in-nav'><a href="#Accessories">ACCESSORIES</a></div>
                              </div>

                              <div id="input-wrapper__nav">
                                     <i className="fas fa-search"></i>
                                     <input id="search-box" type="text" name="search" placeholder="Search for Clothing and Accessories" />
                              </div>
                              <div id="count-profile-wrapper">
                                     <div className='order-count-wrapper'>
                                            <p className="orders-count">1</p>
                                            <i className="fas fa-shopping-cart"></i>
                                     </div>
                                     <div className='profile-wrapper'>
                                            <div id="profile-back-screen"></div>
                                     </div>
                              </div>
                       </nav>
                </header>
         </div>
  )
}

export default Navbar
