import MenuVer from '../../menuVer'
import ChartClient from './ChartClient'
import ChartIntervenant from './ChartIntervenat'
import ChartAnnee from './ChartAnnee'
import  { useState,useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default function Stat() {
  
  const [valueStat,setValueStat]=useState(0)
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';

    return ()=>{document.body.style.overflowY  = 'auto';document.body.style.overflowX = 'auto'}
    }, [])
    return (
       
        <div> 
        <Row>  
         <Col sm={10}>  
          {valueStat===0
          ?<MenuVer  dataLabels={[" Tandence mode ","Tablaux mode "]} data={[<ChartClient/>,<div>table</div>]} />   
          :valueStat===1
          ?<MenuVer  dataLabels={[" Tandence mode ","Tablaux mode "]} data={[<ChartIntervenant/>,<div>table</div>]} />   
          :<MenuVer  dataLabels={[" Tandence mode ","Tablaux mode "]} data={[<ChartAnnee/>,<div>table</div>]} />   

          }
         </Col>  
         <Col>
         <br/><br/><br/>
         <h5 style={{color:'gray',textAlign:'center'}}>STATISTIQUE</h5>
         <br/>

         <nav  aria-label="mailbox folders">
          <List >
          <span onClick={()=>{setValueStat(0)}} >
            <ListItem button  style={valueStat===0?{fontSize:'13px',borderLeft:'2px solid gray ',color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
                 Statistiques des  clients
            </ListItem></span>
            <span onClick={()=>{setValueStat(1)}} >
            <ListItem button   style={valueStat===1?{fontSize:'13px',borderLeft:'2px solid gray ',color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
                  Statistiques des intervenants
            </ListItem></span>
             <span onClick={()=>{setValueStat(2)}} >
            <ListItem button  style={valueStat===2?{fontSize:'13px',borderLeft:'2px solid gray ' ,color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
                Statistiques  des Années
            </ListItem></span>
          </List>
        </nav>
         </Col>  
         </Row> 
        </div>
    )
}
