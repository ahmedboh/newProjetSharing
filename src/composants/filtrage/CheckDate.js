import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';




const CheckDate=(props)=>{
    const [btnState,setBtnState]=useState(true)

 return(<>
     
   
       
        <TextField id="date"  type="date" label={props.type===undefined?"Date de Création":'Date de depose'} size={props.type!==undefined?'medium':'small'}
          onChange={(event)=>{ props.handleFilters(new Date(event.target.value),'dateCreation');setBtnState(false)  }}
           InputLabelProps={{shrink: true,}}/> 
       
        <IconButton color="secondary" aria-label="delete" disabled={btnState} onClick={()=>{  props.handleFilters([],'dateCreation') ;document.getElementById("date").value="jj/mm/aaaa";setBtnState(true)}}>
        <DeleteIcon />
        </IconButton>
    
    </>)
}
export default CheckDate;