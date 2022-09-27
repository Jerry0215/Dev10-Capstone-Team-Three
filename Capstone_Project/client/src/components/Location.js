function Location ({ location }) {
  
    return (
      <tr>
        <td>{location.address}</td>
        <td>{location.city}</td>
        <td>{location.state}</td>
        <td>{location.zipCode}</td>
        <td>{location.addressType}</td>
      </tr>
    );

}

export default Location;