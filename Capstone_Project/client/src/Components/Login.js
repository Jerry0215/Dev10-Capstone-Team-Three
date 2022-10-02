import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Error from "./Error";
import UserContext from "../UserContext";

const DEFAULT_LOGIN = {
  username: '',
  password: ''
}

function Login({ onSubmit }) {

  const [login, setLogin] = useState(DEFAULT_LOGIN)
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const authManager = useContext(UserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    };

    fetch('http://localhost:8080/authenticate', init)
    .then(resp => {
        console.log(resp.status); 
      switch (resp.status) {
        
        case 200:
          return resp.json();
          history.push("/");
        case 403:
          setErrors(['The login information is incorrect']);
          break;
        default:
            
          return Promise.reject('Something terrible has happend');
      }
    })
    .then(body => authManager.login(body.jwt_token))
    //.catch(err => history.push('/error', {errorMessage: err}));
    
   
  }

  const handleChange = (evt) => {
    const loginCopy = {...login};

    loginCopy[evt.target.name] = evt.target.value;

    setLogin(loginCopy);
  }

  return (<>
    <h2>Login</h2>
    {errors.length > 0 ? <Error errors={errors} /> : null}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" className="form-control" id="username" value={login.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" className="form-control" id="password" value={login.password} onChange={handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  </>);
}

export default Login;