import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Map from './Map';
import Location from './Location';
import UserContext from '../UserContext';

function Locations({ businessId }) {
  const [locations, setLocations] = useState([]);

  const authManager = useContext(UserContext);
  const history = useHistory(); 
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
     .catch(err => history.push('/error', {errorMessage: err}));
  }, [])

  let location = locations[locations.length-1]; 
  return (
    <>
    {location !=null ? <div className="body-contact">
    <div className="address-info" >
     <h4>Address:</h4> 
    <p>{location.address}, {location.city}, {location.state}, {location.zipCode} </p>
    
    </div>
    <div className="map-img" >
      {location.length != 0 ? <Map address={location.address} state={location.state} city={location.city} /> : null} 
    </div> 
  </div>: null}
  </>
    
  )


}

export default Locations;