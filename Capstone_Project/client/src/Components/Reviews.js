import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

function Reviews({ businessId }) {

  const [reviews, setReviews] = useState([]);

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
    // .catch(err => history.push('/error', {errorMessage: err}));
  }, []);


  return (
    <>
      <h2>Business Reviews</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">reviewId</th>
            <th scope="col">content</th>
            <th scope="col">timeDate</th>
            <th scope="col">rating</th>
            <th scope="col">personId</th>
            <th scope="col">businessId</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.reviewId}</td>
              <td>{review.content}</td>
              <td>{review.timeDate}</td>
              <td>{review.rating}</td>
              <td>{review.personId}</td>
              <td>{review.businessId}</td>
            </tr>
          ))}
        </tbody>


      </table>
    </>
  )




}
export default Reviews; 