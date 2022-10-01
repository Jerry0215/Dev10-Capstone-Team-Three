import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Person from './Person';


function SearchPersons() {

    const [persons, setPersons] = useState([]);

    const history = useHistory();

    const [prefix, setPrefix] = useState([]);

    const handleChange = (evt) => setPrefix(evt.target.value);

    const handleSubmit = (evt) => {

        evt.preventDefault();

        fetch(`http://localhost:8080/api/person/search/${prefix}`)
            .then(resp => {
                console.log(resp.status);
                if (resp.status === 200) {
                    return resp.json();
                }
                return Promise.reject('Something has gone wrong in fetching the Person data.');
            })
            .then(data => {
                setPersons(data);
            })
            .catch(console.log);
        //.catch(err => history.push('/error', {errorMessage: err}));

    }


    return (
        <>
            <h2>Search People</h2>

            <form onSubmit={handleSubmit}>
                <div className="search-wrapper mb-3">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" id="search" value={prefix} onChange={handleChange} />
                    <button className="btn btn-outline-success my-2 my-sm-0 btn btn-light" type="submit">Search</button>
                </div>
            </form>

            <table className="table table-striped">
                <tbody>
                    {persons.map(person => <Person key={person.personId} person={person} />)}
                </tbody>
            </table>


        </>
    )

}

export default SearchPersons;

