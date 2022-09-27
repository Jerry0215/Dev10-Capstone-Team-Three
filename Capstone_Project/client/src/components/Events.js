import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Event from './Event';

function Events() {
    const [events, setEvents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8080/api/event')
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something has gone wrong in fetching the Event data.');
        })
        .then(data => {
            setEvents(data);
        })
        .catch(err => history.push('/error', {errorMessage: err}));
      },[])

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
              {events.map(event => <Event key={event.eventId} event={event} />)}
            </tbody>
          </table>
        </>
      )

}

export default Events;