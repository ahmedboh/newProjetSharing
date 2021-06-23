import { useState ,useEffect} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';


const CheckAutoComplete=(props)=>{


    const [variables,setVariables]=useState([])

        const getIntervannats =async ()=>{
            const res= await Axios.get(`membSociete/getMembSocietesRole/${"In"}`)
            setVariables(res.data.data);
         }

         const getClients =async ()=>{
            const res= await Axios.get(`client`)
            setVariables(res.data.data);
         }
        useEffect(() => {
            props.type==='intervenants'?getIntervannats():getClients()   
         },[])
        

         const conserverVariable = async(value) => {
            if (props.id){
                if(props.type==='intervenants'){
                    props.handleFilters(value!==null?value._id:'','IDintervenant',value?value.nom+" "+value.prenom:'',props.id) 
                    }else{
                    props.handleFilters(value!==null?value._id:'','IDclient',value?value.raisonSociale:'',props.id) 
                    }
            }else{
                if(props.type==='intervenants'){
                 props.handleFilters(value!==null?value._id:'','IDintervenant') 
                    }else{
                 props.handleFilters(value!==null?value._id:'','IDclient') 
                }
            }
            
        }

 return(<div>
     <Autocomplete
                                id="combo-box-demo"
                                options={variables}
                                getOptionLabel={(option) => { return props.type==='intervenants'?  (option.nom+" "+option.prenom):  option.raisonSociale}}
                                style={props.sty?{ width: 400,marginBottom:5,marginLeft:'5'}:{ marginBottom:5}}
                                size="small"
                                onChange={ (event, values) => {
                                    conserverVariable(values)
                                  }}
                            
                                renderInput={(params) =>  <TextField {...params}  style={{ backgroundColor:'white' }} label={props.label} variant="outlined" />}
    />
    </div>)
}
export default CheckAutoComplete    ;