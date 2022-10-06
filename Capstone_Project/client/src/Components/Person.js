import { useHistory } from "react-router-dom";


function Person ({ person }) {

  const onClick = () => history.push(`/personPage/${person.personId}`);
  const history = useHistory();
  const path = person.photo;

    return (
      
      <div className="col-sm-4">
      <div className="card">
      <div className="card-group">

      <div className="card-img-top">
        <div className="cover" alt="" style={{"background-image": `linear-gradient(#7F000000, #000000), url(${path})`, "background-size": "cover"}}>&nbsp;</div>
        </div>
        <div className="menu"></div>
        
        <div className="card-body">
          <h3 className="card-text">{person.firstName} {person.lastName}</h3>
          <button className="btn viewButton" type="button" onClick={onClick}>View Page</button>
        </div>

      </div>
      </div>
      </div>
);

}

export default Person;