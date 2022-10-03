import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Map from './Map';
import Location from './Location';
import UserContext from '../UserContext';

function Locations({ businessId }) {
  const [locations, setLocations] = useState([]);

  const authManager = useContext(UserContext);

  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    fetch(`http://localhost:8080/api/location/business/${businessId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something has gone wrong in fetching the Location data.');
      })
      .then(data => {
        setLocations(data);
      })
    // .catch(err => history.push('/error', {errorMessage: err}));
  }, [])


  return (
    <>
      <h2>Locations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Zip Code</th>
            <th scope="col">Address Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => <Location key={location.locationId} location={location} />)}
        </tbody>
      </table>

    </>
  )


}

export default Locations;