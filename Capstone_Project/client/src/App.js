
import Businesses from "./components/Businesses";
import Reviews from "./components/Reviews"; 
import Locations from "./components/Locations";
import Events from "./components/Events";
import Home from "./components/Home";
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
        </div>
      </Router>
    </div>
  );
}

export default App;
