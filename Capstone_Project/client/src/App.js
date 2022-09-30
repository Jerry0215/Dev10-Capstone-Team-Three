
import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 
import Locations from "./Components/Locations";
import Events from "./Components/Events";
import Home from "./Components/Home";
import Map from "./Components/Map";
import Persons from "./Components/Persons";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import UserContext from "./UserContext";


import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import BusinessPage from "./Components/BusinessPage";
import AllEvents from "./Components/AllEvents";
import Error from "./Components/Error";
import Register from "./Components/Register";
import PersonPage from "./Components/PersonPage";

const LOCALSTORAGE_KEY = 'NyelpAppToken';

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwt_decode(token);

    localStorage.setItem(LOCALSTORAGE_KEY, token);

    const roles = decodedToken.authorities.split(',');

    const user = {
      username: decodedToken.sub,
      roles,
      token,
      hasRole: function(role) {
        return this.roles.includes(role);
      }
    }

    setUser(user);
  }

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    setUser(null);
  }

  const authManager = {
    user: user ? {...user} : null,
    login,
    logout
  }

  useState(() => {
    const previouslySavedToken = localStorage.getItem(LOCALSTORAGE_KEY);
    if (previouslySavedToken) {
      login(previouslySavedToken);
    }
  }, [])

  return (
    
    <div className="App" >
      <div className="backdrop"></div>
     <UserContext.Provider value={authManager} >
      <Router>
      <Nav></Nav>
        <div className='container'>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/error">
          <Error>
          </Error>
        </Route>
        <Route exact path ="/register">
          <Register/>
        </Route>
        <Route exact path="/person">
          <Persons/>
        </Route>
        <Route exact path="/business">
          <Businesses/> 
        </Route>
        <Route exact path="/location">
          <Locations businessId={1}/>
        </Route>
        <Route exact path="/event">
          <AllEvents></AllEvents>
        </Route>
        <Route exact path="/map">
          <Map address="15 Capri Court" city="Dix Hills" state="New York"></Map>
        </Route>
        <Route exact path="/businessPage/:businessId" component={BusinessPage}>
  
        </Route>
        <Route exact path="/login" >
          <Login ></Login>
        </Route>
        <Route exact path="/personpage/:personId" component={PersonPage} >
          
        </Route>
        </div>
      </Router>
      </UserContext.Provider> 
    </div>
  );
}

export default App;
