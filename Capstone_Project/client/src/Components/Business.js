
function Business({business}){

    return(
        <tr>
            <td>{business.businessId}</td>
            <td>{business.name}</td>
            <td>{business.description}</td>
            <td>{business.rating}</td>
            <td>{business.locationId}</td>
            <td>{business.personId}</td>
        </tr>
    )


}
export default Business; 