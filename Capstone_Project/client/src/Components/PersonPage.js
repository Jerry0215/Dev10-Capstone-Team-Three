import Person from "./Person";
import {useHistory, useParams} from 'react-router-dom'; 
import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';


function PersonPage(){
    // business, location, person.personId -> personId attached

    const [person,setPerson] = useState([])
    const history = useHistory(); 
    let { personId } = useParams();

    const authManager = useContext(UserContext);
     
    
    
    useEffect(() => {

      const init = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authManager.user.token}`
        }
      };

      console.log(authManager);
        fetch(`http://localhost:8080/api/person/${personId}`,init)
        .then(resp => {
            if (resp.status === 200) {
            return resp.json();
            }
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
        })
        .then(data => {
            setPerson(data);
        })
        //.catch(err => history.push('/error', {errorMessage: err}));
        },[])

        let path = "../" + person.photoDir;
        
        const onEditClick = () => history.push(`/personform/edit/${personId}`)
        return (
        <>
        <h2>{person.firstName} {person.middleName} {person.lastName} {person.suffix}</h2>
        {personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button type="button" onClick={onEditClick}>Edit Profile</button>:null}

        <table className="table table-striped">
            <thead>
              <tr>
                {/* <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Photo</th>
                <th></th> */}
              </tr>
            </thead>
            <tbody>
              {<Person key={person.id} person={person} />}
            </tbody>
          </table>
        </>
        )

}

export default PersonPage;