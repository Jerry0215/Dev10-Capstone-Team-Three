import { useHistory } from "react-router-dom";


function Person ({ person }) {

  const onClick = () => history.push(`/personPage/${person.personId}`);
  const history = useHistory();
  const path = person.photo;

    return (
      
      <div className="col-sm-4">
      <div className="card">
      <div className="card-group">


        <img className="card-img-top" src={path} alt=""></img>
        <div className="cover"></div>
        <div className="menu"></div>
        
        <div className="card-body">
          <p className="card-text">{person.firstName} {person.middleName} {person.lastName} {person.suffix} {person.locationId}</p>
          <button type="button" onClick={onClick}>View Page</button>
        </div>

      </div>
      </div>
      </div>
);

}

export default Person;