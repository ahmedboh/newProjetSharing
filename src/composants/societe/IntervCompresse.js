import Card from 'react-bootstrap/Card';
import React,{ useState ,useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../style/ticket.css';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Button  from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
function CircularProgressWithLabel(props) {
 const circulaire= props.value===0?  <CircularProgress color="secondary" />:<CircularProgress variant="determinate" style={{color:'#00a152'}} {...props} />
  
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

    const [progress, setProgress] = useState(status==='En attente'?0:100);
    
     useEffect(() => {
       if (status==="En cours"){  
       const timer = setInterval(() => {
         setProgress((prevProgress) => (prevProgress >= 90 ? 10 : prevProgress + 10));
       }, 800);
       return () => {
        clearInterval(timer);
       };
     }
    }, []);
  
    return <CircularProgressWithLabel value={progress} />;
  }











const IntervCompresse=(props)=>{
    const {contenu,styleP,ouvrir,naviguer}=props 
  
    const [btn,setBtn]= useState(true)
    const [raisonSociale,setRaisonSociale]=useState("");
    useEffect(() => {   
        Axios.get("http://localhost:3001/api/v1/client/"+contenu.IDclient)
            .then((res)=>{
                setRaisonSociale(res.data.data.raisonSociale);
            })
    })
    return( 
    <Card border={styleP[0]}  onMouseOver={()=>{setBtn(false)}} onMouseLeave={()=>{setBtn(true)}} className="intervCompresse" >
        <b><Card.Header  className={styleP[1]}>{raisonSociale} <CircularStatic status={contenu.etat} /> </Card.Header></b>
        <Card.Body>
        <center>
        <Card.Title ><h6>{contenu.dateCreation} | {contenu.heureCreation}</h6></Card.Title>
        </center>
        <Card.Text>
            {contenu.nature} <br/>
            {contenu.contrat}    
            {!naviguer
            ?<Link  to={'/affecter/'+contenu._id+'/'+raisonSociale+'/'+(contenu.IDintervenant===''?"None":contenu.IDintervenant)+'/'+contenu.periodeTrai}> <Button hidden={btn}  className="ouvrirTicket btn-sm">  OUVRIR</Button></Link> 
            : <Button hidden={btn} onClick={()=>{ouvrir(contenu,raisonSociale)}} id={contenu._id} className="ouvrirTicket btn-sm">  OUVRIR</Button>     
            }<br/>
        </Card.Text>
        
        </Card.Body>
    </Card>
  )
}

export default IntervCompresse;
