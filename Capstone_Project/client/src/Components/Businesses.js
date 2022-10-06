import { useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Business from './Business';
import UserContext from '../UserContext';

function Businesses() {
  const [businesses, setBusinesses] = useState([]);

  const authManager = useContext(UserContext);
  const history = useHistory(); 
  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    fetch('http://localhost:8080/api/business', init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setBusinesses(data);
      })
    .catch(err => history.push('/error', {errorMessage: err}));
  }, [])

  return (
    <>
      <h2>Businesses</h2>
     
      {businesses.map(business => <Business key={business.businessId} business={business} />)}
      
    </>
  );
}

export default Businesses; 