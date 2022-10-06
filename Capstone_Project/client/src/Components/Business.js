import {useHistory} from 'react-router-dom';

function Business({business}){
    const history = useHistory();
    const onClick = () => history.push(`/businessPage/${business.businessId}`);
    return(
        <div className="col-sm-4">
      <div className="card">
      <div className="card-group">

      <div className="card-img-top">
        <div className="cover" alt="" style={{"background-image": `linear-gradient(#7F000000, #000000), url(${business.photo})`, "background-size": "cover"}}>&nbsp;</div>
        </div>
        <div className="menu"></div>
        
        <div className="card-body">
        <h3 className="card-text">{business.name}</h3>
            <div className='left-section'>
          
          <h4 className='con'>About</h4>
          <p>{business.description}</p>
          <button className="btn viewButton" type="button" onClick={onClick}>View Page</button>
          </div>
          <div className='right-section'>
            <div className='item'>
                
                <span className='rating'>{business.rating}</span>
                <span className='word'>Rating</span>
            </div>
          </div>
        </div>

      </div>
      </div>
      </div>
    )


}
export default Business; 