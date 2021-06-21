import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useState ,useEffect} from 'react';
import  'bootstrap/dist/css/bootstrap.min.css';


const InfosBody=({contenu})=>{
    const [listeAff, setListeAff] = useState([]);
    const listeAffectation=async()=>{
        const res =await Axios.get(`affectation/getAllAffectationsTicket/${contenu._id}`)
        setListeAff(res.data.data);
    } 
    useEffect(() => {
        listeAffectation()
    },[contenu._id]);
    return(
        <div  style={{overflow:  'auto', height:'100%',overflowX:'hidden' }}>
                <Card.Title style={{backgroundColor:'lightgrey'}}><center><h5>Date de  création </h5></center> </Card.Title>
                <Card.Text align='center' >
                {new Date(contenu.dateCreation).toLocaleDateString()} | {new Date(contenu.dateCreation).toLocaleTimeString()}
                </Card.Text>
                {listeAff.map((data,index)=>(
                   <span key={index}>  
                        <Card.Title style={{backgroundColor:'lightgrey'}}><center><h5> {index===0?'Affectation':'Réaffectation'} </h5></center> </Card.Title>
                        <Card.Text style={{marginBottom:'2vh'}} align='center'> 
                            {new Date(data.dateAffectation ).toLocaleDateString()} | {new Date(data.dateAffectation ).toLocaleTimeString()} || {data.IDintervenant.nom} {data.IDintervenant.prenom}      
                        </Card.Text>
                 </span>
          
                ))}
                <Card.Title style={{backgroundColor:'lightgrey'}}><center><h5>Date de   clôture</h5></center> </Card.Title>
                {contenu.etat==='Clôturée'? 
                 <Card.Text style={{marginLeft:'10%'}} >{new Date(contenu.dateCreation).toLocaleDateString()} | {new Date(contenu.dateCreation).toLocaleTimeString()}</Card.Text>
                 :<Card.Text style={{marginLeft:'10%' ,color:'red',fontWeight:'500',fontFamily:'Georgia'}} >Ce ticket est {contenu.etat} n'est pas encore cloturéé</Card.Text>   
                }       
         </div>
    )
}
export default InfosBody;