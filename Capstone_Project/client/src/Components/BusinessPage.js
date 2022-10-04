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
  const history = useHistory(); 

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

  const [editMode, setEditMode] = useState(false); 
  const addEventClick = () => history.push(`/eventform/add/${business.businessId}`); 
  const enterEditMode = () => setEditMode(!editMode);

  const addReviewClick = () => history.push(`/reviewform/add/${business.businessId}`);
  console.log(editMode); 



  return (
    <>
      <h2>{business.name}</h2>
      <p>{business.description}</p>
      <img src={path} alt="Everything is on fire" />
      {business.personId == authManager.user.personId ? <button type="button" onClick={enterEditMode}>Change Edit Mode</button>:null}
      {(editMode && business.personId == authManager.user.personId) ? <button type="button">Edit Business</button>:null}
      <Reviews businessId={businessId}></Reviews>
      {business.personId != authManager.user.personId ? <button type="button" onClick={addReviewClick}>Add Review</button>:null}
      <Events businessId={businessId}></Events>
      {(editMode && business.personId == authManager.user.personId) ? <button type="button" onClick={addEventClick}>Add Event</button>:null}
      <Locations businessId={businessId}></Locations>
    </>
  )



}

export default BusinessPage; 
