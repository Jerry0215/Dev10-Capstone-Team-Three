import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Person from './Person';

function SearchPersons( {onSubmit} ) {
    const [prefix, setPrefix] = useState([]);

      const handleSubmit = (evt) => {
        evt.preventDefault();

        const init = {
            method: 'GET',
            body: JSON.stringify(prefix)
          };
    
        fetch(`http://localhost:8080/api/person/search/${prefix}`, init)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something has gone wrong in fetching the Person Search data.');
        })
        .then(data => {
            setPrefix(data);
        })
       // .catch(err => history.push('/error', {errorMessage: err}));
      }


      return (
        <>
          <h2>Search People</h2>

          <div className="search-wrapper mb-3">
            <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" id="search"/>
                <button className="btn btn-outline-success my-2 my-sm-0 btn btn-light" type="submit">Search</button>
            </form>
        </div>

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
              {prefix.map(person => <Person key={person.id} person={person} />)}
            </tbody>
          </table>
          

        </>
      )

}

export default SearchPersons;

