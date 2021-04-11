import { useState } from 'react';
import {  Collapse } from 'antd';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const { Panel } = Collapse



const CheckDate=(props)=>{
    const [btnState,setBtnState]=useState(true)
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }


 return(<div>
     
    <Collapse defaultActiveKey={['1']} >
        <Panel header="PAR DATE" key="1" >
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <TextField id="date"  type="date" label="Date Creation" 
          onChange={(event)=>{ props.handleFilters(formatDate(event.target.value),'dateCreation');setBtnState(false)  }}
           InputLabelProps={{shrink: true,}}/> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
       
        <IconButton color="secondary" aria-label="delete" disabled={btnState} onClick={()=>{  props.handleFilters([],'dateCreation') ;document.getElementById("date").value="jj/mm/aaaa";setBtnState(true)}}>
        <DeleteIcon />
        </IconButton>
        
        </Panel>
    </Collapse>
    </div>)
}
export default CheckDate;