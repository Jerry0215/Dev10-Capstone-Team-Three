import { Link } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "../UserContext";

function Nav() {
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
       
          {authManager.user ?
              (<>
                <li className="nav-item active">
                  <Link to={"/personpage/" +authManager.user.personId} className='nav-link'>Profile</Link>
                </li>
              </>) : null
            }

          <li className="nav-item active">
            <Link className="nav-link" to="/searchpeople">Search People</Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="/searchbusinesses">Search Businesses</Link>
          </li>

        </ul>

        <ul className="navbar-nav mt-2 mt-lg-0">
        <div className="right-aligned-links">
            {!authManager.user ? (<>
              <li className="nav-item active">
                <Link to="/login" className='nav-link'>Sign In</Link>
              </li>
            </>) :
              <button type="button" className="btn btn-secondary" onClick={authManager.logout}>Sign Out</button>}
          </div>

        </ul>

        
      </div>
    </nav>

  )

}

export default Nav;