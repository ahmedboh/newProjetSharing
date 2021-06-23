import Interv from './Interv'
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import ContratCard from './ContratCard'
import { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckDate from '../filtrage/CheckDate';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import './tickets.css'
import './style/contrat.css'

const useStyles = makeStyles({
    paper: {
      background: 'rgba(255,255,255,0.3)',
     paddingTop:'10%',
     width:'25%'
    }
  });

const useStyles2 = makeStyles({
    paper: {
      width:'60%',
      marginLeft:'20%',
      borderTopLeftRadius:'10px',
      borderTopRightRadius:'10px',
     paddingBottom:'1%',
     paddingLeft:'5%',
     paddingRight:'5%',
     paddingTop:'1%'

    }
  });  

export default function Intervs({user}) {
    const styles = useStyles();
    const styles2= useStyles2();

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
    const [contrat, setContrat] = useState(-1);
    const [contenu , setContenu] = useState();
    const [showDetail, setShowDetail] = useState(false);
    const [contenuTicket, setContenuTicket] = useState(false);

    



  
    const listeTickets=async(date)=>{
        const res =await Axios.post(`ticket/getInterventionsClient/${user._id}`,{dateCreation:date})
        setTickets(trirerParEtat(res.data.data));
    }
   
    const listeContrat=async()=>{  
        const res = await Axios.get(`contrat/getContratsClient/${user._id}`)
        setListeContrats( res.data.data )
        console.log(res.data.data )
      }
      const toggleDrawerContrat = (event,contrat) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setContrat(contrat);
        contrat!==-1&&setContenu(listeContrats[contrat])
      };

     const toggleDrawerDetaille = (event,ticket) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        } 
        setShowDetail(true);
        setContenuTicket(ticket)
      };

    useEffect(() => {
        user._id&&listeContrat()
        user._id&&listeTickets('')
    },[user]);

    return (
        <>   
        <div style={{marginTop:'10px'}} className='container'  >
          <Row>
            <Col sm="8">
              <h2 className="titre"  style={{textAlign:'left'}}>  Listes Des Tickets :</h2>
            </Col >
            <Col align='right'> 
              <CheckDate type='client' handleFilters={(date)=>{ listeTickets(date)}} />
            </Col>
          </Row>
        </div>
        <div  className='listTickets'>   
            <Grid container spacing={3} >
                <Grid container item xs={12} spacing={2}>
                    {tickets.map((tick)=>(<Interv  fnContrat={toggleDrawerContrat} fnTicket={toggleDrawerDetaille} key={tick._id} contenu={tick} user={user} labelContrat={listeContrats.findIndex((con)=>con._id===tick.contrat)} /> ))}                             
                </Grid>
            </Grid>   

          <Drawer   anchor='right'open={contrat!==-1} onClose={(event)=>{toggleDrawerContrat(event,-1)}}  classes={{ paper: styles.paper }}>
             <div  style={{width:'200px',marginLeft:'15%'}} ><ContratCard  color='#4d137f' title={'Contrat '+(contrat+1)}  contenu={contenu}  /></div>
          </Drawer>

          <Drawer   anchor='bottom' open={showDetail} onClose={()=>{setShowDetail(false)}}   classes={{ paper: styles2.paper }} >
             <div  >
                 <h4 className="titreC"> Détaille Du Ticket :</h4> 
                 <hr/>
                 <TextField fullWidth
                    multiline
                    aria-readonly
                    value={contenuTicket.details}
                    rows={2}
                    />
             </div>
          </Drawer>
        </div>
        </>
)
}
