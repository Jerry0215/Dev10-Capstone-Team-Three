import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Error from './Error';
import UserContext from '../UserContext';

const DEFAULT_LOCATION = { address: '', city: '', state: '', zipCode: '', addressType: 'Home'}

function LocationFormPerson( {trigger, setTrigger, person} ){

    const [location, setLocation] = useState(DEFAULT_LOCATION);

    const [blob, setBlob] = useState([]);
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const authManager = useContext(UserContext);

    useEffect(() => {
     
      const init = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authManager.user.token}`
        }
      };

        if (person.locationId) {
            fetch(`http://localhost:8080/api/location/${person.locationId}`, init)
            .then(resp => {
              switch(resp.status) {
                case 200:
                  return resp.json();
                case 404:
                  history.push('/not-found', { id: person.locationId })
                  break;
                default:
                  return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
              }
            })
            .then(body => {
              if (body) {
                body.locationId = 0;
                setLocation(body);
              }
            })
            .catch(err => history.push('/error', {errorMessage: err}));
        }
    
      }, [])

    const saveLocation = () => {
    
        const init = {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${authManager.user.token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({...location})
        };
    
        fetch('http://localhost:8080/api/location', init)
        .then(resp => {
            
            if (resp.status === 201 || resp.status === 400) {
            return resp.json();
            }
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
        })
        .then(body => {         
            if (body.locationId) {  
                  
              person.locationId = body.locationId;
              setTrigger(false);
            } else if (body) {
            setErrors(body);
            }
        })
        .catch(err => history.push('/error', {errorMessage: err}));
        }

        const handleChangeLocation = (evt) => {

            const property = evt.target.name;
            const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
            const value = evt.target[valueType];
        
            const newLocation = { ...location };
        
            newLocation[property] = value;
       
            setLocation(newLocation);
          }
    
          const onSubmit1 = (evt) => {       
            evt.preventDefault();
            
           
            saveLocation();
            
          }
    
    return (trigger) ? (
        <>
        
        <h2>Your Location</h2>
        {errors.length > 0 ? <Error errors={errors} /> : null}
        <form onSubmit={onSubmit1}>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input name="address" type="text" className="form-control" id="address" value={location.address} onChange={handleChangeLocation} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input name="city" type="text" className="form-control" id="city" value={location.city} onChange={handleChangeLocation} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select name="state" className="form-control" id="state" value={location.state} onChange={handleChangeLocation} >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <input name="zipCode" type="text" className="form-control" id="zipCode" value={location.zipCode} onChange={handleChangeLocation} />
        </div>

        <div className="form-group">               
                <button type="submit" className="btn btn-success mr-3">Submit Location</button>
            </div>
        </form>
  
        </>
    ) : "";
}


export default LocationFormPerson;