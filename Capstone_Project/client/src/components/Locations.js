import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import UserContext from '../UserContext';

import Location from './Location';

function Locations() {
    const [locations, setLocations] = useState([]);

    const history = useHistory();

    // const authManager = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:8080/api/location')
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something has gone wrong in fetching the Location data.');
        })
        .then(data => {
            setLocations(data);
        })
        .catch(err => history.push('/error', {errorMessage: err}));
      },[])

      const handleAddLocation = () => history.push('/location/add')

      return (
        <>
          <h2>Locations</h2>
          {authManager.user &&  <button type="button" className="btn btn-primary mb-3" onClick={handleAddLocation}>Add Location</button>}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Address</th>
                <th scope="col">City-State-Zip Code</th>
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