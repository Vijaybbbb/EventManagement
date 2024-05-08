import React from 'react'
import './Checkout.css'

const Checkout = () => {

       function handleChange(){

       }

  return (
    <div className='checkoutForm'>
      <div className="row">
      <div className="col-md-12"> 
        <form>
          <h1>Sign Up</h1>

          <fieldset>
            <legend><span className="number">1</span> Your Basic Info</legend>

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"  required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email"  onChange={handleChange} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"  onChange={handleChange} required />

            <label>Age:</label>
            <input type="radio" id="under_13" value="under_13" name="age" onChange={handleChange} /><label htmlFor="under_13" className="light">Under 13</label><br />
            <input type="radio" id="over_13" value="over_13" name="age" onChange={handleChange} /><label htmlFor="over_13" className="light">Over 13</label>

          </fieldset>

          <fieldset>

            <legend><span className="number">2</span> Your Profile</legend>

            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio"  onChange={handleChange}></textarea>

            <label htmlFor="job">Job Role:</label>
            <select id="job" name="jobRole"onChange={handleChange}>
              <optgroup label="Web">
                <option value="frontend_developer">Front-End Developer</option>
                <option value="php_developer">PHP Developer</option>
                <option value="python_developer">Python Developer</option>
                <option value="rails_developer">Rails Developer</option>
                <option value="web_designer">Web Designer</option>
                <option value="wordpress_developer">Wordpress Developer</option>
              </optgroup>
              <optgroup label="Mobile">
                <option value="android_developer">Android Developer</option>
                <option value="ios_developer">IOS Developer</option>
                <option value="mobile_designer">Mobile Designer</option>
              </optgroup>
              <optgroup label="Business">
                <option value="business_owner">Business Owner</option>
                <option value="freelancer">Freelancer</option>
              </optgroup>
            </select>

            <label>Interests:</label>
            <input type="checkbox" id="development" value="Development" name="interests" onChange={handleChange} /><label className="light" htmlFor="development">Development</label><br />
            <input type="checkbox" id="design" value="Design" name="interests" onChange={handleChange} /><label className="light" htmlFor="design">Design</label><br />
            <input type="checkbox" id="business" value="Business" name="interests" onChange={handleChange} /><label className="light" htmlFor="business">Business</label>

          </fieldset>

          <button type="submit">Sign Up</button>

        </form>
      </div>
    </div>
    </div>
  )
}

export default Checkout
