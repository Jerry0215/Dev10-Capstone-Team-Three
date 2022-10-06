import { useHistory } from "react-router-dom";


function ServerError({error}) {

    return(<>
    <h2>Oh noes! Everything is on fire!</h2>
    {/* <img src="../../src/pictures/thisisfine.webp" alt="Everything is on fire"/> */}
    {error && (<div className="alert alert-danger">{`${error}`}</div>)}
    </>)
}

export default ServerError;