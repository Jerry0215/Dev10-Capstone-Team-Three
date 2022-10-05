// import { useHistory } from "react-router-dom";
// import Confirmation from "./Confirmation";
// import {useState} from "react";

// function Agent({ agent, handleDelete }){
   
//     const [buttonPopup, setButtonPopup] = useState(false);

//     const history = useHistory();
    
//     const deleteAgent = (agentId) => {
        
//         handleDelete(agentId);
//       }

//       const handleEditClick = () => {
//         // use history and push to the correct url
//         history.push(`/agents/edit/${agent.agentId}`);
//       }

//     return (
        
//         <tr className="lightGold">
//             <td> <button className="collapsible" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseExample"+agent.agentId} aria-expanded="false" aria-controls={"collapseExample"+agent.agentId}>
//             <b>{agent.firstName + ' ' + agent.middleName + ' ' + agent.lastName}</b>
//         </button>
//         <div className="collapse" id={"collapseExample"+agent.agentId}>
//         <table className="table table-bordered border-dark mb-0">
//         <thead className="darkPurple">
//                 <tr>
//                     <th scope="col">Date of Birth</th>
//                     <th scope="col">Height in Inches</th>
                    
//                     <th></th>
//                 </tr>
//             </thead>
//                 <tbody className="lightPurple">
//                     <tr>
//                         <td>{agent.dob}</td>
//                         <td>{agent.heightInInches}</td>
                        
//                         <td>
//                         <button type="button" className="btn primaryPurple mr-3" onClick={handleEditClick} >Edit {agent.agentId}</button>
//                          <button type="button" className="btn btn-danger " onClick={() => {setButtonPopup(true)}} >Delete {agent.agentId} </button>
//                          <Confirmation trigger={buttonPopup} setTrigger={setButtonPopup} agent={agent} key={agent.agentId} handleDelete={deleteAgent}></Confirmation>
//                         </td>
//                     </tr>
//                 </tbody>
//         </table>
        
//         </div>  
//         </td>
          
//         </tr>
      
//       );
// }
// export default Agent;