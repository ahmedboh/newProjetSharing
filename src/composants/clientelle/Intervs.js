import Interv from './Interv'
import Grid from '@material-ui/core/Grid';
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import './tickets.css'

export default function Intervs({user}) {
    const trirerParEtat = tab =>{
        var tabEnAttend=[]
        var tabEnCours=[]
        var tabColoture =[]
        tab.forEach(dde => { 
            if (dde.etat==='En attente')
                tabEnAttend.push(dde);
            else if (dde.etat==='En cour')
                tabEnCours.push(dde);
            else  tabColoture.push(dde);
        });
        return( tabEnAttend.concat(tabEnCours, tabColoture))

    }
    
  
    const [tickets, setTickets] = useState([]);
    const [listeContrats, setListeContrats] = useState([]);

    const listeTickets=async()=>{
        const res =await Axios.get(`ticket/getInterventionsClient/${user._id}`)
        setTickets(trirerParEtat(res.data.data));
    }
    const listeContrat=async()=>{  
        const res = await Axios.get(`contrat/getContratsClient/${user._id}`)
        setListeContrats( res.data.data )
      }

    useEffect(() => {
        user._id&&listeContrat()
        user._id&&listeTickets()
    },[user]);

    return (
        <div  className='listTickets'>
         <Grid container spacing={3} >
            <Grid container item xs={12} spacing={2}>
                {tickets.map((tick)=>(<Interv  key={tick._id} contenu={tick} user={user} labelContrat={listeContrats.findIndex((con)=>con._id===tick.contrat)} /> ))}                             
            </Grid>
        </Grid>   
        </div>
    )
}
