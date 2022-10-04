


function Person ({ person }) {

  const path = person.photo;
  return (
      
    <div className="col-sm-6">
    <div className="card">
    <div className="card-group">

    
      <img className="card-img-top" src={path} alt=""></img>
      <div className="cover card-img-top"></div>
      <div className="menu"></div>
      
      <div className="card-body">
        <p className="card-text">{person.firstName} {person.middleName} {person.lastName} {person.suffix}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>

    </div>
    </div>
    </div>

  );

}

export default Person;