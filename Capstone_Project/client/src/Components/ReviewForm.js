import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Error from './Error';
import UserContext from '../UserContext';

const DEFAULT_REVIEW = {content:'', timeDate:'', rating:'', personId:1,businessId:1}
function ReviewForm(){
    

    const [review, setReview] = useState(DEFAULT_REVIEW);
    const authManager = useContext(UserContext);
   
    const editId = 1; 
    console.log("here");
    console.log(authManager); 
    const history = useHistory();
    const [errors,setErrors] = useState([]); 
    

    useEffect(() => {
        const init = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`
          }
        };
    
        if (editId) {
          fetch(`http://localhost:8080/api/review/byReview/${editId}`, init)
            .then(resp => {
              switch (resp.status) {
                case 204:
                  return resp.json();
                case 404:
                  history.push('/not-found', { id: editId })
                  break;
                default:
                  return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
              }
            })
            .then(body => {
              if (body) {
                setReview(body);
              }
            })
            .catch(err => history.push('/error', { errorMessage: err }));
        }
    
      }, []);
    
      const saveReview = () => {
    
        const init = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...review })
        };
        console.log(JSON.stringify({ ...review}))
    
        fetch('http://localhost:8080/api/review', init)
          .then(resp => {
    
            if (resp.status === 201 || resp.status === 400) {
              return resp.json();
            }
            return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
          })
          .then(body => {
            if (body.reviewId) {
              
             // history.push(`/businessPage/${businessId}`)
            } else if (body) {
              setErrors(body);
            }
          })
          .catch(err => history.push('/error', { errorMessage: err }));
      }

      const updateReview = () => {
        const updateReview = { id: editId, ...review };
    
        const init = {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authManager.user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateReview)
        };
    
        fetch(`http://localhost:8080/api/review/${editId}`, init)
        .then(resp => {
          switch (resp.status) {
            case 204:
              return null;
            case 400:
              return resp.json();
            case 404:
              history.push('/not-found', { id: editId });
              break;
            case 403:
              authManager.logout();
              history.push('/login');
              break;
            default:
              return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
    
            }
          })
          .then(body => {
            if (!body) {
              //history.push(`/businesspage/${businessId}`)
            } else if (body) {
              setErrors(body);
            }
          })
          .catch(err => history.push('/error', { errorMessage: err }));
    
      }
      const handleChangeReview= (evt) => {

        const property = evt.target.name;
        const valueType = evt.target.type === 'checkbox' ? 'checked' : 'value';
        const value = evt.target[valueType];
    
        const newReview = { ...review};
    
        newReview[property] = value;
        console.log(newReview);
        setReview(newReview);
      }

      const onSubmit = (evt) => {
        //event.timeDate = event.timeDate + ":00.000+00:00"
        evt.preventDefault();
        
        const fetchFunction = editId > 0 ? updateReview : saveReview;
    
        fetchFunction();
        
        
      }

      return(
        <>
            <h2>{editId ? 'Update' : 'Add'} Review</h2>
            {errors.length > 0 ? <Error errors={errors} /> : null}
            <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <input name="content" type="text" className="form-control" id="content" value={review.content} onChange={handleChangeReview} />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Content:</label>
              <input name="rating" type="number" className="form-control" id="rating" value={review.rating} onChange={handleChangeReview} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success mr-3">Submit</button>
            </div>
            </form>
            </>

      );

}

export default ReviewForm;
