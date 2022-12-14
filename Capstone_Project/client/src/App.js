
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
import ServerError from "./Components/ServerError"
import Register from "./Components/Register";
import PersonPage from "./Components/PersonPage";
import SearchPersons from "./Components/SearchPersons";
import SearchBusinesses from "./Components/SearchBusinesses";
import PersonForm from "./Components/PersonForm";
import BusinessForm from "./Components/BusinessForm";

import LocationFormPerson from "./Components/LocationFormPerson";
import LocationFormBusiness from "./Components/LocationFormBusiness";

import { isCompositeComponent } from "react-dom/test-utils";
import EventForm from "./Components/EventForm";
import ReviewForm from "./Components/ReviewForm";
import BusinessProfileRedirect from "./Components/BusinessProfileRedirect";
import NotFound from "./Components/NotFound";


const LOCALSTORAGE_KEY = 'NyelpAppToken';

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwt_decode(token); 
    localStorage.setItem(LOCALSTORAGE_KEY, token);
    console.log(decodedToken)
    console.log("test"); 
    const roles = decodedToken.authorities.split(',');

    const user = {
      username: decodedToken.sub,
      personId: decodedToken.appUserId,
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
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/searchpeople" >
          <SearchPersons/>
        </Route>
        <Route exact path="/searchbusinesses" >
          <SearchBusinesses/>
        </Route>
        <Route exact path="/error">
          <ServerError>
          </ServerError>
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
        <Route exact path={['/personform/add', '/personform/edit/:editId']}>
          <PersonForm></PersonForm>
        </Route>
        <Route exact path = {['/eventform/add/:businessId','/eventform/edit/:businessId/:editId']}>
          <EventForm/>
        </Route>
        <Route exact path={['/businessform/add', '/businessform/edit/:editId']}>
          <BusinessForm></BusinessForm>
        </Route>
        <Route exact path={['/locationform/business/add/:editId', '/locationform/business/edit/:editId']}>
          <LocationFormBusiness></LocationFormBusiness>
        </Route>
        <Route path={['/locationform/person/add/:editId', '/locationform/person/edit/:editId']}>
          <LocationFormPerson></LocationFormPerson>
        </Route>
        <Route exact path={['/reviewform/add/:businessId','/reviewform/edit/:businessId/:editId']}>
          <ReviewForm/>
        </Route>
        <Route exact path={'/businessProfileRedirect'}>
          <BusinessProfileRedirect/>
        </Route>
        <Route path='*'>
          <NotFound/>
        </Route>

        </Switch>
        </div>
       
      </Router>
      </UserContext.Provider> 
    </div>
  );
}

export default App;
