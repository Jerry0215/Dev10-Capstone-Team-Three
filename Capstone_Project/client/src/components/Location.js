import Map from "./Map";
function Location ({ location }) {
  
    return (
      <>
      <tr>
        <td>{location.address}</td>
        <td>{location.city}</td>
        <td>{location.state}</td>
        <td>{location.zipCode}</td>
        <td>{location.addressType}</td>
      </tr>
      <Map address={location.address} state={location.state} city={location.city} /> 
      </>
    );

}

export default Location;