import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../style/interv.css';
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import IntervCompresse from './IntervCompresse';
import Interv from './Interv';

const ListeIntervIntervenant=(props)=>{
    const{user}=props
    const [listeDdes, setListeDdes] = useState([])
    const [intervActuel,setIntervActuel ] = useState(false)
    const [intervDetaille,setIntervDetaille]=useState()
    const listeDemande=async()=>{
        console.log(user._id)
        const res =await Axios.get(`affectation/getAffectationsIntervenant/${user._id}`)
        setListeDdes(res.data.data);
    } 

    useEffect(() => {
            listeDemande()
    },[user]);

    
    
    const ouvrirInterv=(interv,raisonSociale,contrat,IDintervenant)=>{
        setIntervActuel(true)
        setIntervDetaille(<Interv contenu={interv} contrat={contrat} user={user} raisonSociale={raisonSociale} traiter={true} IDintervenant={IDintervenant}/>)
    }

    const stylePr=(priorite)=>{
        let sty=[]
        
        if (priorite==='Critique')
        sty=['danger','text-danger'];
        else if (priorite==='Urgent')
        sty=['warning','text-warning'];
        else  sty=['primary','text-primary'];
        return sty;
    }
    
    return(
        <div  style={{margin:"20px",border :'2px blue solid',borderTopLeftRadius:"20px"}}>
            <Row>
                <Col sm={3}>
                    <GridList cellHeight={180}  spacing={1} className="gridList"  >
                        {listeDdes.map((dde) => {return(
                         dde.IDTicket&&dde.IDTicket.etat==='En cour'&&   
                        <GridListTile key={dde.IDTicket._id} cols={ 2 } rows={1}>
                            <IntervCompresse user={user}  ouvrir={ouvrirInterv} naviguer={true} contenu={dde.IDTicket} styleP={stylePr(dde.IDTicket.priorite)} IDintervenant={dde.IDintervenant}/>
                        </GridListTile>
                        )})}
                    </GridList>
                </Col>
                <Col>
                  <br/> 
                  <div className="container text-info" style={{textAlign:'center',fontFamily:'arial'}}>
                        <h3>Bienvenu  {user.nom} a votre liste des damandes d'intervention</h3>
                        <h3>vous avez {listeDdes.length } demandes</h3>
                        <h4>appuyer sur l'une des demandes qui se trouvent dans la liste pour plus de details</h4><br/><br/>
                  </div>
                  {!intervActuel
                  ?<></>
                  :intervDetaille }
                  
                </Col>    
            </Row>   
        </div>
    )
}



export default ListeIntervIntervenant;