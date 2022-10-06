import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import Person from './Person';

function Persons() {
  const [persons, setPersons] = useState([]);
  const history = useHistory(); 
  const authManager = useContext(UserContext);

  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    fetch('http://localhost:8080/api/person', init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something has gone wrong in fetching the Person data.');
      })
      .then(data => {
        setPersons(data);
      })
    .catch(err => history.push('/error', {errorMessage: err}));
  }, [])


  return (
    <>
      <h2>Persons</h2>
     
      <div className="row">
        {persons.map(person => <Person key={person.personId} person={person} />)}
      </div>
    </>
  )


}

export default Persons;