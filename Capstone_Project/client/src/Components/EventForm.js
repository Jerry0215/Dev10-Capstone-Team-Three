import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Error from './Error';
import UserContext from '../UserContext';

function EventForm(){
    const {businessId, editId} = useParams(); 
    const DEFAULT_EVENT = { name: '', description: '', timeDate: '', businessId: businessId};
  
    const [event, setEvent] = useState(DEFAULT_EVENT); 
    const authManager = useContext(UserContext); 
    const history = useHistory();
    const [errors, setErrors] = useState([]); 

    useEffect(() => {

        const init = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`
          }
        };
    
        if (editId) {
          fetch(`http://localhost:8080/api/event/${editId}`, init)
            .then(resp => {
              switch (resp.status) {
                case 200:
                  return resp.json();
                case 404:
                  history.push('/not-found', { id: editId })
                  break;
                default:
                  return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
              }
            })
            .then(body => {
              if (body) {
                setEvent(body);
              }
            })
            .catch(err => history.push('/error', { errorMessage: err }));
        }
    
      }, [])
    
    
    

    
      const saveEvent = () => {
    
        const init = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...event })
        };
        console.log(JSON.stringify({ ...event }))
    
        fetch('http://localhost:8080/api/event', init)
          .then(resp => {
    
            if (resp.status === 201 || resp.status === 400) {
              return resp.json();
            }
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          })
          .then(body => {
            if (body.eventId) {
              
              history.push(`/businessPage/${businessId}`)
            } else if (body) {
              setErrors(body);
            }
          })
          .catch(err => history.push('/error', { errorMessage: err }));
      }
    
      const updateEvent = () => {
        const updateEvent = { id: editId, ...event };
    
        const init = {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateEvent)
        };
    
        fetch(`http://localhost:8080/api/event/${editId}`, init)
        .then(resp => {
          switch (resp.status) {
            case 204:
              return null;
            case 400:
              return resp.json();
            case 404:
              history.push('/not-found', { id: editId });
              break;
            case 403:
              authManager.logout();
              history.push('/login');
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
    
            }
          })
          .then(body => {
            if (!body) {
              history.push(`/businesspage/${businessId}`)
            } else if (body) {
              setErrors(body);
            }
          })
          .catch(err => history.push('/error', { errorMessage: err }));
    
      }

        const handleChangeEvent= (evt) => {

            const property = evt.target.name;
            const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
            const value = evt.target[valueType];
        
            const newEvent = { ...event };
        
            newEvent[property] = value;
            console.log(newEvent);
            setEvent(newEvent);
          }
    

          const onSubmit = (evt) => {
            event.timeDate = event.timeDate + ":00.000+00:00"
            evt.preventDefault();
            
            const fetchFunction = editId > 0 ? updateEvent : saveEvent;
        
            fetchFunction();
            
        
          }
          const [date, onDateChange] = useState(new Date());
          const onCancelClick = () => history.push(`/businesspage/${businessId}`);
          return(
            <>
            <h2>{editId ? 'Update' : 'Add'} Event</h2>
            {errors.length > 0 ? <Error errors={errors} /> : null}
            <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input name="name" type="text" className="form-control" id="name" value={event.name} onChange={handleChangeEvent} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input name="description" type="text" className="form-control" id="description" value={event.description} onChange={handleChangeEvent} />
            </div>
            <div className="form-group">
            <label htmlFor="timeDate">Date/Time:</label>
              <input name="timeDate" type="datetime-local" className="form-control" id="timeDate" value={event.timeDate} onChange={handleChangeEvent} />
              
            </div>
            

            <div className="form-group">
                <button type="submit" className="btn btn-success mr-3">Submit</button>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-secondary mr-3" onClick={onCancelClick}>Cancel Request</button>
            </div>
            </form>
            </>
          );

}

export default EventForm; 
