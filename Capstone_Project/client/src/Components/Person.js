


function Person ({ person }) {

  const path = person.photo;
    return (
      
      <div className="col-sm-4">
      <div className="cards">
      <div className="card-group">


        <img className="card-img-top" src={path} alt=""></img>
        <div className="cover"></div>
        <div className="menu"></div>
        
        <div className="card-body">
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>

      </div>
      </div>
      </div>

    );

}

export default Person;