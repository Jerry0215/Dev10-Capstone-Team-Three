
import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 
import Locations from "./Components/Locations";
import Events from "./Components/Events";
import Home from "./Components/Home";
import Map from "./Components/Map";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/business">
          <Businesses/> 
          <Reviews businessId={2} />
        </Route>
        <Route exact path="/location">
          <Locations/>
        </Route>
        <Route exact path="/event">
          <Events/>
        </Route>
        <Route exact path="/map">
          <Map address="15 Capri Court" state="New York"></Map>
        </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
