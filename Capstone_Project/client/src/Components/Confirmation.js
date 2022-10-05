// import { useHistory} from 'react-router-dom';
// import Popup from '../index.css';


// function Confirmation({trigger,setTrigger, agent, handleDelete }) {
    
//     const history = useHistory();

//     const handleDeleteClick =() => {
        
      
//           console.log(`${agent.agentId}`)
//           const init = {
//               method: 'DELETE'
//             };
        
//             fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
//             .then( resp => {
//               console.log(resp.status);
//               switch(resp.status) {
                  
//                 case 204:
//                   return null;
//                 case 404:
//                   history.push('/not-found', `${agent.agentId}`)
//                   break;
//                 default:
//                   return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
//               }
//             })
//             .then(resp => {
//               if (!resp) {
//                 // this is success so let's return the id
//                 handleDelete(agent.agentId);
//               } else {
//                 console.log(resp); // fix this later
//               }
//             })
//             .catch();
            
      
//     }


//     function handleDeleteButton (){
//       console.log("Hello");
//       setTrigger(false); 
//       handleDeleteClick();
//     }


//     return (trigger) ? (

//         <div className="popup">
//             <div className="popup-inner">
//                 <h2 style={{textAlign: "center", justifyContent: "center" }}>Confirm Deletion of Agent:</h2>

                
//                 <button className="btn btn-success position-absolute translate-middle btn btn-sm btn-primary rounded-pill" onClick={handleDeleteButton} style={{top: "86px", right: "300px", justifyContent: "center" }} >Yes </button>
//                 <button className="btn btn-danger position-absolute translate-middle btn btn-sm btn-primary rounded-pill close-btn" onClick={() => {setTrigger(false)}} >No</button>
                
                
//             </div>
//         </div>
//     ) : "";

// }

// export default Confirmation;
