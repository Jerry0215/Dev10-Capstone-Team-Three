import { useContext } from "react";
import { useHistory } from "react-router-dom";

function Location ({ location }) {

    const history = useHistory();
   // const authManager = useContext(UserContext);
  
    const handleDelete = () => {
      history.push(`/location/delete/${location.locationId}`);
    }
  
    const handleEdit = () => {
      history.push(`/location/edit/${location.locationId}`);
    }
  
    return (
      <tr>
        <td>{location.address}</td>
        <td>{location.city}-{location.state}-{location.zipCode}</td>
        <td>{location.addressType}</td>
      </tr>
    );

}

export default Location;