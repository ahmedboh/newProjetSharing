import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import  'bootstrap/dist/css/bootstrap.min.css';
import IntervCompresse from './IntervCompresse'
import CheckBoxType from './filtrage/CheckBoxType'
import CheckDate from './filtrage/CheckDate'
import CheckAutoComplete from './filtrage/CheckAutoComplete'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse

const ListeIntervs=()=>{
    const [FormRow, setFormRow] = useState([])
    const [listeDdes, setListeDdes] = useState([])
    const [Filters, setFilters] = useState({
        'nature':[],
        'priorite':[],
        'etat':[],
        'dateCreation':[],
        'contrat':[]
    })
    
    
    
    const trirerParPriorite = tab =>{
        var tabCritique=[]
        var tabUrgent=[]
        var tabNormal =[]
        tab.forEach(dde => { 
            if (dde.priorite==='Critique')
                tabCritique.push(dde);
            else if (dde.priorite==='Urgent')
                tabUrgent.push(dde);
            else  tabNormal.push(dde);
        });
        return( tabCritique.concat(tabUrgent, tabNormal))
    }

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

        return( trirerParPriorite(tabEnAttend).concat(trirerParPriorite(tabEnCours), trirerParPriorite(tabColoture)))
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
      


    const listeDemande=(ob)=>{
        Axios.post(`http://localhost:3001/api/v1/intervention`,ob)
        .then((res)=>{
            setListeDdes(res.data.data);
            charger(trirerParEtat(res.data.data))

        })
        
      
    } 
    useEffect(() => {
        listeDemande({filters:Filters})
    
    },[]);
   

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters


         listeDemande({filters:newFilters})
         
         setFilters(newFilters)
    }
    
    const charger=(listeDd)=> setFormRow( listeDd.map((dde,index)=>{return(<Grid key={index} item   lg={3} md={4} xs={12} > <IntervCompresse naviguer={false} contenu={dde}  styleP={stylePr(dde.priorite)}/></Grid>)}))   
    
    return(<div style={{padding:'2%',backgroundColor:'#e0e0e0',margin:'5%',borderRadius:'50px',border:'1px rgb(0, 153, 204) solid'}}>
        
        {/* <Collapse defaultActiveKey={['0']} style={{color:'blue' ,backgroundColor:'white'}} > */}
        <Collapse defaultActiveKey={['0']}  >
        <Panel header="FILTRAGE" key="1">
        <Row>
        <Col lg={6}>    
        <CheckAutoComplete type="clients"   handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={6}>    
        <CheckAutoComplete  type="intervenants" handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        </Row>
        <hr/>
        <Row>
        <Col lg={6}>    
        <CheckBoxType   handleFilters={handleFilters}></CheckBoxType>
        </Col>
        <Col lg={6}>    
        <CheckDate   handleFilters={handleFilters}></CheckDate>
        </Col>
        </Row>
        </Panel>
        </Collapse>
        <br/><br/><br/>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={2}>
                { FormRow.length>0
                  ?FormRow
                  :<h2>Accune demande existe ..............</h2>
                }
            </Grid>
            
        </Grid>
        

    </div>)     
}
export default ListeIntervs;