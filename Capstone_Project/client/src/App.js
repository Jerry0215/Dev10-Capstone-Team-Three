
import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 
import Locations from "./Components/Locations";
import Events from "./Components/Events";
import Home from "./Components/Home";
import Map from "./Components/Map";
import Persons from "./Components/Persons";
import Login from "./Components/Login";
import Nav from "./Components/Nav";

import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import BusinessPage from "./Components/BusinessPage";
import AllEvents from "./Components/AllEvents";
import Error from "./Components/Error";
import Register from "./Components/Register";


function App() {
  return (
    
    <div className="App" >
      
      <Router>
        <Nav/>
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
        </div>
      </Router>
    </div>
  );
}

export default App;
