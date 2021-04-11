import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../style/ticket.css';
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import IntervCompresse from './IntervCompresse';
import Interv from './Interv';


const ListeIntervIntervenant=()=>{
    const [listeDdes, setListeDdes] = useState([])
    const [intervActuel,setIntervActuel ] = useState(false)
    const [intervDetaille,setIntervDetaille]=useState()
    const listeDemande=()=>{
        Axios.get(`http://localhost:3001/api/v1/intervention/getInterventionsIntervenant/${"606b43ee1b8dce3f4450122e"}`)
        .then((res)=>{
            setListeDdes(res.data.data);
        
        })
    } 

    useEffect(() => {listeDemande()},[]);

    
    
    const ouvrirInterv=(interv,raisonSociale)=>{
        setIntervActuel(true)
          console.log(interv)
          setIntervDetaille(<Interv contenu={interv} raisonSociale={raisonSociale} traiter={true} />)
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
                        <GridListTile key={dde._id} cols={ 2 } rows={1}>
                            <IntervCompresse  ouvrir={ouvrirInterv} naviguer={true} contenu={dde} styleP={stylePr(dde.priorite)}/>
                        </GridListTile>
                        )})}
                    </GridList>
                </Col>
                <Col>
                  <br/> 
                  <div className="container text-info" style={{textAlign:'center',fontFamily:'arial'}}>
                        <h3>Beinvenu  Ahmed a votre liste de damande d'intervenats</h3>
                        <h3>vous avez {listeDdes.length } demande </h3>
                        <h4>apuiez sur l'une de demande qui se trouvent dans la liste pour plus details </h4><br/><br/>
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