import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../UserContext';

import Person from './Person';


function SearchPersons() {

    const [persons, setPersons] = useState([]);

    const history = useHistory();

    const [prefix, setPrefix] = useState([]);

    const authManager = useContext(UserContext);

    const handleChange = (evt) => setPrefix(evt.target.value);

    const handleSubmit = (evt) => {

        evt.preventDefault();

        const init = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authManager.user.token}`
            }
          };

        fetch(`http://localhost:8080/api/person/search/${prefix}`, init)
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
        //.catch();

    }



    return (
        <>
            <h2>Search People</h2>


            <form className="search" onSubmit={handleSubmit} action="action_page.php">
                <input className="form-control" type="text" placeholder="Search" id="search" value={prefix} onChange={handleChange} ></input>
                <button className="btn btn-outline-success my-2 my-sm-0 btn btn-light" type="submit">Search</button>
            </form>

        <div className="row">  
            {persons.map(person => <Person key={person.personId} person={person} />)}
        </div>


        </>
    )

}

export default SearchPersons;

