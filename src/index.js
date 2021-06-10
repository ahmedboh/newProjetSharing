import { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ListeIntervs from './composants/societe/ListeIntervs'
import Affecter from './composants/societe/Affecter'
import ListeIntervIntervenant from './composants/societe/ListeIntervIntervenant'
import AjouterRapport from './composants/societe/AjouterRapport'
import AjouClient from './composants/societe/AjouClient'
import AjouMembSociete from './composants/societe/AjouMembSociete'
import Sidebar from './composants/societe/Sidebar/Sidebar'
import SignIn from './composants/SignIn'
import DeposerTicket from './composants/clientelle/DeposerTicket'
import  Intervs from './composants/clientelle/Intervs'
import { Switch,Route,BrowserRouter as Router } from 'react-router-dom';
import AjoutContrat from './composants/societe/AjoutContrat';
import ModifContrat from './composants/societe/ModifContrat';
import ListeMembSocietes from './composants/societe/listeMembSociete';
import ListeContrart from './composants/societe/ListeContrart';
import ListeClients from './composants/societe/listeClients';
import ModifierClient from './composants/societe/ModifierClient';
import ModifierMembSociete from './composants/societe/ModifierMembSociete';
import Accueil from './composants/societe/Accueil';
import ListeRapportsIntervenant from './composants/societe/ListeRapportsIntervenant';
import ListeRapportsInterventions from './composants/societe/ListeRapportsInterventions';
import LirePDF from './composants/societe/Pdf/LirePDF';
import Navbar from './composants/clientelle/Navbar';
import ModifierRapportInter from './composants/societe/ModifierRapportInter';
import Stat from './composants/societe/statistique/Stat';




import Axios from 'axios';


const Index =()=> {
    Axios.defaults.headers.common['xAuthToken']=localStorage.getItem('token');
    const [connectMb,setConnectMB]=useState(false)
    const [connectCl,setConnectCl]=useState(false)
    const [decon,setDecon]=useState(false)
    const [membreS,setMembreS]=useState({})
    const [client,setClient]=useState({})
    
   
   
    useEffect(() => {
      localStorage.getItem('connectMb')&&setConnectMB(true) 
      localStorage.getItem('connectCl')&&setConnectCl(true) 
      refleshToken()
   }, [])

 

    const getMembreS = async()=>{
        const res=await Axios.get('membSociete/connect' )
        res.status===200&&setMembreS(res.data.data)       
      }

    const refleshToken = async()=>{
        if(localStorage.getItem('token')){
          const res=await Axios.get('auth/reflesh') 
          if(res.status===200){
            localStorage.setItem('token',res.data.token)
            Axios.defaults.headers.common['xAuthToken']=localStorage.getItem('token');  
          }else setDecon(true)
        }
        removeListner()
        }

   const getClient = async()=>{
        const res=await Axios.get('client/connect' )
        res.status===200&&setClient(res.data.data)
      }  

    useEffect(() => {
      connectMb? getMembreS() : setMembreS({}) 
   }, [connectMb])

    useEffect(() => {
      connectCl? getClient() : setClient({}) 
  }, [connectCl])

  setInterval(()=>{addlisnter()}, 360000); 

const addlisnter=()=>{
  window.addEventListener('click',refleshToken);
  window.addEventListener('keydown',refleshToken);
  window.addEventListener('scroll',refleshToken);
 }   
  
 const removeListner=()=>{
  window.removeEventListener('click',refleshToken)
  window.removeEventListener('keydown',refleshToken)
  window.removeEventListener('keydown',refleshToken) 
}
    return (<div>
             <Router>
             <span hidden={!connectMb} >
                <Sidebar user={membreS} decon={connectMb&&decon}  fn={setConnectMB}/> 
             </span>
             <span hidden={!connectCl}  >
                <Navbar  user={client}  decon={connectCl&&decon}  fn={setConnectCl} />
             </span>
                <Switch>
                  <Route exact path="/"  ><SignIn fn={setConnectCl}  fnc={setDecon} type="c"/></Route>
                  <Route  path="/SharingSignIn"   ><SignIn fn={setConnectMB}  fnc={setDecon} type="m" /></Route>
                  <Route path="/demo"><Stat/></Route>

                  {connectMb&&
                  <><Route  path="/accueil"  ><Accueil  /></Route>
                  <Route  path="/LirePDF"  >
                    <div className="App">
                      <LirePDF/>
                    </div>
                  </Route>   
                  <Route  path="/liste"  ><ListeIntervs user={membreS}/></Route>   
                  <Route path="/maliste" ><ListeIntervIntervenant  user={membreS} /></Route>
                  <Route path="/affecter" ><Affecter user={membreS} /></Route>
                  <Route path="/ajouterRapport/:id" ><AjouterRapport  user={membreS}/></Route>
                  <Route path="/AjouterClient" ><AjouClient/></Route>
                  <Route path="/AjouterMembre" ><AjouMembSociete/></Route>
                  <Route path="/ajouterContrat/:idClient/:raisonSocial"  ><AjoutContrat /></Route>
                  <Route path="/modifierContrat"  ><ModifContrat /></Route>
                  <Route path="/ListeClients"><ListeClients/></Route>
                  <Route path="/ListeMembSocietes"><ListeMembSocietes/></Route>
                  <Route path="/ModifierClient"><ModifierClient/></Route>
                  <Route path="/ModifierMembSociete"><ModifierMembSociete/></Route>
                  <Route path="/ListeRapportsIntervenant"><ListeRapportsIntervenant user={membreS} /></Route>
                  <Route path="/ModifierRapportInter"><ModifierRapportInter/></Route>
                  <Route path="/ListeRapportsInterventions"><ListeRapportsInterventions user={membreS}/></Route>
                  <Route path="/listeContrat"><ListeContrart   /></Route>
                  </>
                  
                  }
                  {connectCl&&<>
                      <Route path="/deposer"  ><DeposerTicket    user={client} /></Route>
                      <Route path="/listeContrat"><ListeContrart  user={client}/></Route>
                      <Route path="/historique"><Intervs user={client}/></Route>
                      </>}
                </Switch>
              </Router>
            </div>  
              )
}


Axios.defaults.baseURL='http://localhost:3001/api/v1/'

ReactDOM.render(
   <Index/>,
  document.getElementById('root')
);

reportWebVitals();
