import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import  'bootstrap/dist/css/bootstrap.min.css';
import IntervCompresse from './IntervCompresse'



const ListeIntervs=()=>{

    const [listeDdes, setListeDdes] = useState([])
   
    
    
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
      


    const listeDemande=()=>{
        Axios.get(`http://localhost:3001/api/v1/intervention`)
        .then((res)=>{
            setListeDdes(trirerParEtat(res.data.data));

        })
        
      
    } 
    useEffect(() => {
        listeDemande()
        let isUmount=false
    
    });
   

    

    const  FormRow= listeDdes.map((dde,index)=>{return(<Grid key={index} item xs={3} > <IntervCompresse naviguer={false} contenu={dde} styleP={stylePr(dde.priorite)}/></Grid>)})   

    return(<div style={{padding:'2%',backgroundColor:'#e0e0e0',margin:'5%',borderRadius:'50px',border:'1px rgb(0, 153, 204) solid'}}>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={2}>
                { FormRow}
            </Grid>
            
        </Grid>
        

    </div>)     
}
export default ListeIntervs;