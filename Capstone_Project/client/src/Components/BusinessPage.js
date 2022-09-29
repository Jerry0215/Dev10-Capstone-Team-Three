import {useHistory} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import Reviews from './Reviews';
import Events from './Events';
import Locations from './Locations';
function BusinessPage({businessId}){
    const [business,setBusiness] = useState([])
    const init = {
        method:'GET'
    };
    useEffect(() => {
        fetch(`http://localhost:8080/api/business/${businessId}`,init)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json();
          }
          return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
        })
        .then(data => {
          setBusiness(data);
        })
        //.catch(err => history.push('/error', {errorMessage: err}));
      },[])


      return (
        <>
        <h2>{business.name}</h2>
        <Reviews businessId={businessId}></Reviews>
        <Events businessId={businessId}></Events>
        <Locations businessId={businessId}></Locations>
        </>
      )

    





}

export default BusinessPage; 
