import Person from "./Person";
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import Map from "./Map";


function PersonPage() {
  // business, location, person.personId -> personId attached

  const [person, setPerson] = useState([])
  const [location, setLocation] = useState([])
  const history = useHistory();
  let { personId } = useParams();

  const authManager = useContext(UserContext);



  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    console.log(authManager);
    fetch(`http://localhost:8080/api/person/${personId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setPerson(data);
        locationSetter(data);
      })
    //.catch(err => history.push('/error', {errorMessage: err}));
  }, [])

  const locationSetter = (data1) => {
    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    console.log(authManager);
    fetch(`http://localhost:8080/api/location/${data1.locationId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setLocation(data);

      })
    //.catch(err => history.push('/error', {errorMessage: err}));

  }


  console.log(location);

  const onEditClick = () => history.push(`/personform/edit/${personId}`)
  return (
    <>
      <div className="contact">
        <div className="cover2" alt="" style={{ "background-image": ` url(${person.photo})`, "background-size": "cover" }}></div>
        <div className="name1">
          <h2>{person.firstName} {person.middleName} {person.lastName} {person.suffix}</h2>
          <p>Phone #: {person.phone}</p>
          {personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button className="btn viewButton2" type="button" onClick={onEditClick}>Edit Profile</button> : null}
        </div>
      </div>
      <div className="body-contact" >
        <div className="address-info">
          <h4>Address:</h4>
          <p>{location.address}, {location.city}, {location.state}, {location.zipCode} </p>

        </div>
        <div className="map-img" >
          {location.length != 0 ? <Map address={location.address} state={location.state} city={location.city} /> : null}
        </div>
      </div>


    </>
  )

}

export default PersonPage;