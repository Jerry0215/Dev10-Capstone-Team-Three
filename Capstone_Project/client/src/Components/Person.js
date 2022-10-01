function Person ({ person }) {

  let path = "../" + person.photoDir;
    return (
      
      <tr>
        
        <td>{person.firstName} {person.middleName} {person.lastName} {person.suffix}</td>
        <td>{person.phone}</td>
        <td><img src={path} alt="Everything is on fire"/></td>
      </tr>
      
    );

}

export default Person;