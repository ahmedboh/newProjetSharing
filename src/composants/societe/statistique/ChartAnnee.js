import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2/'
import  { useState,useEffect } from 'react';
import Axios from 'axios';
import MenuVer from '../../menuVer'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckAutoComplete from '../filtrage/CheckAutoComplete'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ListeAnnes=(props)=>{
     return(<FormControl variant="outlined" style={{width:'100%',marginBottom:'10px'}} >
    <InputLabel htmlFor="filled-age-native-simple">{props.id===0? "Année": `Année ${props.id}`}</InputLabel>
    <Select
        native
        onChange={(event)=>{props.handleFilters(event.target.value,'year',props.id)}}
        label={props.id===0? "Année": `Année ${props.id}`}
        size='small'
        inputProps={{
            name: props.id===0? "Année ": `Année ${props.id} `,
            id: 'filled-age-native-simple',
        }}><option aria-label="None" value={0} > {props.id===0? "Toutes les années": `--------------------`}</option>
             {props.opts}
             </Select>
     </FormControl>)
     } 


export default function ChartAnnee() {
    const  [data,setData]=useState({labels:[],datasets:[]})
    const  [dataPie,setDataPie]=useState({labels:[],datasets:[]})
    const [Filters,setFilters]=useState({year:0})
    const [listeAnnes,setListeAnnes]=useState([])
    const [listeId,setListId]=useState([])
    const [col,setCol]=useState(true)
    const [yearSelected,setYearSelected]=useState(0)
    const [swtichStatePourc,setSwitchPourc]=useState(false)
    const [someDataPie,setSomeDataPie]=useState(0)
    const colors=['rgb(54, 162, 235,0.5)'  , 'rgb(255, 99, 132,0.5)','rgb(255, 205, 86,0.5)','rgb(201, 203, 207,0.5)']
    const colorsh=['rgb(54, 162, 235)'  , 'rgb(255, 99, 132)','rgb(255, 205, 86)','rgb(201, 203, 207)']

  
    const options={
      responsive:true,
      scales:{
      y:{title: {text:'Nombre  de ticket'.toUpperCase(),display: true,font: { size: 14, family:'Helvetica',
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
        
              tab1.push(`rgb( ${r} , ${g}, ${b},0.5)`)  
              tab2.push(`rgb( ${r} , ${g}, ${b})`)  ;
            }
            
          }
          
          const getStatPie = async(ob)=>{
            const res=await Axios.post('statistique',{year:ob.year})
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
        getStatPie(Filters)

     }, [])
   
    const opts= listeAnnes.map((Annee)=>{return <option value={Annee} key={Annee}>{Annee}</option>});


    const AfficherCourbeAnn = (filters, category,id) => {
       const newData = { ...data }
      if (filters==='0'){  
       newData['datasets'].findIndex((data)=>data.id===id )!==-1&&newData['datasets'].splice(newData['datasets'].findIndex((data)=>data.id==id ),1)
       listeId.findIndex((data)=>data.id===id )!==-1&&listeId.splice(listeId.findIndex((data)=>data.id==id ),1)      
    }else{
        const newFilters = { ...Filters }
        newFilters[category] = filters
        getStat(newFilters,filters,id)
        
        newData['datasets'].findIndex((data)=>data.id===id )===-1
        ?listeId.push({idC:filters,label:filters,id})
        :listeId[newData['datasets'].findIndex((data)=>data.id===id )]=({idC:filters,label:filters,id})   
      }
      setData(newData) 
      listeId.length===0&&getStat(Filters,'Totale',1)
    }
    
    const handleFilters = (filters, category) => {
       const newData = { ...data }
        newData['labels']=[]
        newData['datasets'].splice(0)
        setData(newData) 
        const newFilters = { ...Filters }
        newFilters[category] = filters;
        setFilters(newFilters)
        console.log(newFilters)
      listeId.length===0
      ?getStat(newFilters,'Totale',1) 
      :listeId.map((val)=>{getStat({...newFilters,year:val.idC},val.label,val.id)})
     }
     const handleFilters2 = (filters, category) => {
        getStatPie({year:filters})
        setYearSelected(filters)
      }

      const titre=<h6 align='center' >  Nombre de tickets  {listeId.length===0?'par Année':` par mois`}   : </h6>
      const titre2=<h6 align='center' > {swtichStatePourc?'Pourcentage':'Nombre'} des tickets par  {yearSelected==0?'année ':`mois  à l'année ${yearSelected} `} : </h6>
    return (
        
        <div> 
        <Row >
           <Col sm={9} > 
                <MenuVer   dataLabels={["version 1","version 2","camembert 1", "camembert 2"]} changeState={setCol} data={[<>{titre} <Bar data={data}  options={options} /></>,<> {titre}<Line data={data}  options={{scales:{...options.scales,y:{...options.scales.y,beginAtZero:true}}}}/></>,<> {titre2}<div style={{width:'65%',position:'relative', top:'-5vh' ,left:'8vw'}} ><Pie  data={dataPie} options={options2} /></div></>,<> {titre2}<div style={{width:'65%',position:'relative', top:'-5vh' ,left:'8vw'}} ><Doughnut  data={dataPie} options={options2} /></div></>]} />   
           </Col>
           <Col  >
           <br/> <br/> <br/> <br/> 
           <span hidden={col}> 
           <ListeAnnes id={0} opts={opts} handleFilters={handleFilters2}/>
           <FormControlLabel   control={<Switch onChange={() =>(setSwitchPourc(!swtichStatePourc))} color="secondary"   checked={swtichStatePourc} />} label="Afficher En pourcentage" />
            </span>

           <span hidden={!col}>

            <CheckAutoComplete type="clients"  handleFilters={handleFilters} sty={false} label={'Client demndeur '}  />
            <CheckAutoComplete type="intervenants"  handleFilters={handleFilters} sty={false} label={'intervenant'} />    
            <br/><br/>
            <ListeAnnes id={1} opts={opts} handleFilters={AfficherCourbeAnn}/>
            <ListeAnnes  id={2} opts={opts} handleFilters={AfficherCourbeAnn} />
            <ListeAnnes id={3} opts={opts} handleFilters={AfficherCourbeAnn} />
          </span>
           </Col>
          
          
        </Row>
        
        </div>
        
    )
}
