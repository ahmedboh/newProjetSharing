import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import  'bootstrap/dist/css/bootstrap.min.css';
import IntervCompresse from './IntervCompresse'
import CheckBoxType from './filtrage/CheckBoxType'
import CheckDate from './filtrage/CheckDate'
import CheckAutoComplete from './filtrage/CheckAutoComplete'
import SearchFiltre from './filtrage/SearchFiltre';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {  Collapse } from 'antd';
const { Panel } = Collapse

const ListeIntervs=(props)=>{
    const{user}=props
    const [FormRow, setFormRow] = useState([])
    const [listeDdes, setListeDdes] = useState([])
    const [searchRef, setsearchRef] = useState('')
    const [Filters, setFilters] = useState({
        'nature':[],
        'priorite':[],
        'etat':[],
        'dateCreation':[]
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
      


    const listeDemande=async(ob)=>{
        const res =await Axios.post(`ticket/getAll`,ob)
        setListeDdes(res.data.data);
        charger(trirerParEtat(res.data.data))
    }
    
    const supprimerDemande=async(id)=>{
        const res =await Axios.delete(`ticket/`+id)
        listeDemande({searchRef,filters:Filters})      
    }
    useEffect(() => {
        listeDemande({searchRef,filters:Filters})
    },[user]);
   

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters


         listeDemande({searchRef,filters:newFilters})
         
         setFilters(newFilters)
    }
    
    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            filters: Filters,
            searchRef: newSearchTerm
        }

        setsearchRef(newSearchTerm)

        listeDemande(variables)
    }

    const charger=(listeDd)=> setFormRow( listeDd.map((dde,index)=>{return(<Grid key={index} item   lg={3} md={4} xs={12} > <IntervCompresse naviguer={false} contenu={dde} user={user} supprimerDemande={supprimerDemande} styleP={stylePr(dde.priorite)}/></Grid>)}))   
    
    return(<><br/><br/><br/>
       <div className="container" >
     <Collapse defaultActiveKey={['0']}  style={{color:'darkblue' ,backgroundColor:'#e0e0e0'}} >
        <Panel header="FILTRAGE" key="1" >
        <br/>   
        <Row style={{paddingLeft:20}}>
        <Col lg={6}>    
        <CheckAutoComplete type="clients"  sty={false} label={'Client demndeur '} handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={6}>    
        <CheckAutoComplete  type="intervenants" sty={false} label={'intervenant'}handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        </Row>
        <hr/>
        <Row style={{paddingLeft:20}}>
        <Col lg={6}>    
        <CheckBoxType   handleFilters={handleFilters}></CheckBoxType>
        </Col>
        <Col lg={6}>    
        <CheckDate     handleFilters={handleFilters}></CheckDate>
        </Col>
        <Col lg={6}>    
        <SearchFiltre     refreshFunction={updateSearchTerms}/>
        </Col>
        </Row>
        </Panel>
        </Collapse></div>
    <div style={{ overflow:'scroll',overflowX: 'hidden',height:'500px',padding:'2%',backgroundColor:'#e0e0e0',margin:'5%',borderRadius:'50px',border:'1px rgb(0, 153, 204) solid'}}>
        
        {/* <Collapse defaultActiveKey={['0']} style={{color:'blue' ,backgroundColor:'white'}} > */}
        
        <br/><br/><br/>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={2}>
                { FormRow.length>0
                  ?FormRow
                  :<h2>Accune demande existe ..............</h2>
                }
            </Grid>
            
        </Grid>
        

    </div></>)     
}
export default ListeIntervs;