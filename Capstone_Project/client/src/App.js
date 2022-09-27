
import Businesses from "./Components/Businesses";
import Reviews from "./Components/Reviews"; 
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  return (
    <div className="App">
      <Businesses/> 
      <Reviews businessId={2} />
    </div>
  );
}

export default App;
