
import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 
import Locations from "./Components/Locations";
import Events from "./Components/Events";
import Home from "./Components/Home";
import Map from "./Components/Map";
import Persons from "./Components/Persons";

import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import BusinessPage from "./Components/BusinessPage";
import AllEvents from "./Components/AllEvents";
function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/person">
          <Persons/>
        </Route>
        <Route exact path="/business">
          <Businesses/> 
          <Reviews businessId={2} />
        </Route>
        <Route exact path="/location">
          <Locations/>
        </Route>
        <Route exact path="/event">
          <AllEvents></AllEvents>
        </Route>
        <Route exact path="/map">
          <Map address="15 Capri Court" city="Dix Hills" state="New York"></Map>
        </Route>
        <Route exact path="/businessPage">
          <BusinessPage businessId={2}/>
        </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
