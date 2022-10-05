import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Event ({ event, editMode, handleDelete }) {
     
    const history = useHistory();
    const authManager = useContext(UserContext);
  
    const handleDeleteClick = () => {
      const init = {
        method: 'DELETE',
        headers:
        {
          Authorization: `Bearer ${authManager.user.token}`
        }
      };

      fetch(`http://localhost:8080/api/event/${event.eventId}`, init)
        .then( resp => {
          switch(resp.status) {
            case 204:
              return null;
            case 404:
              //history.push('/not-found')
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          }
        })
        .then(resp => {
            if (!resp) {
              handleDelete(event.eventId);
            } else {
              console.log(resp); 
            }
          })
          .catch(err => history.push('/error', {errorMessage: err}));
        }
    
    const handleEditClick = () => {
      history.push(`/eventform/edit/${event.businessId}/${event.eventId}`);
    };
  
    return (
      <tr>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>{event.timeDate}</td>
        <td>{event.businessId}</td>
        {editMode ? <button type="button" onClick={handleEditClick}>Edit</button>: null} 
        {editMode ? <button type="button" onClick={handleDeleteClick}>Delete</button>:null}
      </tr>
    );
    
}

export default Event;
