import Card from 'react-bootstrap/Card';
import React,{ useState ,useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../style/interv.css';
import Axios from 'axios';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Button  from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

function CircularProgressWithLabel(props) {
 const circulaire= props.etat==='En attente'
  ? <CircularProgress color="secondary"  />
  :props.etat==='En cour'
  ? <CircularProgress variant="determinate" style={{color:'#00a152'}} {...props} />
  : <CircularProgress variant="determinate" style={{color:'#00a152'}} {...props} />
 return (
    <Box position="absolute" display="inline-flex"  right={5} top={3}     > 
      {circulaire}
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function CircularStatic(props){
    const {status}=props;

    const [progress, setProgress] = useState(100);
    
     useEffect(() => {
       if (status==="En cour"){  
       const timer = setInterval(() => {
         setProgress((prevProgress) => (prevProgress >= 90 ? 10 : prevProgress + 10));
       }, 800);
       return () => {
        clearInterval(timer);
       };
     }else if (status==="En attente")
      setProgress(0)
     else setProgress(100)

    }, [status,progress]);
  
    return <CircularProgressWithLabel value={progress} etat={status} />;
  }











const IntervCompresse=(props)=>{
    const {contenu,styleP,ouvrir,naviguer,supprimerDemande,IDintervenant,user}=props 
  
    const [btn,setBtn]= useState(true)
    const [raisonSociale,setRaisonSociale]=useState("");
    const [contrat,setContrat]=useState("contrat");
    let history = useHistory();
    

  const intialiserDonnes= async ()=>{
    const res=await  Axios.get("client/"+contenu.IDclient)
    setRaisonSociale(res.data.data.raisonSociale);
    const res2=await   Axios.get("contrat/getContratsClient/"+contenu.IDclient)
    res2.data.data.forEach( (contr,index)=> {  
    contr._id === contenu.contrat&&setContrat("contrat n° "+(index+1))
     })          
  }  
    useEffect(() => {   
      intialiserDonnes()   
    },[contenu.IDclient])
   
    const affecter =()=>{
      history.push("/affecter",{interv:contenu,raisonSociale,contrat})
    }
    return( 
    <Card border={styleP[0]}  onMouseOver={()=>{setBtn(false)}} onMouseLeave={()=>{setBtn(true)}} className="intervCompresse" >
        <b><Card.Header  className={styleP[1]}>{raisonSociale} <CircularStatic status={contenu.etat} />  </Card.Header></b>
        <Card.Body>
        <center>
        <Card.Title ><h6>{contenu.dateCreation} | {contenu.heureCreation} &nbsp;&nbsp; </h6> </Card.Title>
        {!naviguer &&<IconButton color="secondary" hidden={user.role&&user.role.indexOf('Ad')===-1}  style={{position:'absolute',top:'50px',right:'-10px' }}  onClick={()=>{supprimerDemande(contenu._id)}}  aria-label="delete"  ><DeleteSweepIcon  hidden={btn}  fontSize='large' /> </IconButton>}
        </center>
        <Card.Text>
            {contenu.nature} <br/>
            {contrat}    
            {!naviguer
            //?<Link  to={'/affecter/'+contenu._id+'/'+raisonSociale+'/'+(contenu.IDintervenant===''?"None":contenu.IDintervenant)+'/'+contenu.periodeTrai+"/"+contenu.etat}> <Button hidden={btn}  className="ouvrirInterv btn-sm">  OUVRIR</Button></Link> 
            ?  <Button hidden={btn} onClick={affecter} className="ouvrirInterv btn-sm">  OUVRIR</Button>
            : <Button hidden={btn} onClick={()=>{ouvrir(contenu,raisonSociale,contrat,IDintervenant)}}  className="ouvrirInterv btn-sm">  OUVRIR</Button>     
            }<br/>
        </Card.Text>
        
        </Card.Body>
    </Card>
  )
}

export default IntervCompresse;
