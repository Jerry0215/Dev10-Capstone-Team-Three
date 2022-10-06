import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Event ({ event, editMode, handleDelete, index }) {
     
    const history = useHistory();
    const authManager = useContext(UserContext);
    let active;
    if(index == 0){
        active = "carousel-item active";
    }else{
        active = "carousel-item";
    }
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
      <> 
      <div className= {active}>
                      <div className='block'>
                          <div className='row'>
      <div className='col-md-5'>
          <div className='user'>
                
                <div className='info'>
                    <h2 className='user-name'>{event.name}</h2>
                    <h4>{event.timeDate}</h4>
                </div>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='content'>{event.description}</div>
        </div>
        </div>
        {editMode ? <button className='btn btn-warning' type="button" onClick={handleEditClick}>Edit</button>: null} 
        {editMode ? <button className='btn btn-danger m-3' type="button" onClick={handleDeleteClick}>Delete</button>:null}
        </div>
        </div>
      </> 
    );
    
}

export default Event;


/*
{editMode ? <button type="button" onClick={handleEditClick}>Edit</button>: null} 
        {editMode ? <button type="button" onClick={handleDeleteClick}>Delete</button>:null}
*/