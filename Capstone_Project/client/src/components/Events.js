import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Event from './Event';
import UserContext from '../UserContext';

function Events({ businessId , editMode}) {
  
  const [events, setEvents] = useState([]);

  const authManager = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };


    fetch(`http://localhost:8080/api/event/business/${businessId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something has gone wrong in fetching the Event data.');
      })
      .then(data => {
        setEvents(data);
      })
     // .catch(err => history.push('/error', { errorMessage: err }));
  }, [])

  const handleAddEvent = () => history.push('/event/add')

  const handleDelete = (eventId) => {
    // const filteredEvents = events.filter(event => event.eventId!== eventId)
    // setEvents(filteredEvents); 
    window.location.reload(false);
  }

  return (
    <>
    <h2 className='section-header'>Upcoming Events</h2>
    <div className='testimonial-view'>
        
           <div className='carousel slide' id='testimonialCarouselEvent' data-ride="carousel">
              <div className='carousel-inner'>
                  
                                
                                        
              {events.map((event, index) => <Event key={event.eventId} event={event} editMode={editMode} handleDelete={handleDelete} index={index}/>)}
                                        
                                
                            </div>
                              <a className='carousel-control-prev' href='#testimonialCarouselEvent' role="button" data-slide="prev">
                                <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                                <span className='sr-only'>Previous</span>
                              </a>
                              <a className='carousel-control-next' href='#testimonialCarouselEvent' role="button" data-slide="next">
                                <span className='carousel-control-next-icon' aria-hidden="true"></span>
                                <span className='sr-only'>Next</span>
                              </a>
                       
            </div>     
            
        
    </div>
    




        


    
  </>
  )

}

export default Events;

