import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Reviews from './Reviews';
import Events from './Events';
import Locations from './Locations';
import UserContext from '../UserContext';


function BusinessPage() {
  const [business, setBusiness] = useState([])
  const [path, setPath] = useState([])
  let { businessId } = useParams();

  const authManager = useContext(UserContext);

    useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    console.log(authManager);

    fetch(`http://localhost:8080/api/business/${businessId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {

        setBusiness(data);

        console.log(data.photo)
        setPath(data.photo);
      })
    //.catch(err => history.push('/error', {errorMessage: err}));
  }, [])



  return (
    <>
      <h2>{business.name}</h2>
      <p>{business.description}</p>
      <img src={path} alt="Everything is on fire" />
      {business.personId == authManager.user.personId ? <button type="button">Edit Business</button>:null}
      <Reviews businessId={businessId}></Reviews>
      <Events businessId={businessId}></Events>
      {business.personId != authManager.user.personId ? <button type="button">Add Review</button>:null}
      <Locations businessId={businessId}></Locations>
    </>
  )



}

export default BusinessPage; 
