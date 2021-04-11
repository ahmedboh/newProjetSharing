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
import App from './composants/clientelle/App'
import ListeClients from './composants/societe/listeClients';
import ListeMembSocietes from './composants/societe/listeMembSociete';
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import AjoutContrat from './composants/societe/AjoutContrat';
import ModifierClient from './composants/societe/ModifierClient';
import ModifierMembSociete from './composants/societe/ModifierMembSociete';


const Index =()=> {
  

  
    return (<div>
             <Router>
             {/* <Sidebar /> */}
                <Switch>
                  <Route exact path="/"  ><ListeIntervs/></Route>   
                  <Route path="/liste" ><ListeIntervIntervenant/></Route>
                  <Route path="/affecter/:id/:raisonSociale/:inter/:period" ><ZoneAffectaion/></Route>
                  <Route path="/ajouterRapport/:id/:intervenant" ><AjouterRapport/></Route>
                  <Route path="/AjouterClient" ><AjouClient/></Route>
                  <Route path="/AjouterMembre" ><AjouMembSociete/></Route>
                  <Route path="/SignInClient"  ><SignIn /></Route>
                  <Route path="/AppClient"  ><App /></Route>
                  <Route path="/ajouterContrat/:idClient"  ><AjoutContrat /></Route>
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
