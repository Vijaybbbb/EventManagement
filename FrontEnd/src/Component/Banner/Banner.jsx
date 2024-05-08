import React, { useEffect } from 'react'
import './Banner.css'
import useFetch from '../../Hooks/fetchData'

const Banner = () => {

const {data} =  useFetch(`event/allEvents`)
console.log(data);

  return (
    <div className='banner'>
        <div className="arlo">
        <div className="arlo-page-title arlo-font-primary">
          <h2>Demos - Upcoming Events - List 1</h2>
        </div>
        <div id="upcoming-events-list1">
          {/* Render list items */}
          {data.map(event => (
            <div key={event.id} className="upcoming-event">
              <div className="left">
                <div className="date">{event.date}</div>
                <div className="time">
                {event.date}
                </div>
                <div className="location">
                {event.date}
                </div>
              </div>
              <div className="middle">
                <h3>{event.eventName}</h3>
                <div className="summary">{event.Summary}</div>
                {event.description}
              </div>
              <div className="right">
                <div className="duration">
                  <span className="label"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                  <span className="content">{event.Duration}</span>
                </div>
                <div className="offers"> {event.date}</div>
                <div className="registration">
                {event.date}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default Banner
