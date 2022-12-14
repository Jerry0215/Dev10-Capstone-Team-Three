import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Error from './Error';
import UserContext from '../UserContext';
import LocationFormPerson from './LocationFormPerson';


const DEFAULT_PERSON = { firstName: '', middleName: '', lastName: '', suffix: '', photo: '', photoName: '', phone: '', locationId: 1, userId: 1 }
const DEFAULT_LOCATION = { address: '', city: '', state: '', zipCode: '', addressType: 'Home' }

function PersonForm() {

  const [person, setPerson] = useState(DEFAULT_PERSON);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [buttonPopup, setButtonPopup] = useState(false);
  const { editId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const locationID = 0;
  const authManager = useContext(UserContext);

  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    if (editId) {
      fetch(`http://localhost:8080/api/person/${editId}`, init)
        .then(resp => {
          switch (resp.status) {
            case 200:
              return resp.json();
            case 404:
              history.push('/not-found', { id: editId })
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          }
        })
        .then(body => {
          if (body) {
            setPerson(body);

          }
        })
        .catch(err => history.push('/error', { errorMessage: err }));


    }


  }, [])

  function read(data, callback) {
    const reader = new FileReader();
    reader.onload = callback;
    reader.onerror = console.log;
    reader.readAsDataURL(data);
    console.log(reader);
  }

  function convertToBase64() {

    const img = document.getElementById('img');

    read(img.files[0], convertToBlob);

    img.value = null;

  }

  function convertToBlob(evt) {
    const dataURL = evt.target.result;

    const newPerson = { ...person };

    newPerson["photo"] = dataURL;
   
    setPerson(newPerson);

  }

  const handleTwoFunction = (evt) => {
    convertToBase64();


  }

  const savePerson = () => {

    const init = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...person })
    };

    fetch('http://localhost:8080/api/person', init)

      .then(resp => {

        if (resp.status === 201 || resp.status === 400) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(body => {
        if (body.personId) {
          history.push(`/personPage/${body.personId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));
  }

    const updatePerson = () => {
      const updatePerson = { id: editId, ...person };

      const init = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authManager.user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePerson)
      };

      fetch(`http://localhost:8080/api/person/${editId}`, init)
      .then(resp => {
      
        switch (resp.status) {
          case 200:
            return null;
          case 400:
            return resp.json();
          case 404:
            history.push('/not-found', { id: editId });
            break;
          case 403:
            authManager.logout();
            history.push('/login');
            break;
          default:
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');

        }
      })
      .then(body => {
        if (!body) {
          history.push(`/personpage/${person.personId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));

  }

          const onSubmit = (evt) => {

            evt.preventDefault();



            const fetchFunction2 = editId > 0 ? updatePerson : savePerson;

            fetchFunction2();

          }

          const handleChangePerson = (evt) => {

            const property = evt.target.name;
            const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
            const value = evt.target[valueType];

            const newPerson = { ...person };

            newPerson[property] = value;
          
            setPerson(newPerson);
          }

          const onCancelClick = () => history.push(`/personpage/${person.personId}`);

          const[isDisabled, setIsDisabled] = useState(true);

          return (
            <>
              <h2>{editId ? 'Update' : 'Add'} Profile</h2>
              {errors.length > 0 ? <Error errors={errors} /> : null}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input name="firstName" type="text" className="form-control" id="firstName" value={person.firstName} onChange={handleChangePerson} />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middle Name:</label>
                  <input name="middleName" type="text" className="form-control" id="middleName" value={person.middleName} onChange={handleChangePerson} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input name="lastName" type="text" className="form-control" id="lastName" value={person.lastName} onChange={handleChangePerson} />
                </div>
                <div className="form-group">
                  <label htmlFor="suffix">Suffix:</label>
                  <input name="suffix" type="text" className="form-control" id="suffix" value={person.suffix} onChange={handleChangePerson} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone #:</label>
                  <input name="phone" type="text" className="form-control" id="phone" value={person.phone} onChange={handleChangePerson} />
                </div>
                <div className="form-group">
                  <label htmlFor="photoName">Photo Name:</label>
                  <input name="photoName" type="text" className="form-control" id="photoName" value={person.photoName} onChange={handleChangePerson} />
                </div>


                <label htmlFor="profilePicture">Upload Picture: </label>
                <input name="profilePicture" type="file" id="img" onChange={handleTwoFunction}></input>

                <div className="form-group">
                  <button type="submit" className="btn btn-success mr-3" disabled={isDisabled}>Submit</button>
                  <button type="button" className="btn btn-secondary mr-3" onClick={onCancelClick}>Go Back</button>   
                </div>
              </form>

      
              <button type="button" className="btn btn-warning " onClick={() => {setButtonPopup(true); setIsDisabled(false)}} >Edit Location</button>
          <LocationFormPerson trigger={buttonPopup} setTrigger={setButtonPopup} person={person} key={person.personId} onCLick={LocationFormPerson}></LocationFormPerson>            
       
            </>
          )

          }


          export default PersonForm;