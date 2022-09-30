import { Link } from "react-router-dom";

function Nav () {

    return (

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Nyelp!</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

      <li class="nav-item active">
        <Link class="nav-link" to="/">Home<span class="sr-only">(current)</span></Link>
      </li>

      <li class="nav-item active">
        <Link class="nav-link" to="/person">firstName</Link>
      </li>

      <li class="nav-item active">
        <Link class="nav-link" to="/businessPage/1">Businesses</Link>
      </li>

      <li class="nav-item active">
        <Link class="nav-link" to="/login">Sign In</Link>
      </li>

    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>

    )



}

export default Nav;