import { Link } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "../UserContext";

function Nav () {
  const authManager = useContext(UserContext);
    return (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Nyelp!</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

      <li className="nav-item active">
        <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/person">firstName</Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/business">Businesses</Link>
      </li>

      <li className="nav-item active">
      {!authManager.user ? (<>
              <li className="nav-item">
                <Link to="/login" className='nav-link'>Sign In</Link>
              </li> 
            </>): 
            <button type="button" className="btn btn-secondary" onClick={authManager.logout}>Sign Out</button>}
      </li>

    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>

    )



}

export default Nav;