import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2/'
import  { useState,useEffect } from 'react';
import Axios from 'axios';
import MenuVer from '../../menuVer'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckAutoComplete from '../../filtrage/CheckAutoComplete'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Select from '@material-ui/core/Select';
export default function ChartIntervenant() {
    const  [data,setData]=useState({labels:[],datasets:[]})
    const  [dataPie,setDataPie]=useState({labels:[],datasets:[]})
    const [Filters,setFilters]=useState({year:0})
    const [listeAnnes,setListeAnnes]=useState([])
    const [listeId,setListId]=useState([])
    const [courbeTotale,setCourbeTotale]=useState()
    const [swtichState,setSwitchState]=useState(true)
    const [swtichStateEtat,setSwitchStateEtat]=useState(false)
    const [swtichStatePourc,setSwitchPourc]=useState(false)
    const [someDataPie,setSomeDataPie]=useState(0)
    const [col,setCol]=useState(true)

    const options={
      responsive:true,
      scales:{
      y:{ title: {text:'Nombre  de ticket'.toUpperCase(),display: true,font: { size: 14, family:'Helvetica',
                  weight:700},color :'blue'}
         },
      x: {title: {text: data.labels.length>0&&isNaN(data.labels[0])?'Mois'.toUpperCase():'Annees'.toUpperCase(),
          display: true,font: {size: 14,family:'Helvetica ',weight:700},color :'blue'}
         }}
        }
    
           const options2={
            plugins:{ legend: {
              display: true,
              position:'right'
              },
              tooltip: {
                callbacks: {
                    label: function(context) {
                  
                            
                        return  swtichStatePourc?`${context.label} : ${((context.parsed/someDataPie)*100).toFixed(2)} %`:`${context.label} : ${context.formattedValue}`;
                    }
                }
              } 
            }}

          function getRandomColor(tab1,tab2,len) {
            for(var i=0;i<len;i++){
              var r=Math.floor(Math.random() * 255)
              var g=Math.floor(Math.random() * 255)
              var b=Math.floor(Math.random() * 255)
        
              tab1.push(`rgb( ${r} , ${g}, ${b},0.7)`)  
              tab2.push(`rgb( ${r} , ${g}, ${b})`)  ;
            }
            
          }
          
   
    const colors=['rgb(54, 162, 235,0.5)'  , 'rgb(255, 99, 132,0.5)','rgb(255, 205, 86,0.5)','rgb(201, 203, 207,0.5)']
    const colorsh=['rgb(54, 162, 235)'  , 'rgb(255, 99, 132)','rgb(255, 205, 86)','rgb(201, 203, 207)']

    const getStatPie = async(ob,etat)=>{
      const res=await Axios.post('statistique/client',{filtres:{year:ob.year},role:'interv',etat})
      const newData = { ...dataPie }
      newData['labels']=res.data.data.labels
      var col=[]
      var colH=[]
      getRandomColor(col,colH,res.data.data.labels.length)
      console.log(col,colH)
      const courbe={data:res.data.data.values,fill: true,lineTension:0,backgroundColor:col,
          hoverBackgroundColor:colH ,borderWidth:2}
      newData['datasets']=[courbe]
      setSomeDataPie(res.data.data.somme) 
      setDataPie(newData)      
    }
    const getStat = async(ob,label,idcourbe)=>{
        const res=await Axios.post('statistique',ob)
        const newData = { ...data }
        console.log(newData['datasets'].findIndex((data)=>data.id===idcourbe ) )
        listeAnnes.length===0&&label==='Totale'&&setListeAnnes(res.data.data.labels.reverse())
        newData['labels']=res.data.data.labels
        const courbe={
            label ,
            data:res.data.data.values,
            fill: true,
            lineTension:0,
            backgroundColor:colors[idcourbe-1] ,
            borderColor:colorsh[idcourbe-1],
            pointBackgroundColor:colors[idcourbe-1] ,
            pointBorderColor:colors[idcourbe-1],
            hoverBackgroundColor:colorsh[idcourbe-1] ,
            borderWidth:2,
            
            id:idcourbe }
        newData['datasets'].findIndex((data)=>data.id===idcourbe )!==-1
        ?newData['datasets'][newData['datasets'].findIndex((data)=>data.id===idcourbe )]=courbe
        :newData['datasets'].push(courbe)
        console.log(newData['datasets'] )
        setData(newData)      
      }
    
    useEffect(() => {
        getStat(Filters,'Totale',1)
        getStatPie(Filters,'')
     }, [])
   
    const opts= listeAnnes.map((Annee)=>{return <option value={Annee} key={Annee}>{Annee}</option>});
     
    const aficherCourbeTotal=(event)=>{
        setSwitchState(!swtichState)
        const newData = { ...data }
        
        if(!event.target.checked){
        setCourbeTotale(newData['datasets'][0])
        newData['datasets'].splice(0,1)
        }else{
        setCourbeTotale({})
        newData['datasets'].unshift(courbeTotale) 
        }
        setData(newData)
    }
    const aficherCourbeParEtat=(event)=>{
      setSwitchStateEtat(!swtichStateEtat)
      event.target.checked
      ?getStatPie(Filters,'Clôturée')
      :getStatPie(Filters,'')   
  }

    
    const AfficherCourbeIN = (filters, category,label,id) => {
       const newData = { ...data }
      if (filters.length===0){
       
       newData['datasets'].findIndex((data)=>data.id===id )!==-1&&newData['datasets'].splice(newData['datasets'].findIndex((data)=>data.id==id ),1)
       listeId.findIndex((data)=>data.id===id )!==-1&&listeId.splice(listeId.findIndex((data)=>data.id==id ),1)      
    }else{
        const newFilters = { ...Filters }
        newFilters[category] = filters
        getStat(newFilters,label,id)
        
        newData['datasets'].findIndex((data)=>data.id===id )===-1
        ?listeId.push({idC:filters,label,id})
        :listeId[newData['datasets'].findIndex((data)=>data.id===id )]=({idC:filters,label,id})
        
        
      }
      setData(newData) 
      if (listeId.length===0 && swtichState===false ) {
        setSwitchState(true)
        setCourbeTotale({})
        newData['datasets'].unshift(courbeTotale) 
      }
      
    }
    
    const handleFilters = (filters, category) => {
        console.log(filters,category)
        const newData = { ...data }
        newData['labels']=[]
        newData['datasets'].splice(0)
        setData(newData) 
        const newFilters = { ...Filters }
        newFilters[category] = filters;
        setFilters(newFilters)
        getStat(newFilters,'Totale',1)
  
        listeId.map((val)=>{
          getStat({...newFilters,IDintervenant:val.idC},val.label,val.id)
        })
        setSwitchState(true)
        category==='year'&& (swtichStateEtat? getStatPie(newFilters,'Clôturée'):getStatPie(newFilters,'') )
      }
      const titre=<h6 align='center' >  Nombre de tickets  des intrevenants {Filters.year==0?'par Année':`à l'année ${Filters.year} par mois`}   : </h6>
      const titre2=<h6 align='center' > {swtichStatePourc?'Pourcentage':'Nombre'} des tickets {swtichStateEtat?'Clôturées':''}  par intervenat {Filters.year==0?'':`à l'année ${Filters.year} `} : </h6>
  
    return (
        
        <div> 
        <Row >
           <Col sm={9} > 
                <MenuVer   dataLabels={["version 1","version 2","camembert 1", "camembert 2"]} changeState={setCol} data={[<>{titre} <Bar data={data}  options={options} /></>,<> {titre}<Line data={data}  options={{scales:{...options.scales,y:{...options.scales.y,beginAtZero:true}}}}/></>,<> {titre2}<div style={{width:'77%',position:'relative', top:'-5vh' ,left:'10vw'}} ><Pie  data={dataPie} options={options2} /></div></>,<> {titre2}<div style={{width:'77%',position:'relative', top:'-5vh' ,left:'10vw'}} ><Doughnut  data={dataPie} options={options2} /></div></>]} />    
                {/* <MenuVer   dataLabels={["version 1","version 2","camembert"]} changeState={setCol} data={[<> {titre} <Bar data={data} options={options} /></>,<> {titre}<Line data={data}  options={{scales:{...options.scales,y:{...options.scales.y,beginAtZero:true}}}}/></>,<> {titre2} <div style={{width:'77%',position:'relative', top:'-5vh' ,left:'10vw'}} ><Pie data={dataPie} options={options2}  /></div></>,]} />    */}
           </Col>
           <Col  >
           <br/><br/><br/><br/>
            <FormControl variant="outlined" style={{width:'100%'}} >
                    <InputLabel htmlFor="filled-age-native-simple">Annee</InputLabel>
                    <Select
                    native
                    onChange={(event)=>{handleFilters(event.target.value,'year')}}
                    label="Annee"
                    inputProps={{
                        name: 'Annee',
                        id: 'filled-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value={0} >toutes les annees</option>
                    {opts}
                    </Select>
            </FormControl> <br/><br/>
            <FormControlLabel  hidden={col}  control={<Switch onChange={() =>(setSwitchPourc(!swtichStatePourc))} color="secondary"   checked={swtichStatePourc} />} label="Afficher En pourcentage" />
            <FormControlLabel  hidden={col}  control={<Switch  onChange={aficherCourbeParEtat} color="Secondary" checked={swtichStateEtat}   />} label="tickets clôturés" />
         
            <span hidden={!col}>

            <CheckAutoComplete type="clients"  handleFilters={handleFilters} sty={false} label={'Client demndeur '}  ></CheckAutoComplete>

            <br/><br/>
            <CheckAutoComplete type="intervenants"  handleFilters={AfficherCourbeIN} sty={false} label={'intervenant 1'} id={2} ></CheckAutoComplete>
            <CheckAutoComplete type="intervenants"  handleFilters={AfficherCourbeIN} sty={false} label={'intervenant 2'} id={3}></CheckAutoComplete>
            <CheckAutoComplete type="intervenants"  handleFilters={AfficherCourbeIN} sty={false} label={'intervenant 3'}id={4} ></CheckAutoComplete> 
             <FormControlLabel  hidden={listeId.length===0}  control={<Switch onChange={aficherCourbeTotal} color="primary"   checked={swtichState} />} label="Afficher le Tolale" />
            </span>
           </Col>
          
          
        </Row>
        
        </div>
        
    )
}
