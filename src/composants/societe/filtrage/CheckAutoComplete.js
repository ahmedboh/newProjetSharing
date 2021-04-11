import { useState ,useEffect} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';


const CheckAutoComplete=(props)=>{


    const [variables,setVariables]=useState([])

       
        useEffect(() => {
            if(props.type==='intervenants'){

            Axios.get(`http://localhost:3001/api/v1/membSociete/getMembSocietesRole/${"In"}`)
            .then((res)=>{
                setVariables(res.data.data);
            })    
            }else{
                Axios.get(`http://localhost:3001/api/v1/client`)
                .then((res)=>{
                     setVariables(res.data.data);
            
            })
            }
         },[])
        

         const conserverVariable = (value) => {
            if(props.type==='intervenants'){
             if (value!==null ) props.handleFilters(value._id,'IDintervenant')  
             else  props.handleFilters([],'IDintervenant')
            }else{
             if (value!==null ){
                Axios.get(`http://localhost:3001/api/v1/contrat/getContratsClient/${value._id}`)
                .then((res)=>{
                    let contrats=[]
                    res.data.data.forEach(element => {
                      contrats.push(element._id)
                    });
                    if(contrats.length>0)
                    props.handleFilters(contrats,'contrat')
                    else
                    props.handleFilters(["none"],'contrat')

            })
                
             }   
             else  props.handleFilters([],'contrat')
            }
        
        }

 return(<div>
     <Autocomplete
                                id="combo-box-demo"
                                options={variables}
                                getOptionLabel={(option) => { return props.type==='intervenants'?  (option.nom+" "+option.prenom):  option.raisonSociale}}
                                style={{ width: 400,marginBottom:5,marginLeft:'5'}}
                                size="small"
                                onChange={ (event, values) => {
                                    conserverVariable(values)
                                  }}
                            
                                renderInput={(params) =>  <TextField {...params}  style={{ backgroundColor:'white' }} label={props.type==='intervenants'?"intervenant":"Client Demandeur"} variant="outlined" />}
    />
    </div>)
}
export default CheckAutoComplete    ;