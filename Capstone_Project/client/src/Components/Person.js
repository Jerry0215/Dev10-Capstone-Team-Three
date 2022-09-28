function Person ({ person }) {
  
    return (
      
      <tr>
        
        <td>{person.firstName}-{person.middleName}-{person.lastName}-{person.suffix}</td>
        <td>{person.phone}</td>
        <td><img src={person.photo} alt="Everything is on fire"/></td>
      </tr>
      
    );

}

export default Person;