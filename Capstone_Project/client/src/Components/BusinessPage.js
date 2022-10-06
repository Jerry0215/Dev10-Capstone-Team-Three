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

   

    fetch(`http://localhost:8080/api/business/${businessId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {

        setBusiness(data);

      
        setPath(data.photo);
      })
      .catch(err => history.push('/error', {errorMessage: err}));
  }, [])

  const [editMode, setEditMode] = useState(false); 
  const addEventClick = () => history.push(`/eventform/add/${business.businessId}`); 
  const enterEditMode = () => setEditMode(!editMode);

  const addReviewClick = () => history.push(`/reviewform/add/${business.businessId}`);

  const onEditBusinessClick = () => history.push(`/businessform/edit/${businessId}`);

  const handleDeleteClick = () => {
    const init = {
      method: 'DELETE',
      headers:
      {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    fetch(`http://localhost:8080/api/business/${businessId}`, init)
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
            history.push("/"); 
          } else {
            console.log(resp); 
          }
        })
        .catch(err => history.push('/error', {errorMessage: err}));
      }
  

  return (
    <>
      <div className="contact">
      <h2>{business.name}</h2>
      <p>{business.description}</p>
      </div>
    

      <div className= "header-img1" alt="" style={{"background-image": `url(${path})`}}>&nbsp;</div>

      {((business.personId == authManager.user.personId) || authManager.user.roles[0] === 'ROLE_ADMIN') ? <button button className="btn btn-primary mr-3" type="button" onClick={enterEditMode}>Change Edit Mode</button>:null}
      {(editMode && business.personId == authManager.user.personId) || (authManager.user.roles[0] === 'ROLE_ADMIN' && editMode) ? <button button className="btn btn-warning mr-3" type="button" onClick={onEditBusinessClick}>Edit Business</button>:null}
      {(editMode && business.personId == authManager.user.personId) || (authManager.user.roles[0] === 'ROLE_ADMIN' && editMode) ? <button button className="btn btn-danger mr-3" type="button" onClick={handleDeleteClick}>Delete Business</button>:null}

      <Reviews businessId={businessId}></Reviews>
      {(business.personId != authManager.user.personId) || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button className="btn btn-primary" type="button" onClick={addReviewClick}>Add Review</button>:null}
      <Events businessId={businessId} editMode={editMode}></Events>
      {(editMode && business.personId == authManager.user.personId) || (authManager.user.roles[0] === 'ROLE_ADMIN' && editMode) ? <button className="btn btn-primary mb-3" type="button" onClick={addEventClick}>Add Event</button>:null}
      <div>
      <Locations businessId={businessId}></Locations>
      </div>
    </>
  )



}

export default BusinessPage; 
