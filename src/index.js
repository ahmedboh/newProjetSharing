import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ListeIntervs from './composants/societe/ListeIntervs'
import ZoneAffectaion from './composants/societe/ZoneAffectaion'
import ListeIntervIntervenant from './composants/societe/ListeIntervIntervenant'
import AjouterRapport from './composants/societe/AjouterRapport'
import AjouClient from './composants/societe/AjouClient'
import AjouMembSociete from './composants/societe/AjouMembSociete'
import Sidebar from './composants/societe/Sidebar/Sidebar'
import SignIn from './composants/clientelle/SignIn'
import DeposerInterv from './composants/clientelle/DeposerInterv'
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import AjoutContrat from './composants/societe/AjoutContrat';
import ModifContrat from './composants/societe/ModifContrat';

import ListeMembSocietes from './composants/societe/ListeMembSociete';
import ListeContrart from './composants/societe/ListeContrart';
import ListeClients from './composants/societe/ListeClients';
import ModifierClient from './composants/societe/ModifierClient';
import ModifierMembSociete from './composants/societe/ModifierMembSociete';
import SignInM from './composants/societe/SignIn';
import Accueil from './composants/societe/Accueil';


import Navbar from './composants/clientelle/Navbar'
 
const Index =()=> {

    const [connect,setConnect]=useState(true)
    const [connectCl,setConnectCl]=useState(true)


   
    
    setInterval(()=>{
      setConnect(localStorage.getItem('user')===null?true:false);
      setConnectCl(localStorage.getItem('idClient')===null?true:false);
  }, 1000);
    
  
    return (<div>
             <Router>
               <span hidden={connect} >
             <Sidebar fn={setConnect} /> </span>
             <span hidden={connectCl} >
             <Navbar fn={setConnectCl} />
             </span>
                <Switch>
                  <Route exact path="/"  ><SignInM  /></Route>
                  <Route path="/SignInClient"  ><SignIn /></Route>
                  {!connect&&
                  <><Route  path="/accueil"  ><Accueil  /></Route>
                  <Route  path="/liste"  ><ListeIntervs/></Route>   
                  <Route path="/maliste" ><ListeIntervIntervenant/></Route>
                  <Route path="/affecter" ><ZoneAffectaion/></Route>
                  <Route path="/ajouterRapport/:id/:intervenant" ><AjouterRapport/></Route>
                  <Route path="/AjouterClient" ><AjouClient/></Route>
                  <Route path="/AjouterMembre" ><AjouMembSociete/></Route>
                  <Route path="/SignInClient"  ><SignIn /></Route>
                  <Route path="/ajouterContrat/:idClient/:raisonSocial"  ><AjoutContrat /></Route>
                  <Route path="/modifierContrat"  ><ModifContrat /></Route>
                  <Route path="/ListeClients"><ListeClients/></Route>
                  <Route path="/listeContrat"><ListeContrart/></Route>
                  <Route path="/ListeMembSocietes"><ListeMembSocietes/></Route>
                  <Route path="/ModifierClient"><ModifierClient/></Route>
                  <Route path="/ModifierMembSociete"><ModifierMembSociete/></Route></>
                  }
                  {!connectCl&&<Route path="/appClient/de"  ><DeposerInterv    /></Route>}
                </Switch>
              </Router>
            </div>  
              )
}


const IndexClient =()=> {

  const [connectCl,setConnectCl]=useState(true)


 
  
  setInterval(()=>{
    setConnectCl(localStorage.getItem('idClient')===null?true:false);
}, 1000);
  

  return (<div>
           <Router>
           <span hidden={connectCl} >
           <Navbar fn={setConnectCl} />
           </span>
              <Switch>
                <Route exact path="/"  ><SignIn  /></Route>
                <Route path="/appClient/de"  ><DeposerInterv    /></Route>
              
              </Switch>
            </Router>
          </div>  
            )
}
ReactDOM.render(
  <React.StrictMode>
   <Index></Index>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
