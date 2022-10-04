import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import Error from './Error';
import Confirmation from "./Confirmation";
import LocationFormBusiness from './LocationFormBusiness';

const DEFAULT_BUSINESS = { name: '', description: '', photoDir: '', photo: '', photoName: '', rating: 0, photoName: '', locationId: 1, personId: 1 }
const DEFAULT_LOCATION = { address: '', city: '', state: '', zipCode: '', addressType: 'Business' }
const DEFAULT_REVIEW = { content: '', timeDate: '', rating: 0, personId: 1, businessId: 1 }

function BusinessForm(  ) {

  const [business, setBusiness] = useState(DEFAULT_BUSINESS);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [review, setReview] = useState(DEFAULT_REVIEW);
  const [buttonPopup, setButtonPopup] = useState(false);

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
      fetch(`http://localhost:8080/api/business/${editId}`, init)
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
            setBusiness(body);
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

    const newBusiness = { ...business };



    newBusiness["photo"] = dataURL;
    console.log(newBusiness);
    setBusiness(newBusiness);



  }

  const saveBusiness = () => {

    const init = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...business })
    };

    fetch('http://localhost:8080/api/business', init)
      .then(resp => {

        if (resp.status === 201 || resp.status === 400) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(body => {
        if (body.businessId) {      
         history.push(`/businessPage/${body.businessId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));
  }

  const updateBusiness = () => {
    const updateBusiness = { id: editId, ...business };

    const init = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBusiness)
    };

    fetch(`http://localhost:8080/api/business/${editId}`, init)
    .then(resp => {
      switch (resp.status) {
        case 204:
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
        console.log(updateBusiness)
        if (!body) {
         history.push(`/businesspage/${business.businessId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));

  }

  const onSubmit = (evt) => {
    console.log(DEFAULT_BUSINESS)
    evt.preventDefault();

    const fetchFunction = editId > 0 ? updateBusiness : saveBusiness;

    businessToLocationForm();
    fetchFunction();

  }

  const handleChangeBusiness = (evt) => {

    const property = evt.target.name;
    const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
    const value = evt.target[valueType];

    const newBusiness = { ...business };

    newBusiness[property] = value;
    console.log(newBusiness);
    setBusiness(newBusiness);
  }


  const handleChangeLocation = (evt) => {

    const property = evt.target.name;
    const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
    const value = evt.target[valueType];

    const newLocation = { ...location };

    newLocation[property] = value;
    console.log(newLocation);
    setLocation(newLocation);
  }


  const handleTwoFunction = (evt) => {
    convertToBase64();
  }

  const businessToLocationForm = () => {
    setBusiness(business);
  }

  return (
    <>
      <h2>{editId ? 'Update' : 'Add'} Business</h2>
      {errors.length > 0 ? <Error errors={errors} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" className="form-control" id="name" value={business.name} onChange={handleChangeBusiness} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input name="description" type="text" className="form-control" id="description" value={business.description} onChange={handleChangeBusiness} />
        </div>
        <div className="form-group">
          <label htmlFor="photoName">Photo Name:</label>
          <input name="photoName" type="text" className="form-control" id="photoName" value={business.photoName} onChange={handleChangeBusiness} />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Upload Picture: </label>
          <input name="profilePicture" type="file" id="img" onChange={handleTwoFunction}></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-3">Submit</button>              
        </div>
        
      </form>
      
        <button type="button" className="btn btn-warning " onClick={() => {setButtonPopup(true)}} >Edit Location</button>
          <LocationFormBusiness trigger={buttonPopup} setTrigger={setButtonPopup} business={business} key={business.businessId} onCLick={LocationFormBusiness}></LocationFormBusiness>            
       
    </>
  )
}


export default BusinessForm;