import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Error from "./Error";
import UserContext from "../UserContext";
import Register from "./Register";

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
        case 403:
          setErrors(['The login information is incorrect']);
          break;
        default:
            
          return Promise.reject('Something terrible has happend');
      }
    })
    .then(body => authManager.login(body.jwt_token))
    //.catch(err => history.push('/error', {errorMessage: err}));
    
    history.push("/");
  }

  const handleChange = (evt) => {
    const loginCopy = {...login};

    loginCopy[evt.target.name] = evt.target.value;

    setLogin(loginCopy);
  }

  let fields = document.querySelectorAll(".form-group-signin input");
  let btn = document.querySelector(".btn-block");
  

  function checkButton(){
    if(fields[0].value != "" && fields[1].value != "")
      btn.disabled=false;
    else
      btn.disabled=true;
    
  }

  let fields2 = document.querySelector(".show-password");
  function checkSlash(){
    console.log(fields2.classList[2]);
    if(fields2.classList[2] == "fa-eye-slash"){
      fields2.classList.remove("fa-eye-slash");
      fields2.classList.add("fa-eye");
      fields[1].type = "text";
    }else{
      fields2.classList.remove("fa-eye");
      fields2.classList.add("fa-eye-slash");
      fields[1].type = "password";
    }
  }
  

  

  return (<>
  
  <div className="login">
  
    {errors.length > 0 ? <Error errors={errors} /> : null}
    <form onSubmit={handleSubmit} className="login-form">
    <h2 >Sign In</h2>
      <div className="form-group-signin">
        <input name="username" type="text" className="form-control" id="username" value={login.username} onChange={handleChange} onKeyUp={checkButton} />
        <div className="placeholder">Username:</div>
      </div>
      <div className="form-group-signin">
        <input name="password" type="password" className="form-control" id="password" value={login.password} onChange={handleChange} onKeyUp={checkButton}/>
        <div className="placeholder" htmlFor="password">Password:</div>
        <div className="show-password fas fa-eye-slash" onClick={checkSlash}></div>
      </div>



      <div className="form-group-btn">
        <button type="submit" className="btn-block fas fa-arrow-right" disabled ></button>
        <Link className="a" to="/register">Create Account</Link>
      </div>



    </form>

    
    </div>
  </>);
}

export default Login;