import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Person from './Person';

function Persons() {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/person')
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something has gone wrong in fetching the Person data.');
        })
        .then(data => {
            setPersons(data);
        })
       // .catch(err => history.push('/error', {errorMessage: err}));
      },[])


      return (
        <>
          <h2>Persons</h2>
          <div class="row">
          {persons.map(person => <Person key={person.id} person={person} />)}
          </div>
        </>
      )


}

export default Persons;