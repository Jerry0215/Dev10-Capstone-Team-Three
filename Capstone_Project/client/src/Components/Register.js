import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';
import Error from './Error';

const DEFAULT_PERSON = { firstName: 'New', middleName: '', lastName: 'User', suffix: '', photo: '', photoName: 'New', phone: '.', locationId: 1, userId: 1 }

const DEFAULT_REGISTER = {
  username: '',
  password: '',
  confirmPassword: ''
}

function Register() {
  
  const [person, setPerson] = useState(DEFAULT_PERSON);
  const [register, setRegister] = useState(DEFAULT_REGISTER)
  const [errors, setErrors] = useState([]);

  const authManager = useContext(UserContext);

  const history = useHistory();

  function read(data, callback) {
    const reader = new FileReader();
    reader.onload = callback;
    reader.onerror = console.log;
    reader.readAsDataURL(data);
    console.log(reader);
  }




  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (register.password !== register.confirmPassword) {
      setErrors(['The passwords don\'t match']);
      return;
    }


    const registration = {
      username: register.username,
      password: register.password
    };
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registration)
    };

    fetch('http://localhost:8080/create_account', init)
    .then(resp => {
      
      switch (resp.status) {    
        case 201:
        savePerson();
        case 400:
          return resp.json();
        case 403:
          return ['Unable to register with this username and password combination'];
        default:
          return Promise.reject('Something terrible has happend');
      }
    })
    .then(body => {
      if (body) {
      } else {
        setErrors(body);
      }
    })
    .catch(err => history.push('/error', {errorMessage: err}));
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
          history.push("/login");
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(body => {
        if (body.personId) {
          //history.push(`/personPage/${body.personId}`)
        } else if (body) {
          setErrors(body);
        }
      })
      .catch(err => history.push('/error', { errorMessage: err }));
  }

  const handleChange = (evt) => {
    const registerCopy = {...register};

    registerCopy[evt.target.name] = evt.target.value;

    setRegister(registerCopy);
  }

  return (<>
  
  {errors.length > 0 ? <Error errors={errors} /> : null}
  <div className='signup-form'>
    
    
    <form onSubmit={handleSubmit}>
    <h2>Create Account</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" className="form-control signB" id="username" value={register.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" className="form-control signB" id="password" value={register.password} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input name="confirmPassword" type="password" className="form-control signB" id="confirmPassword" value={register.confirmPassword} onChange={handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn sign-btn ">Submit</button>
      </div>
    </form>
    </div>
  </>);
}

export default Register;