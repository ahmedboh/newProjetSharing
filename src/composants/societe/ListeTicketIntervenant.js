
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  '../../style/interv.css';
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import IntervCompresse from './IntervCompresse';
import Interv from './Interv';

import { BlockLoading } from 'react-loadingg';


const ListeTicketIntervenant=(props)=>{
    const{user}=props
    const [listeDdes, setListeDdes] = useState([])
    const [intervActuel,setIntervActuel ] = useState(false)
    const [intervDetaille,setIntervDetaille]=useState()
    const listeDemande=async()=>{
        console.log(user._id)
        const res =await Axios.get(`affectation/getAffectationsIntervenant/${user._id}`)
        const data=res.data.data.filter((aff)=>aff.IDTicket.etat==='En cours')
        setListeDdes(data);
        
    } 

    useEffect(() => {
          user._id&& listeDemande()
    },[user]);

    
    
    const ouvrirInterv=(interv,contrat,IDintervenant)=>{
        console.log(interv)
        setIntervActuel(true)
        setIntervDetaille(<Interv contenu={interv} contrat={contrat} user={user}  traiter={true} IDintervenant={IDintervenant}/>)
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
        <div  style={{margin:"20px",border :'2px blue solid',borderRadius:'20px'}}>
            <Row style={{height:'84vh'}}>
                <Col lg={3}  >
                    <div style={{width:'94%',height:'80vh',overflow:'scroll',overflowX:'hidden',borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",backgroundColor:'lightgray'}}>
                        {listeDdes.map((dde) => {return(
                           <span style={{margin:'5px'}}> <IntervCompresse user={user}   key={dde.IDTicket._id} ouvrir={ouvrirInterv} naviguer={true} contenu={dde.IDTicket} styleP={stylePr(dde.IDTicket.priorite)} IDintervenant={dde.IDintervenant}/></span>
                        )})}
                    </div>    
                </Col>
                <Col>
                  <br/> 
                  <div hidden={intervActuel} className="container text-info" style={{textAlign:'center',fontFamily:'arial'}}>
                        <h3 >Bienvenue  {user.nom} à votre liste des tickets </h3>
                        <h3>vous avez {listeDdes.length } demande(s)</h3>
                        <div className='loading'><BlockLoading size={'large'} speed={3}  /></div>;
                       <h4>choisissez l'un des tickets de la liste apparante pour plus de détail </h4>

                  </div>
                  {!intervActuel
                  ?<></>
                  :intervDetaille }
                  
                </Col>    
            </Row>   
        </div>
    )
}



export default ListeTicketIntervenant;