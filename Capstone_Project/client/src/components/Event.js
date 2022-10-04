import { useContext } from "react";
import { useHistory } from "react-router-dom";

function Event ({ event, editMode }) {
     
    const history = useHistory();
   // const authManager = useContext(UserContext);
  
    const handleDelete = () => {
      history.push(`/event/delete/${event.eventId}`);
    }
  
    const handleEditClick = () => {
      history.push(`/eventform/edit/${event.businessId}/${event.eventId}`);
    };
  
    return (
      <tr>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>{event.timeDate}</td>
        <td>{event.locationId}</td>
        <td>{event.businessId}</td>
        {editMode ? <button type="button" onClick={handleEditClick}>Edit</button>: null} 
      </tr>
    );

}

export default Event;
