function Person ({ person }) {

  let path = "../src/" + person.photoDir;
  
    return (
      
      <div class="col-sm-4">
      <div className="cards">
      <div class="card-group">
        
        <img className="card-img-top" src={path} alt=""></img>
        <div className="cover"></div>
        <div className="menu"></div>
        
        <div className="card-body">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>

      </div>
      </div>
      </div>
    );

}

export default Person;