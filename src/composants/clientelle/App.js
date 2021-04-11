
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import  { useState, useEffect } from 'react';


import DeposerInterv from './DeposerInterv'
import ListeIntervs from '../societe/ListeIntervs';
const App=()=>{
  const [idClient,setIdClient]=useState("")


  useEffect(() => {  
   setIdClient("history.location.state.idClient")

  },[])
    return (<div>
        <Router>
           <Switch>
             <Route ><ListeIntervs/></Route>
             <Route exact  path="/appClient/de"  ><DeposerInterv  idClient={idClient}  /></Route>
           </Switch>
         </Router>
       </div>  
         )
}
export default App;