import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Business from './Business';


function SearchBusinesses() {

    const [businesses, setBusinesses] = useState([]);

    const history = useHistory();

    const [prefix, setPrefix] = useState([]);

    const handleChange = (evt) => setPrefix(evt.target.value);

    const handleSubmit = (evt) => {

        evt.preventDefault();

        fetch(`http://localhost:8080/api/business/search/${prefix}`)
            .then(resp => {
                console.log(resp.status);
                if (resp.status === 200) {
                    return resp.json();
                }
                return Promise.reject('Something has gone wrong in fetching the Business data.');
            })
            .then(data => {
                setBusinesses(data);
            })
            .catch(console.log);
        //.catch(err => history.push('/error', {errorMessage: err}));

    }


    return (
        <>
            <h2>Search Businesses</h2>

            <form onSubmit={handleSubmit}>
                <div className="search-wrapper mb-3">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" id="search" value={prefix} onChange={handleChange} />
                    <button className="btn btn-outline-success my-2 my-sm-0 btn btn-light" type="submit">Search</button>
                </div>
            </form>

            <table className="table table-striped">
                <tbody>
                    {businesses.map(business => <Business key={business.businessId} business={business} />)}
                </tbody>
            </table>


        </>
    )

}

export default SearchBusinesses;

