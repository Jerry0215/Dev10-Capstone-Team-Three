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

  return (
    <>
      <h2>Events</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Location</th>
            <th scope="col">Business</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => <Event key={event.eventId} event={event} editMode={editMode}/>)}
        </tbody>
      </table>
    </>
  )

}

export default Events;