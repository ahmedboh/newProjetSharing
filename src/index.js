import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ListeIntervs from './composants/societe/ListeIntervs'
import AffecterTicket from './composants/societe/AffecterTicket'
import ListeIntervIntervenant from './composants/societe/ListeIntervIntervenant'
import AjouterRapport from './composants/societe/AjouterRapport'
import AjouClient from './composants/societe/AjouClient'
import AjouMembSociete from './composants/societe/AjouMembSociete'
import Sidebar from './composants/societe/Sidebar/Sidebar'
import SignIn from './composants/clientelle/SignIn'
import DeposerTicket from './composants/clientelle/DeposerTicket'
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import AjoutContrat from './composants/societe/AjoutContrat';
import ModifContrat from './composants/societe/ModifContrat';
import ListeMembSocietes from './composants/societe/listeMembSociete';
import ListeContrart from './composants/societe/ListeContrart';
import ListeClients from './composants/societe/listeClients';
import ModifierClient from './composants/societe/ModifierClient';
import ModifierMembSociete from './composants/societe/ModifierMembSociete';
import SignInM from './composants/societe/SignIn';
import Accueil from './composants/societe/Accueil';
import ListeRapportsIntervenant from './composants/societe/ListeRapportsIntervenant';
import ListeRapportsInterventions from './composants/societe/ListeRapportsInterventions';
import LirePDF from './composants/societe/Pdf/LirePDF';
import Navbar from './composants/clientelle/Navbar';
import ModifierRapportInter from './composants/societe/ModifierRapportInter';
import Demo from './composants/societe/statistique/chart';

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
                  <Route path="/listeContrat"><ListeContrart/></Route>
                  <Route path="/demo"><Demo/></Route>

                  {!connect&&
                  <><Route  path="/accueil"  ><Accueil  /></Route>
                  <Route  path="/LirePDF"  >
                    <div className="App">
                      <LirePDF/>
                    </div>
                  </Route>   
                  <Route  path="/liste"  ><ListeIntervs/></Route>   
                  <Route path="/maliste" ><ListeIntervIntervenant/></Route>
                  <Route path="/affecter" ><AffecterTicket/></Route>
                  <Route path="/ajouterRapport/:id/:intervenant" ><AjouterRapport/></Route>
                  <Route path="/AjouterClient" ><AjouClient/></Route>
                  <Route path="/AjouterMembre" ><AjouMembSociete/></Route>
                  <Route path="/SignInClient"  ><SignIn /></Route>
                  <Route path="/ajouterContrat/:idClient/:raisonSocial"  ><AjoutContrat /></Route>
                  <Route path="/modifierContrat"  ><ModifContrat /></Route>
                  <Route path="/ListeClients"><ListeClients/></Route>

                  <Route path="/ListeMembSocietes"><ListeMembSocietes/></Route>
                  <Route path="/ModifierClient"><ModifierClient/></Route>
                  <Route path="/ModifierMembSociete"><ModifierMembSociete/></Route>
                  <Route path="/ListeRapportsIntervenant"><ListeRapportsIntervenant/></Route>
                  <Route path="/ModifierRapportInter"><ModifierRapportInter/></Route>
                  <Route path="/ListeRapportsInterventions"><ListeRapportsInterventions/></Route>
                  </>
                  }
                  {!connectCl&&<Route path="/appClient/de"  ><DeposerTicket    /></Route>}
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
                <Route path="/appClient/de"  ><DeposerTicket    /></Route>
              
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
