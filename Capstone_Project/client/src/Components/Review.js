import UserContext from '../UserContext';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

function Review({index, review, handleDelete}){
    const authManager = useContext(UserContext);
    const history = useHistory();
    const [reviews, setReviews] = useState([]);

    const [person,setPerson] = useState([]);
    let active;
    if(index == 0){
        active = "carousel-item active";
    }else{
        active = "carousel-item";
    }
    useEffect(() => {

        const init = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`
          }
        };
  
        console.log(authManager);
          fetch(`http://localhost:8080/api/person/${review.personId}`,init)
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

    function handleClick(review) {
        history.push(`/reviewform/edit/${review.businessId}/${review.reviewId}`)
      }

      const handleDeleteClick = (reviewId) => {

        const init = {
          method: 'DELETE',
          headers:
          {
            Authorization: `Bearer ${authManager.user.token}`
          }
        };
    
        fetch(`http://localhost:8080/api/review/${reviewId}`, init)
        .then( resp => {
          switch(resp.status) {
            case 204:
              return null;
            case 404:
              history.push('/not-found')
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          }
        })
        .then(resp => {
            if (!resp) {
              handleDelete(reviewId);
            } else {
              console.log(resp); 
            }
          })
          .catch(err => history.push('/error', {errorMessage: err}));
        }
    
      console.log(person)

    return(
        
    
          <> 
          <div className= {active}>
                          <div className='block'>
                              <div className='row'>
          <div className='col-md-5'>
              <div className='user'>
                    <div className='image'>
                        <img src = {person.photo}></img>
                    </div>
                    <div className='info'>
                        <h2 className='user-name'>{person.firstName} {person.lastName}</h2>
                        <h4>Customer</h4>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='content'>{review.content}</div>
                
            </div>
            </div>
            {review.personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button className='btn btn-warning' type="button" onClick={ () => handleClick(review)}>Edit Review</button>:null}
              {review.personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button className='btn btn-danger m-3' type="button" onClick={ () => handleDeleteClick(review.reviewId)}>Delete Review</button>:null}
            </div>
            
  
            </div>
            
          </>    
          
    )
}


export default Review;
/*
<td>{review.personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button type="button" onClick={ () => handleClick(review)}>Edit Review</button>:null}</td>
              <td>{review.personId == authManager.user.personId || authManager.user.roles[0] === 'ROLE_ADMIN' ? <button type="button" onClick={ () => handleDeleteClick(review.reviewId)}>Delete Review</button>:null}</td>
              
  */           