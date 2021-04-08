
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import DeposerInterv from './DeposerInterv'
const App=()=>{
  const [contrats]=useState(['contrat 1','contrat 2','contrat 3','contrat 4']) 
  const [client,setClient]=useState("")
  const [idClient,setIdClient]=useState("")

  let history = useHistory();
  useEffect(() => {  
   setClient(history.location.state.login)
   setIdClient(history.location.state.idClient)

  })
    return (<div>
        <Router>
           <Switch> 
             <Route exact  ><DeposerInterv client={client} idClient={idClient} listeContrats={contrats} /></Route>
           </Switch>
         </Router>
       </div>  
         )
}
export default App;