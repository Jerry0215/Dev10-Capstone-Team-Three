function Person ({ person }) {
  
    return (
      <tr>
        <td>{person.firstName}-{person.middleName}-{person.lastName}-{person.suffix}</td>
        <td>{person.phone}</td>
        <td>{person.photoDir}-{person.photoName}</td>
      </tr>
    );

}

export default Person;