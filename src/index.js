import React from 'react';
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
import ListeMembSocietes from './composants/societe/ListeMembSociete';
import ListeClients from './composants/societe/ListeClients';
import ModifierClient from './composants/societe/ModifierClient';
import ModifierMembSociete from './composants/societe/ModifierMembSociete';


const Index =()=> {


  
    return (<div>
             <Router>
             {/* <Sidebar /> */}
                <Switch>
                  <Route exact path="/"  ><ListeIntervs/></Route>   
                  <Route path="/liste" ><ListeIntervIntervenant/></Route>
                  <Route path="/affecter/:id/:raisonSociale/:inter/:period/:etat" ><ZoneAffectaion/></Route>
                  <Route path="/ajouterRapport/:id/:intervenant" ><AjouterRapport/></Route>
                  <Route path="/AjouterClient" ><AjouClient/></Route>
                  <Route path="/AjouterMembre" ><AjouMembSociete/></Route>
                  <Route path="/SignInClient"  ><SignIn /></Route>
                  <Route path="/ajouterContrat/:idClient/:raisonSocial"  ><AjoutContrat /></Route>
                  <Route   path="/appClient/de"  ><DeposerInterv    /></Route>
                  <Route path="/ListeClients"><ListeClients/></Route>
                  <Route path="/ListeMembSocietes"><ListeMembSocietes/></Route>
                  <Route path="/ModifierClient"><ModifierClient/></Route>
                  <Route path="/ModifierMembSociete"><ModifierMembSociete/></Route>
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
