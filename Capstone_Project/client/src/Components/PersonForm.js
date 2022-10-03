import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Error from './Error';
import UserContext from '../UserContext';



const DEFAULT_PERSON = { firstName: '', middleName: '', lastName: '', suffix: '', photo: '', photoName: '', phone: '', locationId: 1, userId: 1 }


function PersonForm() {

  const [person, setPerson] = useState(DEFAULT_PERSON);

  const { editId } = useParams();
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


          if (body.personId) {

            history.push('/person')
          } else if (body) {
            setErrors(body);
          }
        })
        .catch(err => history.push('/error', { errorMessage: err }));
    }
  }, [])

  const updatePerson = () => {
    const updatePerson = { id: editId, ...person };

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePerson)
    };

    fetch(`http://localhost:8080/api/person/${editId}`, init)
      .then(resp => {
        console.log(resp.status);
        switch (resp.status) {
          case 200:
            return null;
          case 400:
            return resp.json();
          case 404:
            history.push('/not-found', { id: editId });
            break;
          default:
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');

        }
      })
      .then(body => {
        if (!body) {
          history.push('/person')
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));
  }

  const savePerson = () => {

    const init = {
      method: 'POST',
      headers: {
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

          history.push(`/personPage/${person.personId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));
  }


  const onSubmit = (evt) => {

    evt.preventDefault();

    const fetchFunction = editId > 0 ? updatePerson : savePerson;

    fetchFunction();

  }

  const handleChange = (evt) => {

    const property = evt.target.name;
    const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
    const value = evt.target[valueType];

    const newPerson = { ...person };

    newPerson[property] = value;
    console.log(newPerson);
    setPerson(newPerson);
  }

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
    console.log(newPerson);
    setPerson(newPerson);



  }

  const handleTwoFunction = (evt) => {
    convertToBase64();
  }

  return (
    <>
      <h2>{editId ? 'Update' : 'Add'} Profile</h2>
      {errors.length > 0 ? <Error errors={errors} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input name="firstName" type="text" className="form-control" id="firstName" value={person.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle Name:</label>
          <input name="middleName" type="text" className="form-control" id="middleName" value={person.middleName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input name="lastName" type="text" className="form-control" id="lastName" value={person.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="suffix">Suffix:</label>
          <input name="suffix" type="text" className="form-control" id="suffix" value={person.suffix} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone #:</label>
          <input name="phone" type="text" className="form-control" id="phone" value={person.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="photoName">Photo Name:</label>
          <input name="photoName" type="text" className="form-control" id="photoName" value={person.photoName} onChange={handleChange} />
        </div>

        <label htmlFor="profilePicture">Upload Picture: </label>
        <input name="profilePicture" type="file" id="img" onChange={handleTwoFunction}></input>

        <div className="form-group">

          <button type="submit" className="btn btn-success mr-3">Submit</button>
        </div>
      </form>



    </>
  )

}


export default PersonForm;