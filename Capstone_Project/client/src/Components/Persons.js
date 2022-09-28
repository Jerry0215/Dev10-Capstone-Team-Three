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
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Photo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {persons.map(person => <Person key={person.id} person={person} />)}
            </tbody>
          </table>
        </>
      )


}

export default Persons;