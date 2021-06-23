import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import  'bootstrap/dist/css/bootstrap.min.css';
import IntervCompresse from './IntervCompresse'
import CheckBoxType from '../filtrage/CheckBoxType'
import CheckDate from '../filtrage/CheckDate'
import CheckAutoComplete from '../filtrage/CheckAutoComplete'
import SearchFiltre from '../filtrage/SearchFiltre';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  '../../style/interv.css';
import ListeTicketTable from './ListeTicketTable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



const ListeTickets=(props)=>{
    const{user}=props
    const [FormRow, setFormRow] = useState([])
    const [listeDdes, setListeDdes] = useState([])
    const [searchRef, setsearchRef] = useState('')
    const [switchMode, setSwitchMode] = useState(false)
    
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
            else if (dde.priorite==='Urgente')
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
        else if (priorite==='Urgente')
        sty=['warning','text-warning'];
        else  sty=['primary','text-primary'];
        return sty;
    }



    const listeTicket=async(ob)=>{
        const res =await Axios.post(`ticket/getAll`,ob)
        setListeDdes(res.data.data);
        charger(trirerParEtat(res.data.data))
    }
    
    const supprimerDemande=async(id)=>{
        const res =await Axios.delete(`ticket/`+id)
        listeTicket({searchRef,filters:Filters})      
    }
    useEffect(() => {
        listeTicket({searchRef,filters:Filters})
        document.body.style.backgroundColor = 'rgb(204, 193, 193)';
        return ()=>{document.body.style.backgroundColor = 'white'}
    },[user]);
   

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters


         listeTicket({searchRef,filters:newFilters})
         
         setFilters(newFilters)
    }
    
    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            filters: Filters,
            searchRef: newSearchTerm
        }

        setsearchRef(newSearchTerm)

        listeTicket(variables)
    }

    const charger=(listeDd)=> setFormRow( listeDd.map((dde,index)=>{return(<Grid key={index} item   lg={3} md={4} xs={12} > <IntervCompresse naviguer={false} contenu={dde} user={user} supprimerDemande={supprimerDemande} styleP={stylePr(dde.priorite)}/></Grid>)}))   
    
    return(<>
       <div className='boxLIteTicket '  >  
        <Row >
        <Col lg={3} style={{paddingTop:'5px'}}>    
        <CheckAutoComplete type="clients"  sty={false} label={'Client demandeur '} handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={3} style={{paddingTop:'5px'}}>    
        <CheckAutoComplete  type="intervenants" sty={false} label={'intervenant'}handleFilters={handleFilters}></CheckAutoComplete>
        </Col>
        <Col lg={3}  style={{paddingTop:'5px'}}>   
            <SearchFiltre     refreshFunction={updateSearchTerms}/>
        </Col>
        <Col lg={3}>    
        <CheckDate     handleFilters={handleFilters}></CheckDate>
        </Col> 
        </Row>
        <hr/>
        
        <Row >
        <Col lg={4}>    
        <CheckBoxType label='priorite' data={['Normale','Urgente','Critique']}  handleFilters={handleFilters}></CheckBoxType>
        </Col> 
        <Col lg={4}>    
        <CheckBoxType label='nature' data={['Maintenance','Nouveau besoin']}  handleFilters={handleFilters}></CheckBoxType>
        </Col>
        <Col lg={4}>    
        <CheckBoxType label='etat' data={['En attente','En cours','Clôturée']}  handleFilters={handleFilters}></CheckBoxType>
        </Col>
        </Row>
 
   <center><FormControlLabel   control={<Switch onChange={() =>(setSwitchMode(!switchMode))} color="secondary" size='medium'  checked={switchMode} />} label="Mode Tableau" /></center>

       </div>

    <div hidden={switchMode}  className='box AllTickets'>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={2}>
                { FormRow.length>0
                  ?FormRow
                  :<h2>Accun Ticket exist ..............</h2>
                }
            </Grid>
            
        </Grid>
    </div> 
    
    <span hidden={!switchMode}>  <ListeTicketTable listeTicket={listeDdes} ></ListeTicketTable></span>  
   
    
    </>)     
}
export default ListeTickets;