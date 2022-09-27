import { useContext } from "react";
import { useHistory } from "react-router-dom";

function Event ({ event }) {

    const history = useHistory();
   // const authManager = useContext(UserContext);
  
    const handleDelete = () => {
      history.push(`/event/delete/${event.eventId}`);
    }
  
    const handleEdit = () => {
      history.push(`/event/edit/${event.eventId}`);
    }
  
    return (
      <tr>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>{event.timeDate}</td>
        <td>{event.locationId}</td>
        <td>{event.businessId}</td>
      </tr>
    );

}

export default Event;