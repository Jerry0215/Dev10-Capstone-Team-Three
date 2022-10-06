import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';
import Review from '../Components/Review'

function Reviews({ businessId}) {
  
  const [reviews, setReviews] = useState([]);
  const history = useHistory(); 
  const authManager = useContext(UserContext);


  useEffect(() => {

    const init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authManager.user.token}`
      }
    };

    fetch(`http://localhost:8080/api/review/${businessId}`, init)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
      })
      .then(data => {
        setReviews(data);
      })
     .catch(err => history.push('/error', {errorMessage: err}));
  }, []);
  
  
  

    const handleDelete = (reviewId) =>{
        const filteredReviews = reviews.filter(review => review.reviewId!==reviewId);
        setReviews(filteredReviews); 
      }
  
 

  return (
    <>
      <h2 className='section-header'>Business Reviews</h2>
      <div className='testimonial-view'>
          
             <div className='carousel slide' id='testimonialCarousel' data-ride="carousel">
                <div className='carousel-inner'>
                    
                                  
                                          
                         {reviews.map((review, index) => <Review index={index} review={review} handleDelete={handleDelete} />)}
                                          
                                  
                              </div>
                                <a className='carousel-control-prev' href='#testimonialCarousel' role="button" data-slide="prev">
                                  <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                                  <span className='sr-only'>Previous</span>
                                </a>
                                <a className='carousel-control-next' href='#testimonialCarousel' role="button" data-slide="next">
                                  <span className='carousel-control-next-icon' aria-hidden="true"></span>
                                  <span className='sr-only'>Next</span>
                                </a>
                         
              </div>     
              
          
      </div>
      




          


      
    </>
  )




}
export default Reviews; 