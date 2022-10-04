import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';

function BusinessProfileRedirect(){
    const [business, setBusiness] = useState([])
    const history = useHistory(); 
    const authManager = useContext(UserContext); 
    
    useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };
    //${authManager.user.personId}
    fetch(`http://localhost:8080/api/business/byPerson/${authManager.user.personId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        history.push(`/businessPage/${data.businessId}`); 
      })
    .catch(err => history.push('/businessform/add'));
  }, []);
 
  
  


} 

export default BusinessProfileRedirect; 
