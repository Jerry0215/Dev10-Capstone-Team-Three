import {useHistory} from 'react-router-dom';

function Business({business}){
    const history = useHistory();
    const onClick = () => history.push(`/businessPage/${business.businessId}`);
    return(
        <tr>
            <td>{business.businessId}</td>
            <td>{business.name}</td>
            <td>{business.description}</td>
            <td>{business.rating}</td>
            <td>{business.locationId}</td>
            <td>{business.personId}</td>
            <td><button type="button" onClick={onClick}>View Page</button></td>
        </tr>
    )


}
export default Business; 