import React from 'react'
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
    return (
       
        <div>
        <Row>  
         <Col sm={10}>  
          {valueStat===0
          ?<MenuVer  dataLabels={[" Tandance mode ","Tablaux mode "]} data={[<ChartClient/>,<div>table</div>]} />   
          :valueStat===1
          ?<MenuVer  dataLabels={[" Tandance mode ","Tablaux mode "]} data={[<ChartIntervenant/>,<div>table</div>]} />   
          :<MenuVer  dataLabels={[" Tandance mode ","Tablaux mode "]} data={[<ChartAnnee/>,<div>table</div>]} />   

          }
         </Col>  
         <Col>
         <br/><br/><br/>
         <h5 style={{color:'gray',textAlign:'center'}}>STATISTIQUE</h5>
         <br/>

         <nav  aria-label="mailbox folders">
          <List >
          <span onClick={()=>{setValueStat(0)}} >
            <ListItem button  style={valueStat===0?{borderLeft:'2px solid gray ',color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
                 statistique des clients
            </ListItem></span>
            <span onClick={()=>{setValueStat(1)}} >
            <ListItem button   style={valueStat===1?{borderLeft:'2px solid gray ',color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
               statistique des intervenants
            </ListItem></span>
             <span onClick={()=>{setValueStat(2)}} >
            <ListItem button  style={valueStat===2?{borderLeft:'2px solid gray ' ,color:'black',fontWeight:'500'}:{fontSize:'14px',color:'gray'}} >
               statistique  des Annees
            </ListItem></span>
          </List>
        </nav>
         </Col>  
         </Row> 
        </div>
    )
}
